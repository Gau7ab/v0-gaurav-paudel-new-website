import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (email?.toLowerCase() === "paudelg97@gmail.com" && password === "Hbvsc2000gg#") {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_session", "authenticated", {
      expires,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })

    return response
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
