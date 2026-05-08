'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Eye, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts?slug=${params.slug}`)
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

  const readingTime = Math.ceil((post.content?.split(' ').length || 0) / 200)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-secondary/10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {post.cover_image && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <img
            src={post.cover_image.includes('imgbb.com') ? `/api/image-proxy?url=${encodeURIComponent(post.cover_image)}` : post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            onError={(e) => {
              console.log("[v0] Image failed to load:", post.cover_image)
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString()}
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views || 0} views
              </div>
              <div>{readingTime} min read</div>
            </div>
            {post.description && (
              <p className="text-lg text-muted-foreground">{post.description}</p>
            )}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Article Content */}
          {post.content && (
            <div className="prose prose-invert max-w-none mb-12">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-foreground/90 leading-relaxed space-y-4"
              />
            </div>
          )}

          {/* Share */}
          <div className="py-8 border-t border-secondary/10 flex items-center gap-4">
            <span className="text-sm font-medium">Share:</span>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Related Posts CTA */}
          <div className="mt-12 p-8 bg-secondary/5 rounded-lg text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">More Posts</h3>
            <Link href="/blog">
              <Button>
                Back to Blog
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
