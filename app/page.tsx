import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  LayoutGrid,
  TrendingUp,
  Map,
  Brain,
  User,
  Briefcase,
  Users,
  ArrowRight,
  FileText,
  Shield,
  Lightbulb,
  Calculator,
  Filter,
  Heart,
  Rocket,
  UsersRound,
  Globe,
  Zap,
} from "lucide-react"

const strategyTools = [
  {
    name: "InsightSWOT™",
    href: "/tools/insightswot",
    description: "Strategic situation analysis with actionable insights",
    icon: Target,
    featured: true,
  },
  {
    name: "ModelCanvas™",
    href: "/tools/modelcanvas",
    description: "Design and analyze your business model with clarity",
    icon: LayoutGrid,
    featured: true,
  },
  {
    name: "MarketForce™",
    href: "/tools/marketforce",
    description: "Industry & competition analysis using Porter's framework",
    icon: TrendingUp,
    featured: true,
  },
  {
    name: "GrowthMap™",
    href: "/tools/growthmap",
    description: "Transform vague goals into SMART action plans",
    icon: Map,
    featured: true,
  },
  {
    name: "RiskLens™",
    href: "/tools/risklens",
    description: "PESTLE analysis for macro-environmental factors",
    icon: Globe,
  },
  {
    name: "ValueProp™",
    href: "/tools/valueprop",
    description: "Align your products with customer needs",
    icon: Lightbulb,
  },
  {
    name: "BreakPoint™",
    href: "/tools/breakpoint",
    description: "Calculate your break-even point and profitability",
    icon: Calculator,
  },
  {
    name: "FunnelFlow™",
    href: "/tools/funnelflow",
    description: "Design your customer journey from awareness to retention",
    icon: Filter,
  },
]

const careerTools = [
  {
    name: "PersonaIQ™",
    href: "/tools/personaiq",
    description: "Big Five personality assessment for career insights",
    icon: Brain,
    featured: true,
  },
  {
    name: "TypeScope™",
    href: "/tools/typescope",
    description: "Understand how you think, decide, and interact",
    icon: User,
    featured: true,
  },
  {
    name: "CareerFit™",
    href: "/tools/careerfit",
    description: "Career recommendation engine based on your profile",
    icon: Briefcase,
    featured: true,
  },
  {
    name: "LeadStyle™",
    href: "/tools/leadstyle",
    description: "Identify your natural leadership approach",
    icon: Users,
  },
  {
    name: "StressCheck™",
    href: "/tools/stresscheck",
    description: "Assess stress levels and get coping strategies",
    icon: Heart,
  },
  {
    name: "FounderIQ™",
    href: "/tools/founderiq",
    description: "Evaluate your entrepreneurial readiness",
    icon: Rocket,
  },
  {
    name: "TeamSync™",
    href: "/tools/teamsync",
    description: "Map team dynamics and optimize roles",
    icon: UsersRound,
  },
]

const howItWorks = [
  { step: 1, title: "Select a Tool", description: "Choose from strategy or career intelligence assessments" },
  { step: 2, title: "Answer Questions", description: "Complete structured, guided inputs at your own pace" },
  { step: 3, title: "Get Insights", description: "Receive instant visual reports and strategic interpretations" },
  { step: 4, title: "Export Report", description: "Download professional PDF reports ready for presentations" },
]

