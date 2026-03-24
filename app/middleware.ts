import { verifySession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("fc_session")?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isOnboarding = req.nextUrl.pathname.startsWith("/onboarding");

  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/payment/return") ||
    isOnboarding;

  // No session → redirect to login
  if (isProtected && !sessionToken) {
    return redirect(req, "/auth/login");
  }

  const user = sessionToken ? await verifySession(sessionToken) : null;

  if (isProtected && !user) {
    return redirect(req, "/auth/login");
  }

  // Enforce onboarding
  if (user && !user?.onboardingCompleted && !isOnboarding) {
    return redirect(req, "/onboarding");
  }

  // Prevent accessing onboarding again after completion
  if (user?.onboardingCompleted && isOnboarding) {
    return redirect(req, "/dashboard");
  }

  // Prevent logged-in users from visiting auth pages
  if (user && isAuthPage) {
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
    "/auth/:path*",
  ],
};
