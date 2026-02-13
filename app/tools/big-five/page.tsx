"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface Question {
  id: number
  text: string
  trait: "O" | "C" | "E" | "A" | "N"
  reversed: boolean
}

const questions: Question[] = [
  // Openness (O)
  { id: 1, text: "I have a vivid imagination.", trait: "O", reversed: false },
  { id: 2, text: "I am not interested in abstract ideas.", trait: "O", reversed: true },
  { id: 3, text: "I enjoy thinking about new and unconventional ideas.", trait: "O", reversed: false },
  { id: 4, text: "I prefer routine over variety.", trait: "O", reversed: true },
  { id: 5, text: "I appreciate art and beauty.", trait: "O", reversed: false },
  { id: 6, text: "I avoid philosophical discussions.", trait: "O", reversed: true },
  // Conscientiousness (C)
  { id: 7, text: "I am always prepared.", trait: "C", reversed: false },
  { id: 8, text: "I often forget to put things back in their proper place.", trait: "C", reversed: true },
  { id: 9, text: "I pay attention to details.", trait: "C", reversed: false },
  { id: 10, text: "I make a mess of things.", trait: "C", reversed: true },
  { id: 11, text: "I follow a schedule.", trait: "C", reversed: false },
  { id: 12, text: "I neglect my duties.", trait: "C", reversed: true },
  // Extraversion (E)
  { id: 13, text: "I am the life of the party.", trait: "E", reversed: false },
  { id: 14, text: "I prefer to be alone rather than with others.", trait: "E", reversed: true },
  { id: 15, text: "I feel comfortable around people.", trait: "E", reversed: false },
  { id: 16, text: "I keep in the background.", trait: "E", reversed: true },
  { id: 17, text: "I start conversations.", trait: "E", reversed: false },
  { id: 18, text: "I have little to say.", trait: "E", reversed: true },
  // Agreeableness (A)
  { id: 19, text: "I am interested in people.", trait: "A", reversed: false },
  { id: 20, text: "I insult people.", trait: "A", reversed: true },
  { id: 21, text: "I sympathize with others' feelings.", trait: "A", reversed: false },
  { id: 22, text: "I am not interested in other people's problems.", trait: "A", reversed: true },
  { id: 23, text: "I make people feel at ease.", trait: "A", reversed: false },
  { id: 24, text: "I am hard to get to know.", trait: "A", reversed: true },
  // Neuroticism (N)
  { id: 25, text: "I get stressed out easily.", trait: "N", reversed: false },
  { id: 26, text: "I am relaxed most of the time.", trait: "N", reversed: true },
  { id: 27, text: "I worry about things.", trait: "N", reversed: false },
  { id: 28, text: "I seldom feel blue.", trait: "N", reversed: true },
  { id: 29, text: "I am easily disturbed.", trait: "N", reversed: false },
  { id: 30, text: "I rarely get irritated.", trait: "N", reversed: true },
]

const traitInfo = {
  O: {
    name: "Openness",
    high: "Creative, curious, appreciates art and new experiences, imaginative",
    low: "Practical, conventional, prefers routine, down-to-earth",
    careers: "Creative fields, research, entrepreneurship, consulting",
    color: "var(--chart-1)",
  },
  C: {
    name: "Conscientiousness",
    high: "Organized, dependable, self-disciplined, achievement-oriented",
    low: "Flexible, spontaneous, may be seen as careless or unreliable",
    careers: "Management, accounting, medicine, engineering",
    color: "var(--chart-2)",
  },
  E: {
    name: "Extraversion",
    high: "Outgoing, energetic, talkative, assertive, seeks stimulation",
    low: "Reserved, independent, prefers solitary activities, thoughtful",
    careers: "Sales, marketing, teaching, leadership roles",
    color: "var(--chart-3)",
  },
  A: {
    name: "Agreeableness",
    high: "Cooperative, trusting, helpful, empathetic, good-natured",
    low: "Competitive, challenging, skeptical, may be seen as cold",
    careers: "Healthcare, counseling, HR, customer service, social work",
    color: "var(--chart-4)",
  },
  N: {
    name: "Neuroticism",
    high: "Sensitive, prone to stress, emotionally reactive, may experience anxiety",
    low: "Emotionally stable, calm, resilient, handles stress well",
    careers: "Consider roles with structured environments and support systems",
    color: "var(--chart-5)",
  },
}

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
]

