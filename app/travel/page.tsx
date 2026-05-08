'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mountain, MapPin, Calendar, ArrowRight, Clock } from 'lucide-react'

export default function TravelPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?type=travel&published=true')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mountain className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Travel Stories</h1>
            <p className="text-lg text-muted-foreground">
              Adventures through the mountains and valleys. Tales of treks, discoveries, and unforgettable journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading travel stories...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No travel stories yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link key={post.id} href={`/travel/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all group overflow-hidden">
                    {/* Image */}
                    {post.cover_image && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground line-clamp-2">{post.title}</h3>
                      </div>
                      {post.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Trek Details */}
                      <div className="space-y-2 text-sm">
                        {post.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            {post.location}
                          </div>
                        )}
                        {post.altitude && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mountain className="h-4 w-4 text-primary" />
                            {post.altitude}m altitude
                          </div>
                        )}
                        {post.duration && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            {post.duration}
                          </div>
                        )}
                        {post.published_at && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            {new Date(post.published_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:translate-x-1 transition-transform pt-2">
                        Read Story <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
