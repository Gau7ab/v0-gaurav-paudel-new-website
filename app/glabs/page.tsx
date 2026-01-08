"use client"

import { ProjectsShowcase } from "@/components/projects-showcase"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { Badge } from "@/components/ui/badge"
import { Code2, Sparkles } from "lucide-react"

export default function GlabsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeIn" className="text-center mb-12 md:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Glabs & Projects
              </Badge>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              My Projects & Experiments
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my latest projects, full-stack applications, and innovative solutions. From educational platforms
              to restaurant management systems, each project showcases my approach to building scalable and user-centric
              products.
            </p>
          </AnimateOnScroll>

          {/* Projects Grid */}
          <AnimateOnScroll animation="slideUp" delay={0.3} className="mt-16">
            <ProjectsShowcase />
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
