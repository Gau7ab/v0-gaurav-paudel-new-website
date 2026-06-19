import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

/**
 * Extracts a direct image URL from imgbb embed HTML, BBCode, or returns
 * the value as-is if it is already a plain URL.
 */
function extractImageUrl(value: string): string {
  if (!value) return ''
  let v = value.trim()
  
  // First, remove all script and iframe tags completely
  v = v.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  v = v.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  
  // Try to extract src attribute from img or other tags
  const srcMatch = v.match(/src=["']?(https?:\/\/[^"'\s>]+)["']?/)
  if (srcMatch) return srcMatch[1]
  
  // Try BBCode format
  const bbMatch = v.match(/\[img\](https?:\/\/[^\[]+)\[\/img\]/i)
  if (bbMatch) return bbMatch[1]
  
  // Extract any http/https URL from the string
  const urlMatch = v.match(/(https?:\/\/[^\s<>"]*)/i)
  if (urlMatch) return urlMatch[1]
  
  // Strip any remaining HTML tags
  v = v.replace(/<[^>]*>/g, '').trim()
  
  return v
}

export async function GET() {
  try {
    const [about, skills, experience, education, projects, achievements, treks] = await Promise.all([
      sql`SELECT * FROM portfolio_about ORDER BY id LIMIT 1`,
      sql`SELECT * FROM portfolio_skills ORDER BY sort_order, id`,
      sql`SELECT * FROM portfolio_experience ORDER BY sort_order, id`,
      sql`SELECT * FROM portfolio_education ORDER BY sort_order, id`,
      sql`SELECT * FROM portfolio_projects ORDER BY sort_order, id`,
      sql`SELECT * FROM portfolio_achievements ORDER BY sort_order, id`,
      sql`SELECT * FROM portfolio_treks ORDER BY sort_order, id`,
    ])

    // Sanitize trek image URLs to prevent script tag rendering
    const sanitizedTreks = treks.map((trek: any) => ({
      ...trek,
      image_url: extractImageUrl(trek.image_url || ''),
      image: extractImageUrl(trek.image || ''),
    }))

    return NextResponse.json({
      about: about[0] || null,
      skills,
      experience,
      education,
      projects,
      achievements,
      treks: sanitizedTreks,
    })
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
