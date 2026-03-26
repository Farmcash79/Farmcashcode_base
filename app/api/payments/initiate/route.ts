import { prisma } from "@/lib/db";
import { nairaToKobo } from "@/lib/money";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const body = await req.json();
    const amount = Number(body.amount);
    const description = String(body.description ?? "Wallet funding");

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const reference = `FC-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const amountKobo = nairaToKobo(amount);

    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: "FUND_WALLET",
        status: "PENDING",
        amount: amountKobo,
        currency: "NGN",
        reference,
        description,
      },
    });

    const checkoutUrl =
      process.env.INTERSWITCH_CHECKOUT_URL ??
      "https://webpay-ui.k8.isw.la/collections/w/pay";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    return NextResponse.json({
      actionUrl: checkoutUrl,
      fields: {
        merchant_code: process.env.INTERSWITCH_MERCHANT_CODE,
        pay_item_id: process.env.INTERSWITCH_PAY_ITEM_ID,
        site_redirect_url: `${appUrl}/payment/return?txn_ref=${reference}`,
        txn_ref: reference,
        amount: amountKobo,
        currency: "566", // NGN minor currency
        cust_name: user.name,
        cust_email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to initiate payment", error: String(error) },
      { status: 500 },
    );
  }
}
