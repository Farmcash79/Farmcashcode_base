import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function getSessionUserIdFromServer() {
  const cookieStore = await cookies();
  const session = cookieStore.get("fc_session")?.value ?? null;
  return session;
}

export async function getCurrentUserFromServer() {
  const userId = await getSessionUserIdFromServer();
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export function getUserIdFromRequest(request: NextRequest) {
  return request.cookies.get("fc_session")?.value ?? null;
}

import { jwtVerify } from "jose";
import { envConfig } from "@/config/env.config";

const secret = new TextEncoder().encode(envConfig.jwtSecret);

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      userId: string;
      onboardingCompleted: boolean;
    };
  } catch {
    return null;
  }
}
