import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// GET all content for a table
export async function GET(request: NextRequest) {
  const table = request.nextUrl.searchParams.get("table")

  const allowed = ["about", "skills", "experience", "education", "projects", "achievements", "treks"]
  if (!table || !allowed.includes(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  try {
    let data
    switch (table) {
      case "about": data = await sql`SELECT * FROM portfolio_about ORDER BY id`; break
      case "skills": data = await sql`SELECT * FROM portfolio_skills ORDER BY sort_order, id`; break
      case "experience": data = await sql`SELECT * FROM portfolio_experience ORDER BY sort_order, id`; break
      case "education": data = await sql`SELECT * FROM portfolio_education ORDER BY sort_order, id`; break
      case "projects": data = await sql`SELECT * FROM portfolio_projects ORDER BY sort_order, id`; break
      case "achievements": data = await sql`SELECT * FROM portfolio_achievements ORDER BY sort_order, id`; break
      case "treks": data = await sql`SELECT * FROM portfolio_treks ORDER BY sort_order, id`; break
    }
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

// POST create new item
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { table, ...f } = body

  try {
    let result
    switch (table) {
      case "about":
        result = await sql`INSERT INTO portfolio_about (title, subtitle, description, image_url) VALUES (${f.title}, ${f.subtitle}, ${f.description}, ${f.image_url || null}) RETURNING *`
        break
      case "skills":
        result = await sql`INSERT INTO portfolio_skills (name, category, proficiency, sort_order) VALUES (${f.name}, ${f.category}, ${f.proficiency || 80}, ${f.sort_order || 0}) RETURNING *`
        break
      case "experience":
        result = await sql`INSERT INTO portfolio_experience (title, company, location, start_date, end_date, description, is_current, sort_order) VALUES (${f.title}, ${f.company}, ${f.location || null}, ${f.start_date}, ${f.end_date || null}, ${f.description}, ${f.is_current || false}, ${f.sort_order || 0}) RETURNING *`
        break
      case "education":
        result = await sql`INSERT INTO portfolio_education (degree, institution, location, start_date, end_date, description, sort_order) VALUES (${f.degree}, ${f.institution}, ${f.location || null}, ${f.start_date}, ${f.end_date || null}, ${f.description || null}, ${f.sort_order || 0}) RETURNING *`
        break
      case "projects":
        result = await sql`INSERT INTO portfolio_projects (title, description, category, tech_stack, image_url, live_url, github_url, status, sort_order) VALUES (${f.title}, ${f.description}, ${f.category || null}, ${f.tech_stack || null}, ${f.image_url || null}, ${f.live_url || null}, ${f.github_url || null}, ${f.status || "completed"}, ${f.sort_order || 0}) RETURNING *`
        break
      case "achievements":
        result = await sql`INSERT INTO portfolio_achievements (title, description, date_achieved, icon, sort_order) VALUES (${f.title}, ${f.description || null}, ${f.date_achieved || null}, ${f.icon || null}, ${f.sort_order || 0}) RETURNING *`
        break
      case "treks":
        result = await sql`INSERT INTO portfolio_treks (name, location, altitude, duration, difficulty, description, image_url, date_completed, sort_order) VALUES (${f.name}, ${f.location || null}, ${f.altitude || null}, ${f.duration || null}, ${f.difficulty || null}, ${f.description || null}, ${f.image_url || null}, ${f.date_completed || null}, ${f.sort_order || 0}) RETURNING *`
        break
      default:
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }
    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

// PUT update item
export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { table, id, ...f } = body

  try {
    let result
    switch (table) {
      case "about":
        result = await sql`UPDATE portfolio_about SET title=${f.title}, subtitle=${f.subtitle}, description=${f.description}, image_url=${f.image_url || null}, updated_at=NOW() WHERE id=${id} RETURNING *`
        break
      case "skills":
        result = await sql`UPDATE portfolio_skills SET name=${f.name}, category=${f.category}, proficiency=${f.proficiency || 80}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      case "experience":
        result = await sql`UPDATE portfolio_experience SET title=${f.title}, company=${f.company}, location=${f.location || null}, start_date=${f.start_date}, end_date=${f.end_date || null}, description=${f.description}, is_current=${f.is_current || false}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      case "education":
        result = await sql`UPDATE portfolio_education SET degree=${f.degree}, institution=${f.institution}, location=${f.location || null}, start_date=${f.start_date}, end_date=${f.end_date || null}, description=${f.description || null}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      case "projects":
        result = await sql`UPDATE portfolio_projects SET title=${f.title}, description=${f.description}, category=${f.category || null}, tech_stack=${f.tech_stack || null}, image_url=${f.image_url || null}, live_url=${f.live_url || null}, github_url=${f.github_url || null}, status=${f.status || "completed"}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      case "achievements":
        result = await sql`UPDATE portfolio_achievements SET title=${f.title}, description=${f.description || null}, date_achieved=${f.date_achieved || null}, icon=${f.icon || null}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      case "treks":
        result = await sql`UPDATE portfolio_treks SET name=${f.name}, location=${f.location || null}, altitude=${f.altitude || null}, duration=${f.duration || null}, difficulty=${f.difficulty || null}, description=${f.description || null}, image_url=${f.image_url || null}, date_completed=${f.date_completed || null}, sort_order=${f.sort_order || 0} WHERE id=${id} RETURNING *`
        break
      default:
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }
    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

// DELETE item
export async function DELETE(request: NextRequest) {
  const table = request.nextUrl.searchParams.get("table")
  const id = request.nextUrl.searchParams.get("id")

  if (!table || !id) {
    return NextResponse.json({ error: "Table and ID required" }, { status: 400 })
  }

  const allowed = ["skills", "experience", "education", "projects", "achievements", "treks"]
  if (!allowed.includes(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  try {
    const numId = Number(id)
    switch (table) {
      case "skills": await sql`DELETE FROM portfolio_skills WHERE id = ${numId}`; break
      case "experience": await sql`DELETE FROM portfolio_experience WHERE id = ${numId}`; break
      case "education": await sql`DELETE FROM portfolio_education WHERE id = ${numId}`; break
      case "projects": await sql`DELETE FROM portfolio_projects WHERE id = ${numId}`; break
      case "achievements": await sql`DELETE FROM portfolio_achievements WHERE id = ${numId}`; break
      case "treks": await sql`DELETE FROM portfolio_treks WHERE id = ${numId}`; break
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
