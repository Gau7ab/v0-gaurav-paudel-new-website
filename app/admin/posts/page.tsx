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

const tabs = [
  { id: "all", label: "All Posts", filter: null },
  { id: "blog", label: "✍️ Blog", filter: "blog" },
  { id: "travel", label: "🏔 Travel", filter: "travel" },
]

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [stats, setStats] = useState({ total: 0, published: 0, blogs: 0, travels: 0 })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?admin=true", {
        headers: { "x-admin-auth": "true" },
      })
      const data = await res.json()
      setPosts(data)
      setStats({
        total: data.length,
        published: data.filter((p: Post) => p.is_published).length,
        blogs: data.filter((p: Post) => p.type === "blog").length,
        travels: data.filter((p: Post) => p.type === "travel").length,
      })
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
      setLoading(false)
    }
  }

  const filteredPosts = activeTab === "all" ? posts : posts.filter((p) => p.type === tabs.find((t) => t.id === activeTab)?.filter)

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "x-admin-auth": "true" },
      })
      setPosts(posts.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "x-admin-auth": "true", "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !current }),
      })
      const updated = await res.json()
      setPosts(posts.map((p) => (p.id === id ? { ...p, is_published: updated.is_published } : p)))
    } catch (error) {
      console.error("Toggle failed:", error)
    }
  }

  const handleTogglePin = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "x-admin-auth": "true", "Content-Type": "application/json" },
        body: JSON.stringify({ is_pinned: !current }),
      })
      const updated = await res.json()
      setPosts(posts.map((p) => (p.id === id ? { ...p, is_pinned: updated.is_pinned } : p)))
    } catch (error) {
      console.error("Pin toggle failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <span className="px-3 py-1 bg-primary text-black text-sm font-semibold rounded-full">omgaurav.com.np</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/posts/new?type=blog">
              <Button variant="outline" className="text-foreground border-white/10 hover:bg-white/5">
                + New Blog Post
              </Button>
            </Link>
            <Link href="/admin/posts/new?type=travel">
              <Button className="bg-primary hover:bg-primary/90 text-black font-semibold">+ New Travel Story</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-1">{stats.total}</div>
            <div className="text-sm text-foreground/60">Total Posts</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-1">{stats.published}</div>
            <div className="text-sm text-foreground/60">Published</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-1">{stats.blogs}</div>
            <div className="text-sm text-foreground/60">Blog Posts</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-1">{stats.travels}</div>
            <div className="text-sm text-foreground/60">Travel Stories</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-black"
                  : "bg-white/5 text-foreground border border-white/10 hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Pin</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                      No posts found
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{post.title}</div>
                        <div className="text-xs text-foreground/50">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            post.type === "blog"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {post.type === "blog" ? "Blog" : "Travel"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post.id, post.is_published)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            post.is_published
                              ? "bg-primary/20 text-primary hover:bg-primary/30"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          }`}
                        >
                          {post.is_published ? "✓ Published" : "○ Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePin(post.id, post.is_pinned)}
                          className={`text-lg transition-opacity ${post.is_pinned ? "opacity-100" : "opacity-20 hover:opacity-50"}`}
                        >
                          📌
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          {post.is_published && (
                            <a
                              href={`/${post.type === "blog" ? "blog" : "travels"}/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors"
                            >
                              View
                            </a>
                          )}
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
