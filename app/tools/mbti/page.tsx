"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface Question {
  id: number
  dimension: "EI" | "SN" | "TF" | "JP"
  optionA: { text: string; type: "E" | "S" | "T" | "J" }
  optionB: { text: string; type: "I" | "N" | "F" | "P" }
}

const questions: Question[] = [
  // E/I Dimension
  {
    id: 1,
    dimension: "EI",
    optionA: { text: "I feel energized after spending time with groups of people", type: "E" },
    optionB: { text: "I feel energized after spending time alone or with one close friend", type: "I" },
  },
  {
    id: 2,
    dimension: "EI",
    optionA: { text: "I think out loud and process ideas through discussion", type: "E" },
    optionB: { text: "I prefer to think through ideas internally before sharing", type: "I" },
  },
  {
    id: 3,
    dimension: "EI",
    optionA: { text: "I enjoy meeting new people and making connections", type: "E" },
    optionB: { text: "I prefer deeper relationships with fewer people", type: "I" },
  },
  {
    id: 4,
    dimension: "EI",
    optionA: { text: "I am comfortable being the center of attention", type: "E" },
    optionB: { text: "I prefer to observe and listen in social situations", type: "I" },
  },
  // S/N Dimension
  {
    id: 5,
    dimension: "SN",
    optionA: { text: "I focus on concrete facts and practical details", type: "S" },
    optionB: { text: "I focus on patterns, possibilities, and the big picture", type: "N" },
  },
  {
    id: 6,
    dimension: "SN",
    optionA: { text: "I trust experience and proven methods", type: "S" },
    optionB: { text: "I trust inspiration and new approaches", type: "N" },
  },
  {
    id: 7,
    dimension: "SN",
    optionA: { text: "I prefer step-by-step instructions", type: "S" },
    optionB: { text: "I prefer to figure things out my own way", type: "N" },
  },
  {
    id: 8,
    dimension: "SN",
    optionA: { text: "I live in the present moment", type: "S" },
    optionB: { text: "I often think about future possibilities", type: "N" },
  },
  // T/F Dimension
  {
    id: 9,
    dimension: "TF",
    optionA: { text: "I make decisions based on logic and objective analysis", type: "T" },
    optionB: { text: "I make decisions based on values and how they affect people", type: "F" },
  },
  {
    id: 10,
    dimension: "TF",
    optionA: { text: "I value fairness and consistency in decisions", type: "T" },
    optionB: { text: "I value harmony and consider individual circumstances", type: "F" },
  },
  {
    id: 11,
    dimension: "TF",
    optionA: { text: "I prefer direct, honest feedback even if it's uncomfortable", type: "T" },
    optionB: { text: "I prefer to give feedback in a supportive, encouraging way", type: "F" },
  },
  {
    id: 12,
    dimension: "TF",
    optionA: { text: "I focus on finding the truth in a situation", type: "T" },
    optionB: { text: "I focus on maintaining positive relationships", type: "F" },
  },
  // J/P Dimension
  {
    id: 13,
    dimension: "JP",
    optionA: { text: "I prefer to have things decided and settled", type: "J" },
    optionB: { text: "I prefer to keep options open and flexible", type: "P" },
  },
  {
    id: 14,
    dimension: "JP",
    optionA: { text: "I work best with a clear plan and schedule", type: "J" },
    optionB: { text: "I work best when I can be spontaneous and adaptive", type: "P" },
  },
  {
    id: 15,
    dimension: "JP",
    optionA: { text: "I like to complete tasks well before deadlines", type: "J" },
    optionB: { text: "I often work best under deadline pressure", type: "P" },
  },
  {
    id: 16,
    dimension: "JP",
    optionA: { text: "I find comfort in routines and structure", type: "J" },
    optionB: { text: "I find routines boring and prefer variety", type: "P" },
  },
]

const mbtiTypes: Record<
  string,
  { title: string; description: string; strengths: string[]; blindSpots: string[]; workEnvironment: string }
