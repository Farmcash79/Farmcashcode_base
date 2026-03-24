import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { signSession, setSessionCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { onboardingCompleteSchema } from "@/schemas/onboarding.schema";

export async function POST(req: NextRequest) {
  const sessionUser = await getUserFromRequest(req);
  if (!sessionUser)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = onboardingCompleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid onboarding data",
        errors: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const draft = await prisma.onboardingDraft.findUnique({
    where: { userId: sessionUser.userId },
  });

  if (draft?.data?.["bvnVerified"] !== true) {
    return NextResponse.json(
      { message: "BVN must be verified before completing onboarding" },
      { status: 400 },
    );
  }

  await prisma.$transaction(async (db) => {
    await db.farmerProfile.upsert({
      where: { userId: sessionUser.userId },
      update: {
        farmName: parsed.data.farmName,
        location: parsed.data.location,
        farmType: parsed.data.farmType,
        farmSize: parsed.data.farmSize ?? null,
      },
      create: {
        userId: sessionUser.userId,
        farmName: parsed.data.farmName,
        location: parsed.data.location,
        farmType: parsed.data.farmType,
        farmSize: parsed.data.farmSize ?? null,
      },
    });

    await db.user.update({
      where: { id: sessionUser.userId },
      data: {
        onboardingCompleted: true,
        bvn: parsed.data.bvn,
      },
    });

    await db.onboardingDraft.deleteMany({
      where: { userId: sessionUser.userId },
    });
  });

  const token = await signSession({
    userId: sessionUser.userId,
    role: sessionUser.role,
    onboardingCompleted: true,
  });

  const response = NextResponse.json({
    ok: true,
    redirect: "/dashboard",
  });

  setSessionCookie(response, token);
  return response;
}
