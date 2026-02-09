import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page and all API routes through without auth
  if (pathname === "/admin/login" || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session")?.value

    if (session === "authenticated") {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
