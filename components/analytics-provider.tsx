"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"

export function AnalyticsProvider({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag("config", measurementId, {
        page_path: pathname,
      })
    }
  }, [pathname, measurementId])

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  )
}
