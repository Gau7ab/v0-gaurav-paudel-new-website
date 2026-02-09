"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Loader2, ExternalLink } from "lucide-react"

interface Project { id: number; title: string; description: string; category: string; tech_stack: string; image_url: string; live_url: string; github_url: string; status: string }

export function ProjectsEditor() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", category: "", tech_stack: "", image_url: "", live_url: "", github_url: "", status: "completed" })

  useEffect(() => {
    fetch("/api/admin/content?table=projects")
      .then(r => r.json())
      .then(res => { setItems(res.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function addItem() {
    if (!form.title || !form.description) return
    setAdding(true)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "projects", ...form, sort_order: items.length }),
    })
    if (res.ok) {
      const result = await res.json()
      setItems([...items, result.data])
      setForm({ title: "", description: "", category: "", tech_stack: "", image_url: "", live_url: "", github_url: "", status: "completed" })
      setShowForm(false)
    }
    setAdding(false)
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this project?")) return
    const res = await fetch(`/api/admin/content?table=projects&id=${id}`, { method: "DELETE" })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects & Experiments</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 border-2">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Web App, Tool..." /></div>
              <div className="space-y-1"><Label>Tech Stack</Label><Input value={form.tech_stack} onChange={e => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Next.js, Node" /></div>
              <div className="space-y-1">
                <Label>Status</Label>
                <select className="w-full px-3 py-2 border rounded-md bg-background text-sm" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
              <div className="space-y-1"><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
              <div className="space-y-1"><Label>Live URL</Label><Input value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} /></div>
              <div className="space-y-1 md:col-span-2"><Label>GitHub URL</Label><Input value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="flex gap-2">
              <Button onClick={addItem} disabled={adding}>{adding ? "Saving..." : "Save"}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="bg-transparent">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.map(item => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-lg">{item.title}</p>
                  {item.status && <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{item.status}</span>}
                </div>
                {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
                <p className="text-sm mt-1 text-muted-foreground">{item.description}</p>
                {item.tech_stack && <div className="flex flex-wrap gap-1 mt-2">{item.tech_stack.split(",").map((t, i) => <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{t.trim()}</span>)}</div>}
                <div className="flex gap-3 mt-2">
                  {item.live_url && <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1"><ExternalLink className="h-3 w-3" /> Live</a>}
                  {item.github_url && <a href={item.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">GitHub</a>}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !showForm && <p className="text-center text-muted-foreground py-8">No projects added yet.</p>}
    </div>
  )
}
