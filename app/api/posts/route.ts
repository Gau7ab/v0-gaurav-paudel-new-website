import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const admin = searchParams.get("admin")
    const type = searchParams.get("type")
    const pinned = searchParams.get("pinned")

    // Admin can see all posts
    if (admin === "true") {
      const posts = await sql`
        SELECT * FROM posts ORDER BY updated_at DESC
      `
      return NextResponse.json(posts)
    }

    // Public: get max 3 pinned posts or by type
    if (pinned === "true" && type) {
      const posts = await sql`
        SELECT * FROM posts 
        WHERE type = ${type} AND is_published = true AND is_pinned = true
        ORDER BY published_at DESC
        LIMIT 3
      `
      return NextResponse.json(posts)
    }

    // Public: get all published posts by type
    if (type) {
      const posts = await sql`
        SELECT * FROM posts 
        WHERE type = ${type} AND is_published = true
        ORDER BY published_at DESC
      `
      return NextResponse.json(posts)
    }

    // Default: all published posts
    const posts = await sql`
      SELECT * FROM posts 
      WHERE is_published = true
      ORDER BY published_at DESC
    `
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Posts GET error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin auth from localStorage (passed in header)
    const isAdmin = request.headers.get("x-admin-auth") === "true"
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      type,
      title,
      slug,
      excerpt,
      content,
      cover_image,
      author,
      tags,
      category,
      location,
      altitude,
      duration,
      difficulty,
      meta_title,
      meta_description,
      meta_keywords,
      og_image,
      is_pinned,
      is_published,
    } = body

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content required" }, { status: 400 })
    }

    const published_at = is_published ? new Date() : null
    
    // Convert tags array to PostgreSQL array format or null
    const tagsValue = tags && tags.length > 0 ? tags : null

    const result = await sql`
      INSERT INTO posts (
        type, title, slug, excerpt, content, cover_image, author, tags,
        category, location, altitude, duration, difficulty,
        meta_title, meta_description, meta_keywords, og_image,
        is_pinned, is_published, published_at
      ) VALUES (
        ${type}, ${title}, ${slug}, ${excerpt || null}, ${content}, ${cover_image || null},
        ${author}, ${tagsValue},
        ${category || null}, ${location || null}, ${altitude || null}, ${duration || null}, ${difficulty || null},
        ${meta_title || null}, ${meta_description || null}, ${meta_keywords || null}, ${og_image || null},
        ${is_pinned || false}, ${is_published || false}, ${published_at}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Posts POST error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
