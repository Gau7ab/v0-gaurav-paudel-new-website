"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Loader2 } from "lucide-react"

interface Achievement { id: number; title: string; description: string; date_achieved: string; icon: string }

export function AchievementsEditor() {
  const [items, setItems] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", date_achieved: "", icon: "" })

  useEffect(() => {
    fetch("/api/admin/content?table=achievements")
      .then(r => r.json())
      .then(res => { setItems(res.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function addItem() {
    if (!form.title) return
    setAdding(true)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "achievements", ...form, sort_order: items.length }),
    })
    if (res.ok) {
      const result = await res.json()
      setItems([...items, result.data])
      setForm({ title: "", description: "", date_achieved: "", icon: "" })
      setShowForm(false)
    }
    setAdding(false)
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this achievement?")) return
    const res = await fetch(`/api/admin/content?table=achievements&id=${id}`, { method: "DELETE" })
    if (res.ok) setItems(items.filter(i => i.id !== id))
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 border-2">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Date</Label><Input value={form.date_achieved} onChange={e => setForm({ ...form, date_achieved: e.target.value })} placeholder="2024" /></div>
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} /></div>
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
                <p className="font-bold">{item.title}</p>
                {item.date_achieved && <p className="text-xs text-muted-foreground">{item.date_achieved}</p>}
                {item.description && <p className="text-sm mt-1 text-muted-foreground">{item.description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !showForm && <p className="text-center text-muted-foreground py-8">No achievements added yet.</p>}
    </div>
  )
}
