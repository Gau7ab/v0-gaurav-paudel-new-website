'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  live_url?: string
  github_url?: string
}

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    live_url: '',
    github_url: '',
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          technologies: newProject.technologies.split(',').map(t => t.trim()),
        }),
      })

      if (res.ok) {
        setNewProject({
          title: '',
          description: '',
          technologies: '',
          live_url: '',
          github_url: '',
        })
        fetchProjects()
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
    setLoading(false)
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return

    try {
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Projects Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Project Form */}
        <div className="space-y-3 p-4 border rounded-lg bg-card/50">
          <h3 className="font-semibold">Add New Project</h3>
          <Input
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={3}
          />
          <Input
            placeholder="Technologies (comma-separated, e.g., React, Next.js, PostgreSQL)"
            value={newProject.technologies}
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
          />
          <Input
            placeholder="Live URL (optional)"
            value={newProject.live_url}
            onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
          />
          <Input
            placeholder="GitHub URL (optional)"
            value={newProject.github_url}
            onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
          />
          <Button onClick={handleAddProject} disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-bold text-lg">{project.title}</p>
                <p className="text-sm mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies?.map((tech, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-primary/20 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.live_url || project.github_url) && (
                  <div className="flex gap-2 mt-2">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
