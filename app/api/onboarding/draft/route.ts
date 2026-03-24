import { prisma } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const draft = await prisma.onboardingDraft.findUnique({
    where: { userId },
  });

  return NextResponse.json({
    ok: true,
    draft: draft ?? {
      currentStep: 1,
      data: {},
    },
  });
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const draft = await prisma.onboardingDraft.upsert({
    where: { userId },
    update: {
      currentStep: body.currentStep ?? 1,
      data: body.data ?? {},
    },
    create: {
      userId,
      currentStep: body.currentStep ?? 1,
      data: body.data ?? {},
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { onboardingCompleted: false },
  });

  return NextResponse.json({ ok: true, draft });
}
