'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Experience {
  id: string
  job_title: string
  company_name: string
  period: string
  location: string
  description: string
}

export function ExperienceEditor() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(false)
  const [newExp, setNewExp] = useState({
    job_title: '',
    company_name: '',
    period: '',
    location: '',
    description: '',
  })

  useEffect(() => {
    fetchExperience()
  }, [])

  const fetchExperience = async () => {
    try {
      const res = await fetch('/api/admin/experience')
      const data = await res.json()
      setExperience(data)
    } catch (error) {
      console.error('Error fetching experience:', error)
    }
  }

  const handleAddExperience = async () => {
    if (!newExp.job_title || !newExp.company_name) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp),
      })

      if (res.ok) {
        setNewExp({
          job_title: '',
          company_name: '',
          period: '',
          location: '',
          description: '',
        })
        fetchExperience()
      }
    } catch (error) {
      console.error('Error adding experience:', error)
    }
    setLoading(false)
  }

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Delete this experience?')) return

    try {
      await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
      fetchExperience()
    } catch (error) {
      console.error('Error deleting experience:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Experience Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Experience Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-card/50">
          <h3 className="font-semibold">Add New Experience</h3>
          <Input
            placeholder="Job Title"
            value={newExp.job_title}
            onChange={(e) => setNewExp({ ...newExp, job_title: e.target.value })}
          />
          <Input
            placeholder="Company Name"
            value={newExp.company_name}
            onChange={(e) => setNewExp({ ...newExp, company_name: e.target.value })}
          />
          <Input
            placeholder="Period (e.g., Jan 2023 - Dec 2023)"
            value={newExp.period}
            onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={newExp.location}
            onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newExp.description}
            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            rows={3}
          />
          <Button onClick={handleAddExperience} disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {/* Experience List */}
        <div className="space-y-2">
          {experience.map((exp) => (
            <div key={exp.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-bold text-lg">{exp.job_title}</p>
                <p className="text-primary font-semibold">{exp.company_name}</p>
                <p className="text-sm text-muted-foreground">{exp.period} • {exp.location}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(exp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
