"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Download,
  RefreshCcw,
  Rocket,
  Eye,
  Zap,
  Shield,
  Users,
  Brain,
  Heart,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  text: string
  dimension: "vision" | "execution" | "risk" | "leadership" | "financial" | "resilience"
  type: "likert" | "scenario"
  options?: { value: number; label: string }[]
}

const questions: Question[] = [
  // Vision & Opportunity Recognition (6 questions)
  {
    id: 1,
    text: "I can clearly articulate a compelling vision that others find inspiring.",
    dimension: "vision",
    type: "likert",
  },
  {
    id: 2,
    text: "I regularly identify market gaps and untapped opportunities before others.",
    dimension: "vision",
    type: "likert",
  },
  {
    id: 3,
    text: "I can envision how technology and market trends will evolve over the next 5 years.",
    dimension: "vision",
    type: "likert",
  },
  {
    id: 4,
    text: "I have a specific problem I'm passionate about solving for a defined audience.",
    dimension: "vision",
    type: "likert",
  },
  {
    id: 5,
    text: "I can pivot my vision when market feedback suggests a different direction.",
    dimension: "vision",
    type: "likert",
  },
  {
    id: 6,
    text: "I understand my target customer's pain points deeply and personally.",
    dimension: "vision",
    type: "likert",
  },

  // Execution & Discipline (6 questions)
  {
    id: 7,
    text: "I consistently complete projects I start, even when enthusiasm fades.",
    dimension: "execution",
    type: "likert",
  },
  {
    id: 8,
    text: "I can break down complex goals into actionable daily tasks.",
    dimension: "execution",
    type: "likert",
  },
  {
    id: 9,
    text: "I maintain focus on priorities even when exciting new opportunities arise.",
    dimension: "execution",
    type: "likert",
  },
  {
    id: 10,
    text: "I have successfully shipped a product, project, or initiative from idea to completion.",
    dimension: "execution",
    type: "likert",
  },
  {
    id: 11,
    text: "I hold myself accountable to deadlines without external pressure.",
    dimension: "execution",
    type: "likert",
  },
  {
    id: 12,
    text: "I can operate effectively in ambiguous situations without clear instructions.",
    dimension: "execution",
    type: "likert",
  },

  // Risk & Uncertainty Tolerance (5 questions)
  { id: 13, text: "I'm comfortable making decisions with incomplete information.", dimension: "risk", type: "likert" },
  { id: 14, text: "Financial uncertainty doesn't paralyze my decision-making.", dimension: "risk", type: "likert" },
  {
    id: 15,
    text: "I can handle the possibility of public failure without it affecting my self-worth.",
    dimension: "risk",
    type: "likert",
  },
  {
    id: 16,
    text: "I would leave a stable job for an opportunity with high potential but uncertain outcomes.",
    dimension: "risk",
    type: "likert",
  },
  { id: 17, text: "I view setbacks as data points rather than personal failures.", dimension: "risk", type: "likert" },

  // Leadership & Team Building (5 questions)
  {
    id: 18,
    text: "I can attract talented people to work on my ideas, even without offering market-rate compensation.",
    dimension: "leadership",
    type: "likert",
  },
  {
    id: 19,
    text: "I give constructive feedback effectively and handle receiving it well.",
    dimension: "leadership",
    type: "likert",
  },
  {
    id: 20,
    text: "I can delegate important tasks and trust others to execute them.",
    dimension: "leadership",
    type: "likert",
  },
  {
    id: 21,
    text: "People have followed my lead on significant projects or initiatives before.",
    dimension: "leadership",
    type: "likert",
  },
  {
    id: 22,
    text: "I can navigate conflicts and difficult conversations professionally.",
    dimension: "leadership",
    type: "likert",
  },

  // Financial & Strategic Awareness (6 questions)
  {
    id: 23,
    text: "I understand basic financial statements (P&L, cash flow, balance sheet).",
    dimension: "financial",
    type: "likert",
  },
  {
    id: 24,
    text: "I can estimate market size and create realistic revenue projections.",
    dimension: "financial",
    type: "likert",
  },
  {
    id: 25,
    text: "I understand different funding options and when each is appropriate.",
    dimension: "financial",
    type: "likert",
  },
  {
    id: 26,
    text: "I can make trade-off decisions between growth and profitability.",
    dimension: "financial",
    type: "likert",
  },
  {
    id: 27,
    text: "I track my personal finances carefully and maintain financial discipline.",
    dimension: "financial",
    type: "likert",
  },
  {
    id: 28,
    text: "I understand unit economics and customer acquisition costs conceptually.",
    dimension: "financial",
    type: "likert",
  },

  // Emotional Resilience (5 questions)
  {
    id: 29,
    text: "I recover quickly from disappointments and maintain my motivation.",
    dimension: "resilience",
    type: "likert",
  },
  {
    id: 30,
    text: "I can handle extended periods of stress without it affecting my health or relationships.",
    dimension: "resilience",
    type: "likert",
  },
  {
    id: 31,
    text: "I have a support system (mentors, peers, family) that helps me through challenges.",
    dimension: "resilience",
    type: "likert",
  },
  {
    id: 32,
    text: "I maintain perspective when things go wrong and don't catastrophize.",
    dimension: "resilience",
    type: "likert",
  },
  {
    id: 33,
    text: "I've overcome significant personal or professional challenges in the past.",
    dimension: "resilience",
    type: "likert",
  },
]

