"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function trackToolUsage(toolName: string, toolKey: string, userId: string) {
  try {
    const { error } = await supabase.from("tool_usage").insert({
      user_id: userId,
      tool_name: toolName,
      tool_key: toolKey,
    })

    if (error) {
      console.error("[v0] Error tracking tool usage:", error)
      return { success: false }
    }

    return { success: true }
  } catch (err) {
    console.error("[v0] Track tool usage error:", err)
    return { success: false }
  }
}
