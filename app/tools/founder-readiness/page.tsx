"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Rocket, Target, Users, DollarSign, Brain, Shield, Zap } from "lucide-react"
import { ScoreRing } from "@/components/ui/score-ring"
import { InsightCard } from "@/components/ui/insight-card"
import { exportToPDF } from "@/lib/pdf-export"

interface DimensionScore {
  key: string
  label: string
  icon: typeof Rocket
  score: number
  description: string
  questions: { text: string; value: number }[]
}

const dimensions: DimensionScore[] = [
  {
    key: "vision",
    label: "Vision & Purpose",
    icon: Target,
    score: 0,
    description: "Clarity of your business idea and long-term goals",
    questions: [
      { text: "I have a clear, specific business idea I'm passionate about", value: 5 },
      { text: "I can articulate my unique value proposition in one sentence", value: 5 },
      { text: "I understand the problem my business will solve", value: 5 },
    ],
  },
  {
    key: "resilience",
    label: "Resilience & Grit",
    icon: Shield,
    score: 0,
    description: "Your ability to persist through challenges and setbacks",
    questions: [
      { text: "I bounce back quickly from failures and rejections", value: 5 },
      { text: "I can work productively under high stress and uncertainty", value: 5 },
      { text: "I've overcome significant obstacles in past projects", value: 5 },
    ],
  },
  {
    key: "financial",
    label: "Financial Preparedness",
    icon: DollarSign,
    score: 0,
    description: "Your financial runway and comfort with financial risk",
    questions: [
      { text: "I have 6+ months of personal financial runway", value: 5 },
      { text: "I understand basic financial statements and metrics", value: 5 },
      { text: "I'm comfortable with financial uncertainty and delayed income", value: 5 },
    ],
  },
  {
    key: "skills",
    label: "Skills & Experience",
    icon: Brain,
    score: 0,
    description: "Relevant expertise and industry knowledge",
    questions: [
      { text: "I have domain expertise in my target industry", value: 5 },
      { text: "I have experience leading projects or teams", value: 5 },
      { text: "I'm comfortable with sales, marketing, or product development", value: 5 },
    ],
  },
  {
    key: "network",
    label: "Network & Support",
    icon: Users,
    score: 0,
    description: "Access to mentors, advisors, and support systems",
    questions: [
      { text: "I have mentors or advisors who can guide me", value: 5 },
      { text: "I know potential customers I can reach for feedback", value: 5 },
      { text: "I have family/friend support for this venture", value: 5 },
    ],
  },
  {
    key: "mindset",
    label: "Growth Mindset",
    icon: Zap,
    score: 0,
    description: "Your openness to learning and adapting",
    questions: [
      { text: "I actively seek feedback, even when it's critical", value: 5 },
      { text: "I'm willing to pivot if the market demands it", value: 5 },
      { text: "I invest time in continuous learning and skill development", value: 5 },
    ],
  },
]

