import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const [about, skills, experience, education, projects, achievements, treks] = await Promise.all([
      sql("SELECT * FROM portfolio_about ORDER BY id LIMIT 1"),
      sql("SELECT * FROM portfolio_skills ORDER BY sort_order, id"),
      sql("SELECT * FROM portfolio_experience ORDER BY sort_order, id"),
      sql("SELECT * FROM portfolio_education ORDER BY sort_order, id"),
      sql("SELECT * FROM portfolio_projects ORDER BY sort_order, id"),
      sql("SELECT * FROM portfolio_achievements ORDER BY sort_order, id"),
      sql("SELECT * FROM portfolio_treks ORDER BY sort_order, id"),
    ])

    return NextResponse.json({
      about: about[0] || null,
      skills,
      experience,
      education,
      projects,
      achievements,
      treks,
    })
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
