"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Loader2, Mountain, ImageIcon } from "lucide-react"

interface Trek { id: number; name: string; location: string; altitude: string; duration: string; difficulty: string; description: string; image_url: string; date_completed: string }

export function TreksEditor() {
  const [items, setItems] = useState<Trek[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: "", location: "", altitude: "", duration: "", difficulty: "Moderate", description: "", image_url: "", date_completed: "" })

  useEffect(() => {
    fetch("/api/admin/content?table=treks")
      .then(r => r.json())
      .then(res => { setItems(res.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function addItem() {
    if (!form.name) return
    setAdding(true)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "treks", ...form, sort_order: items.length }),
    })
    if (res.ok) {
      const result = await res.json()
      setItems([...items, result.data])
      setForm({ name: "", location: "", altitude: "", duration: "", difficulty: "Moderate", description: "", image_url: "", date_completed: "" })
      setShowForm(false)
    }
    setAdding(false)
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this trek?")) return
    const res = await fetch(`/api/admin/content?table=treks&id=${id}`, { method: "DELETE" })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Mountain className="h-5 w-5" /> Trekking Portfolio</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add Trek</Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 border-2">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Trek Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Annapurna Base Camp" /></div>
              <div className="space-y-1"><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Nepal" /></div>
              <div className="space-y-1"><Label>Altitude</Label><Input value={form.altitude} onChange={e => setForm({ ...form, altitude: e.target.value })} placeholder="4,130m" /></div>
              <div className="space-y-1"><Label>Duration</Label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="10 days" /></div>
              <div className="space-y-1">
                <Label>Difficulty</Label>
                <select className="w-full px-3 py-2 border rounded-md bg-background text-sm" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Difficult</option>
                  <option>Extreme</option>
                </select>
              </div>
              <div className="space-y-1"><Label>Date Completed</Label><Input value={form.date_completed} onChange={e => setForm({ ...form, date_completed: e.target.value })} placeholder="2024" /></div>
            </div>
            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
              {form.image_url && (
                <div className="mt-2 relative w-full max-w-xs h-40 rounded-lg overflow-hidden border border-border">
                  <img src={form.image_url || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
                </div>
              )}
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Your trek experience..." /></div>
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
            <div className="flex items-start gap-4">
              {item.image_url ? (
                <div className="w-28 h-20 rounded-lg overflow-hidden border border-border shrink-0">
                  <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none" }} />
                </div>
              ) : (
                <div className="w-28 h-20 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center shrink-0">
                  <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg">{item.name}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.location && <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{item.location}</span>}
                  {item.altitude && <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{item.altitude}</span>}
                  {item.duration && <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{item.duration}</span>}
                  {item.difficulty && <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{item.difficulty}</span>}
                </div>
                {item.description && <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{item.description}</p>}
                {item.date_completed && <p className="text-xs text-muted-foreground mt-1">Completed: {item.date_completed}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive shrink-0"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !showForm && <p className="text-center text-muted-foreground py-8">No treks added yet.</p>}
    </div>
  )
}
