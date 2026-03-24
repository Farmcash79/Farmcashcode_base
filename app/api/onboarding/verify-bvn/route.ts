import { prisma } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import { bvnStepSchema } from "@/schemas/onboarding.schema";
import { maskBvn } from "@/lib/utils";
import { verifyBvnWithInterswitch } from "@/lib/interswitch";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = bvnStepSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid BVN data", errors: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const result = await verifyBvnWithInterswitch({
    bvn: parsed.data.bvn,
    phoneNumber: parsed.data.phoneNumber,
    dateOfBirth: parsed.data.dateOfBirth,
  });

  await prisma.onboardingDraft.upsert({
    where: { userId },
    update: {
      currentStep: 2,
      data: {
        bvn: parsed.data.bvn,
        bvnMasked: maskBvn(parsed.data.bvn),
        bvnVerified: true,
        bvnVerificationMeta: result,
        phoneNumber: parsed.data.phoneNumber ?? null,
        dateOfBirth: parsed.data.dateOfBirth,
      },
    },
    create: {
      userId,
      currentStep: 2,
      data: {
        bvn: parsed.data.bvn,
        bvnMasked: maskBvn(parsed.data.bvn),
        bvnVerified: true,
        bvnVerificationMeta: result,
        phoneNumber: parsed.data.phoneNumber ?? null,
        dateOfBirth: parsed.data.dateOfBirth,
      },
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { bvn: parsed.data.bvn },
  });

  return NextResponse.json({
    ok: true,
    redirect: "/onboarding?step=2",
    bvnMasked: maskBvn(parsed.data.bvn),
  });
}
