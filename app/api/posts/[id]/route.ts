import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params
    const searchParams = request.nextUrl.searchParams
    const admin = searchParams.get("admin")

    const post = await sql`SELECT * FROM posts WHERE id = ${id}`

    if (post.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Public can only see published posts
    if (!admin && !post[0].is_published) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post[0])
  } catch (error) {
    console.error("Post GET error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = request.headers.get("x-admin-auth") === "true"
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await props.params
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

    // Get existing post to check publish status change
    const existing = await sql`SELECT is_published FROM posts WHERE id = ${id}`
    if (existing.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const wasPublished = existing[0].is_published
    const isNowPublished = is_published === true
    const published_at = !wasPublished && isNowPublished ? new Date() : undefined

    // Convert tags array to PostgreSQL array format or null
    const tagsValue = tags && tags.length > 0 ? tags : null

    const result = await sql`
      UPDATE posts SET
        type = ${type},
        title = ${title},
        slug = ${slug},
        excerpt = ${excerpt || null},
        content = ${content},
        cover_image = ${cover_image || null},
        author = ${author},
        tags = ${tagsValue},
        category = ${category || null},
        location = ${location || null},
        altitude = ${altitude || null},
        duration = ${duration || null},
        difficulty = ${difficulty || null},
        meta_title = ${meta_title || null},
        meta_description = ${meta_description || null},
        meta_keywords = ${meta_keywords || null},
        og_image = ${og_image || null},
        is_pinned = ${is_pinned || false},
        is_published = ${is_published || false},
        ${published_at ? sql`published_at = ${published_at},` : sql``}
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Post PUT error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = request.headers.get("x-admin-auth") === "true"
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await props.params
    const body = await request.json()
    const { is_published, is_pinned } = body

    const updates: string[] = []
    if (is_published !== undefined) {
      updates.push(`is_published = ${is_published}`)
      if (is_published && !is_pinned) {
        updates.push(`published_at = NOW()`)
      }
    }
    if (is_pinned !== undefined) {
      updates.push(`is_pinned = ${is_pinned}`)
    }
    updates.push(`updated_at = NOW()`)

    const result = await sql`
      UPDATE posts SET ${sql(updates.join(", "))}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Post PATCH error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = request.headers.get("x-admin-auth") === "true"
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await props.params

    await sql`DELETE FROM posts WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Post DELETE error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
