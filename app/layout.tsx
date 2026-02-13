import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

export const metadata: Metadata = {
  title: "Gaurab Labs | Strategic Intelligence Tools & Psychometric Assessments",
  description:
    "Strategic intelligence platform providing consulting-grade business frameworks and validated psychometric assessments. Analyze deeply, plan strategically, and decide confidently with SWOT, Porter's Five Forces, personality tests, and career intelligence tools.",
  keywords:
    "strategic intelligence tools, business decision frameworks, SWOT analysis, Porter's Five Forces, psychometric assessments, career intelligence, business model canvas, PESTLE analysis, personality assessment, Nepal",
  openGraph: {
    title: "Gaurab Labs | Strategic Intelligence for Smarter Decisions",
    description: "Consulting-grade business frameworks and psychometric assessments for strategic decision-making.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurab Labs | Strategic Intelligence Tools",
    description: "Business frameworks and career intelligence assessments.",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F766E",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gaurab Labs",
              url: "https://omprakashpaudelgaurav.com.np",
              logo: "https://omprakashpaudelgaurav.com.np/images/logo-teal.png",
              description: "Strategic intelligence platform for business frameworks and psychometric assessments",
              founder: {
                "@type": "Person",
                name: "Om Prakash Paudel Gaurav",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bharatpur",
                addressRegion: "Chitwan",
                addressCountry: "NP",
              },
              sameAs: ["https://www.linkedin.com/in/gau7ab/"],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col gradient-mesh relative overflow-x-hidden">
        {typeof window !== "undefined" && window.innerWidth >= 1024 && (
          <>
            <div className="floating-orb floating-orb-1" aria-hidden="true" />
            <div className="floating-orb floating-orb-2" aria-hidden="true" />
            <div className="floating-orb floating-orb-3" aria-hidden="true" />
          </>
        )}
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
