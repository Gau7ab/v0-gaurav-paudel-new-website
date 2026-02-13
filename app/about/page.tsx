import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Users, Globe, Lightbulb, Mail, MapPin, Code } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-teal.png"
              alt="Gaurab Labs"
              width={280}
              height={96}
              className="h-28 w-auto object-contain"
            />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            About Gaurab Labs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A decision-intelligence platform focused on turning complex thinking into clear direction.
          </p>
        </div>

        {/* Mission */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Gaurab Labs exists at the intersection of business strategy, psychology, and technology. We build
                  consulting-grade tools that empower individuals and organizations to make smarter decisions—without
                  barriers, without complexity, without compromise.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded by Om Prakash Paudel Gaurav, our platform serves students, founders, consultants, and
                  professionals who need structured frameworks to analyze deeply, plan strategically, and decide
                  confidently. Every tool produces clean, exportable reports suitable for presentations, academic work,
                  or personal development.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All processing happens in your browser. We do not store, transmit, or have access to any data you enter.
                Your analysis results stay with you.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Research-Backed</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our tools are built on proven frameworks—from classic business strategy models to validated psychometric
                assessments used in professional settings.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Accessible to All</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No logins, no subscriptions, no hidden costs. Professional-grade tools should be available to everyone
                who needs them, regardless of budget.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Made in Nepal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Built with care from Bharatpur, Chitwan, serving a global audience. We are committed to creating
                world-class tools from South Asia.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Design & Development Credit Section */}
        <Card className="glass-card-strong mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">Design & Development</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gaurab Labs is designed and developed by{" "}
                  <a
                    href="https://omgaurav.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Om Prakash Paudel Gaurav
                  </a>
                  . Built with a focus on clean architecture, thoughtful user experience, and consulting-grade output
                  quality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card className="glass-card-strong mb-8">
          <CardContent className="p-6 sm:p-8">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">Bharatpur, Chitwan, Nepal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a href="mailto:paudelg97@gmail.com" className="text-sm text-primary hover:underline">
                    paudelg97@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="glass-card border-amber-200/50 bg-amber-50/30">
          <CardContent className="p-6">
            <h3 className="font-heading font-semibold text-foreground mb-2">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All tools provided on Gaurab Labs are for educational and self-assessment purposes only. The psychology
              assessments are not clinical diagnostic tools and should not be used as substitutes for professional
              psychological evaluation. Business analysis tools provide frameworks for thinking—actual business
              decisions should involve professional consultation where appropriate.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
