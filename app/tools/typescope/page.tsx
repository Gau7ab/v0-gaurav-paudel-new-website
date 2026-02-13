"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ArrowRight, ArrowLeft, Download, RotateCcw, CheckCircle, Zap } from "lucide-react"

interface Answer {
  questionId: number
  value: "A" | "B"
}

const dimensions = [
  { code: "EI", name: "Energy", optionA: "Extraversion (E)", optionB: "Introversion (I)" },
  { code: "SN", name: "Information", optionA: "Sensing (S)", optionB: "Intuition (N)" },
  { code: "TF", name: "Decisions", optionA: "Thinking (T)", optionB: "Feeling (F)" },
  { code: "JP", name: "Lifestyle", optionA: "Judging (J)", optionB: "Perceiving (P)" },
]

const questions = [
  // E/I Questions (4)
  {
    id: 1,
    dimension: "EI",
    textA: "I feel energized after socializing",
    textB: "I feel drained after socializing and need alone time",
  },
  {
    id: 2,
    dimension: "EI",
    textA: "I think out loud and process by talking",
    textB: "I prefer to think things through before speaking",
  },
  {
    id: 3,
    dimension: "EI",
    textA: "I enjoy being the center of attention",
    textB: "I prefer to observe from the sidelines",
  },
  { id: 4, dimension: "EI", textA: "I have a wide circle of friends", textB: "I prefer a few close, deep friendships" },
  // S/N Questions (4)
  {
    id: 5,
    dimension: "SN",
    textA: "I focus on facts and concrete details",
    textB: "I focus on patterns and possibilities",
  },
  {
    id: 6,
    dimension: "SN",
    textA: "I trust experience and what has worked before",
    textB: "I trust my intuition and hunches",
  },
  {
    id: 7,
    dimension: "SN",
    textA: "I prefer step-by-step instructions",
    textB: "I prefer to figure things out my own way",
  },
  { id: 8, dimension: "SN", textA: "I live in the present moment", textB: "I think about future possibilities" },
  // T/F Questions (4)
  {
    id: 9,
    dimension: "TF",
    textA: "I make decisions based on logic and analysis",
    textB: "I make decisions based on values and how people feel",
  },
  { id: 10, dimension: "TF", textA: "I value truth over tact", textB: "I value harmony and avoiding conflict" },
  {
    id: 11,
    dimension: "TF",
    textA: "I prefer to be fair and consistent",
    textB: "I prefer to consider individual circumstances",
  },
  { id: 12, dimension: "TF", textA: "I am more task-oriented", textB: "I am more people-oriented" },
  // J/P Questions (4)
  {
    id: 13,
    dimension: "JP",
    textA: "I prefer to have things decided and settled",
    textB: "I prefer to keep my options open",
  },
  {
    id: 14,
    dimension: "JP",
    textA: "I like to plan ahead and stick to schedules",
    textB: "I prefer to be spontaneous and flexible",
  },
  {
    id: 15,
    dimension: "JP",
    textA: "I feel stressed when things are unfinished",
    textB: "I feel stressed when things are too structured",
  },
  { id: 16, dimension: "JP", textA: "I work best with deadlines", textB: "I work best with flexibility" },
]

