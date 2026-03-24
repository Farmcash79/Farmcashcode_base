import { envConfig } from "@/config/env.config";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(envConfig.jwtSecret);

export type SessionPayload = {
  userId: string;
  role: string;
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
