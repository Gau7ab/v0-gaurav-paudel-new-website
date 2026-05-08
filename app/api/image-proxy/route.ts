import { type NextRequest, NextResponse } from 'next/server'

// Simple proxy to fetch and serve images from external sources
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  try {
    // Validate it's a valid image URL
    const url = new URL(imageUrl)
    
    // Allow common image hosts
    const allowedHosts = ['imgbb.com', 'i.imgbb.com', 'ibb.co', 'i.ibb.co', 'imgur.com', 'i.imgur.com']
    const isAllowed = allowedHosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host))

    if (!isAllowed) {
      return NextResponse.json({ error: 'Image host not allowed' }, { status: 403 })
    }

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
  }
}
