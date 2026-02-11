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
    const tableName = `portfolio_${table}`
    const orderCol = table === "about" ? "id" : "sort_order"
    const data = await sql(`SELECT * FROM ${tableName} ORDER BY ${orderCol}, id`)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

// POST create new item
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { table, ...fields } = body

  try {
    let result
    switch (table) {
      case "about":
        result = await sql(
          "INSERT INTO portfolio_about (title, subtitle, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
          [fields.title, fields.subtitle, fields.description, fields.image_url || null]
        )
        break
      case "skills":
        result = await sql(
          "INSERT INTO portfolio_skills (name, category, proficiency, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
          [fields.name, fields.category, fields.proficiency || 80, fields.sort_order || 0]
        )
        break
      case "experience":
        result = await sql(
          "INSERT INTO portfolio_experience (title, company, location, start_date, end_date, description, is_current, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [fields.title, fields.company, fields.location || null, fields.start_date, fields.end_date || null, fields.description, fields.is_current || false, fields.sort_order || 0]
        )
        break
      case "education":
        result = await sql(
          "INSERT INTO portfolio_education (degree, institution, location, start_date, end_date, description, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [fields.degree, fields.institution, fields.location || null, fields.start_date, fields.end_date || null, fields.description || null, fields.sort_order || 0]
        )
        break
      case "projects":
        result = await sql(
          "INSERT INTO portfolio_projects (title, description, category, tech_stack, image_url, live_url, github_url, status, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [fields.title, fields.description, fields.category || null, fields.tech_stack || null, fields.image_url || null, fields.live_url || null, fields.github_url || null, fields.status || "completed", fields.sort_order || 0]
        )
        break
      case "achievements":
        result = await sql(
          "INSERT INTO portfolio_achievements (title, description, date_achieved, icon, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [fields.title, fields.description || null, fields.date_achieved || null, fields.icon || null, fields.sort_order || 0]
        )
        break
      case "treks":
        result = await sql(
          "INSERT INTO portfolio_treks (name, location, altitude, duration, difficulty, description, image_url, date_completed, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [fields.name, fields.location || null, fields.altitude || null, fields.duration || null, fields.difficulty || null, fields.description || null, fields.image_url || null, fields.date_completed || null, fields.sort_order || 0]
        )
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
  const { table, id, ...fields } = body

  try {
    let result
    switch (table) {
      case "about":
        result = await sql(
          "UPDATE portfolio_about SET title=$1, subtitle=$2, description=$3, image_url=$4, updated_at=NOW() WHERE id=$5 RETURNING *",
          [fields.title, fields.subtitle, fields.description, fields.image_url || null, id]
        )
        break
      case "skills":
        result = await sql(
          "UPDATE portfolio_skills SET name=$1, category=$2, proficiency=$3, sort_order=$4 WHERE id=$5 RETURNING *",
          [fields.name, fields.category, fields.proficiency || 80, fields.sort_order || 0, id]
        )
        break
      case "experience":
        result = await sql(
          "UPDATE portfolio_experience SET title=$1, company=$2, location=$3, start_date=$4, end_date=$5, description=$6, is_current=$7, sort_order=$8 WHERE id=$9 RETURNING *",
          [fields.title, fields.company, fields.location || null, fields.start_date, fields.end_date || null, fields.description, fields.is_current || false, fields.sort_order || 0, id]
        )
        break
      case "education":
        result = await sql(
          "UPDATE portfolio_education SET degree=$1, institution=$2, location=$3, start_date=$4, end_date=$5, description=$6, sort_order=$7 WHERE id=$8 RETURNING *",
          [fields.degree, fields.institution, fields.location || null, fields.start_date, fields.end_date || null, fields.description || null, fields.sort_order || 0, id]
        )
        break
      case "projects":
        result = await sql(
          "UPDATE portfolio_projects SET title=$1, description=$2, category=$3, tech_stack=$4, image_url=$5, live_url=$6, github_url=$7, status=$8, sort_order=$9 WHERE id=$10 RETURNING *",
          [fields.title, fields.description, fields.category || null, fields.tech_stack || null, fields.image_url || null, fields.live_url || null, fields.github_url || null, fields.status || "completed", fields.sort_order || 0, id]
        )
        break
      case "achievements":
        result = await sql(
          "UPDATE portfolio_achievements SET title=$1, description=$2, date_achieved=$3, icon=$4, sort_order=$5 WHERE id=$6 RETURNING *",
          [fields.title, fields.description || null, fields.date_achieved || null, fields.icon || null, fields.sort_order || 0, id]
        )
        break
      case "treks":
        result = await sql(
          "UPDATE portfolio_treks SET name=$1, location=$2, altitude=$3, duration=$4, difficulty=$5, description=$6, image_url=$7, date_completed=$8, sort_order=$9 WHERE id=$10 RETURNING *",
          [fields.name, fields.location || null, fields.altitude || null, fields.duration || null, fields.difficulty || null, fields.description || null, fields.image_url || null, fields.date_completed || null, fields.sort_order || 0, id]
        )
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
    await sql(`DELETE FROM portfolio_${table} WHERE id = $1`, [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