const dimensionInfo: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  vision: { label: "Vision & Opportunity", icon: <Eye className="h-5 w-5" />, color: "#7c3aed" },
  execution: { label: "Execution & Discipline", icon: <Zap className="h-5 w-5" />, color: "#0f766e" },
  risk: { label: "Risk Tolerance", icon: <Shield className="h-5 w-5" />, color: "#dc2626" },
  leadership: { label: "Leadership & Team", icon: <Users className="h-5 w-5" />, color: "#2563eb" },
  financial: { label: "Financial Awareness", icon: <Brain className="h-5 w-5" />, color: "#059669" },
  resilience: { label: "Emotional Resilience", icon: <Heart className="h-5 w-5" />, color: "#db2777" },
}

const readinessLevels = [
  {
    min: 0,
    max: 40,
    level: "Exploring",
    description:
      "You're in the early stages of your entrepreneurial journey. Focus on building skills, gaining experience, and validating your ideas before taking the leap.",
    recommendation: "Consider joining a startup, launching a side project, or finding a mentor before going full-time.",
  },
  {
    min: 41,
    max: 70,
    level: "Early-Ready",
    description:
      "You have solid foundations but some areas need strengthening. You could succeed with the right support system, co-founder, or focused development.",
    recommendation:
      "Address your gap areas, build your network, and consider starting with a lower-risk venture or side business.",
  },
  {
    min: 71,
    max: 100,
    level: "Scale-Ready",
    description:
      "You demonstrate strong founder characteristics across multiple dimensions. You're well-positioned to pursue ambitious ventures.",
    recommendation:
      "Focus on finding the right opportunity, assembling a complementary team, and taking calculated action.",
  },
]

