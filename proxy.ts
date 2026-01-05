import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "./lib/auth"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("session")?.value

    if (!session) {
      console.log("[v0] No session found, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const decrypted = await decrypt(session)
      if (!decrypted) {
        console.log("[v0] Invalid session, redirecting to login")
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch (e) {
      console.log("[v0] Session decryption failed, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (pathname === "/admin/login") {
    const session = request.cookies.get("session")?.value
    if (session) {
      try {
        const decrypted = await decrypt(session)
        if (decrypted && decrypted.user) {
          console.log("[v0] Valid session found, redirecting to dashboard")
          return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
      } catch (e) {
        // Invalid session, allow user to continue to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
