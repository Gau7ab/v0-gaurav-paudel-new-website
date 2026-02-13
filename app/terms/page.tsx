"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, BookOpen } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Terms of Use
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using Gaurab Labs.
          </p>
        </div>

        {/* Educational Use */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Educational Purpose</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gaurab Labs tools are provided for educational, self-assessment, and analytical purposes. They are
                  designed to help you think through business challenges, understand your personality better, and plan
                  strategically. Use them as frameworks for thinking—not as definitive answers or professional
                  substitutes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Important Disclaimers</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Psychology Assessments</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our personality, leadership, and stress assessments are{" "}
                      <strong>not clinical diagnostic tools</strong>. They provide self-insights and career guidance
                      only. If you are experiencing mental health concerns, please consult a licensed mental health
                      professional. Our tools should never replace professional psychological evaluation or treatment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Analysis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our business frameworks (SWOT, Porter's Five Forces, PESTLE, etc.) are analytical tools. While
                      based on established methodologies, they provide frameworks for thinking—not prescriptive advice.
                      Business decisions should involve professional consultation with industry experts, legal advisors,
                      or business consultants where appropriate.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">No Liability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Gaurab Labs is provided "as is" without warranties. We are not liable for decisions made based on
                      tool outputs, business outcomes, career choices, or any consequences arising from your use of the
                      platform. Use the tools at your own discretion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use Gaurab Labs only for legitimate, lawful purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>For personal self-assessment and career development</li>
              <li>For business analysis and strategic planning</li>
              <li>For educational purposes (including academic work)</li>
              <li>For professional team building and organizational development</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You agree <strong>NOT</strong> to use the platform to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Assess or profile others without their consent</li>
              <li>Use results to discriminate, harm, or exploit individuals</li>
              <li>Attempt to break, hack, or reverse-engineer the platform</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content, tools, frameworks, and designs on Gaurab Labs are the intellectual property of Gaurab Labs or
              licensed to us. You may:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Use the tools for personal and educational purposes</li>
              <li>Export and print your assessment results and analyses</li>
              <li>Share your PDF exports freely</li>
              <li>Reference the frameworks in your own work (with attribution)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You may <strong>NOT</strong> copy, reproduce, modify, or redistribute the platform, tools, or proprietary
              content without permission.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>To the fullest extent permitted by law:</strong> Gaurab Labs, its creators, and its
              representatives are not liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of the platform, including but not limited to: business losses, lost profits, lost
              opportunities, reputational harm, or personal injury.
            </p>
          </CardContent>
        </Card>

        {/* Changes & Termination */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Changes & Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We reserve the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Modify these terms at any time with notice</li>
              <li>Update or discontinue any tools or features</li>
              <li>Suspend access for violation of these terms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Continued use of the platform following changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="glass-card-strong">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These terms are governed by the laws of Nepal. Any disputes arising shall be subject to the jurisdiction
              of Nepali courts.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Last Updated:</strong> January 2025
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Questions about these terms?</p>
          <a href="mailto:paudelg97@gmail.com" className="text-primary hover:underline font-medium">
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
