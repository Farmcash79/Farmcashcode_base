import { prisma } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import { onboardingCompleteSchema } from "@/lib/schemas/onboarding.schema";
import { NextRequest, NextResponse } from "next/server";
import { signSession, setSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = onboardingCompleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid onboarding data", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const result = await prisma.$transaction(async (db) => {
    const profile = await db.farmerProfile.upsert({
      where: { userId },
      update: {
        farmName: data.farmName,
        location: data.location,
        farmSize: data.farmSize,
      },
      create: {
        userId,
        farmName: data.farmName,
        location: data.location,
        farmSize: data.farmSize,
      },
    });

    await db.onboardingDraft.deleteMany({
      where: { userId },
    });

    const user = await db.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        onboardingStatus: "COMPLETED",
      },
      select: {
        id: true,
        role: true,
        onboardingCompleted: true,
      },
    });

    return { profile, user };
  });

  const token = await signSession({
    userId: result.user.id,
    role: result.user.role,
    onboardingCompleted: true,
  });

  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, token);
  return response;
}
