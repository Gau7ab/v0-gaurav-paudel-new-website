"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Database } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our priority. Here's exactly how we handle your data.
          </p>
        </div>

        {/* Data Processing */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Data Processing: Client-Side Only
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>All processing happens in your browser.</strong> When you use any Gaurab Labs tool:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Your inputs are processed locally on your device</li>
                  <li>No data is transmitted to our servers</li>
                  <li>No data is stored in any database</li>
                  <li>No cookies are placed on your device</li>
                  <li>No tracking or analytics collection occurs</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Your analysis results exist only on your computer. When you close the browser or refresh the page,
                  your data is cleared entirely.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Collect */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">What We Do NOT Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Gaurab Labs does not collect, store, or have access to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Any data you enter into assessment or analysis tools</li>
                  <li>Your name, email, or any personal identifiers</li>
                  <li>Your assessment results or scores</li>
                  <li>Your IP address or device information</li>
                  <li>Browsing behavior or clickstream data</li>
                  <li>Any information for commercial or marketing purposes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We have zero visibility into what you assess or analyze. Your privacy is absolute.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PDF Exports */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">PDF Exports</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you export your analysis results as a PDF:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>The PDF is generated entirely on your computer</li>
              <li>It is immediately downloaded to your device</li>
              <li>No copy is sent to us or any server</li>
              <li>You have complete control over the file and its distribution</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Gaurab Labs never sees, stores, or accesses the PDFs you generate.
            </p>
          </CardContent>
        </Card>

        {/* Third Party */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gaurab Labs does not use third-party analytics, advertising networks, or data brokers. No data is shared
              with Google Analytics, Facebook Pixel, or any marketing platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your CDN provider (Vercel) may log basic infrastructure data (like page requests) for performance
              monitoring, but this is never associated with your personal information or assessment data.
            </p>
          </CardContent>
        </Card>

        {/* Browser Storage */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Browser Storage</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gaurab Labs uses browser local storage only to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Store your current session (while the page is open)</li>
              <li>Remember your UI preferences (if applicable)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This data exists only on your device and is deleted when you clear your browser cache or close the
              browser.
            </p>
          </CardContent>
        </Card>

        {/* Changes */}
        <Card className="glass-card-strong">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Policy Changes</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to update this Privacy Policy. Any changes will be posted on this page with an
              updated date. If we make material changes, we will notify users through a banner or email.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Last Updated:</strong> January 2025
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Questions about our privacy practices?</p>
          <a href="mailto:paudelg97@gmail.com" className="text-primary hover:underline font-medium">
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
