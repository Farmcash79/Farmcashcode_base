import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { onboardingSchema } from "@/schemas/onboarding.schema";
import { z } from "zod";
import { signSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const sessionUser = await getUserFromRequest(req);

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid onboarding data",
        errors: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  await prisma.$transaction(async (db) => {
    await db.farmerProfile.upsert({
      where: { userId: sessionUser.userId },
      update: {
        farmName: data.farmName,
        location: data.location,
        farmSize: data.farmSize,
        farmType: data.farmType,
      },
      create: {
        userId: sessionUser.userId,
        farmName: data.farmName,
        location: data.location,
        farmType: data.farmType,
        farmSize: data.farmSize,
      },
    });

    await db.user.update({
      where: { id: sessionUser.userId },
      data: {
        onboardingCompleted: true,
      },
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

  response.cookies.set("fc_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
