import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

function isAuthed(request: NextRequest) {
  return request.cookies.get("admin_session")?.value === "authenticated"
}

// GET all content for a table
export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const table = request.nextUrl.searchParams.get("table")
  
  try {
    let data
    switch (table) {
      case "about":
        data = await sql`SELECT * FROM portfolio_about ORDER BY id LIMIT 1`
        break
      case "skills":
        data = await sql`SELECT * FROM portfolio_skills ORDER BY sort_order, id`
        break
      case "experience":
        data = await sql`SELECT * FROM portfolio_experience ORDER BY sort_order, id`
        break
      case "education":
        data = await sql`SELECT * FROM portfolio_education ORDER BY sort_order, id`
        break
      case "projects":
        data = await sql`SELECT * FROM portfolio_projects ORDER BY sort_order, id`
        break
      case "achievements":
        data = await sql`SELECT * FROM portfolio_achievements ORDER BY sort_order, id`
        break
      case "treks":
        data = await sql`SELECT * FROM portfolio_treks ORDER BY sort_order, id`
        break
      default:
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

// POST create new item
export async function POST(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { table, ...fields } = await request.json()

  try {
    let result
    switch (table) {
      case "about":
        result = await sql`
          INSERT INTO portfolio_about (title, subtitle, description, image_url)
          VALUES (${fields.title}, ${fields.subtitle}, ${fields.description}, ${fields.image_url || null})
          RETURNING *
        `
        break
      case "skills":
        result = await sql`
          INSERT INTO portfolio_skills (name, category, proficiency, sort_order)
          VALUES (${fields.name}, ${fields.category}, ${fields.proficiency || 80}, ${fields.sort_order || 0})
          RETURNING *
        `
        break
      case "experience":
        result = await sql`
          INSERT INTO portfolio_experience (title, company, location, start_date, end_date, description, is_current, sort_order)
          VALUES (${fields.title}, ${fields.company}, ${fields.location || null}, ${fields.start_date}, ${fields.end_date || null}, ${fields.description}, ${fields.is_current || false}, ${fields.sort_order || 0})
          RETURNING *
        `
        break
      case "education":
        result = await sql`
          INSERT INTO portfolio_education (degree, institution, location, start_date, end_date, description, sort_order)
          VALUES (${fields.degree}, ${fields.institution}, ${fields.location || null}, ${fields.start_date}, ${fields.end_date || null}, ${fields.description || null}, ${fields.sort_order || 0})
          RETURNING *
        `
        break
      case "projects":
        result = await sql`
          INSERT INTO portfolio_projects (title, description, category, tech_stack, image_url, live_url, github_url, status, sort_order)
          VALUES (${fields.title}, ${fields.description}, ${fields.category || null}, ${fields.tech_stack || null}, ${fields.image_url || null}, ${fields.live_url || null}, ${fields.github_url || null}, ${fields.status || 'completed'}, ${fields.sort_order || 0})
          RETURNING *
        `
        break
      case "achievements":
        result = await sql`
          INSERT INTO portfolio_achievements (title, description, date_achieved, icon, sort_order)
          VALUES (${fields.title}, ${fields.description || null}, ${fields.date_achieved || null}, ${fields.icon || null}, ${fields.sort_order || 0})
          RETURNING *
        `
        break
      case "treks":
        result = await sql`
          INSERT INTO portfolio_treks (name, location, altitude, duration, difficulty, description, image_url, date_completed, sort_order)
          VALUES (${fields.name}, ${fields.location || null}, ${fields.altitude || null}, ${fields.duration || null}, ${fields.difficulty || null}, ${fields.description || null}, ${fields.image_url || null}, ${fields.date_completed || null}, ${fields.sort_order || 0})
          RETURNING *
        `
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
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { table, id, ...fields } = await request.json()

  try {
    let result
    switch (table) {
      case "about":
        result = await sql`
          UPDATE portfolio_about SET title=${fields.title}, subtitle=${fields.subtitle}, description=${fields.description}, image_url=${fields.image_url || null}, updated_at=NOW()
          WHERE id=${id} RETURNING *
        `
        break
      case "skills":
        result = await sql`
          UPDATE portfolio_skills SET name=${fields.name}, category=${fields.category}, proficiency=${fields.proficiency || 80}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
        break
      case "experience":
        result = await sql`
          UPDATE portfolio_experience SET title=${fields.title}, company=${fields.company}, location=${fields.location || null}, start_date=${fields.start_date}, end_date=${fields.end_date || null}, description=${fields.description}, is_current=${fields.is_current || false}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
        break
      case "education":
        result = await sql`
          UPDATE portfolio_education SET degree=${fields.degree}, institution=${fields.institution}, location=${fields.location || null}, start_date=${fields.start_date}, end_date=${fields.end_date || null}, description=${fields.description || null}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
        break
      case "projects":
        result = await sql`
          UPDATE portfolio_projects SET title=${fields.title}, description=${fields.description}, category=${fields.category || null}, tech_stack=${fields.tech_stack || null}, image_url=${fields.image_url || null}, live_url=${fields.live_url || null}, github_url=${fields.github_url || null}, status=${fields.status || 'completed'}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
        break
      case "achievements":
        result = await sql`
          UPDATE portfolio_achievements SET title=${fields.title}, description=${fields.description || null}, date_achieved=${fields.date_achieved || null}, icon=${fields.icon || null}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
        break
      case "treks":
        result = await sql`
          UPDATE portfolio_treks SET name=${fields.name}, location=${fields.location || null}, altitude=${fields.altitude || null}, duration=${fields.duration || null}, difficulty=${fields.difficulty || null}, description=${fields.description || null}, image_url=${fields.image_url || null}, date_completed=${fields.date_completed || null}, sort_order=${fields.sort_order || 0}
          WHERE id=${id} RETURNING *
        `
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
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const table = request.nextUrl.searchParams.get("table")
  const id = request.nextUrl.searchParams.get("id")

  if (!table || !id) {
    return NextResponse.json({ error: "Table and ID required" }, { status: 400 })
  }

  try {
    switch (table) {
      case "skills":
        await sql`DELETE FROM portfolio_skills WHERE id=${id}`; break
      case "experience":
        await sql`DELETE FROM portfolio_experience WHERE id=${id}`; break
      case "education":
        await sql`DELETE FROM portfolio_education WHERE id=${id}`; break
      case "projects":
        await sql`DELETE FROM portfolio_projects WHERE id=${id}`; break
      case "achievements":
        await sql`DELETE FROM portfolio_achievements WHERE id=${id}`; break
      case "treks":
        await sql`DELETE FROM portfolio_treks WHERE id=${id}`; break
      default:
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
