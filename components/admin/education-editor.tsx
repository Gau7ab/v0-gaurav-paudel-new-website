'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'

interface Education {
  id: string
  year: string
  degree: string
  school: string
  location: string
}

export function EducationEditor() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(false)
  const [newEdu, setNewEdu] = useState({
    year: '',
    degree: '',
    school: '',
    location: '',
  })

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/admin/education')
      const data = await res.json()
      setEducation(data)
    } catch (error) {
      console.error('Error fetching education:', error)
    }
  }

  const handleAddEducation = async () => {
    if (!newEdu.year || !newEdu.degree || !newEdu.school) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEdu),
      })

      if (res.ok) {
        setNewEdu({ year: '', degree: '', school: '', location: '' })
        fetchEducation()
      }
    } catch (error) {
      console.error('Error adding education:', error)
    }
    setLoading(false)
  }

  const handleDeleteEducation = async (id: string) => {
    if (!confirm('Delete this education entry?')) return

    try {
      await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' })
      fetchEducation()
    } catch (error) {
      console.error('Error deleting education:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Education Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Education Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-card/50">
          <h3 className="font-semibold">Add New Education</h3>
          <Input
            placeholder="Year (e.g., 2023-2024)"
            value={newEdu.year}
            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          />
          <Input
            placeholder="Degree"
            value={newEdu.degree}
            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
          />
          <Input
            placeholder="School/University"
            value={newEdu.school}
            onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={newEdu.location}
            onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
          />
          <Button onClick={handleAddEducation} disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        {/* Education List */}
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-primary font-semibold">{edu.school}</p>
                <p className="text-sm text-muted-foreground">{edu.year} • {edu.location}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteEducation(edu.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
