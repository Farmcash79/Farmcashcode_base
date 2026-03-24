import { prisma } from "@/lib/db";
import { confirmInterswitchTransaction } from "@/lib/interswitch";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("txn_ref");

    if (!reference) {
      return NextResponse.json(
        { message: "Missing transaction reference" },
        { status: 400 },
      );
    }

    const tx = await prisma.transaction.findUnique({
      where: { reference },
      include: { user: true },
    });

    if (!tx) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    if (tx.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (tx.status === "SUCCESS") {
      return NextResponse.json({ ok: true, alreadyConfirmed: true });
    }

    const result = await confirmInterswitchTransaction(reference, tx.amount);

    const responseCode = result?.ResponseCode ?? result?.responseCode;
    const providerAmount = Number(
      result?.Amount ?? result?.amount ?? tx.amount,
    );

    const success = responseCode === "00" && providerAmount === tx.amount;

    await prisma.$transaction(async (db) => {
      if (success) {
        await db.transaction.update({
          where: { reference },
          data: {
            status: "SUCCESS",
            providerRef:
              result?.PaymentReference ?? result?.paymentReference ?? null,
            meta: result,
          },
        });

        await db.user.update({
          where: { id: tx.userId },
          data: {
            walletBalance: { increment: tx.amount },
          },
        });
      } else {
        await db.transaction.update({
          where: { reference },
          data: {
            status: "FAILURE",
            meta: result,
          },
        });
      }
    });

    return NextResponse.json({
      ok: success,
      reference,
      responseCode,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Payment confirmation failed", error: String(error) },
      { status: 500 },
    );
  }
}
