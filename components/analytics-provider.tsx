"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsProvider({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", measurementId, {
        page_path: pathname,
      })
    }
  }, [pathname, measurementId])

  return null
}
