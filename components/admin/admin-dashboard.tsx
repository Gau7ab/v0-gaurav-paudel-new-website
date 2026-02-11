'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { SkillsEditor } from '@/components/admin/skills-editor'
import { ExperienceEditor } from '@/components/admin/experience-editor'
import { ProjectsEditor } from '@/components/admin/projects-editor'
import { AchievementsEditor } from '@/components/admin/achievements-editor'
import { EducationEditor } from '@/components/admin/education-editor'
import { AboutEditor } from '@/components/admin/about-editor'
import { TreksEditor } from '@/components/admin/treks-editor'

export function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_user")
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portfolio Admin</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8 bg-card/50 p-1 rounded-lg border border-primary/10">
            <TabsTrigger value="about" className="text-xs md:text-sm">About</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs md:text-sm">Skills</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs md:text-sm">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs md:text-sm">Education</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs md:text-sm">Projects</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs md:text-sm">Achievements</TabsTrigger>
            <TabsTrigger value="treks" className="text-xs md:text-sm">Treks</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4">
            <AboutEditor />
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <EducationEditor />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <ProjectsEditor />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <AchievementsEditor />
          </TabsContent>

          <TabsContent value="treks" className="space-y-4">
            <TreksEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
