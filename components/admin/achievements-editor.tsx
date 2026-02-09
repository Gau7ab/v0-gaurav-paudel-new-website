'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
}

export function AchievementsEditor() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(false)
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/admin/achievements')
      const data = await res.json()
      setAchievements(data)
    } catch (error) {
      console.error('Error fetching achievements:', error)
    }
  }

  const handleAddAchievement = async () => {
    if (!newAchievement.title || !newAchievement.description) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAchievement),
      })

      if (res.ok) {
        setNewAchievement({ title: '', description: '' })
        fetchAchievements()
      }
    } catch (error) {
      console.error('Error adding achievement:', error)
    }
    setLoading(false)
  }

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Delete this achievement?')) return

    try {
      await fetch(`/api/admin/achievements?id=${id}`, { method: 'DELETE' })
      fetchAchievements()
    } catch (error) {
      console.error('Error deleting achievement:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Achievements Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Achievement Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-card/50">
          <h3 className="font-semibold">Add New Achievement</h3>
          <Input
            placeholder="Achievement Title"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
            rows={3}
          />
          <Button onClick={handleAddAchievement} disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </div>

        {/* Achievements List */}
        <div className="space-y-2">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-bold">{achievement.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteAchievement(achievement.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
