import { prisma } from "@/lib/db";
import { verifySession } from "./session";
import { cookies } from "next/headers";

/**
 * For API routes (Route Handlers)
 */
export async function getUserFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("fc_session="))
    ?.split("=")[1];

  if (!token) return null;

  return await verifySession(token);
}

export async function getUserIdFromRequest(req: Request) {
  const user = await getUserFromRequest(req);
  return user?.userId || null;
}

/**
 * For Server Components / Layouts
 */
export async function getCurrentUserFromServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fc_session")?.value;

  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      onboardingCompleted: true,
      walletBalance: true,
    },
  });
}
