import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { maskBvn } from "@/lib/utils";
// import { verifyBvnWithInterswitch } from "@/lib/interswitch"; // I will use later
import { prisma } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

const schema = z.object({
  fullName: z.string().trim().min(2),
  bvn: z
    .string()
    .trim()
    .regex(/^\d{11}$/),
});

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid BVN payload" },
      { status: 400 },
    );
  }

  const bvnMasked = maskBvn(parsed.data.bvn);

  // Keep your provider integration here if required.
  // If provider verification fails, return a 400 response.
  // await verifyBvnWithInterswitch({ bvn: parsed.data.bvn, fullName: parsed.data.fullName });

  await prisma.onboardingDraft.upsert({
    where: { userId },
    update: {
      data: {
        bvnVerified: true,
        bvnMasked,
        fullName: parsed.data.fullName,
        bvn: parsed.data.bvn,
      },
    },
    create: {
      userId,
      currentStep: 1,
      data: {
        bvnVerified: true,
        bvnMasked,
        fullName: parsed.data.fullName,
        bvn: parsed.data.bvn,
      },
    },
  });

  return NextResponse.json({
    ok: true,
    verified: true,
    bvnMasked,
  });
}
