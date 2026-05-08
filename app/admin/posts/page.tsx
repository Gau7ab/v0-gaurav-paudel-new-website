"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  type: "blog" | "travel"
  title: string
  slug: string
  is_published: boolean
  is_pinned: boolean
  created_at: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?admin=true", {
        headers: { "x-admin-auth": "true" },
      })
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
      setPosts([])
      setLoading(false)
    }
  }

  const filteredPosts = activeTab === "all" ? posts : posts.filter(p => p.type === activeTab)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog & Travel Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your blog and travel content</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>+ New Post</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        {["all", "blog", "travel"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "all" ? "All Posts" : tab === "blog" ? "✍️ Blog" : "🏔 Travel"}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="rounded-md border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Create one to get started!</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-md border border-border bg-card p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{post.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.type === "blog" 
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}>
                    {post.type}
                  </span>
                  {post.is_published && (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Published
                    </span>
                  )}
                  {post.is_pinned && (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      📌 Pinned
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/posts/${post.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
