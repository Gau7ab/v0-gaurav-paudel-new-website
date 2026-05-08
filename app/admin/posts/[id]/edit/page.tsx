"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamic import TipTap editor to avoid hydration issues
const TipTapEditor = dynamic(() => import("@/components/tiptap-editor"), { ssr: false })

interface PostFormData {
  type: "blog" | "travel"
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  tags: string[]
  category: string
  location: string
  altitude: string
  duration: string
  difficulty: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  og_image: string
  is_pinned: boolean
  is_published: boolean
}

const initialFormData: PostFormData = {
  type: "blog",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "Om Prakash Paudel Gaurav",
  tags: [],
  category: "",
  location: "",
  altitude: "",
  duration: "",
  difficulty: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  og_image: "",
  is_pinned: false,
  is_published: false,
}

export default function PostEditorPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const postId = pathname.includes("/edit") ? pathname.split("/").pop() : null
  const isEdit = !!postId

  const [form, setForm] = useState<PostFormData>({ ...initialFormData, type: (searchParams.get("type") as "blog" | "travel") || "blog" })
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [openSections, setOpenSections] = useState({
    details: true,
    cover: true,
    content: true,
    seo: false,
    publish: false,
  })

  // Load existing post if editing
  useEffect(() => {
    if (isEdit) {
      fetchPost()
    }
  }, [isEdit, postId])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}?admin=true`, {
        headers: { "x-admin-auth": "true" },
      })
      const post = await res.json()
      setForm(post)
      setLoading(false)
    } catch (err) {
      console.error("Failed to load post:", err)
      setError("Failed to load post")
      setLoading(false)
    }
  }

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug === generateSlug(form.title) || !prev.slug ? generateSlug(value) : prev.slug,
      meta_title: !prev.meta_title ? value : prev.meta_title,
    }))
  }

  const handleSave = async (publish: boolean) => {
    setError("")
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError("Title, slug, and content are required")
      return
    }

    setSaving(true)
    try {
      const payload = {
        ...form,
        is_published: publish || form.is_published,
        tags: form.tags,
      }

      const res = await fetch(isEdit ? `/api/posts/${postId}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "x-admin-auth": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Failed to save post")
      }

      router.push("/admin/posts")
    } catch (err) {
      console.error("Save failed:", err)
      setError("Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-foreground/60">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin/posts" className="text-foreground/60 hover:text-foreground transition-colors">
              ← Dashboard
            </a>
            <h1 className="text-2xl font-bold">{isEdit ? "Edit Post" : "New Post"}</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-black font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? "Publishing..." : "🚀 Publish"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">{error}</div>}

        {/* SECTION 1: Post Details */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSections((p) => ({ ...p, details: !p.details }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold">📝 Post Details</span>
            <span className="text-foreground/50">{openSections.details ? "−" : "+"}</span>
          </button>

          {openSections.details && (
            <div className="border-t border-white/10 px-6 py-6 space-y-6">
              {/* Type Toggle */}
              <div>
                <label className="block text-sm font-medium mb-2">Post Type</label>
                <div className="flex gap-4">
                  {(["blog", "travel"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setForm((prev) => ({ ...prev, type }))}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        form.type === type
                          ? type === "blog"
                            ? "bg-purple-500/30 text-purple-300"
                            : "bg-blue-500/30 text-blue-300"
                          : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
                      }`}
                    >
                      {type === "blog" ? "✍️ Blog Post" : "🏔️ Travel Story"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                  placeholder="Enter post title"
                />
              </div>

              {/* Slug & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">URL Slug</label>
                  <div className="flex items-center">
                    <span className="text-foreground/60">/{form.type === "blog" ? "blog" : "travels"}/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                      placeholder="slug-here"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Excerpt</label>
                  <span className="text-xs text-foreground/50">
                    {form.excerpt.length}/200
                  </span>
                </div>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      excerpt: e.target.value.slice(0, 200),
                    }))
                  }
                  maxLength={200}
                  rows={3}
                  className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none ${
                    form.excerpt.length < 20 ? "border-red-500/50" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="Brief summary of your post"
                />
              </div>

              {/* Tags & Category/Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={form.tags.join(", ")}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      }))
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                    placeholder="react, next.js, web"
                  />
                </div>
                {form.type === "blog" ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                      placeholder="Technology, Travel, Life"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <select
                      value={form.difficulty}
                      onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Travel-specific fields */}
              {form.type === "travel" && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                      placeholder="Trek name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Altitude</label>
                    <input
                      type="text"
                      value={form.altitude}
                      onChange={(e) => setForm((prev) => ({ ...prev, altitude: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                      placeholder="4500m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                      placeholder="5 days"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 2: Cover Image */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSections((p) => ({ ...p, cover: !p.cover }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold">🖼️ Cover Image</span>
            <span className="text-foreground/50">{openSections.cover ? "−" : "+"}</span>
          </button>

          {openSections.cover && (
            <div className="border-t border-white/10 px-6 py-6 space-y-6">
              {/* URL Image Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={form.cover_image}
                  onChange={(e) => setForm((prev) => ({ ...prev, cover_image: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Preview */}
              {form.cover_image && (
                <div className="rounded-lg overflow-hidden bg-white/5">
                  <div className="relative w-full h-48">
                    <img 
                      src={form.cover_image} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover rounded-lg"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        console.log("[v0] Image failed to load:", form.cover_image)
                        e.currentTarget.src = '/placeholder.jpg'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 3: Content */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSections((p) => ({ ...p, content: !p.content }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold">✏️ Content</span>
            <span className="text-foreground/50">{openSections.content ? "−" : "+"}</span>
          </button>

          {openSections.content && (
            <div className="border-t border-white/10 px-6 py-6">
              <TipTapEditor
                content={form.content}
                onChange={(content) => setForm((prev) => ({ ...prev, content }))}
              />
            </div>
          )}
        </div>

        {/* SECTION 4: SEO */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSections((p) => ({ ...p, seo: !p.seo }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold">🔍 SEO & Meta Tags</span>
            <span className="text-foreground/50">{openSections.seo ? "−" : "+"}</span>
          </button>

          {openSections.seo && (
            <div className="border-t border-white/10 px-6 py-6 space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-green-400">
                💡 Good SEO helps your posts reach more readers
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Meta Title</label>
                  <span className="text-xs text-foreground/50">{form.meta_title.length}/70</span>
                </div>
                <input
                  type="text"
                  value={form.meta_title}
                  onChange={(e) => setForm((prev) => ({ ...prev, meta_title: e.target.value.slice(0, 70) }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                  maxLength={70}
                />
                {/* Google Preview */}
                <div className="mt-4 text-sm">
                  <div className="text-blue-400 hover:underline cursor-pointer">{form.meta_title || form.title}</div>
                  <div className="text-green-600">omgaurav.com.np › {form.type}/{form.slug}</div>
                  <div className="text-foreground/60 mt-1">{form.meta_description || form.excerpt}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Meta Description</label>
                  <span className="text-xs text-foreground/50">{form.meta_description.length}/180</span>
                </div>
                <textarea
                  value={form.meta_description}
                  onChange={(e) => setForm((prev) => ({ ...prev, meta_description: e.target.value.slice(0, 180) }))}
                  maxLength={180}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={form.meta_keywords}
                  onChange={(e) => setForm((prev) => ({ ...prev, meta_keywords: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">OG Image URL (1200×630px)</label>
                <input
                  type="text"
                  value={form.og_image}
                  onChange={(e) => setForm((prev) => ({ ...prev, og_image: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                  placeholder="For social media previews"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Publish Settings */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSections((p) => ({ ...p, publish: !p.publish }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold">🚀 Publish Settings</span>
            <span className="text-foreground/50">{openSections.publish ? "−" : "+"}</span>
          </button>

          {openSections.publish && (
            <div className="border-t border-white/10 px-6 py-6 space-y-4">
              {/* Pin Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Pin to Homepage</div>
                  <div className="text-sm text-foreground/60">Shows in the homepage Blog/Travel section (max 3)</div>
                </div>
                <button
                  onClick={() => setForm((prev) => ({ ...prev, is_pinned: !prev.is_pinned }))}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${form.is_pinned ? "bg-primary" : "bg-white/10"}`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full transition-transform ${
                      form.is_pinned ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <div className="font-medium">Published</div>
                  <div className="text-sm text-foreground/60">Make this post publicly visible</div>
                </div>
                <button
                  onClick={() => setForm((prev) => ({ ...prev, is_published: !prev.is_published }))}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${form.is_published ? "bg-primary" : "bg-white/10"}`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full transition-transform ${
                      form.is_published ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Save Bar */}
        <div className="fixed bottom-4 left-4 right-4 z-40 bg-background/80 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <a href="/admin/posts" className="text-foreground/60 hover:text-foreground transition-colors">
            Cancel
          </a>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-black font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? "Publishing..." : "🚀 Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
