import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { signSession, setSessionCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { onboardingCompleteSchema } from "@/schemas/onboarding.schema";

export async function POST(req: NextRequest) {
  const sessionUser = await getUserFromRequest(req);
  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = onboardingCompleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid onboarding data" },
      { status: 400 },
    );
  }

  const draft = await prisma.onboardingDraft.findUnique({
    where: { userId: sessionUser.userId },
  });

  const data = draft?.data as Record<string, unknown>;
  const bvnVerified = data["bvnVerified"];

  if (bvnVerified !== true) {
    return NextResponse.json(
      { message: "BVN must be verified before completing onboarding" },
      { status: 400 },
    );
  }

  await prisma.$transaction(async (db) => {
    await db.user.update({
      where: { id: sessionUser.userId },
      data: {
        name: parsed.data.fullName,
        onboardingCompleted: true,
        bvn: parsed.data.bvn,
      },
    });

    await db.farmerProfile.upsert({
      where: { userId: sessionUser.userId },
      update: {
        location: parsed.data.farmLocation,
        farmType: parsed.data.farmType,
      },
      create: {
        userId: sessionUser.userId,
        location: parsed.data.farmLocation,
        farmType: parsed.data.farmType,
        farmName: null,
        farmSize: null,
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
