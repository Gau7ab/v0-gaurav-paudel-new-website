"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Download, RefreshCcw, Users, Target, MessageSquare, Shield, Zap } from "lucide-react"
import Link from "next/link"

type LeadershipStyle = "directive" | "coaching" | "democratic" | "visionary" | "delegative"

interface Question {
  id: number
  text: string
  dimension: "decision" | "communication" | "motivation" | "conflict" | "risk"
  styles: Record<number, LeadershipStyle>
}

const questions: Question[] = [
  // Decision-making (5 questions)
  {
    id: 1,
    text: "When facing a critical decision, I prefer to gather all team input before proceeding.",
    dimension: "decision",
    styles: { 5: "democratic", 4: "coaching", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 2,
    text: "I believe the leader should make final decisions quickly, even without full consensus.",
    dimension: "decision",
    styles: { 5: "directive", 4: "visionary", 3: "coaching", 2: "democratic", 1: "delegative" },
  },
  {
    id: 3,
    text: "I trust my team members to make important decisions independently.",
    dimension: "decision",
    styles: { 5: "delegative", 4: "democratic", 3: "coaching", 2: "visionary", 1: "directive" },
  },
  {
    id: 4,
    text: "I focus on long-term vision when making strategic choices.",
    dimension: "decision",
    styles: { 5: "visionary", 4: "coaching", 3: "democratic", 2: "directive", 1: "delegative" },
  },
  {
    id: 5,
    text: "I help team members develop their decision-making skills through guided practice.",
    dimension: "decision",
    styles: { 5: "coaching", 4: "democratic", 3: "delegative", 2: "visionary", 1: "directive" },
  },

  // Communication (5 questions)
  {
    id: 6,
    text: "I communicate clear expectations and specific instructions to my team.",
    dimension: "communication",
    styles: { 5: "directive", 4: "coaching", 3: "visionary", 2: "democratic", 1: "delegative" },
  },
  {
    id: 7,
    text: "I prefer open discussions where everyone can share their perspective.",
    dimension: "communication",
    styles: { 5: "democratic", 4: "coaching", 3: "delegative", 2: "visionary", 1: "directive" },
  },
  {
    id: 8,
    text: "I inspire my team by sharing a compelling vision of the future.",
    dimension: "communication",
    styles: { 5: "visionary", 4: "coaching", 3: "democratic", 2: "directive", 1: "delegative" },
  },
  {
    id: 9,
    text: "I provide regular feedback to help team members improve their skills.",
    dimension: "communication",
    styles: { 5: "coaching", 4: "democratic", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 10,
    text: "I communicate goals and let team members figure out the approach.",
    dimension: "communication",
    styles: { 5: "delegative", 4: "visionary", 3: "democratic", 2: "coaching", 1: "directive" },
  },

  // Motivation approach (5 questions)
  {
    id: 11,
    text: "I motivate through clear structure, accountability, and defined outcomes.",
    dimension: "motivation",
    styles: { 5: "directive", 4: "coaching", 3: "visionary", 2: "democratic", 1: "delegative" },
  },
  {
    id: 12,
    text: "I motivate by involving team members in shaping goals and processes.",
    dimension: "motivation",
    styles: { 5: "democratic", 4: "coaching", 3: "delegative", 2: "visionary", 1: "directive" },
  },
  {
    id: 13,
    text: "I motivate by painting an inspiring picture of what we can achieve together.",
    dimension: "motivation",
    styles: { 5: "visionary", 4: "coaching", 3: "democratic", 2: "delegative", 1: "directive" },
  },
  {
    id: 14,
    text: "I motivate by investing in each person's growth and potential.",
    dimension: "motivation",
    styles: { 5: "coaching", 4: "democratic", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 15,
    text: "I motivate by giving autonomy and trusting people to self-manage.",
    dimension: "motivation",
    styles: { 5: "delegative", 4: "democratic", 3: "coaching", 2: "visionary", 1: "directive" },
  },

  // Conflict handling (5 questions)
  {
    id: 16,
    text: "When conflicts arise, I step in quickly to resolve them decisively.",
    dimension: "conflict",
    styles: { 5: "directive", 4: "coaching", 3: "visionary", 2: "democratic", 1: "delegative" },
  },
  {
    id: 17,
    text: "I facilitate open dialogue to help parties find common ground.",
    dimension: "conflict",
    styles: { 5: "democratic", 4: "coaching", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 18,
    text: "I redirect focus to the bigger picture and shared mission during conflicts.",
    dimension: "conflict",
    styles: { 5: "visionary", 4: "coaching", 3: "democratic", 2: "directive", 1: "delegative" },
  },
  {
    id: 19,
    text: "I use conflicts as opportunities to coach individuals on interpersonal skills.",
    dimension: "conflict",
    styles: { 5: "coaching", 4: "democratic", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 20,
    text: "I trust team members to resolve their own conflicts without my intervention.",
    dimension: "conflict",
    styles: { 5: "delegative", 4: "democratic", 3: "coaching", 2: "visionary", 1: "directive" },
  },

  // Risk tolerance (5 questions)
  {
    id: 21,
    text: "I prefer to minimize risk through careful planning and control.",
    dimension: "risk",
    styles: { 5: "directive", 4: "coaching", 3: "democratic", 2: "visionary", 1: "delegative" },
  },
  {
    id: 22,
    text: "I'm comfortable taking calculated risks if the team supports the decision.",
    dimension: "risk",
    styles: { 5: "democratic", 4: "coaching", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 23,
    text: "I embrace bold risks when they align with our transformative vision.",
    dimension: "risk",
    styles: { 5: "visionary", 4: "delegative", 3: "coaching", 2: "democratic", 1: "directive" },
  },
  {
    id: 24,
    text: "I see risks as learning opportunities for team development.",
    dimension: "risk",
    styles: { 5: "coaching", 4: "democratic", 3: "visionary", 2: "delegative", 1: "directive" },
  },
  {
    id: 25,
    text: "I empower team members to take risks and own the outcomes.",
    dimension: "risk",
    styles: { 5: "delegative", 4: "visionary", 3: "coaching", 2: "democratic", 1: "directive" },
  },
]

const styleInfo: Record<
  LeadershipStyle,
  {
    name: string
    description: string
    strengths: string[]
    blindSpots: string[]
    bestFor: string[]
    icon: React.ReactNode
    color: string
  }
> = {
  directive: {
    name: "Directive Leader",
    description:
      "You lead with clarity, structure, and decisive action. You set clear expectations and provide specific guidance to ensure consistent execution.",
    strengths: [
      "Quick decision-making",
      "Clear accountability",
      "Crisis management",
      "Structured environments",
      "Efficient execution",
    ],
    blindSpots: [
      "May limit creativity",
      "Can reduce team autonomy",
      "Risk of micromanagement",
      "May miss diverse perspectives",
    ],
    bestFor: ["Crisis situations", "New or inexperienced teams", "High-stakes projects", "Turnaround scenarios"],
    icon: <Target className="h-6 w-6" />,
    color: "#dc2626",
  },
  coaching: {
    name: "Coaching Leader",
    description:
      "You invest deeply in developing your team's potential. You balance guidance with growth opportunities, helping individuals build lasting capabilities.",
    strengths: [
      "Team development",
      "Long-term thinking",
      "Building trust",
      "Individual growth focus",
      "Skill transfer",
    ],
    blindSpots: [
      "Can be time-intensive",
      "May slow immediate results",
      "Not ideal for urgent situations",
      "Requires patience",
    ],
    bestFor: ["Developing talent", "Building bench strength", "Performance improvement", "Succession planning"],
    icon: <Users className="h-6 w-6" />,
    color: "#0f766e",
  },
  democratic: {
    name: "Democratic Leader",
    description:
      "You value collaboration and collective wisdom. You involve your team in decisions, fostering ownership and leveraging diverse perspectives.",
    strengths: [
      "High team engagement",
      "Diverse input",
      "Strong buy-in",
      "Collaborative culture",
      "Inclusive decisions",
    ],
    blindSpots: [
      "Slower decision process",
      "Can be challenging in crises",
      "Risk of analysis paralysis",
      "May frustrate decisive team members",
    ],
    bestFor: ["Complex problems", "Change initiatives", "Building consensus", "Cross-functional teams"],
    icon: <MessageSquare className="h-6 w-6" />,
    color: "#2563eb",
  },
  visionary: {
    name: "Visionary Leader",
    description:
      "You inspire through a compelling vision of the future. You connect daily work to larger purpose and mobilize teams toward transformative goals.",
    strengths: [
      "Inspiring direction",
      "Strategic thinking",
      "Change leadership",
      "Mobilizing energy",
      "Purpose-driven culture",
    ],
    blindSpots: [
      "May overlook details",
      "Can seem disconnected from daily work",
      "Risk of unrealistic expectations",
      "May move too fast",
    ],
    bestFor: ["Organizational change", "New ventures", "Innovation initiatives", "Turnaround situations"],
    icon: <Zap className="h-6 w-6" />,
    color: "#7c3aed",
  },
  delegative: {
    name: "Delegative Leader",
    description:
      "You trust your team with autonomy and ownership. You provide resources and support while empowering individuals to make decisions and lead initiatives.",
    strengths: ["Empowers teams", "Fosters innovation", "Builds ownership", "Develops leaders", "Scales leadership"],
    blindSpots: ["Can lack direction", "Requires capable team", "May miss coordination needs", "Risk of inconsistency"],
    bestFor: ["Expert teams", "Creative projects", "Mature organizations", "Innovation labs"],
    icon: <Shield className="h-6 w-6" />,
    color: "#059669",
  },
}

const dimensionLabels: Record<string, string> = {
  decision: "Decision-Making",
  communication: "Communication",
  motivation: "Motivation",
  conflict: "Conflict Handling",
  risk: "Risk Tolerance",
}

export default function LeadStylePage() {
  const [step, setStep] = useState<"intro" | "assessment" | "loading" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<{
    scores: Record<LeadershipStyle, number>
    dimensionScores: Record<string, Record<LeadershipStyle, number>>
    primary: LeadershipStyle
    secondary: LeadershipStyle
  } | null>(null)

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: value }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const calculateResults = () => {
    setStep("loading")

    setTimeout(() => {
      const styleScores: Record<LeadershipStyle, number> = {
        directive: 0,
        coaching: 0,
        democratic: 0,
        visionary: 0,
        delegative: 0,
      }

      const dimensionScores: Record<string, Record<LeadershipStyle, number>> = {
        decision: { directive: 0, coaching: 0, democratic: 0, visionary: 0, delegative: 0 },
        communication: { directive: 0, coaching: 0, democratic: 0, visionary: 0, delegative: 0 },
        motivation: { directive: 0, coaching: 0, democratic: 0, visionary: 0, delegative: 0 },
        conflict: { directive: 0, coaching: 0, democratic: 0, visionary: 0, delegative: 0 },
        risk: { directive: 0, coaching: 0, democratic: 0, visionary: 0, delegative: 0 },
      }

      questions.forEach((q) => {
        const answer = answers[q.id]
        if (answer) {
          const style = q.styles[answer]
          styleScores[style] += answer
          dimensionScores[q.dimension][style] += answer
        }
      })

      const sortedStyles = Object.entries(styleScores)
        .sort(([, a], [, b]) => b - a)
        .map(([style]) => style as LeadershipStyle)

      setResults({
        scores: styleScores,
        dimensionScores,
        primary: sortedStyles[0],
        secondary: sortedStyles[1],
      })
      setStep("results")
    }, 2000)
  }

  const resetAssessment = () => {
    setStep("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
  }

  const handlePrint = () => {
    window.print()
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const totalScore = Object.values(results?.scores || {}).reduce((a, b) => a + b, 0)
  const getPercentage = (score: number) => Math.round((score / totalScore) * 100)

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
              <Users className="h-6 w-6 text-primary" />
            </div>
            <span className="brand-badge">Leadership Assessment</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">LeadStyle™</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Discover your natural leadership style and understand how you make decisions, communicate, motivate, and
            handle challenges.
          </p>
        </div>

        {/* Intro Screen */}
        {step === "intro" && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card className="glass-card-strong">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-heading">Understand Your Leadership DNA</CardTitle>
                <CardDescription className="text-base mt-2">
                  This assessment identifies your dominant leadership style across five proven archetypes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-5 gap-4">
                  {Object.entries(styleInfo).map(([key, info]) => (
                    <div key={key} className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div
                        className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${info.color}15`, color: info.color }}
                      >
                        {info.icon}
                      </div>
                      <p className="text-sm font-medium">{info.name.replace(" Leader", "")}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold">What You'll Discover:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Your primary and secondary leadership styles with percentage dominance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>How you perform across 5 leadership dimensions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Your leadership strengths and potential blind spots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Situational effectiveness recommendations</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">25 questions | ~8 minutes</p>
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
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="glass-card-strong">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary">
                    {dimensionLabels[questions[currentQuestion].dimension]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="min-h-[80px]">
                  <p className="text-lg font-medium text-foreground leading-relaxed">
                    {questions[currentQuestion].text}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { value: 5, label: "Strongly Agree" },
                    { value: 4, label: "Agree" },
                    { value: 3, label: "Neutral" },
                    { value: 2, label: "Disagree" },
                    { value: 1, label: "Strongly Disagree" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                        answers[questions[currentQuestion].id] === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/50"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentQuestion === questions.length - 1 && Object.keys(answers).length === questions.length && (
                    <Button onClick={calculateResults}>
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
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Leadership Profile</h3>
                  <p className="text-muted-foreground">Identifying patterns across dimensions...</p>
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
                  <h2 className="font-bold text-lg">LeadStyle™ Leadership Profile</h2>
                  <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Primary Style Card */}
            <Card className="glass-card-strong overflow-hidden">
              <div className="h-2" style={{ backgroundColor: styleInfo[results.primary].color }} />
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr,200px] gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${styleInfo[results.primary].color}15`,
                          color: styleInfo[results.primary].color,
                        }}
                      >
                        {styleInfo[results.primary].icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Your Primary Style</p>
                        <h2 className="text-2xl font-bold font-heading">{styleInfo[results.primary].name}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{styleInfo[results.primary].description}</p>
                  </div>

                  {/* Score Ring */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32">
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
                          stroke={styleInfo[results.primary].color}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * getPercentage(results.scores[results.primary])) / 100}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{getPercentage(results.scores[results.primary])}%</span>
                        <span className="text-xs text-muted-foreground">Dominance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Style & All Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Secondary Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${styleInfo[results.secondary].color}15`,
                        color: styleInfo[results.secondary].color,
                      }}
                    >
                      {styleInfo[results.secondary].icon}
                    </div>
                    <div>
                      <p className="font-semibold">{styleInfo[results.secondary].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getPercentage(results.scores[results.secondary])}% influence
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your secondary style emerges in specific situations, complementing your primary approach.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Style Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(results.scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([style, score]) => (
                      <div key={style} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">
                            {styleInfo[style as LeadershipStyle].name.replace(" Leader", "")}
                          </span>
                          <span className="text-muted-foreground">{getPercentage(score)}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${getPercentage(score)}%`,
                              backgroundColor: styleInfo[style as LeadershipStyle].color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Dimension Radar Visualization */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Leadership Dimensions</CardTitle>
                <CardDescription>Your style expression across key leadership areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {Object.entries(dimensionLabels).map(([dim, label]) => {
                    const dimScores = results.dimensionScores[dim]
                    const topStyle = Object.entries(dimScores).sort(([, a], [, b]) => b - a)[0][0] as LeadershipStyle
                    return (
                      <div key={dim} className="text-center p-4 rounded-xl bg-muted/30">
                        <div
                          className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3"
                          style={{
                            backgroundColor: `${styleInfo[topStyle].color}15`,
                            color: styleInfo[topStyle].color,
                          }}
                        >
                          {styleInfo[topStyle].icon}
                        </div>
                        <p className="text-sm font-medium mb-1">{label}</p>
                        <p className="text-xs text-muted-foreground">
                          {styleInfo[topStyle].name.replace(" Leader", "")}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Blind Spots */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg text-success">Leadership Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {styleInfo[results.primary].strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg text-warning">Potential Blind Spots</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {styleInfo[results.primary].blindSpots.map((spot, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Situational Effectiveness */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Situational Effectiveness</CardTitle>
                <CardDescription>Contexts where your leadership style excels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {styleInfo[results.primary].bestFor.map((context, i) => (
                    <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                      <p className="font-medium text-sm">{context}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Counselling Insight */}
            <Card className="insight-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Career Counselling Insight</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As a <strong>{styleInfo[results.primary].name}</strong>, you thrive in environments that value{" "}
                  {results.primary === "directive" && "structure, quick execution, and clear accountability"}
                  {results.primary === "coaching" && "talent development, mentorship, and long-term growth"}
                  {results.primary === "democratic" && "collaboration, team input, and consensus-building"}
                  {results.primary === "visionary" && "innovation, strategic change, and inspiring missions"}
                  {results.primary === "delegative" && "autonomy, trust, and empowered teams"}. Consider roles in{" "}
                  {results.primary === "directive" &&
                    "operations management, crisis leadership, or turnaround consulting"}
                  {results.primary === "coaching" && "talent management, executive coaching, or learning & development"}
                  {results.primary === "democratic" &&
                    "project management, facilitation, or cross-functional leadership"}
                  {results.primary === "visionary" &&
                    "entrepreneurship, innovation leadership, or strategic consulting"}
                  {results.primary === "delegative" && "venture building, R&D leadership, or creative direction"}.
                </p>
              </CardContent>
            </Card>

            {/* Print Footer */}
            <div className="hidden print:block print-footer">
              <p>Generated by Gaurab Labs | www.gaurablabs.com | paudelg97@gmail.com</p>
              <p className="mt-1">
                This assessment is for self-reflection and development purposes. Results should be interpreted in
                context.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center no-print">
              <Button onClick={handlePrint} size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Leadership Profile (PDF)
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
