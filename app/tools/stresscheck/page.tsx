"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RotateCcw,
  Brain,
  Battery,
  Heart,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  text: string
  dimension: "workload" | "emotional" | "physical" | "cognitive" | "recovery"
}

const questions: Question[] = [
  // Workload & Time Pressure (5 questions)
  { id: "w1", text: "I feel overwhelmed by my workload", dimension: "workload" },
  { id: "w2", text: "I have too many deadlines to manage", dimension: "workload" },
  { id: "w3", text: "I work longer hours than I should", dimension: "workload" },
  { id: "w4", text: "I rarely have time for breaks during work", dimension: "workload" },
  { id: "w5", text: "I feel pressured to perform constantly", dimension: "workload" },

  // Emotional Strain (5 questions)
  { id: "e1", text: "I feel emotionally drained at the end of the day", dimension: "emotional" },
  { id: "e2", text: "I get frustrated easily with small issues", dimension: "emotional" },
  { id: "e3", text: "I feel anxious about work even when not working", dimension: "emotional" },
  { id: "e4", text: "I feel disconnected from my work's purpose", dimension: "emotional" },
  { id: "e5", text: "I struggle to feel positive about my job", dimension: "emotional" },

  // Physical Symptoms (5 questions)
  { id: "p1", text: "I experience headaches or physical tension", dimension: "physical" },
  { id: "p2", text: "I have trouble sleeping due to work stress", dimension: "physical" },
  { id: "p3", text: "I feel physically exhausted even after rest", dimension: "physical" },
  { id: "p4", text: "I've noticed changes in my appetite or eating habits", dimension: "physical" },
  { id: "p5", text: "I get sick more often than usual", dimension: "physical" },

  // Cognitive Fatigue (5 questions)
  { id: "c1", text: "I have difficulty concentrating on tasks", dimension: "cognitive" },
  { id: "c2", text: "I make more mistakes than usual", dimension: "cognitive" },
  { id: "c3", text: "I struggle to make decisions", dimension: "cognitive" },
  { id: "c4", text: "I forget things more often", dimension: "cognitive" },
  { id: "c5", text: "I feel mentally foggy or unclear", dimension: "cognitive" },

  // Recovery & Coping (5 questions)
  { id: "r1", text: "I have difficulty unwinding after work", dimension: "recovery" },
  { id: "r2", text: "I don't have time for hobbies or relaxation", dimension: "recovery" },
  { id: "r3", text: "I feel guilty when I'm not being productive", dimension: "recovery" },
  { id: "r4", text: "I lack support from colleagues or family", dimension: "recovery" },
  { id: "r5", text: "I don't have effective ways to manage stress", dimension: "recovery" },
]

const dimensionInfo = {
  workload: { label: "Workload & Time Pressure", icon: Clock, color: "text-blue-500" },
  emotional: { label: "Emotional Strain", icon: Heart, color: "text-red-500" },
  physical: { label: "Physical Symptoms", icon: Battery, color: "text-amber-500" },
  cognitive: { label: "Cognitive Fatigue", icon: Brain, color: "text-purple-500" },
  recovery: { label: "Recovery & Coping", icon: Zap, color: "text-green-500" },
}

const copingStrategies = {
  workload: [
    "Practice time-blocking and prioritization",
    "Learn to delegate tasks effectively",
    "Set clear boundaries around work hours",
    "Break large projects into smaller tasks",
    "Use the 2-minute rule for quick tasks",
  ],
  emotional: [
    "Practice mindfulness meditation daily",
    "Keep a gratitude journal",
    "Seek professional counseling support",
    "Build stronger social connections",
    "Engage in activities that bring joy",
  ],
  physical: [
    "Establish a consistent sleep routine",
    "Exercise for at least 30 minutes daily",
    "Practice deep breathing exercises",
    "Take regular breaks using the Pomodoro technique",
    "Consider ergonomic workspace improvements",
  ],
  cognitive: [
    "Reduce multitasking and focus on one thing",
    "Take short walks to refresh your mind",
    "Limit screen time and digital distractions",
    "Practice brain exercises or puzzles",
    "Ensure adequate nutrition and hydration",
  ],
  recovery: [
    "Schedule non-negotiable rest time",
    "Develop a wind-down routine after work",
    "Pursue hobbies completely unrelated to work",
    "Build a support network of trusted people",
    "Learn relaxation techniques like yoga",
  ],
}

