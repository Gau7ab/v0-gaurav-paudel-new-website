import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Received message submission:", { name, email, subject })

    // Validate inputs
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: Missing fields")
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Invalid email format:", email)
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Insert into database
    try {
      await sql`
        INSERT INTO messages (name, email, subject, message, created_at)
        VALUES (${name}, ${email}, ${subject}, ${message}, NOW())
      `
      console.log("[v0] Message saved to database successfully")
    } catch (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save message to database" },
        { status: 500 }
      )
    }

    // Send email to admin via Formspree using project ID
    try {
      const formspreeProjectId = "2742347210439000046"
      const formspreeUrl = `https://formspree.io/f/${formspreeProjectId}`
      console.log("[v0] Sending email to Formspree:", formspreeUrl)
      
      const formspreeResponse = await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `New message from ${name}: ${subject}`,
        }),
      })
      
      if (!formspreeResponse.ok) {
        console.warn("[v0] Formspree response not OK:", formspreeResponse.status)
      } else {
        console.log("[v0] Email sent to Formspree successfully")
      }
    } catch (emailError) {
      console.error("[v0] Error sending email via Formspree:", emailError)
      // Don't fail the response if email fails - message is still saved
    }

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
