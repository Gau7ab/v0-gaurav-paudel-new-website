'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  description: string
}

export function DynamicExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch('/api/admin/experience')
        const data = await res.json()
        setExperience(data.length > 0 ? data : getDefaultExperience())
      } catch (error) {
        console.error('Error fetching experience:', error)
        setExperience(getDefaultExperience())
      }
      setLoading(false)
    }

    fetchExperience()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading experience...</div>
  }

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <Card key={exp.id || index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-primary/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {exp.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-semibold mt-1">{exp.company}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {exp.period}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {exp.location}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">{exp.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getDefaultExperience(): Experience[] {
  return [
    {
      id: '1',
      title: 'CEO',
      company: 'Aakar Academy',
      period: 'Nov 2025 - Present',
      location: 'Chitwan, Nepal',
      description: 'Leading Aakar Academy as Chief Executive Officer, driving strategic vision and operational excellence.',
    },
  ]
}
