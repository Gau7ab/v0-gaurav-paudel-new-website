import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

/**
 * Removes all HTML tags and script content from a string
 */
function stripHtmlTags(value: string): string {
  if (!value) return ''
  return value
    .replace(/<[^>]*>/g, '')
    .trim()
}

/**
 * Extracts a direct image URL from imgbb embed HTML, BBCode, or returns
 * the value as-is if it is already a plain URL.
 */
function extractImageUrl(value: string): string {
  if (!value) return ''
  // First remove all HTML tags completely
  let v = stripHtmlTags(value)
  
  // Try to extract URL patterns
  const urlMatch = v.match(/(https?:\/\/[^\s"'<>]*)/i)
  if (urlMatch) return urlMatch[1]
  
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

    // Sanitize all trek fields to prevent script tag rendering
    const sanitizedTreks = treks.map((trek: any) => ({
      ...trek,
      name: stripHtmlTags(trek.name || ''),
      description: stripHtmlTags(trek.description || ''),
      experience: stripHtmlTags(trek.experience || ''),
      altitude: stripHtmlTags(trek.altitude || ''),
      elevation: stripHtmlTags(trek.elevation || ''),
      location: stripHtmlTags(trek.location || ''),
      difficulty: stripHtmlTags(trek.difficulty || ''),
      duration: stripHtmlTags(trek.duration || ''),
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
