import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need auth
  const isPublicPath = 
    pathname === "/" || 
    pathname.startsWith("/jobs") || 
    pathname.startsWith("/pricing") || 
    pathname.startsWith("/about");

  // Auth paths (only accessible if NOT logged in)
  const isAuthPath = 
    pathname.startsWith("/login") || 
    pathname.startsWith("/register");

  // Protected paths
  const isTalentPath = pathname.startsWith("/talent");
  const isCompanyPath = pathname.startsWith("/company");
  const isAdminPath = pathname.startsWith("/admin");
  const isProtectedRoute = isTalentPath || isCompanyPath || isAdminPath;

  // Redirect to login if accessing protected path without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing auth path with token
  if (isAuthPath && token) {
    const dashboardUrl = role === "admin" 
      ? "/admin" 
      : role === "company" 
        ? "/company" 
        : "/talent";
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  // Role-based protection
  if (isTalentPath && role !== "talent") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isCompanyPath && role !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/talent/:path*",
    "/company/:path*",
    "/login",
    "/register/:path*",
  ],
};
