'use server'

import { cookies } from 'next/headers'
import { decrypt } from './auth'

// Get admin session
export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (!session) return null
    
    const decrypted = await decrypt(session)
    if (decrypted?.user?.email === 'paudelg97@gmail.com') {
      return decrypted.user
    }
    return null
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

// Fetch skills
export async function fetchSkills() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/skills`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

// Fetch experience
export async function fetchExperience() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/experience`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

// Fetch projects
export async function fetchProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/projects`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Fetch achievements
export async function fetchAchievements() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/achievements`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}

// Fetch education
export async function fetchEducation() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/education`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

// Fetch about section
export async function fetchAboutSection() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/about`, {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Error fetching about section:', error)
    return null
  }
}