export default function FounderIQPage() {
  const [step, setStep] = useState<"intro" | "assessment" | "loading" | "results">("intro")
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<{
    totalScore: number
    dimensionScores: Record<string, { score: number; max: number; percentage: number }>
    level: (typeof readinessLevels)[0]
    strengths: string[]
    risks: string[]
  } | null>(null)

  const sections = useMemo(
    () => [
      { dimension: "vision", questions: questions.filter((q) => q.dimension === "vision") },
      { dimension: "execution", questions: questions.filter((q) => q.dimension === "execution") },
      { dimension: "risk", questions: questions.filter((q) => q.dimension === "risk") },
      { dimension: "leadership", questions: questions.filter((q) => q.dimension === "leadership") },
      { dimension: "financial", questions: questions.filter((q) => q.dimension === "financial") },
      { dimension: "resilience", questions: questions.filter((q) => q.dimension === "resilience") },
    ],
    [],
  )

  const currentSectionData = sections[currentSection]
  const sectionProgress = Math.round(((currentSection + 1) / sections.length) * 100)
  const questionsAnsweredInSection = currentSectionData.questions.filter((q) => answers[q.id] !== undefined).length
  const isSectionComplete = questionsAnsweredInSection === currentSectionData.questions.length

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    setStep("loading")

    setTimeout(() => {
      const dimensionScores: Record<string, { score: number; max: number; percentage: number }> = {}

      sections.forEach((section) => {
        const maxScore = section.questions.length * 5
        const score = section.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
        const percentage = Math.round((score / maxScore) * 100)
        dimensionScores[section.dimension] = { score, max: maxScore, percentage }
      })

      const totalMax = questions.length * 5
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)
      const totalPercentage = Math.round((totalScore / totalMax) * 100)

      const level =
        readinessLevels.find((l) => totalPercentage >= l.min && totalPercentage <= l.max) || readinessLevels[0]

      const sortedDimensions = Object.entries(dimensionScores).sort(([, a], [, b]) => b.percentage - a.percentage)
      const strengths = sortedDimensions.slice(0, 2).map(([dim]) => dim)
      const risks = sortedDimensions.slice(-2).map(([dim]) => dim)

      setResults({ totalScore: totalPercentage, dimensionScores, level, strengths, risks })
      setStep("results")
    }, 600)
  }

  const resetAssessment = () => {
    setStep("intro")
    setCurrentSection(0)
    setAnswers({})
    setResults(null)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <span className="brand-badge">Founder Assessment</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">FounderIQ™</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Evaluate your readiness to start, lead, and scale a venture. Understand your entrepreneurial strengths and
            growth areas.
          </p>
        </div>

        {/* Intro Screen */}
        {step === "intro" && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card className="glass-card-strong">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-heading">Are You Ready to Build?</CardTitle>
                <CardDescription className="text-base mt-2">
                  This assessment evaluates your founder potential across six critical dimensions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(dimensionInfo).map(([key, info]) => (
                    <div key={key} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${info.color}15`, color: info.color }}
                        >
                          {info.icon}
                        </div>
                        <span className="font-medium text-sm">{info.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold">What You'll Learn:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Your Founder Readiness Score (0-100)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Readiness level: Exploring, Early-Ready, or Scale-Ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Your strongest entrepreneurial capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Areas that need development before launching</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">33 questions across 6 sections | ~12 minutes</p>
                  <Button size="lg" onClick={() => setStep("assessment")} className="min-w-[200px]">
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Assessment Screen */}
        {step === "assessment" && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card className="glass-card-strong">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${dimensionInfo[currentSectionData.dimension].color}15`,
                        color: dimensionInfo[currentSectionData.dimension].color,
                      }}
                    >
                      {dimensionInfo[currentSectionData.dimension].icon}
                    </div>
                    <div>
                      <p className="font-semibold">{dimensionInfo[currentSectionData.dimension].label}</p>
                      <p className="text-sm text-muted-foreground">
                        Section {currentSection + 1} of {sections.length}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {questionsAnsweredInSection}/{currentSectionData.questions.length} answered
                  </span>
                </div>
                <Progress value={sectionProgress} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSectionData.questions.map((question, index) => (
                  <div key={question.id} className="p-4 rounded-xl bg-muted/20 space-y-4">
                    <p className="font-medium">
                      <span className="text-primary mr-2">{index + 1}.</span>
                      {question.text}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 1, label: "Strongly Disagree" },
                        { value: 2, label: "Disagree" },
                        { value: 3, label: "Neutral" },
                        { value: 4, label: "Agree" },
                        { value: 5, label: "Strongly Agree" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(question.id, option.value)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            answers[question.id] === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-background border border-border hover:border-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={prevSection} disabled={currentSection === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentSection < sections.length - 1 ? (
                    <Button onClick={nextSection} disabled={!isSectionComplete}>
                      Next Section
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={calculateResults} disabled={Object.keys(answers).length < questions.length}>
                      View Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading Screen */}
        {step === "loading" && (
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <Card className="glass-card-strong p-12">
              <div className="space-y-6">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-muted" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Calculating Your Founder Readiness</h3>
                  <p className="text-muted-foreground">Analyzing entrepreneurial dimensions...</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results Screen */}
        {step === "results" && results && (
          <div className="space-y-8 animate-fade-in">
            {/* Print Header */}
            <div className="hidden print:flex print-header items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/logo-teal.png" alt="Gaurab Labs" className="h-10 w-auto" />
                <div>
                  <h2 className="font-bold text-lg">FounderIQ™ Readiness Report</h2>
                  <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Score Card */}
            <Card className="glass-card-strong overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-[200px,1fr] gap-8 items-center">
                  {/* Score Ring */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-muted/30"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * results.totalScore) / 100}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0f766e" />
                            <stop offset="100%" stopColor="#5eead4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{results.totalScore}</span>
                        <span className="text-sm text-muted-foreground">out of 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                        style={{
                          backgroundColor:
                            results.level.level === "Scale-Ready"
                              ? "#059669"
                              : results.level.level === "Early-Ready"
                                ? "#f59e0b"
                                : "#6b7280",
                          color: "white",
                        }}
                      >
                        {results.level.level}
                      </div>
                      <h2 className="text-2xl font-bold font-heading">Founder Readiness Score</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{results.level.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dimension Breakdown */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Dimension Analysis</CardTitle>
                <CardDescription>Your scores across six entrepreneurial dimensions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(results.dimensionScores).map(([dim, data]) => (
                  <div key={dim} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${dimensionInfo[dim].color}15`, color: dimensionInfo[dim].color }}
                        >
                          {dimensionInfo[dim].icon}
                        </div>
                        <span className="font-medium">{dimensionInfo[dim].label}</span>
                      </div>
                      <span className="font-semibold">{data.percentage}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${data.percentage}%`, backgroundColor: dimensionInfo[dim].color }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths & Risks */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg text-success">Strength Zones</CardTitle>
                  <CardDescription>Your top entrepreneurial capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.strengths.map((dim) => (
                    <div key={dim} className="flex items-center gap-3 p-3 rounded-xl bg-success/10">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${dimensionInfo[dim].color}15`, color: dimensionInfo[dim].color }}
                      >
                        {dimensionInfo[dim].icon}
                      </div>
                      <div>
                        <p className="font-medium">{dimensionInfo[dim].label}</p>
                        <p className="text-sm text-muted-foreground">
                          {results.dimensionScores[dim].percentage}% score
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg text-warning">Risk Zones</CardTitle>
                  <CardDescription>Areas that need development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.risks.map((dim) => (
                    <div key={dim} className="flex items-center gap-3 p-3 rounded-xl bg-warning/10">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${dimensionInfo[dim].color}15`, color: dimensionInfo[dim].color }}
                      >
                        {dimensionInfo[dim].icon}
                      </div>
                      <div>
                        <p className="font-medium">{dimensionInfo[dim].label}</p>
                        <p className="text-sm text-muted-foreground">
                          {results.dimensionScores[dim].percentage}% score
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="insight-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Personalized Recommendation</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{results.level.recommendation}</p>

                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-background/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Best Stage For You</p>
                    <p className="font-semibold">
                      {results.totalScore >= 71
                        ? "Growth / Scale"
                        : results.totalScore >= 41
                          ? "MVP / Validation"
                          : "Ideation / Learning"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Recommended Path</p>
                    <p className="font-semibold">
                      {results.totalScore >= 71
                        ? "Seek Funding & Scale"
                        : results.totalScore >= 41
                          ? "Bootstrap & Validate"
                          : "Build Skills First"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Co-Founder Need</p>
                    <p className="font-semibold">
                      {results.risks.includes("execution") || results.risks.includes("financial")
                        ? "Strongly Recommended"
                        : "Optional"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Print Footer */}
            <div className="hidden print:block print-footer">
              <p>Generated by Gaurab Labs | www.gaurablabs.com | paudelg97@gmail.com</p>
              <p className="mt-1">
                This assessment is for self-reflection purposes. Entrepreneurial success depends on many factors beyond
                this assessment.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center no-print">
              <Button onClick={handlePrint} size="lg">
                <Download className="mr-2 h-4 w-4" />
                Generate Founder Readiness Report
              </Button>
              <Button variant="outline" onClick={resetAssessment} size="lg">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retake Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
