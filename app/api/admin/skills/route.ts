import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-server-actions'

// GET all skills
export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, return mock data. In production, fetch from Neon DB
    const skills = [
      { id: '1', name: 'Next.js', category: 'Frontend', proficiency_level: 'Expert' },
      { id: '2', name: 'React', category: 'Frontend', proficiency_level: 'Expert' },
      { id: '3', name: 'TypeScript', category: 'Language', proficiency_level: 'Advanced' },
      { id: '4', name: 'PostgreSQL', category: 'Database', proficiency_level: 'Advanced' },
    ]

    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

// POST create skill
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    // TODO: Save to Neon DB
    
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

// PUT update skill
export async function PUT(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    // TODO: Update in Neon DB
    
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

// DELETE skill
export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    // TODO: Delete from Neon DB
    
    return NextResponse.json({ success: true, deletedId: id })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