const whyGaurabLabs = [
  {
    icon: Shield,
    title: "Consulting Frameworks",
    description: "Built on proven methodologies used by top consultants",
  },
  { icon: Target, title: "Real-World Focus", description: "Designed for practical decision-making, not just theory" },
  { icon: Zap, title: "Instant Intelligence", description: "Get actionable insights in minutes, not hours" },
  { icon: FileText, title: "Professional Reports", description: "Export clean, presentation-ready PDF documents" },
]

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/logo-teal.png"
                alt="Gaurab Labs"
                width={280}
                height={96}
                className="h-24 sm:h-32 w-auto object-contain"
                priority
              />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.15]">
              Strategic Intelligence for <span className="text-gradient">Smarter Decisions</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
              Consulting-grade business frameworks and validated psychometric assessments built to help you analyze
              deeply, plan strategically, and make confident decisions.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="#strategy-tools">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90 h-12 px-6"
                >
                  Explore Strategy Tools <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#career-tools">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto glass-card hover:bg-secondary/80 bg-transparent h-12 px-6"
                >
                  Career Intelligence Tests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-6 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            Used by{" "}
            <span className="font-medium text-foreground">students, founders, consultants, and professionals</span> to
            think clearly and decide smarter.
          </p>
        </div>
      </section>

      {/* Strategy Tools Section */}
      <section id="strategy-tools" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
              Decision Frameworks That Actually Work
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl lg:mx-0 mx-auto">
              Structured, proven business tools designed to break complexity into clarity — no fluff, no theory
              overload.
            </p>
          </div>

          {/* Featured Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {strategyTools
              .filter((t) => t.featured)
              .map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full glass-card tool-card hover-lift hover-glow border-border/50 transition-all duration-300 group cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-lg text-foreground">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {/* Other Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {strategyTools
              .filter((t) => !t.featured)
              .map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <div className="glass-card rounded-xl p-4 hover-lift transition-all duration-300 group cursor-pointer h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <tool.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <span className="font-medium text-sm text-foreground block">{tool.name}</span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {tool.description.split(" ").slice(0, 3).join(" ")}...
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center lg:text-left">
            <Link href="#strategy-tools">
              <Button variant="outline" className="gap-2 glass-card bg-transparent">
                View All Strategy Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Career Intelligence Section */}
      <section id="career-tools" className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
              Understand Yourself. Choose Better.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl lg:mx-0 mx-auto">
              Scientifically grounded assessments that translate personality, aptitude, and preferences into practical
              career direction.
            </p>
          </div>

          {/* Featured Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {careerTools
              .filter((t) => t.featured)
              .map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full glass-card tool-card hover-lift hover-glow border-border/50 transition-all duration-300 group cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-3 group-hover:from-accent/20 group-hover:to-primary/20 transition-all duration-300">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-lg text-foreground">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {/* Other Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {careerTools
              .filter((t) => !t.featured)
              .map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <div className="glass-card rounded-xl p-4 hover-lift transition-all duration-300 group cursor-pointer h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <tool.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <span className="font-medium text-sm text-foreground block">{tool.name}</span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {tool.description.split(" ").slice(0, 3).join(" ")}...
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center lg:text-left">
            <Link href="#career-tools">
              <Button variant="outline" className="gap-2 glass-card bg-transparent">
                Take an Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              From question to clarity in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-primary/30 to-accent/30" />
                )}
                <div className="text-center">
                  <div className="number-badge mx-auto mb-4">{item.step}</div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gaurab Labs */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
              Why Gaurab Labs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyGaurabLabs.map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 hover-lift transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card-strong rounded-3xl p-8 sm:p-10 lg:p-14 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-teal.png"
                alt="Gaurab Labs"
                width={200}
                height={68}
                className="h-20 w-auto object-contain opacity-90"
              />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4 text-center">
              About Gaurab Labs
            </h2>
            <p className="text-muted-foreground text-center leading-relaxed">
              Gaurab Labs is a decision-intelligence platform focused on turning complex thinking into clear direction.
              Built at the intersection of business strategy, psychology, and technology, it empowers individuals and
              organizations to make smarter decisions through structured frameworks and validated assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="tools" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card-strong rounded-3xl p-8 sm:p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                Ready to Think Smarter?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Sign in to access strategic intelligence tools and career assessments.
              </p>
              <Link href="/login">
                <Button
                  size="lg"
                  className="gap-2 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90 h-12 px-8"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
