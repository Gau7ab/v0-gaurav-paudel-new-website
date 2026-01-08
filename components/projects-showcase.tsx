"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Star } from "lucide-react"
import { projectsData } from "@/lib/projects-data"
import { AnimateOnScroll, AnimateStagger } from "@/components/scroll-animation"

interface ProjectCardProps {
  project: (typeof projectsData)[0]
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <AnimateOnScroll animation="slideUp">
      <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-card rounded-2xl overflow-hidden group h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-48 md:h-56 w-full overflow-hidden bg-muted">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge
              className={`${
                project.status === "Live"
                  ? "bg-primary/90 text-primary-foreground"
                  : "bg-secondary/90 text-secondary-foreground"
              } font-semibold`}
            >
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardHeader className="bg-primary/5 border-b border-primary/20">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <p className="text-sm text-primary font-semibold mt-1">{project.category}</p>
            </div>
            <Star className="h-5 w-5 text-primary shrink-0" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 md:p-6">
          <p className="text-foreground/90 mb-4 line-clamp-3">{project.description}</p>

          {/* Highlights */}
          <div className="mb-4 space-y-2">
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-background/50 text-foreground border-secondary/30 text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            {project.link !== "#" && (
              <Button
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                asChild
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View
                </a>
              </Button>
            )}
            {project.github !== "#" && (
              <Button size="sm" variant="outline" className="flex-1 rounded-lg bg-transparent" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  )
}

export function ProjectsShowcase() {
  return (
    <div className="w-full">
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimateStagger delay={0.2} staggerDelay={0.1} animation="slideUp">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimateStagger>
      </div>
    </div>
  )
}
