'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Achievement {
  id: string
  title: string
  description: string
}

export function DynamicAchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/admin/achievements')
        const data = await res.json()
        setAchievements(data.length > 0 ? data : getDefaultAchievements())
      } catch (error) {
        console.error('Error fetching achievements:', error)
        setAchievements(getDefaultAchievements())
      }
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading achievements...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl overflow-hidden group"
        >
          <CardHeader className="bg-secondary/10 border-b border-secondary/20">
            <CardTitle className="text-foreground group-hover:text-secondary transition-colors">
              {achievement.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-foreground/90">{achievement.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: '1',
      title: '7 Major Treks Completed',
      description: 'Successfully completed treks to iconic destinations across Nepal',
    },
  ]
}
