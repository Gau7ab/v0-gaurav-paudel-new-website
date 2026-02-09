'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  proficiency_level: string
}

export function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency_level: 'Intermediate' })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills')
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.category) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      })
      
      if (res.ok) {
        setNewSkill({ name: '', category: '', proficiency_level: 'Intermediate' })
        fetchSkills()
      }
    } catch (error) {
      console.error('Error adding skill:', error)
    }
    setLoading(false)
  }

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return

    try {
      await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
      fetchSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Skills Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Skill Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-card/50">
          <h3 className="font-semibold">Add New Skill</h3>
          <Input
            placeholder="Skill name (e.g., React)"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <Input
            placeholder="Category (e.g., Frontend)"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          />
          <select
            className="w-full px-3 py-2 border rounded-md bg-background"
            value={newSkill.proficiency_level}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency_level: e.target.value })}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
          <Button onClick={handleAddSkill} disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-muted-foreground">{skill.category} • {skill.proficiency_level}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
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