export default function StressCheckPage() {
  const [step, setStep] = useState(1)
  const [timeframe, setTimeframe] = useState("week")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const handleAnswer = (value: number) => {
    const question = questions[currentQuestionIndex]
    setAnswers((prev) => ({ ...prev, [question.id]: value }))

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setStep(3)
    }
  }

  const calculateDimensionScore = (dimension: keyof typeof dimensionInfo): number => {
    const dimensionQuestions = questions.filter((q) => q.dimension === dimension)
    const dimensionAnswers = dimensionQuestions.map((q) => answers[q.id] || 0)
    const total = dimensionAnswers.reduce((sum, val) => sum + val, 0)
    return Math.round((total / (dimensionQuestions.length * 4)) * 100)
  }

  const calculateOverallScore = (): number => {
    const totalAnswers = Object.values(answers).reduce((sum, val) => sum + val, 0)
    return Math.round((totalAnswers / (questions.length * 4)) * 100)
  }

  const getStressLevel = (score: number): { label: string; color: string; description: string } => {
    if (score >= 70)
      return {
        label: "High Stress",
        color: "text-red-500",
        description: "Your stress levels are significantly elevated. Immediate attention and intervention recommended.",
      }
    if (score >= 40)
      return {
        label: "Moderate Stress",
        color: "text-amber-500",
        description: "You're experiencing notable stress. Consider implementing stress management strategies.",
      }
    return {
      label: "Low Stress",
      color: "text-green-500",
      description: "Your stress levels are manageable. Continue with healthy habits and monitoring.",
    }
  }

  const getTopStressors = () => {
    const dimensions = Object.keys(dimensionInfo) as (keyof typeof dimensionInfo)[]
    return dimensions
      .map((d) => ({ dimension: d, score: calculateDimensionScore(d) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  const handlePrint = () => window.print()
  const handleReset = () => {
    setStep(1)
    setTimeframe("week")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const progress = (currentQuestionIndex / questions.length) * 100

  const stressMetrics = useMemo(
    () => ({
      overallScore: calculateOverallScore(),
      stressLevel: getStressLevel(calculateOverallScore()),
      topStressors: getTopStressors(),
    }),
    [answers],
  )

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="no-print inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">StressCheck™</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Comprehensive stress and burnout assessment with personalized coping recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Introduction */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Stress Assessment Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h3 className="font-medium mb-2">About This Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  This 25-question assessment evaluates stress across five key dimensions: workload, emotional strain,
                  physical symptoms, cognitive fatigue, and recovery capacity. Your responses will help identify stress
                  patterns and provide targeted coping strategies.
                </p>
              </div>

              <div className="space-y-3">
                <Label>Timeframe Reference</Label>
                <RadioGroup value={timeframe} onValueChange={setTimeframe} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="week" />
                    <Label htmlFor="week" className="cursor-pointer">
                      Past Week
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="month" />
                    <Label htmlFor="month" className="cursor-pointer">
                      Past Month
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                  Answer based on how you've felt during the selected timeframe
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  <strong>Disclaimer:</strong> This assessment is for self-awareness purposes only and does not
                  constitute medical or psychological advice. If you're experiencing severe stress or mental health
                  concerns, please consult a healthcare professional.
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="gap-2">
                  Begin Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Questions */}
        {step === 2 && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {dimensionInfo[questions[currentQuestionIndex].dimension].label}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-secondary mt-4">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center py-8">
                <p className="text-xl font-medium mb-2">{questions[currentQuestionIndex].text}</p>
                <p className="text-sm text-muted-foreground">Based on the past {timeframe}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs text-muted-foreground px-2">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(value)}
                      className={`p-4 rounded-xl border transition-all hover:border-primary hover:bg-primary/5 ${
                        answers[questions[currentQuestionIndex].id] === value
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      }`}
                    >
                      <span className="text-lg font-medium">{value + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {currentQuestionIndex > 0 && (
                <div className="flex justify-start">
                  <Button variant="ghost" onClick={() => setCurrentQuestionIndex((prev) => prev - 1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-6 print-content" id="stresscheck-report">
            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">StressCheck™ Assessment Report</h1>
              <p className="text-sm text-muted-foreground">
                Generated by Gaurab Labs • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Overall Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Your Stress Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="84"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        className="text-secondary"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="84"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${stressMetrics.overallScore * 5.28} 528`}
                        className={stressMetrics.stressLevel.color}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">{stressMetrics.overallScore}</span>
                      <span className="text-sm text-muted-foreground">Stress Score</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className={`text-2xl font-bold ${stressMetrics.stressLevel.color}`}>
                      {stressMetrics.stressLevel.label}
                    </h3>
                    <p className="text-muted-foreground mt-2">{stressMetrics.stressLevel.description}</p>
                    <div className="mt-4 flex items-center gap-2 justify-center md:justify-start text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Based on: Past {timeframe}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dimension Breakdown */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Dimension Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(Object.keys(dimensionInfo) as (keyof typeof dimensionInfo)[]).map((dim) => {
                  const info = dimensionInfo[dim]
                  const Icon = info.icon
                  const score = calculateDimensionScore(dim)
                  const level = getStressLevel(score)

                  return (
                    <div key={dim} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${info.color}`} />
                          <span className="font-medium text-sm">{info.label}</span>
                        </div>
                        <span className={`text-sm font-medium ${level.color}`}>{score}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            score >= 70 ? "bg-red-500" : score >= 40 ? "bg-amber-500" : "bg-green-500"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Top Stressors */}
            <Card className="glass-card border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  Primary Stress Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stressMetrics.topStressors.map((item, i) => {
                    const info = dimensionInfo[item.dimension]
                    const Icon = info.icon
                    return (
                      <div key={item.dimension} className="flex items-center gap-4 p-3 rounded-lg bg-red-500/5">
                        <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <Icon className={`h-5 w-5 ${info.color}`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{info.label}</p>
                          <p className="text-xs text-muted-foreground">Score: {item.score}%</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Coping Recommendations */}
            <Card className="glass-card border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <Lightbulb className="h-5 w-5" />
                  Personalized Coping Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stressMetrics.topStressors.slice(0, 2).map((item) => {
                    const info = dimensionInfo[item.dimension]
                    const strategies = copingStrategies[item.dimension]
                    const Icon = info.icon

                    return (
                      <div key={item.dimension} className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className={`h-4 w-4 ${info.color}`} />
                          <h4 className="font-medium text-sm">For {info.label}</h4>
                        </div>
                        <ul className="space-y-2">
                          {strategies.slice(0, 3).map((strategy, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Professional Help Notice */}
            {stressMetrics.overallScore >= 60 && (
              <Card className="glass-card border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-600 dark:text-amber-400">Consider Professional Support</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your stress levels indicate you may benefit from professional support. Consider speaking with a
                        counselor, therapist, or your healthcare provider about stress management strategies tailored to
                        your situation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <Button onClick={handlePrint} className="gap-2">
                <FileText className="h-4 w-4" />
                Download Stress Assessment Report
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Retake Assessment
              </Button>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t text-xs text-muted-foreground">
              <p>Generated by StressCheck™ from Gaurab Labs. For self-awareness purposes only.</p>
              <p>This is not a medical diagnosis. Please consult a healthcare professional for clinical advice.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
