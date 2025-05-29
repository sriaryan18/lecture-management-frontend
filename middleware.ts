import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  console.log(pathname,'pathname');
  // If user is logged in and tries to access '/', redirect to /home
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If user is NOT logged in and tries to access any route except '/', redirect to /
  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    "/((?!_next/static|_next/image|favicon.ico).*)", // Protect all routes except static files
  ],
};

