import { prisma } from "@/lib/db";
import { signSession } from "@/lib/session";
import { loginSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid login data",
          errors: z.treeifyError(parsed.error),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await signSession({
      userId: user.id,
      role: user.role,
      onboardingCompleted: user.onboardingCompleted,
    });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
      redirect: user.onboardingCompleted ? "/dashboard" : "/onboarding",
    });

    res.cookies.set("fc_session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed", error: String(error) },
      { status: 500 },
    );
  }
}
