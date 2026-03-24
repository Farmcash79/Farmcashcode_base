import { envConfig } from "@/config/env.config";
import { RoleType } from "@/schemas/auth.schema";
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(envConfig.jwtSecret);

export type SessionPayload = {
  userId: string;
  role: RoleType;
  onboardingCompleted: boolean;
};

export async function signSession(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set("fc_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: envConfig.environment === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set("fc_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: envConfig.environment === "production",
    path: "/",
    expires: new Date(0),
  });
}
