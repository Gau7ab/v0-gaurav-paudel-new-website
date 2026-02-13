"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart3, Users, Lightbulb } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Research & Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the research frameworks, methodologies, and insights behind Gaurab Labs tools.
          </p>
        </div>

        {/* Business Frameworks */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary" />
            Business Strategy Frameworks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">SWOT Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Based on Albert Humphrey's classic framework for evaluating internal strengths/weaknesses and external
                  opportunities/threats. Essential for strategic planning and competitive positioning.
                </p>
                <a href="/tools/insightswot" className="text-primary hover:underline text-sm font-medium">
                  Try InsightSWOT™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Business Model Canvas</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Developed by Alexander Osterwalder, this framework provides a visual blueprint for designing,
                  analyzing, and pivoting business models. Used globally by entrepreneurs and strategists.
                </p>
                <a href="/tools/modelcanvas" className="text-primary hover:underline text-sm font-medium">
                  Try ModelCanvas™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Porter's Five Forces</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Michael Porter's industry analysis framework examining competitive rivalry, supplier power, buyer
                  power, threat of substitutes, and threat of new entrants for comprehensive market assessment.
                </p>
                <a href="/tools/marketforce" className="text-primary hover:underline text-sm font-medium">
                  Try MarketForce™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">PESTLE Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Environmental scanning framework examining Political, Economic, Social, Technological, Legal, and
                  Environmental factors. Critical for long-term strategic planning and risk identification.
                </p>
                <a href="/tools/risklens" className="text-primary hover:underline text-sm font-medium">
                  Try RiskLens™ →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Psychology Assessments */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            Psychometric Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Big Five Personality (OCEAN)</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Widely accepted model measuring Openness, Conscientiousness, Extraversion, Agreeableness, and
                  Neuroticism. Extensively validated across cultures and used in organizational psychology, recruitment,
                  and career development.
                </p>
                <a href="/tools/personaiq" className="text-primary hover:underline text-sm font-medium">
                  Try PersonaIQ™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">MBTI-Style Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Based on Jung's cognitive functions, identifying 16 personality types. Popular in career counseling,
                  team building, and self-awareness. Our assessment provides detailed type descriptions and career
                  implications.
                </p>
                <a href="/tools/typescope" className="text-primary hover:underline text-sm font-medium">
                  Try TypeScope™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Leadership Style Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Evaluates 5 leadership styles (Directive, Coaching, Democratic, Visionary, Delegative) based on
                  situational leadership research. Helps leaders understand their default style and develop flexibility.
                </p>
                <a href="/tools/leadstyle" className="text-primary hover:underline text-sm font-medium">
                  Try LeadStyle™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Stress & Burnout Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Measures stress factors across workload, control, recovery, and emotional exhaustion dimensions. Based
                  on occupational stress research. Provides personalized coping strategies and wellness recommendations.
                </p>
                <a href="/tools/stresscheck" className="text-primary hover:underline text-sm font-medium">
                  Try StressCheck™ →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Planning & Analysis */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            Planning & Career Intelligence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">SMART Goal Framework</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Converts vague aspirations into Specific, Measurable, Achievable, Relevant, Time-bound objectives.
                  Proven methodology for effective goal setting across personal and organizational contexts.
                </p>
                <a href="/tools/growthmap" className="text-primary hover:underline text-sm font-medium">
                  Try GrowthMap™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Career Fit Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Matches your natural preferences and strengths against career categories. Uses behavioral indicators
                  to recommend career paths aligned with your personality and abilities.
                </p>
                <a href="/tools/careerfit" className="text-primary hover:underline text-sm font-medium">
                  Try CareerFit™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Founder Readiness Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Evaluates entrepreneurial readiness across 6 dimensions: vision clarity, execution capability, risk
                  tolerance, leadership potential, financial literacy, and resilience. Guides startup readiness
                  decisions.
                </p>
                <a href="/tools/founderiq" className="text-primary hover:underline text-sm font-medium">
                  Try FounderIQ™ →
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Team Dynamics Mapping</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Analyzes team composition and personality alignment. Identifies complementary strengths, potential
                  friction points, and optimization opportunities for better team cohesion and performance.
                </p>
                <a href="/tools/teamsync" className="text-primary hover:underline text-sm font-medium">
                  Try TeamSync™ →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Research Note */}
        <Card className="glass-card-strong mt-12 border-primary/30">
          <CardContent className="p-6 sm:p-8">
            <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Research & Methodology
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              All Gaurab Labs tools are based on peer-reviewed research, established frameworks, and validated
              assessment methodologies. Business frameworks are sourced from leading business schools and strategic
              consultants. Psychometric assessments follow established personality and organizational psychology
              research.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              However, assessments are self-report based and should be used alongside professional consultation where
              important decisions are being made. We continuously review and update our tools as new research emerges.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
