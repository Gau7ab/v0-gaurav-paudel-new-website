# Blog & Travel Post Management System — Setup Complete ✅

## What Was Added

Your Neon database now has a fully functional **Blog & Travel Post Management System** integrated into your existing admin dashboard.

---

## Database Schema

A new `posts` table was created in Neon with the following structure:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('blog', 'travel')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,               -- Rich HTML from TipTap editor
  cover_image TEXT,           -- Image URL
  author TEXT DEFAULT 'Om Prakash Paudel Gaurav',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT,              -- For blog posts
  location TEXT,              -- For travel stories
  altitude TEXT,              -- For travel stories
  duration TEXT,              -- For travel stories
  difficulty TEXT,            -- For travel stories
  meta_title TEXT,            -- SEO
  meta_description TEXT,      -- SEO
  meta_keywords TEXT,         -- SEO
  og_image TEXT,              -- Social media preview
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Indexes created for fast queries on slug, type/published status, and pinned posts.

---

## New Admin Pages

### 1. **Posts Management List** — `/admin/posts`
- **Stats Row**: Shows Total Posts, Published, Blog Posts, Travel Stories
- **Filter Tabs**: "All Posts", "✍️ Blog", "🏔️ Travel"
- **Table Features**:
  - Title with slug shown below
  - Type indicator (purple pill for blog, blue for travel)
  - Status toggle (green "✓ Published" / yellow "○ Draft") — clickable to toggle
  - Pin button (📌 emoji) — opacity 100% if pinned, 20% if not — clickable to toggle
  - Date published
  - Actions: View (published only), Edit, Delete
- **Top Buttons**: "+ New Blog Post" and "+ New Travel Story" (green accent)

### 2. **Post Editor** — `/admin/posts/new?type=blog` or `/admin/posts/new?type=travel`
Also: `/admin/posts/[id]/edit`

Full-featured rich content editor with:

**Header**: Back link, page title, Save Draft + Publish buttons (sticky)

**Section 1 — 📝 Post Details** (collapsible, default open):
- Type toggle (Blog Post vs Travel Story)
- Title input (auto-generates slug if slug is empty, auto-fills meta_title)
- Slug input (with /blog/ or /travels/ prefix shown)
- Author input
- Excerpt textarea (max 200 chars, shows remaining count)
- Tags input (comma-separated)
- Category (blog) or Difficulty dropdown (travel)
- Travel-specific fields (Location, Altitude, Duration) in blue panel

**Section 2 — 🖼️ Cover Image** (collapsible, default open):
- Image URL input
- Live preview of uploaded image

**Section 3 — ✏️ Content** (collapsible, default open):
- **TipTap Rich Text Editor** with full toolbar:
  - Headings dropdown (Paragraph, H1, H2, H3)
  - Formatting: Bold, Italic, Underline, Strikethrough, Code
  - Alignment: Left, Center, Right
  - Lists: Bullet, Numbered, Blockquote
  - Media: Insert Image, Insert Link, Code Block
  - History: Undo, Redo
  - Font size dropdown (12px–48px)
  - Placeholder: "Start writing your story..."

**Section 4 — 🔍 SEO & Meta Tags** (collapsible, default closed):
- Meta Title (max 70 chars) with Google search result preview
- Meta Description (max 180 chars) — shows in preview
- Keywords (comma-separated)
- OG Image URL (1200×630px for social media)

**Section 5 — 🚀 Publish Settings** (collapsible, default closed):
- "Pin to Homepage" toggle with description
- "Published" toggle with description
- Both toggles are iOS-style (green when on, dark when off)

**Bottom Sticky Save Bar**:
- Cancel link (gray), Save Draft button, Publish button (green)

---

## API Routes

### **GET /api/posts**
- `?admin=true` — Returns all posts (for admin)
- `?type=blog|travel` — Returns published posts by type (for public)
- `?type=blog|travel&pinned=true` — Returns max 3 pinned published posts (for homepage)
- Default — Returns all published posts

### **POST /api/posts**
Creates a new post. Requires `x-admin-auth: true` header.
- Validates: title, slug, content are required
- Auto-sets `published_at` to now() if `is_published=true`

### **GET /api/posts/[id]**
- `?admin=true` — Returns post (admin only)
- Default — Returns post only if published

### **PUT /api/posts/[id]**
Full update. Requires `x-admin-auth: true` header.
- Sets `published_at` to now() on first publish

### **PATCH /api/posts/[id]**
Partial update (for toggling is_published or is_pinned). Requires auth.

### **DELETE /api/posts/[id]**
Deletes a post. Requires auth.

---

## Auth & Security

All POST/PUT/PATCH/DELETE operations check for the header:
```javascript
x-admin-auth: true
```

This matches your existing localStorage-based auth pattern. The JavaScript adds this header automatically in fetch requests.

---

## Frontend State & Fetching

- **Posts list** fetches on mount: `GET /api/posts?admin=true`
- **Toggle publish/pin**: Optimistic update to state + PATCH request
- **Delete**: Optimistic removal from state + DELETE request
- **New/Edit post**: Validates on save, then POST or PUT

---

## How to Use

### Create a New Blog Post:
1. Go to `/admin/posts`
2. Click "+ New Blog Post"
3. Fill in Post Details section
4. Add cover image URL
5. Write content in TipTap editor
6. Fill SEO details (optional but recommended)
7. Toggle "Published" ON in Publish Settings
8. Click "🚀 Publish"

### Create a Travel Story:
1. Go to `/admin/posts`
2. Click "+ New Travel Story"
3. Fill in Post Details (includes Location, Altitude, Duration)
4. Add cover image
5. Write content
6. Publish same way as blog

### Edit a Post:
1. Go to `/admin/posts`
2. Find the post and click "Edit"
3. Modify content
4. Click "Save Draft" or "🚀 Publish"

### Pin to Homepage:
1. In Publish Settings, toggle "Pin to Homepage" ON
2. Save — post will appear in homepage blog/travel sections (max 3)

### Delete:
1. Click "Delete" action in table
2. Confirm in dialog
3. Post removed

---

## Frontend Integration

To display posts on your public site:

```javascript
// Get all published blog posts
const response = await fetch('/api/posts?type=blog')
const blogPosts = await response.json()

// Get max 3 pinned travel stories for homepage
const response = await fetch('/api/posts?type=travel&pinned=true')
const pinnedTreks = await response.json()

// Get single published post by slug
const response = await fetch(`/api/posts?slug=${slug}`)
const post = await response.json()
```

You'll need to add public routes `/blog/[slug]` and `/travels/[slug]` to display individual posts.

---

## Next Steps

1. ✅ Database table created
2. ✅ Admin pages built
3. ✅ API routes created
4. ⚙️ **TODO**: Create public `/blog/[slug]` and `/travels/[slug]` pages
5. ⚙️ **TODO**: Add homepage sections to display pinned posts
6. ⚙️ **TODO**: Add image upload endpoint (currently uses URL input only)

---

## Files Created/Modified

**New Files:**
- `scripts/08-create-posts-table.sql` — Database migration
- `app/api/posts/route.ts` — Posts list & create
- `app/api/posts/[id]/route.ts` — Post detail CRUD
- `app/admin/posts/page.tsx` — Posts management list
- `app/admin/posts/new/page.tsx` — New post page
- `app/admin/posts/[id]/edit/page.tsx` — Edit post page
- `components/tiptap-editor.tsx` — Rich text editor

**Modified Files:**
- `components/admin/admin-dashboard.tsx` — Added "Blog & Travel" button

---

**Your blog & travel post management system is ready to use! 🚀**
