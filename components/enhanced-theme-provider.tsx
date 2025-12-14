"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function EnhancedThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    // Enhanced system preference detection
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const currentTheme = localStorage.getItem("theme")
      if (!currentTheme || currentTheme === "system") {
        // Theme will automatically update via next-themes
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      defaultTheme="system"
      attribute="class"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}
