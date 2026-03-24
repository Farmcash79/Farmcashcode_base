import { verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("fc_session")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuth =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isOnboarding = pathname.startsWith("/onboarding");
  const isProtected = pathname.startsWith("/dashboard");

  const user = token ? await verifySession(token) : null;

  if (isProtected && !user) {
    return redirect(req, "/login");
  }

  if (user && isAuth) {
    return redirect(
      req,
      user.onboardingCompleted ? "/dashboard" : "/onboarding",
    );
  }

  if (user && !user.onboardingCompleted && !isOnboarding) {
    return redirect(req, "/onboarding");
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
