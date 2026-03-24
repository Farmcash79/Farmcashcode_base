import { prisma } from "@/lib/db";
import { registerSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { setSessionCookie, signSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid registration data",
          errors: z.treeifyError(parsed.error),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        onboardingCompleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        onboardingCompleted: true,
      },
    });

    const token = await signSession({
      userId: user.id,
      role: user.role,
      onboardingCompleted: false,
    });

    const res = NextResponse.json({
      ok: true,
      user,
      redirect: "/onboarding",
    });

    setSessionCookie(res, token);

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error: String(error) },
      { status: 500 },
    );
  }
}
