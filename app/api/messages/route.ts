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

    // Send email to admin via Formspree using the direct endpoint
    try {
      const formspreeEndpoint = "https://formspree.io/f/xwpojlky"
      
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
      
      const formspreeData = await formspreeResponse.json()
      
      if (!formspreeResponse.ok) {
        console.error("[v0] Formspree error:", formspreeData)
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        )
      }

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
