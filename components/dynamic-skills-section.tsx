'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Skill {
  id: string
  name: string
  category: string
  proficiency_level?: string
}

export function DynamicSkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/admin/skills')
        const data = await res.json()
        setSkills(data.length > 0 ? data : getDefaultSkills())
      } catch (error) {
        console.error('Error fetching skills:', error)
        setSkills(getDefaultSkills())
      }
      setLoading(false)
    }

    fetchSkills()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading skills...</div>
  }

  // Group skills by category
  const categorizedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'Other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <div className="space-y-6">
      {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <Badge key={skill.id} variant="outline" className="px-3 py-1">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function getDefaultSkills(): Skill[] {
  return [
    { id: '1', name: 'Navigation & Route Planning', category: 'Trekking & Adventure' },
    { id: '2', name: 'High Altitude Trekking', category: 'Trekking & Adventure' },
    { id: '3', name: 'Team Leadership', category: 'Leadership & Teamwork' },
  ]
}
