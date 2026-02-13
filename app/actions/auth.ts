"use server"

import { supabase } from "@/lib/supabaseClient"

export async function signUpUser(email: string, password: string) {
  console.log("[v0] Starting signup for:", email)

  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    : "http://localhost:3000/auth/callback"

  console.log("[v0] Using redirect URL:", redirectUrl)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  })

  if (error) {
    console.error("[v0] Signup error:", error)
    return {
      success: false,
      error: error.message || "Failed to create account. Please try again.",
    }
  }

  console.log("[v0] Signup successful for:", email)
  return {
    success: true,
    message: "Account created! Please check your email to confirm your account.",
    user: data.user,
  }
}
