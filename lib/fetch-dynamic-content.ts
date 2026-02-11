// Utility functions to fetch dynamic content from API

export async function getAboutContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/about`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

export async function getSkillsContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/skills`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function getExperienceContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/experience`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

export async function getEducationContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/education`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

export async function getProjectsContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/projects`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getAchievementsContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/achievements`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}
