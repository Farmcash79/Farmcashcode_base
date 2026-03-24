import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ transactions });
}
