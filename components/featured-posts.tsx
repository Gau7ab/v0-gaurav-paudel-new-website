'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, Mountain, MapPin } from 'lucide-react'

export function FeaturedPosts() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [travelPosts, setTravelPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const [blogRes, travelRes] = await Promise.all([
          fetch('/api/posts?type=blog&published=true&pinned=true&limit=2'),
          fetch('/api/posts?type=travel&published=true&pinned=true&limit=2'),
        ])
        const blogData = await blogRes.json()
        const travelData = await travelRes.json()
        setBlogPosts(blogData)
        setTravelPosts(travelData)
      } catch (error) {
        console.error('Error fetching featured posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedPosts()
  }, [])

  if (loading || (blogPosts.length === 0 && travelPosts.length === 0)) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Stories</h2>
            <p className="text-lg text-muted-foreground">Thoughts on tech, travel, and life</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Blog Posts */}
            {blogPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Blog
                </h3>
                <div className="space-y-4">
                  {blogPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="hover:shadow-lg transition-shadow group">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {post.cover_image && (
                              <div className="relative h-24 w-24 flex-shrink-0 rounded overflow-hidden">
                                <Image
                                  src={post.cover_image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.published_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="inline-block mt-4">
                  <Button variant="outline" className="gap-2">
                    View all posts <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Travel Posts */}
            {travelPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Travel
                </h3>
                <div className="space-y-4">
                  {travelPosts.map(post => (
                    <Link key={post.id} href={`/travel/${post.slug}`}>
                      <Card className="hover:shadow-lg transition-shadow group">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {post.cover_image && (
                              <div className="relative h-24 w-24 flex-shrink-0 rounded overflow-hidden">
                                <Image
                                  src={post.cover_image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                {post.location && (
                                  <>
                                    <MapPin className="h-3 w-3" />
                                    {post.location}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <Link href="/travel" className="inline-block mt-4">
                  <Button variant="outline" className="gap-2">
                    View all stories <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
