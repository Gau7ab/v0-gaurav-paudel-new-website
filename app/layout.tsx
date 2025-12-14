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
  title: "Om Prakash Paudel — Trekker | Traveler",
  description:
    "Adventure-seeking trekker and traveler exploring Nepal's majestic Himalayan landscapes. MBA student passionate about mountains and exploration.",
  keywords:
    "Om Prakash Paudel, Gaurav Paudel, trekker, traveler, Nepal, Himalayas, Annapurna, portfolio, MBA, adventure",
  authors: [{ name: "Om Prakash Paudel" }],
  creator: "Om Prakash Paudel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gauravpaudel.com.np",
    title: "Om Prakash Paudel — Trekker | Traveler",
    description: "Adventure-seeking trekker and traveler exploring Nepal's majestic Himalayan landscapes.",
    siteName: "Om Prakash Paudel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Prakash Paudel — Trekker | Traveler",
    description: "Adventure-seeking trekker and traveler exploring Nepal's majestic Himalayan landscapes.",
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
