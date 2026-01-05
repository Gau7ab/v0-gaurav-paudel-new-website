import { type NextRequest, NextResponse } from "next/server"
import { encrypt } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (email?.toLowerCase() === "paudelg97@gmail.com" && password === "Hbvsc2000gg#") {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ user: { email, role: "super_admin" }, expires })

    const response = NextResponse.json({ success: true, redirectUrl: "/admin/dashboard" })
    response.cookies.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })

    return response
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
