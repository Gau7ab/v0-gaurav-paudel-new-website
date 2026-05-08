import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"
import { ProgressIndicator } from "@/components/progress-indicator"
import { AccessibilitySkipLinks } from "@/components/accessibility-skip-links"
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
  title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar | Portfolio",
  description:
    "Om Prakash Paudel Gaurav - MBA Scholar, Himalayan Trekker & Adventure Explorer. Explore trekking portfolio, personality assessments, and professional experience.",
  keywords:
    "Om Prakash Paudel, Om Prakash Paudel Gaurav, Om Gaurav, trekker Nepal, MBA scholar Nepal, Himalayan trekking, adventure explorer, mountain guide, trek portfolio, Om Prakash",
  authors: [{ name: "Om Prakash Paudel Gaurav" }],
  creator: "Om Prakash Paudel",
  metadataBase: new URL("https://omgaurav.com.np"),
  alternates: {
    canonical: "https://omgaurav.com.np",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omgaurav.com.np",
    title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar",
    description:
      "MBA Scholar, Himalayan Trekker & Adventure Explorer. View my trekking portfolio, personality assessment, and professional journey.",
    siteName: "Om Prakash Paudel Portfolio",
    images: [
      {
        url: "https://omgaurav.com.np/images/himalayan-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Om Prakash Paudel Gaurav - Himalayan Adventure",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Prakash Paudel Gaurav - Trekker & MBA Scholar",
    description: "Explore my Himalayan adventures, MBA insights, and professional portfolio.",
    creator: "@gaurab__as_a",
    images: ["https://omgaurav.com.np/images/himalayan-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
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
        <link rel="canonical" href="https://omgaurav.com.np" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AccessibilitySkipLinks />
          <ProgressIndicator />
          <DashainAnimation />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <SocialLinks />
        </ThemeProvider>
      </body>
    </html>
  )
}
