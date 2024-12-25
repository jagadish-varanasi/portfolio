import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/dashboard", "project", "/tasks"];
const adminRoutes = ["/admin"];

export default auth((request) => {
  console.log(request.auth?.user);

  const session = request.auth?.user;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  //console.log(session, "middleware session");

  if (isAdminRoute && session?.role !== "ADMIN") {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }

  if (!session && isProtected) {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }

  if (!session && request.nextUrl.pathname === "/") {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  } else if (session && request.nextUrl.pathname === "/") {
    const absoluteUrl = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }

  if (
    (session && request.nextUrl.pathname.startsWith("/login")) ||
    (session && request.nextUrl.pathname === "/")
  ) {
    const absoluteUrl = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
