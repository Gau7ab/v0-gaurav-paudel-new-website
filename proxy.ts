import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect admin routes (except login and API)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !pathname.startsWith("/api/")) {
    const session = request.cookies.get("admin_session")?.value

    if (!session || session !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