const typeDescriptions: Record<string, { title: string; description: string; strengths: string[]; careers: string[] }> =
  {
    INTJ: {
      title: "The Architect",
      description: "Strategic and independent thinker with a plan for everything.",
      strengths: ["Strategic planning", "Independent thinking", "High standards"],
      careers: ["Scientist", "Strategist", "Engineer", "Professor"],
    },
    INTP: {
      title: "The Logician",
      description: "Innovative inventor with an unquenchable thirst for knowledge.",
      strengths: ["Analytical thinking", "Innovation", "Objectivity"],
      careers: ["Researcher", "Programmer", "Philosopher", "Analyst"],
    },
    ENTJ: {
      title: "The Commander",
      description: "Bold and imaginative leader who always finds a way.",
      strengths: ["Leadership", "Decisiveness", "Efficiency"],
      careers: ["Executive", "Entrepreneur", "Lawyer", "Manager"],
    },
    ENTP: {
      title: "The Debater",
      description: "Smart and curious thinker who loves intellectual challenges.",
      strengths: ["Quick thinking", "Debate skills", "Innovation"],
      careers: ["Entrepreneur", "Consultant", "Attorney", "Inventor"],
    },
    INFJ: {
      title: "The Advocate",
      description: "Quiet and mystical, yet inspiring and idealistic.",
      strengths: ["Empathy", "Vision", "Determination"],
      careers: ["Counselor", "Writer", "Psychologist", "HR Manager"],
    },
    INFP: {
      title: "The Mediator",
      description: "Poetic, kind, and altruistic, always eager to help.",
      strengths: ["Idealism", "Creativity", "Empathy"],
      careers: ["Writer", "Artist", "Therapist", "Social Worker"],
    },
    ENFJ: {
      title: "The Protagonist",
      description: "Charismatic and inspiring leader who mesmerizes listeners.",
      strengths: ["Charisma", "Teaching", "Leadership"],
      careers: ["Teacher", "Coach", "HR Director", "Politician"],
    },
    ENFP: {
      title: "The Campaigner",
      description: "Enthusiastic and creative free spirit who finds a reason to smile.",
      strengths: ["Enthusiasm", "Creativity", "Communication"],
      careers: ["Journalist", "Actor", "Consultant", "Marketer"],
    },
    ISTJ: {
      title: "The Logistician",
      description: "Practical and reliable, facts are sacred.",
      strengths: ["Reliability", "Practicality", "Dedication"],
      careers: ["Accountant", "Manager", "Military Officer", "Judge"],
    },
    ISFJ: {
      title: "The Defender",
      description: "Dedicated and warm protector of loved ones.",
      strengths: ["Supportiveness", "Reliability", "Patience"],
      careers: ["Nurse", "Teacher", "Social Worker", "Administrator"],
    },
    ESTJ: {
      title: "The Executive",
      description: "Excellent administrator, managing things and people.",
      strengths: ["Organization", "Leadership", "Dedication"],
      careers: ["Manager", "Administrator", "Judge", "Financial Officer"],
    },
    ESFJ: {
      title: "The Consul",
      description: "Extraordinarily caring and social, popular people.",
      strengths: ["Helpfulness", "Social skills", "Loyalty"],
      careers: ["Healthcare Worker", "Teacher", "Sales Rep", "Event Planner"],
    },
    ISTP: {
      title: "The Virtuoso",
      description: "Bold and practical experimenter, master of tools.",
      strengths: ["Practicality", "Problem-solving", "Adaptability"],
      careers: ["Engineer", "Mechanic", "Pilot", "Forensic Scientist"],
    },
    ISFP: {
      title: "The Adventurer",
      description: "Flexible and charming artist, exploring new things.",
      strengths: ["Creativity", "Sensitivity", "Curiosity"],
      careers: ["Artist", "Designer", "Chef", "Veterinarian"],
    },
    ESTP: {
      title: "The Entrepreneur",
      description: "Smart and energetic, living on the edge.",
      strengths: ["Energy", "Perception", "Bold action"],
      careers: ["Entrepreneur", "Sales", "Marketing", "Emergency Responder"],
    },
    ESFP: {
      title: "The Entertainer",
      description: "Spontaneous and energetic, life is never boring.",
      strengths: ["Entertainment", "Practicality", "Observation"],
      careers: ["Entertainer", "Sales", "Event Planner", "Tour Guide"],
    },
  }