const QUESTIONS_PER_PAGE = 5

export default function BigFivePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
  const currentQuestions = questions.slice((currentPage - 1) * QUESTIONS_PER_PAGE, currentPage * QUESTIONS_PER_PAGE)

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number.parseInt(value),
    }))
  }

  const calculateScores = useMemo(() => {
    const scores: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] }

    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer !== undefined) {
        const score = q.reversed ? 6 - answer : answer
        scores[q.trait].push(score)
      }
    })

    const results: Record<string, number> = {}
    Object.keys(scores).forEach((trait) => {
      const traitScores = scores[trait]
      if (traitScores.length > 0) {
        const avg = traitScores.reduce((a, b) => a + b, 0) / traitScores.length
        results[trait] = Math.round((avg / 5) * 100)
      } else {
        results[trait] = 50
      }
    })

    return results
  }, [answers])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleExport = () => {
    exportToPDF("bigfive-results", {
      filename: "Big_Five_Personality",
      title: "Big Five Personality Assessment",
    })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentPage(1)
    setShowResults(false)
  }

  const canProceed = currentQuestions.every((q) => answers[q.id] !== undefined)

  if (showResults) {
    const chartData = Object.keys(traitInfo).map((trait) => ({
      trait: traitInfo[trait as keyof typeof traitInfo].name,
      score: calculateScores[trait],
      fullMark: 100,
    }))

    return (
      <ToolLayout
        title="Big Five Personality Test"
        description="Your OCEAN personality profile"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="bigfive-results" className="space-y-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Your Personality Profile</CardTitle>
              <CardDescription>OCEAN model visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trait Breakdown */}
          <div className="space-y-4">
            {(Object.keys(traitInfo) as Array<keyof typeof traitInfo>).map((trait) => {
              const score = calculateScores[trait]
              const info = traitInfo[trait]
              const isHigh = score >= 60
              const isLow = score <= 40

              return (
                <Card key={trait}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{info.name}</CardTitle>
                      <span className="text-2xl font-bold" style={{ color: info.color }}>
                        {score}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${score}%`, backgroundColor: info.color }}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        {isHigh
                          ? info.high
                          : isLow
                            ? info.low
                            : `Balanced: You display a moderate level of ${info.name.toLowerCase()}, adapting as situations require.`}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Career fit:</strong> {info.careers}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Work Style Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Work Style Implications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your profile, you likely work best in environments that{" "}
                {calculateScores.E >= 60
                  ? "involve collaboration and social interaction"
                  : "allow for independent focus and reflection"}
                .{" "}
                {calculateScores.C >= 60
                  ? "You thrive with clear structure and goals."
                  : "You may prefer flexible arrangements with room for adaptation."}
              </p>
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium mb-2">Key Strengths</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {calculateScores.O >= 60 && <li>• Creative problem-solving and innovation</li>}
                  {calculateScores.C >= 60 && <li>• Reliability and attention to detail</li>}
                  {calculateScores.E >= 60 && <li>• Communication and team energizing</li>}
                  {calculateScores.A >= 60 && <li>• Collaboration and conflict resolution</li>}
                  {calculateScores.N <= 40 && <li>• Emotional stability under pressure</li>}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="Big Five Personality Test"
      description="Measure your openness, conscientiousness, extraversion, agreeableness, and neuroticism"
    >
      <StepIndicator currentStep={currentPage} totalSteps={totalPages} />

      <Card>
        <CardHeader>
          <CardTitle>
            Questions {(currentPage - 1) * QUESTIONS_PER_PAGE + 1}-
            {Math.min(currentPage * QUESTIONS_PER_PAGE, questions.length)}
          </CardTitle>
          <CardDescription>Rate how accurately each statement describes you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {currentQuestions.map((question) => (
            <div key={question.id} className="space-y-3">
              <Label className="text-base font-normal leading-relaxed">{question.text}</Label>
              <RadioGroup
                value={answers[question.id]?.toString() || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="flex flex-wrap gap-2"
              >
                {likertOptions.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`q${question.id}-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`q${question.id}-${option.value}`}
                      className="px-3 py-2 text-sm border rounded-lg cursor-pointer transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary hover:bg-muted"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevPage} disabled={currentPage === 1} className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextPage} disabled={!canProceed} className="gap-2">
          {currentPage === totalPages ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
