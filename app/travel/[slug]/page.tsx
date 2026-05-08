'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, MapPin, Mountain, Clock, AlertCircle, Zap } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sanitizeHtml } from '@/lib/utils'

export default function TravelPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts?slug=${params.slug}&type=travel`)
        const data = await res.json()
        if (!data || data.length === 0) {
          notFound()
        }
        setPost(data[0])
      } catch (error) {
        console.error('Error fetching post:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!post) return null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-secondary/10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/travel">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Travel
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {post.cover_image && post.cover_image.startsWith('http') && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <img
            src={`/api/image-proxy?url=${encodeURIComponent(post.cover_image)}`}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/placeholder.jpg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-secondary/5 rounded-lg">
              {post.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{post.location}</p>
                  </div>
                </div>
              )}
              {post.altitude && (
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Altitude</p>
                    <p className="font-medium text-foreground">{post.altitude}m</p>
                  </div>
                </div>
              )}
              {post.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{post.duration}</p>
                  </div>
                </div>
              )}
              {post.difficulty && (
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-medium text-foreground capitalize">{post.difficulty}</p>
                  </div>
                </div>
              )}
            </div>

            {post.description && (
              <p className="text-lg text-muted-foreground mb-4">{post.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString()}
              </div>
              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          {post.content && (
            <div className="prose prose-invert max-w-none mb-12">
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                className="text-foreground/90 leading-relaxed space-y-4"
              />
            </div>
          )}

          {/* Related Posts CTA */}
          <div className="mt-12 p-8 bg-secondary/5 rounded-lg text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">More Adventures</h3>
            <Link href="/travel">
              <Button>
                Back to Travel Stories
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