export default function TypeScopePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: "A" | "B") => {
    const newAnswers = answers.filter((a) => a.questionId !== questions[currentQuestion].id)
    newAnswers.push({ questionId: questions[currentQuestion].id, value })
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === questions[currentQuestion].id)?.value
  }

  const calculateType = () => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId)
      if (question) {
        if (question.dimension === "EI") {
          answer.value === "A" ? counts.E++ : counts.I++
        } else if (question.dimension === "SN") {
          answer.value === "A" ? counts.S++ : counts.N++
        } else if (question.dimension === "TF") {
          answer.value === "A" ? counts.T++ : counts.F++
        } else if (question.dimension === "JP") {
          answer.value === "A" ? counts.J++ : counts.P++
        }
      }
    })

    const type = `${counts.E >= counts.I ? "E" : "I"}${counts.S >= counts.N ? "S" : "N"}${counts.T >= counts.F ? "T" : "F"}${counts.J >= counts.P ? "J" : "P"}`

    const percentages = {
      EI: { E: Math.round((counts.E / 4) * 100), I: Math.round((counts.I / 4) * 100) },
      SN: { S: Math.round((counts.S / 4) * 100), N: Math.round((counts.N / 4) * 100) },
      TF: { T: Math.round((counts.T / 4) * 100), F: Math.round((counts.F / 4) * 100) },
      JP: { J: Math.round((counts.J / 4) * 100), P: Math.round((counts.P / 4) * 100) },
    }

    return { type, percentages }
  }

  const handleComplete = () => {
    if (answers.length === questions.length) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setAnswers([])
    setCurrentQuestion(0)
    setShowResults(false)
  }

  const handleExportPDF = () => window.print()

  const progress = (answers.length / questions.length) * 100

  if (showResults) {
    const { type, percentages } = calculateType()
    const typeInfo = typeDescriptions[type]

    return (
      <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" id="typescope-results">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">TypeScope™ Report</h1>
                <p className="text-sm text-muted-foreground">Personality Type Assessment</p>
              </div>
            </div>
            <div className="flex gap-2 no-print">
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" /> Retake
              </Button>
              <Button onClick={handleExportPDF} className="gap-2 bg-gradient-to-r from-primary to-primary/90">
                <Download className="h-4 w-4" /> Export PDF
              </Button>
            </div>
          </div>

          {/* Type Card */}
          <Card className="glass-card-strong mb-8">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="h-3.5 w-3.5" />
                Your Personality Type
              </div>
              <div className="text-5xl sm:text-6xl font-heading font-bold text-gradient mb-3">{type}</div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">{typeInfo.title}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{typeInfo.description}</p>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <div className="space-y-4 mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">Dimension Breakdown</h2>
            {dimensions.map((dim) => {
              const percA =
                percentages[dim.code as keyof typeof percentages][dim.optionA[0] as keyof (typeof percentages)["EI"]]
              const percB =
                percentages[dim.code as keyof typeof percentages][
                  dim.optionB.match(/$$(\w)$$/)?.[1] as keyof (typeof percentages)["EI"]
                ]

              return (
                <div key={dim.code} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className={percA > percB ? "font-semibold text-primary" : "text-muted-foreground"}>
                      {dim.optionA}
                    </span>
                    <span className="text-xs text-muted-foreground">{dim.name}</span>
                    <span className={percB > percA ? "font-semibold text-primary" : "text-muted-foreground"}>
                      {dim.optionB}
                    </span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
                    <div className="bg-primary transition-all" style={{ width: `${percA}%` }} />
                    <div className="bg-accent transition-all" style={{ width: `${percB}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{percA}%</span>
                    <span>{percB}%</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Strengths & Careers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Key Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.strengths.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.careers.map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Counselling Insights */}
          <Card className="glass-card-strong mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Career Counselling Insights</CardTitle>
              <CardDescription>How your type influences your work style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Work Environment</h4>
                  <p className="text-sm text-muted-foreground">
                    {type.includes("E")
                      ? "You thrive in collaborative, interactive environments with regular social contact."
                      : "You perform best in quiet, focused settings with time for deep thinking."}
                    {type.includes("J")
                      ? " Structure and clear expectations help you excel."
                      : " Flexibility and autonomy energize your work."}
                  </p>
                </div>
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Decision Making</h4>
                  <p className="text-sm text-muted-foreground">
                    {type.includes("T")
                      ? "You approach decisions analytically, weighing pros and cons objectively."
                      : "You consider how decisions affect people and align with your values."}
                    {type.includes("N")
                      ? " You naturally see the big picture and future possibilities."
                      : " You ground decisions in practical, proven approaches."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-6">
            <p>Generated by TypeScope™ — Gaurab Labs</p>
            <p>This assessment is for self-reflection. Not a substitute for professional evaluation.</p>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">TypeScope™</h1>
              <p className="text-sm text-muted-foreground">Personality Type Assessment</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Discover how you think, decide, and interact through a structured personality-type framework based on four
            key dimensions.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card-strong mb-6">
          <CardContent className="p-6 sm:p-8">
            <p className="text-center text-sm text-muted-foreground mb-6">Which statement describes you better?</p>

            <div className="space-y-4">
              <button
                onClick={() => handleAnswer("A")}
                className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                  currentAnswer === "A"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      currentAnswer === "A" ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {currentAnswer === "A" && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <span className="font-medium">{question.textA}</span>
                </div>
              </button>

              <button
                onClick={() => handleAnswer("B")}
                className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                  currentAnswer === "B"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      currentAnswer === "B" ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {currentAnswer === "B" && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <span className="font-medium">{question.textB}</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleComplete}
              disabled={answers.length < questions.length}
              className="gap-2 bg-gradient-to-r from-primary to-primary/90"
            >
              View Results <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={!currentAnswer}
              className="gap-2 bg-gradient-to-r from-primary to-primary/90"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
