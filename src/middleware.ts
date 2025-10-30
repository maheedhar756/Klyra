import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req : NextRequest) {

    const token = (req as any).nextauth?.token;
    const role = token?.role as string | undefined;

    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/shop", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/shop") && !token) {
      return NextResponse.redirect(new URL("/(auth)/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }: { token: any }) => !!token
    }
  }
);

export const config = {
  matcher: ["/shop/:path*", "/user/:path*", "/admin/:path*"]
}