'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?type=blog&published=true')
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])))

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Thoughts, stories, and insights on technology, development, and life.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-secondary/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-secondary/5 border-secondary/20"
              />
            </div>
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedTag ? 'default' : 'outline'}
                  onClick={() => setSelectedTag('')}
                  size="sm"
                >
                  All
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    onClick={() => setSelectedTag(tag)}
                    size="sm"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                    <div className="flex flex-col md:flex-row">
                      {post.cover_image && (
                        <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.published_at).toLocaleDateString()}
                          {post.author && (
                            <>
                              <span>•</span>
                              <User className="h-4 w-4" />
                              {post.author}
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                          Read More <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardHeader>
                    </div>
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
