import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  console.log("[v0] Auth callback received with code:", code ? "present" : "missing")

  if (code) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("[v0] Auth exchange error:", error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=verification_failed`)
    }

    console.log("[v0] Auth exchange successful")
  } else {
    console.warn("[v0] No auth code provided in callback")
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
