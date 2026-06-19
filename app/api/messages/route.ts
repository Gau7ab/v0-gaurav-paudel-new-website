import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body
    console.log("[v0] /api/messages POST received:", { name, email, subject })

    // Validate inputs
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing required fields")
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Validation failed: invalid email format")
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send email to admin via Formspree using the direct endpoint
    try {
      const formspreeEndpoint = "https://formspree.io/f/xwpojlky"
      console.log("[v0] Sending to Formspree endpoint:", formspreeEndpoint)
      
      const formspreeResponse = await fetch(formspreeEndpoint, {
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
      
      console.log("[v0] Formspree response status:", formspreeResponse.status)
      const formspreeData = await formspreeResponse.json()
      console.log("[v0] Formspree response data:", formspreeData)
      
      if (!formspreeResponse.ok) {
        console.error("[v0] Formspree error response:", formspreeData)
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        )
      }

      console.log("[v0] Message sent successfully via Formspree")
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      )
    } catch (emailError) {
      console.error("[v0] Error sending email via Formspree:", emailError)
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[v0] Error in POST /api/messages:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
