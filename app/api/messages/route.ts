import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Insert into database
    await sql`
      INSERT INTO messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Error in POST /api/messages:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
