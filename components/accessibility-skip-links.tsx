"use client"

import { Button } from "@/components/ui/button"

export function AccessibilitySkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <Button
        asChild
        variant="outline"
        className="absolute top-4 left-4 z-[9999] focus:relative focus:z-auto bg-transparent"
      >
        <a href="#main-content">Skip to main content</a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="absolute top-4 left-32 z-[9999] focus:relative focus:z-auto bg-transparent"
      >
        <a href="#navigation">Skip to navigation</a>
      </Button>
    </div>
  )
}
