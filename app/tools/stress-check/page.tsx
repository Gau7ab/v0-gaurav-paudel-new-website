"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface Question {
  id: number
  category: "workload" | "control" | "recovery" | "emotional"
  text: string
  lowLabel: string
  highLabel: string
}

const questions: Question[] = [
  // Workload
  {
    id: 1,
    category: "workload",
    text: "How often do you feel overwhelmed by the amount of work you have?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 2,
    category: "workload",
    text: "How frequently do you work longer hours than you would like?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 3,
    category: "workload",
    text: "How often do you have unrealistic deadlines?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  // Control
  {
    id: 4,
    category: "control",
    text: "How much control do you have over how you do your work?",
    lowLabel: "Very little",
    highLabel: "Complete control",
  },
  {
    id: 5,
    category: "control",
    text: "How often can you take breaks when you need them?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 6,
    category: "control",
    text: "How much say do you have in decisions that affect your work?",
    lowLabel: "None",
    highLabel: "Complete say",
  },
  // Recovery
  {
    id: 7,
    category: "recovery",
    text: "How well do you sleep on a typical night?",
    lowLabel: "Very poorly",
    highLabel: "Very well",
  },
  {
    id: 8,
    category: "recovery",
    text: "How often do you have time for activities you enjoy outside of work?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 9,
    category: "recovery",
    text: "How easily can you disconnect from work during time off?",
    lowLabel: "Very difficult",
    highLabel: "Very easy",
  },
  // Emotional
  {
    id: 10,
    category: "emotional",
    text: "How often do you feel emotionally drained from your work?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 11,
    category: "emotional",
    text: "How often do you feel cynical or detached from your work?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    id: 12,
    category: "emotional",
    text: "How often do you doubt the value or impact of your work?",
    lowLabel: "Never",
    highLabel: "Always",
  },
]

const categoryInfo = {
  workload: {
    title: "Workload",
    description: "The amount and intensity of work demands",
    color: "bg-chart-1",
    reverseScore: true,
  },
  control: {
    title: "Control",
    description: "Your autonomy and decision-making power",
    color: "bg-chart-2",
    reverseScore: false,
  },
  recovery: {
    title: "Recovery",
    description: "Your ability to rest and recharge",
    color: "bg-chart-3",
    reverseScore: false,
  },
  emotional: {
    title: "Emotional Exhaustion",
    description: "Signs of burnout and detachment",
    color: "bg-chart-5",
    reverseScore: true,
  },
}

export default function StressCheckPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: number, value: number[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value[0],
    }))
  }

  const results = useMemo(() => {
    const categoryScores: Record<string, number[]> = {
      workload: [],
      control: [],
      recovery: [],
      emotional: [],
    }

    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer !== undefined) {
        categoryScores[q.category].push(answer)
      }
    })

    const scores: Record<string, number> = {}
    let riskScore = 0

    Object.keys(categoryScores).forEach((cat) => {
      const catScores = categoryScores[cat]
      if (catScores.length > 0) {
        const avg = catScores.reduce((a, b) => a + b, 0) / catScores.length
        const info = categoryInfo[cat as keyof typeof categoryInfo]
        // For workload and emotional, higher scores = more risk
        // For control and recovery, higher scores = less risk
        if (info.reverseScore) {
          scores[cat] = Math.round(avg)
          riskScore += avg
        } else {
          scores[cat] = Math.round(avg)
          riskScore += 100 - avg
        }
      }
    })

    const overallRisk = Math.round(riskScore / 4)

    return { scores, overallRisk }
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
    exportToPDF("stress-results", {
      filename: "Stress_Burnout_Check",
      title: "Stress & Burnout Assessment",
    })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestion(1)
    setShowResults(false)
  }

  const currentQ = questions[currentQuestion - 1]
  const currentValue = answers[currentQuestion] ?? 50

  if (showResults) {
    const getRiskLevel = (score: number) => {
      if (score <= 33) return { label: "Low", color: "text-chart-2" }
      if (score <= 66) return { label: "Moderate", color: "text-chart-4" }
      return { label: "High", color: "text-chart-5" }
    }

    const overallRiskLevel = getRiskLevel(results.overallRisk)

    return (
      <ToolLayout
        title="Stress & Burnout Check"
        description="Your stress assessment results"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="stress-results" className="space-y-8">
          {/* Overall Risk */}
          <Card
            className={`border-2 ${
              results.overallRisk <= 33
                ? "border-chart-2/30 bg-chart-2/5"
                : results.overallRisk <= 66
                  ? "border-chart-4/30 bg-chart-4/5"
                  : "border-chart-5/30 bg-chart-5/5"
            }`}
          >
            <CardHeader className="text-center">
              <CardDescription>Overall Burnout Risk Level</CardDescription>
              <CardTitle className={`text-4xl ${overallRiskLevel.color}`}>{overallRiskLevel.label}</CardTitle>
              <div className="text-2xl font-bold">{results.overallRisk}%</div>
            </CardHeader>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>How you scored in each area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((cat) => {
                const info = categoryInfo[cat]
                const score = results.scores[cat] || 50
                const displayScore = info.reverseScore ? score : 100 - score
                const level = getRiskLevel(displayScore)

                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                      <span className={`font-semibold ${level.color}`}>{level.label}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${info.color}`}
                        style={{ width: `${displayScore}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle>What This Means</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {results.overallRisk <= 33
                  ? "Your current stress levels appear manageable. You have good coping mechanisms and work-life balance. Continue maintaining healthy boundaries and self-care practices."
                  : results.overallRisk <= 66
                    ? "You're showing moderate signs of stress that warrant attention. Some areas of your work life may be affecting your wellbeing. Consider addressing the highest-risk areas identified."
                    : "Your responses indicate elevated stress and potential burnout risk. It's important to take this seriously and consider making changes or seeking support."}
              </p>
            </CardContent>
          </Card>

          {/* Coping Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Practical Coping Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.scores.workload >= 60 && (
                <div className="bg-chart-1/10 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Managing Workload</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prioritize tasks using the Eisenhower matrix</li>
                    <li>• Learn to say no or renegotiate deadlines</li>
                    <li>• Break large projects into smaller, manageable tasks</li>
                    <li>• Discuss workload concerns with your manager</li>
                  </ul>
                </div>
              )}

              {results.scores.control <= 40 && (
                <div className="bg-chart-2/10 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Increasing Control</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Focus on what you can control, accept what you cannot</li>
                    <li>• Request more autonomy in specific areas</li>
                    <li>• Create personal routines within your workday</li>
                    <li>• Advocate for yourself in decision-making processes</li>
                  </ul>
                </div>
              )}

              {results.scores.recovery <= 40 && (
                <div className="bg-chart-3/10 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Improving Recovery</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Establish a consistent sleep schedule</li>
                    <li>• Set boundaries for work communications</li>
                    <li>• Schedule time for hobbies and social activities</li>
                    <li>• Practice relaxation techniques daily</li>
                  </ul>
                </div>
              )}

              {results.scores.emotional >= 60 && (
                <div className="bg-chart-5/10 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Addressing Emotional Exhaustion</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Talk to someone you trust about how you're feeling</li>
                    <li>• Reconnect with why your work matters to you</li>
                    <li>• Consider professional support if feelings persist</li>
                    <li>• Take small breaks throughout the day</li>
                  </ul>
                </div>
              )}

              {results.overallRisk <= 33 && (
                <div className="bg-chart-2/10 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Maintaining Wellbeing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Continue your current self-care practices</li>
                    <li>• Monitor for early warning signs of stress</li>
                    <li>• Support colleagues who may be struggling</li>
                    <li>• Build resilience through ongoing learning</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* When to Seek Help */}
          {results.overallRisk > 66 && (
            <Card className="border-chart-5/30">
              <CardHeader>
                <CardTitle className="text-chart-5">Consider Professional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your responses suggest significant stress that may benefit from professional guidance. Consider
                  speaking with a mental health professional, your HR department, or an Employee Assistance Program
                  (EAP) if available.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="Stress & Burnout Check"
      description="Assess your current stress levels and get coping strategies"
    >
      <StepIndicator currentStep={currentQuestion} totalSteps={questions.length} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs text-white ${categoryInfo[currentQ.category].color}`}>
              {categoryInfo[currentQ.category].title}
            </span>
          </div>
          <CardTitle className="text-lg">
            Question {currentQuestion} of {questions.length}
          </CardTitle>
          <CardDescription className="text-base">{currentQ.text}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentQ.lowLabel}</span>
              <span>{currentQ.highLabel}</span>
            </div>
            <Slider
              value={[currentValue]}
              onValueChange={(value) => handleAnswer(currentQuestion, value)}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold">{currentValue}%</span>
            </div>
          </div>
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
        <Button onClick={nextQuestion} className="gap-2">
          {currentQuestion === questions.length ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