> = {
  ISTJ: {
    title: "The Inspector",
    description: "Practical, fact-minded, and reliable. Values tradition and loyalty.",
    strengths: ["Organized", "Dependable", "Detail-oriented", "Patient"],
    blindSpots: ["May resist change", "Can be overly rigid", "May overlook emotions"],
    workEnvironment:
      "Structured environments with clear expectations, established procedures, and opportunities for independent work.",
  },
  ISFJ: {
    title: "The Protector",
    description: "Quiet, friendly, and responsible. Committed to meeting obligations.",
    strengths: ["Supportive", "Reliable", "Patient", "Observant"],
    blindSpots: ["May neglect own needs", "Can be overly selfless", "May avoid conflict"],
    workEnvironment:
      "Supportive team environments where they can help others, with clear structure and appreciation for their contributions.",
  },
  INFJ: {
    title: "The Advocate",
    description: "Seeks meaning and connection. Wants to understand what motivates people.",
    strengths: ["Insightful", "Principled", "Compassionate", "Creative"],
    blindSpots: ["May be perfectionistic", "Can burn out", "May be overly private"],
    workEnvironment:
      "Mission-driven organizations where they can make a meaningful difference and work with integrity.",
  },
  INTJ: {
    title: "The Architect",
    description: "Strategic thinker with a plan for everything. Values competence.",
    strengths: ["Strategic", "Independent", "Determined", "Innovative"],
    blindSpots: ["May seem arrogant", "Can be overly critical", "May dismiss emotions"],
    workEnvironment:
      "Autonomous roles with intellectual challenges, opportunities for strategic planning, and minimal bureaucracy.",
  },
  ISTP: {
    title: "The Craftsman",
    description: "Tolerant and flexible. Quiet observer until a problem appears, then acts quickly.",
    strengths: ["Analytical", "Practical", "Adaptable", "Self-reliant"],
    blindSpots: ["May seem detached", "Can be risk-prone", "May resist commitment"],
    workEnvironment: "Hands-on roles with variety, problem-solving opportunities, and freedom from excessive rules.",
  },
  ISFP: {
    title: "The Composer",
    description: "Quiet, friendly, and sensitive. Enjoys the present moment.",
    strengths: ["Artistic", "Sensitive", "Helpful", "Flexible"],
    blindSpots: ["May avoid conflict", "Can be overly sensitive", "May struggle with planning"],
    workEnvironment:
      "Creative, harmonious settings where they can express themselves and work at their own pace with supportive colleagues.",
  },
  INFP: {
    title: "The Mediator",
    description: "Idealistic and loyal to values. Wants to help others reach their potential.",
    strengths: ["Empathetic", "Creative", "Passionate", "Open-minded"],
    blindSpots: ["May be impractical", "Can be overly idealistic", "May take criticism personally"],
    workEnvironment:
      "Purpose-driven work aligned with personal values, creative freedom, and meaningful relationships with colleagues.",
  },
  INTP: {
    title: "The Thinker",
    description: "Seeks to develop logical explanations. Theoretical and abstract.",
    strengths: ["Analytical", "Objective", "Original", "Open-minded"],
    blindSpots: ["May seem detached", "Can overthink", "May neglect practical matters"],
    workEnvironment:
      "Intellectual environments with complex problems to solve, autonomy, and colleagues who value competence.",
  },
  ESTP: {
    title: "The Entrepreneur",
    description: "Flexible and pragmatic. Focuses on immediate results.",
    strengths: ["Energetic", "Observant", "Direct", "Adaptable"],
    blindSpots: ["May be impatient", "Can be risk-prone", "May miss long-term implications"],
    workEnvironment:
      "Fast-paced, action-oriented settings with variety, tangible results, and minimal bureaucratic constraints.",
  },
  ESFP: {
    title: "The Entertainer",
    description: "Outgoing and friendly. Enjoys working with others to make things happen.",
    strengths: ["Enthusiastic", "Friendly", "Spontaneous", "Energetic"],
    blindSpots: ["May avoid deep analysis", "Can be easily distracted", "May struggle with planning"],
    workEnvironment:
      "Social, dynamic workplaces with variety, opportunities to help people, and a positive team atmosphere.",
  },
  ENFP: {
    title: "The Campaigner",
    description: "Enthusiastic and creative. Sees life as full of possibilities.",
    strengths: ["Creative", "Enthusiastic", "Sociable", "Optimistic"],
    blindSpots: ["May struggle with follow-through", "Can be disorganized", "May overcommit"],
    workEnvironment:
      "Creative, flexible environments where they can inspire others, explore ideas, and work on meaningful projects.",
  },
  ENTP: {
    title: "The Debater",
    description: "Quick, ingenious, and outspoken. Resourceful in solving new problems.",
    strengths: ["Innovative", "Strategic", "Enterprising", "Outspoken"],
    blindSpots: ["May be argumentative", "Can be insensitive", "May neglect details"],
    workEnvironment:
      "Dynamic environments with intellectual challenges, debate and discussion, and opportunities for innovation.",
  },
  ESTJ: {
    title: "The Executive",
    description: "Practical, realistic, matter-of-fact. Decisive and organized.",
    strengths: ["Organized", "Logical", "Assertive", "Dedicated"],
    blindSpots: ["May be inflexible", "Can be judgmental", "May overlook emotions"],
    workEnvironment:
      "Structured organizations where they can lead, implement systems, and see tangible results from their efforts.",
  },
  ESFJ: {
    title: "The Consul",
    description: "Warmhearted and cooperative. Wants harmony and works with determination.",
    strengths: ["Caring", "Sociable", "Loyal", "Reliable"],
    blindSpots: ["May be approval-seeking", "Can be sensitive to criticism", "May avoid conflict"],
    workEnvironment:
      "Collaborative teams with clear expectations, appreciation for their contributions, and opportunities to help others.",
  },
  ENFJ: {
    title: "The Protagonist",
    description: "Warm, empathetic, and responsible. Highly attuned to others' needs.",
    strengths: ["Charismatic", "Empathetic", "Organized", "Inspiring"],
    blindSpots: ["May be overly idealistic", "Can neglect own needs", "May be too sensitive"],
    workEnvironment:
      "People-focused organizations where they can lead, mentor others, and make a positive impact on teams.",
  },
  ENTJ: {
    title: "The Commander",
    description: "Frank, decisive, and assumes leadership. Enjoys long-term planning.",
    strengths: ["Strategic", "Efficient", "Energetic", "Self-confident"],
    blindSpots: ["May be domineering", "Can be impatient", "May overlook emotions"],
    workEnvironment: "Leadership positions in competitive environments where they can set strategy and drive results.",
  },
}

