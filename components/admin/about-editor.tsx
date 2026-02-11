"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2, ImageIcon } from "lucide-react"

export function AboutEditor() {
  const [data, setData] = useState({ id: 0, title: "", subtitle: "", description: "", image_url: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch("/api/admin/content?table=about")
      .then(r => r.json())
      .then(res => { if (res.data?.[0]) setData(res.data[0]); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    setMsg("")
    const method = data.id ? "PUT" : "POST"
    const res = await fetch("/api/admin/content", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "about", ...data }),
    })
    if (res.ok) {
      const result = await res.json()
      if (result.data) setData(result.data)
      setMsg("Saved!")
    } else setMsg("Failed to save")
    setSaving(false)
    setTimeout(() => setMsg(""), 3000)
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>

  return (
    <Card>
      <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Title</Label><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} placeholder="Your name" /></div>
        <div className="space-y-2"><Label>Subtitle</Label><Input value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} placeholder="Your tagline" /></div>
        <div className="space-y-2"><Label>Description</Label><Textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} placeholder="About yourself..." rows={6} /></div>
        <div className="space-y-2">
          <Label>Profile Image URL</Label>
          <Input value={data.image_url || ""} onChange={e => setData({ ...data, image_url: e.target.value })} placeholder="https://..." />
          {data.image_url && (
            <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden border border-border">
              <img src={data.image_url || "/placeholder.svg"} alt="Profile preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
            </div>
          )}
          {!data.image_url && (
            <div className="mt-2 w-32 h-32 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </Button>
          {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
