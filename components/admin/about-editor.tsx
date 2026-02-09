'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'

interface AboutSection {
  title: string
  subtitle?: string
  description: string
  bio_text?: string
}

export function AboutEditor() {
  const [about, setAbout] = useState<AboutSection>({
    title: '',
    subtitle: '',
    description: '',
    bio_text: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAboutSection()
  }, [])

  const fetchAboutSection = async () => {
    try {
      const res = await fetch('/api/admin/about')
      const data = await res.json()
      setAbout(data || { title: '', subtitle: '', description: '', bio_text: '' })
    } catch (error) {
      console.error('Error fetching about section:', error)
    }
  }

  const handleSave = async () => {
    if (!about.title || !about.description) return

    setLoading(true)
    try {
      await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      })
    } catch (error) {
      console.error('Error saving about section:', error)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>About Me Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold">Title</label>
            <Input
              placeholder="Your Name or Main Title"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Subtitle</label>
            <Input
              placeholder="Your tagline or subtitle"
              value={about.subtitle || ''}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Main Description</label>
            <Textarea
              placeholder="Main description about yourself"
              value={about.description}
              onChange={(e) => setAbout({ ...about, description: e.target.value })}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Bio</label>
            <Textarea
              placeholder="Detailed bio information"
              value={about.bio_text || ''}
              onChange={(e) => setAbout({ ...about, bio_text: e.target.value })}
              rows={4}
              className="mt-1"
            />
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save About Section
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