export default function MBTIPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, "A" | "B">>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: "A" | "B") => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const mbtiType = useMemo(() => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer === "A") {
        counts[q.optionA.type]++
      } else if (answer === "B") {
        counts[q.optionB.type]++
      }
    })

    const type =
      (counts.E >= counts.I ? "E" : "I") +
      (counts.S >= counts.N ? "S" : "N") +
      (counts.T >= counts.F ? "T" : "F") +
      (counts.J >= counts.P ? "J" : "P")

    const percentages = {
      EI: Math.round((Math.max(counts.E, counts.I) / 4) * 100),
      SN: Math.round((Math.max(counts.S, counts.N) / 4) * 100),
      TF: Math.round((Math.max(counts.T, counts.F) / 4) * 100),
      JP: Math.round((Math.max(counts.J, counts.P) / 4) * 100),
    }

    return { type, counts, percentages }
  }, [answers])

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleExport = () => {
    exportToPDF("mbti-results", {
      filename: "MBTI_Personality",
      title: "MBTI Personality Assessment",
    })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestion(1)
    setShowResults(false)
  }

  const currentQ = questions[currentQuestion - 1]

  if (showResults) {
    const typeInfo = mbtiTypes[mbtiType.type]

    return (
      <ToolLayout
        title="MBTI-Style Assessment"
        description="Your personality type results"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="mbti-results" className="space-y-8">
          {/* Type Display */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{mbtiType.type}</div>
              <CardTitle className="text-2xl">{typeInfo.title}</CardTitle>
              <CardDescription className="text-base mt-2">{typeInfo.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* Dimension Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>How you scored on each dimension</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={mbtiType.counts.E >= mbtiType.counts.I ? "font-semibold text-primary" : ""}>
                      Extraversion (E)
                    </span>
                    <span className={mbtiType.counts.I > mbtiType.counts.E ? "font-semibold text-primary" : ""}>
                      Introversion (I)
                    </span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-secondary">
                    <div className="bg-chart-1" style={{ width: `${(mbtiType.counts.E / 4) * 50}%` }} />
                    <div className="flex-1" />
                    <div className="bg-chart-2" style={{ width: `${(mbtiType.counts.I / 4) * 50}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={mbtiType.counts.S >= mbtiType.counts.N ? "font-semibold text-primary" : ""}>
                      Sensing (S)
                    </span>
                    <span className={mbtiType.counts.N > mbtiType.counts.S ? "font-semibold text-primary" : ""}>
                      Intuition (N)
                    </span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-secondary">
                    <div className="bg-chart-3" style={{ width: `${(mbtiType.counts.S / 4) * 50}%` }} />
                    <div className="flex-1" />
                    <div className="bg-chart-4" style={{ width: `${(mbtiType.counts.N / 4) * 50}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={mbtiType.counts.T >= mbtiType.counts.F ? "font-semibold text-primary" : ""}>
                      Thinking (T)
                    </span>
                    <span className={mbtiType.counts.F > mbtiType.counts.T ? "font-semibold text-primary" : ""}>
                      Feeling (F)
                    </span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-secondary">
                    <div className="bg-chart-5" style={{ width: `${(mbtiType.counts.T / 4) * 50}%` }} />
                    <div className="flex-1" />
                    <div className="bg-chart-1" style={{ width: `${(mbtiType.counts.F / 4) * 50}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={mbtiType.counts.J >= mbtiType.counts.P ? "font-semibold text-primary" : ""}>
                      Judging (J)
                    </span>
                    <span className={mbtiType.counts.P > mbtiType.counts.J ? "font-semibold text-primary" : ""}>
                      Perceiving (P)
                    </span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-secondary">
                    <div className="bg-chart-2" style={{ width: `${(mbtiType.counts.J / 4) * 50}%` }} />
                    <div className="flex-1" />
                    <div className="bg-chart-3" style={{ width: `${(mbtiType.counts.P / 4) * 50}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Blind Spots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-chart-2">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-chart-2">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-chart-5">Potential Blind Spots</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.blindSpots.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-chart-5">!</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Work Environment */}
          <Card>
            <CardHeader>
              <CardTitle>Ideal Work Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{typeInfo.workEnvironment}</p>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="MBTI-Style Assessment" description="Discover your personality type across four key dimensions">
      <StepIndicator currentStep={currentQuestion} totalSteps={questions.length} />

      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentQuestion} of {questions.length}
          </CardTitle>
          <CardDescription>Choose the statement that describes you better</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            type="button"
            onClick={() => handleAnswer("A")}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              answers[currentQuestion] === "A"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <span className="text-sm font-medium">{currentQ.optionA.text}</span>
          </button>

          <button
            type="button"
            onClick={() => handleAnswer("B")}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              answers[currentQuestion] === "B"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <span className="text-sm font-medium">{currentQ.optionB.text}</span>
          </button>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 1}
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextQuestion} disabled={!answers[currentQuestion]} className="gap-2">
          {currentQuestion === questions.length ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
