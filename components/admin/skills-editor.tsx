"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Loader2 } from "lucide-react"

interface Skill { id: number; name: string; category: string; proficiency: number; sort_order: number }

export function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: "", category: "Technical", proficiency: 80 })

  useEffect(() => {
    fetch("/api/admin/content?table=skills")
      .then(r => r.json())
      .then(res => { setSkills(res.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function addSkill() {
    if (!form.name) return
    setAdding(true)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "skills", ...form, sort_order: skills.length }),
    })
    if (res.ok) {
      const result = await res.json()
      setSkills([...skills, result.data])
      setForm({ name: "", category: "Technical", proficiency: 80 })
    }
    setAdding(false)
  }

  async function deleteSkill(id: number) {
    if (!confirm("Delete this skill?")) return
    const res = await fetch(`/api/admin/content?table=skills&id=${id}`, { method: "DELETE" })
    if (res.ok) setSkills(skills.filter(s => s.id !== id))
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Add New Skill</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1 flex-1 min-w-[150px]"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="React, Python..." /></div>
            <div className="space-y-1 min-w-[120px]"><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Technical" /></div>
            <div className="space-y-1 w-24"><Label>Level %</Label><Input type="number" min={0} max={100} value={form.proficiency} onChange={e => setForm({ ...form, proficiency: Number(e.target.value) })} /></div>
            <Button onClick={addSkill} disabled={adding} className="gap-2">{adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add</Button>
          </div>
        </CardContent>
      </Card>

      {categories.map(cat => (
        <Card key={cat}>
          <CardHeader><CardTitle className="text-lg">{cat}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.filter(s => s.category === cat).map(skill => (
                <div key={skill.id} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">({skill.proficiency}%)</span>
                  <button onClick={() => deleteSkill(skill.id)} className="text-destructive hover:text-destructive/80"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {skills.length === 0 && <p className="text-center text-muted-foreground py-8">No skills added yet.</p>}
    </div>
  )
}
