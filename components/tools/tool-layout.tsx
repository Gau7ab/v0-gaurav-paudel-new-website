"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Download, RotateCcw, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
  showExport?: boolean
  showReset?: boolean
  onExport?: () => void
  onReset?: () => void
  category?: "business" | "career"
}

export function ToolLayout({
  title,
  description,
  children,
  showExport = false,
  showReset = false,
  onExport,
  onReset,
  category = "business",
}: ToolLayoutProps) {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all tools
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <span className="consultation-badge w-fit">
              {category === "business" ? "Business Counselling" : "Career Guidance"}
            </span>
          </div>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl">{description}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>

        {/* Action Buttons */}
        {(showExport || showReset) && (
          <div className="mt-8 flex flex-wrap gap-3 no-print">
            {showExport && onExport && (
              <Button onClick={onExport} className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                <Download className="h-4 w-4" />
                Export Report (PDF)
              </Button>
            )}
            {showReset && onReset && (
              <Button
                variant="outline"
                onClick={onReset}
                className="gap-2 glass-card hover:bg-secondary/80 bg-transparent"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            )}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="glass-card rounded-xl p-4 sm:p-6">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Counselling Note:</strong> This tool provides educational insights for
              {category === "business" ? " business strategy and planning" : " career exploration and self-discovery"}.
              Results should complement, not replace, professional {category === "business" ? "business" : "career"}{" "}
              counselling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
