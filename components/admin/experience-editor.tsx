"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Loader2 } from "lucide-react"

interface Experience { id: number; title: string; company: string; location: string; start_date: string; end_date: string; description: string; is_current: boolean }

export function ExperienceEditor() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: "", company: "", location: "", start_date: "", end_date: "", description: "", is_current: false })

  useEffect(() => {
    fetch("/api/admin/content?table=experience")
      .then(r => r.json())
      .then(res => { setItems(res.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function addItem() {
    if (!form.title || !form.company) return
    setAdding(true)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "experience", ...form, sort_order: items.length }),
    })
    if (res.ok) {
      const result = await res.json()
      setItems([...items, result.data])
      setForm({ title: "", company: "", location: "", start_date: "", end_date: "", description: "", is_current: false })
      setShowForm(false)
    }
    setAdding(false)
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this experience?")) return
    const res = await fetch(`/api/admin/content?table=experience&id=${id}`, { method: "DELETE" })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 border-2">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Job Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Company</Label><Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
              <div className="space-y-1"><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              <div className="space-y-1"><Label>Start Date</Label><Input value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} placeholder="Jan 2024" /></div>
              <div className="space-y-1"><Label>End Date</Label><Input value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} placeholder="Present" disabled={form.is_current} /></div>
              <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.is_current} onChange={e => setForm({ ...form, is_current: e.target.checked, end_date: e.target.checked ? "" : form.end_date })} /><Label>Current position</Label></div>
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
              <div>
                <p className="font-bold text-lg">{item.title}</p>
                <p className="text-primary font-semibold">{item.company}</p>
                <p className="text-sm text-muted-foreground">{item.start_date} - {item.is_current ? "Present" : item.end_date} {item.location && `| ${item.location}`}</p>
                {item.description && <p className="text-sm mt-2 text-muted-foreground">{item.description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !showForm && <p className="text-center text-muted-foreground py-8">No experience added yet.</p>}
    </div>
  )
}