export default function FounderReadinessPage() {
  const [currentDimension, setCurrentDimension] = useState(0)
  const [scores, setScores] = useState<Record<string, number[]>>(
    Object.fromEntries(dimensions.map((d) => [d.key, d.questions.map(() => 3)])),
  )
  const [showResults, setShowResults] = useState(false)

  const currentDim = dimensions[currentDimension]

  const handleScoreChange = (questionIndex: number, value: number[]) => {
    setScores((prev) => ({
      ...prev,
      [currentDim.key]: prev[currentDim.key].map((v, i) => (i === questionIndex ? value[0] : v)),
    }))
  }

  const nextDimension = () => {
    if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevDimension = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1)
    }
  }

  const calculateDimensionScore = (key: string): number => {
    const dimScores = scores[key]
    const total = dimScores.reduce((sum, s) => sum + s, 0)
    const maxPossible = dimScores.length * 5
    return Math.round((total / maxPossible) * 100)
  }

  const calculateOverallScore = (): number => {
    const dimScores = dimensions.map((d) => calculateDimensionScore(d.key))
    return Math.round(dimScores.reduce((sum, s) => sum + s, 0) / dimensions.length)
  }

  const getReadinessLevel = (score: number): { label: string; color: string; description: string } => {
    if (score >= 80)
      return {
        label: "Highly Ready",
        color: "text-emerald-600",
        description: "You're well-prepared to launch. Focus on execution and validation.",
      }
    if (score >= 60)
      return {
        label: "Moderately Ready",
        color: "text-blue-600",
        description: "Good foundation, but address key gaps before fully committing.",
      }
    if (score >= 40)
      return {
        label: "Developing",
        color: "text-amber-600",
        description: "Significant preparation needed. Consider a longer runway or side-project approach.",
      }
    return {
      label: "Early Stage",
      color: "text-red-600",
      description: "Focus on building skills, network, and financial runway before starting.",
    }
  }

  const handleExport = () => {
    exportToPDF("founder-readiness-results", {
      filename: "Founder_Readiness_Assessment",
      title: "Founder Readiness Assessment",
    })
  }

  const handleReset = () => {
    setScores(Object.fromEntries(dimensions.map((d) => [d.key, d.questions.map(() => 3)])))
    setCurrentDimension(0)
    setShowResults(false)
  }

  if (showResults) {
    const overallScore = calculateOverallScore()
    const readinessLevel = getReadinessLevel(overallScore)
    const dimensionScores = dimensions.map((d) => ({
      ...d,
      score: calculateDimensionScore(d.key),
    }))
    const strengths = dimensionScores.filter((d) => d.score >= 70).sort((a, b) => b.score - a.score)
    const gaps = dimensionScores.filter((d) => d.score < 60).sort((a, b) => a.score - b.score)

    return (
      <ToolLayout
        title="Founder Readiness Score"
        description="Your entrepreneurial readiness assessment"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
        category="career"
      >
        <div id="founder-readiness-results" className="space-y-6">
          {/* Overall Score */}
          <Card className="glass-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50 text-center pb-4">
              <CardTitle className="text-foreground">Your Founder Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                <ScoreRing score={overallScore} size={180} strokeWidth={14} color="auto" animate />
                <div className="text-center">
                  <p className={`text-xl sm:text-2xl font-bold ${readinessLevel.color}`}>{readinessLevel.label}</p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">{readinessLevel.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Readiness Dimensions</CardTitle>
              <CardDescription>Your scores across 6 key entrepreneurial dimensions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dimensionScores.map((dim) => {
                const Icon = dim.icon
                const scoreColor =
                  dim.score >= 70
                    ? "bg-emerald-500"
                    : dim.score >= 50
                      ? "bg-blue-500"
                      : dim.score >= 30
                        ? "bg-amber-500"
                        : "bg-red-500"
                return (
                  <div key={dim.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{dim.label}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{dim.score}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-secondary/50 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColor} transition-all duration-1000`}
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{dim.description}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strengths.length > 0 && (
              <InsightCard type="success" title="Your Strengths">
                <ul className="space-y-1 mt-2">
                  {strengths.map((s) => (
                    <li key={s.key} className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="text-emerald-600 font-bold">{s.score}%</span>
                    </li>
                  ))}
                </ul>
              </InsightCard>
            )}
            {gaps.length > 0 && (
              <InsightCard type="warning" title="Areas to Develop">
                <ul className="space-y-1 mt-2">
                  {gaps.map((g) => (
                    <li key={g.key} className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{g.label}</span>
                      <span className="text-amber-600 font-bold">{g.score}%</span>
                    </li>
                  ))}
                </ul>
              </InsightCard>
            )}
          </div>

          {/* Recommendations */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Rocket className="h-5 w-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {overallScore >= 70 ? (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    You're in a strong position to start your venture. Focus on:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">1.</span> Validating your idea with potential customers before
                      building
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">2.</span> Setting clear milestones for the first 90 days
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">3.</span> Building a minimum viable product (MVP) quickly
                    </li>
                  </ul>
                </div>
              ) : overallScore >= 50 ? (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">You have a solid foundation. Before fully committing:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">1.</span> Address your lowest-scoring dimensions first
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">2.</span> Consider starting as a side project while employed
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">3.</span> Build your network by attending startup events
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">Focus on building your entrepreneurial foundation:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">1.</span> Extend your financial runway to 12+ months
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">2.</span> Gain industry experience through employment first
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">3.</span> Find a mentor who has built a similar business
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">4.</span> Work on small projects to build resilience
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  const Icon = currentDim.icon

  return (
    <ToolLayout
      title="Founder Readiness Score"
      description="Evaluate your entrepreneurial readiness across key dimensions"
      category="career"
    >
      <StepIndicator
        currentStep={currentDimension + 1}
        totalSteps={dimensions.length}
        labels={dimensions.map((d) => d.label)}
      />

      <Card className="glass-card border-border/50 animate-scale-in">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">{currentDim.label}</CardTitle>
              <CardDescription>{currentDim.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {currentDim.questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <Label className="text-sm sm:text-base text-foreground leading-relaxed">{question.text}</Label>
              <div className="space-y-2">
                <Slider
                  value={[scores[currentDim.key][index]]}
                  onValueChange={(value) => handleScoreChange(index, value)}
                  min={1}
                  max={5}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Strongly Disagree</span>
                  <span>Neutral</span>
                  <span>Strongly Agree</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevDimension}
          disabled={currentDimension === 0}
          className="gap-2 glass-card hover:bg-secondary/80 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextDimension} className="gap-2 shadow-lg">
          {currentDimension === dimensions.length - 1 ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
