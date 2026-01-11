import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!session && protectedRoutes.indexOf(request.nextUrl.pathname) >= 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && publicRoutes.indexOf(request.nextUrl.pathname) >= 0) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
  ],
};
