import { verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("fc_session")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");
  const isOnboardingPage = pathname.startsWith("/onboarding");
  const isDashboardPage = pathname.startsWith("/dashboard");

  const session = token ? await verifySession(token) : null;

  if (!session && (isDashboardPage || isOnboardingPage)) {
    return redirect(req, "/login");
  }

  if (session && isAuthPage) {
    return redirect(
      req,
      session.onboardingCompleted ? "/dashboard" : "/onboarding",
    );
  }

  if (session && !session.onboardingCompleted && isDashboardPage) {
    return redirect(req, "/onboarding");
  }

  if (session && session.onboardingCompleted && isOnboardingPage) {
    return redirect(req, "/dashboard");
  }

  return NextResponse.next();
}

function redirect(req: NextRequest, path: string) {
  const url = req.nextUrl.clone();
  url.pathname = path;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/payment/return/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
