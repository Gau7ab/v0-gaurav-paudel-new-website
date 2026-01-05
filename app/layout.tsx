import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"
import { ProgressIndicator } from "@/components/progress-indicator"
import { AccessibilitySkipLinks } from "@/components/accessibility-skip-links"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { DashainAnimation } from "@/components/dashain-animation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar",
  description:
    "Om Prakash Paudel Gaurav is a trekker and MBA scholar from Nepal exploring Himalayan mountains and sharing adventure experiences.",
  keywords:
    "Om Prakash Paudel, Om Prakash Paudel Gaurav, Om Gaurav, trekker Nepal, MBA scholar Nepal, Himalayan trekking, adventure explorer",
  authors: [{ name: "Om Prakash Paudel" }],
  creator: "Om Prakash Paudel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omgaurav.com.np",
    title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar",
    description:
      "Om Prakash Paudel Gaurav is a trekker and MBA scholar from Nepal exploring Himalayan mountains and sharing adventure experiences.",
    siteName: "Om Prakash Paudel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar",
    description:
      "Om Prakash Paudel Gaurav is a trekker and MBA scholar from Nepal exploring Himalayan mountains and sharing adventure experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Om Prakash Paudel",
              alternateName: "Om Prakash Paudel Gaurav",
              url: "https://omgaurav.com.np",
              description:
                "Trekker, explorer, and MBA scholar from Nepal specializing in Himalayan adventures and mountain experiences.",
              sameAs: [
                "https://instagram.com/gaurab__as_a",
                "https://facebook.com/omgaurav",
                "https://linkedin.com/in/om-prakash-paudel",
              ],
              jobTitle: "Trekker & Adventure Explorer",
              nationality: "Nepali",
              areaServed: "Nepal",
              knowsAbout: ["Himalayan Trekking", "Mountain Navigation", "Adventure Leadership", "MBA"],
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AccessibilitySkipLinks />
          <ProgressIndicator />
          <CursorSpotlight />
          <DashainAnimation />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <SocialLinks />
        </ThemeProvider>
      </body>
    </html>
  )
}
