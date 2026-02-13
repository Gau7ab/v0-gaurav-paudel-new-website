"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, ArrowLeft, Download, RotateCcw, CheckCircle, Zap } from "lucide-react"

interface Answer {
  questionId: number
  value: number
}

const traits = {
  openness: {
    name: "Openness",
    description: "Appreciation for art, emotion, adventure, and intellectual curiosity",
    high: "Creative, curious, open to new experiences",
    low: "Practical, conventional, prefers routine",
    careers: ["Artist", "Researcher", "Entrepreneur", "Designer", "Strategist"],
    color: "bg-violet-500",
    lightColor: "bg-violet-50 border-violet-200",
    textColor: "text-violet-700",
  },
  conscientiousness: {
    name: "Conscientiousness",
    description: "Tendency to be organized, dependable, and goal-directed",
    high: "Organized, disciplined, achievement-oriented",
    low: "Flexible, spontaneous, adaptable",
    careers: ["Project Manager", "Accountant", "Engineer", "Surgeon", "Lawyer"],
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
  },
  extraversion: {
    name: "Extraversion",
    description: "Tendency to seek stimulation and enjoy the company of others",
    high: "Outgoing, energetic, talkative",
    low: "Reserved, reflective, prefers solitude",
    careers: ["Sales Manager", "Marketing Director", "Teacher", "Consultant", "HR Manager"],
    color: "bg-amber-500",
    lightColor: "bg-amber-50 border-amber-200",
    textColor: "text-amber-700",
  },
  agreeableness: {
    name: "Agreeableness",
    description: "Tendency to be compassionate and cooperative",
    high: "Friendly, cooperative, trusting",
    low: "Competitive, challenging, skeptical",
    careers: ["Counselor", "Nurse", "Social Worker", "Teacher", "Customer Service"],
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
  },
  neuroticism: {
    name: "Emotional Stability",
    description: "Tendency toward emotional stability and resilience",
    high: "Calm, secure, confident",
    low: "Sensitive, prone to stress, emotionally reactive",
    careers: ["Emergency Responder", "Executive", "Pilot", "Surgeon", "Military Officer"],
    color: "bg-rose-500",
    lightColor: "bg-rose-50 border-rose-200",
    textColor: "text-rose-700",
  },
}

const questions = [
  // Openness (6 questions)
  { id: 1, text: "I enjoy trying new and different activities.", trait: "openness", reversed: false },
  { id: 2, text: "I prefer to stick with things I know.", trait: "openness", reversed: true },
  { id: 3, text: "I have a vivid imagination.", trait: "openness", reversed: false },
  { id: 4, text: "I am not interested in abstract ideas.", trait: "openness", reversed: true },
  { id: 5, text: "I enjoy thinking about complex problems.", trait: "openness", reversed: false },
  { id: 6, text: "I prefer practical solutions over creative ones.", trait: "openness", reversed: true },
  // Conscientiousness (6 questions)
  { id: 7, text: "I am always prepared and organized.", trait: "conscientiousness", reversed: false },
  { id: 8, text: "I often leave my belongings around.", trait: "conscientiousness", reversed: true },
  { id: 9, text: "I pay attention to details.", trait: "conscientiousness", reversed: false },
  { id: 10, text: "I make a mess of things.", trait: "conscientiousness", reversed: true },
  { id: 11, text: "I get chores done right away.", trait: "conscientiousness", reversed: false },
  { id: 12, text: "I often forget to put things back in their place.", trait: "conscientiousness", reversed: true },
  // Extraversion (6 questions)
  { id: 13, text: "I feel comfortable around people.", trait: "extraversion", reversed: false },
  { id: 14, text: "I prefer to keep to myself.", trait: "extraversion", reversed: true },
  { id: 15, text: "I start conversations easily.", trait: "extraversion", reversed: false },
  { id: 16, text: "I have little to say.", trait: "extraversion", reversed: true },
  { id: 17, text: "I enjoy being the center of attention.", trait: "extraversion", reversed: false },
  { id: 18, text: "I prefer to stay in the background.", trait: "extraversion", reversed: true },
  // Agreeableness (6 questions)
  { id: 19, text: "I am interested in people's wellbeing.", trait: "agreeableness", reversed: false },
  { id: 20, text: "I am not really interested in others.", trait: "agreeableness", reversed: true },
  { id: 21, text: "I sympathize with others' feelings.", trait: "agreeableness", reversed: false },
  { id: 22, text: "I am not interested in other people's problems.", trait: "agreeableness", reversed: true },
  { id: 23, text: "I have a soft heart.", trait: "agreeableness", reversed: false },
  { id: 24, text: "I feel little concern for others.", trait: "agreeableness", reversed: true },
  // Emotional Stability (6 questions)
  { id: 25, text: "I remain calm under pressure.", trait: "neuroticism", reversed: false },
  { id: 26, text: "I get stressed out easily.", trait: "neuroticism", reversed: true },
  { id: 27, text: "I am relaxed most of the time.", trait: "neuroticism", reversed: false },
  { id: 28, text: "I worry about things.", trait: "neuroticism", reversed: true },
  { id: 29, text: "I seldom feel sad or down.", trait: "neuroticism", reversed: false },
  { id: 30, text: "I often feel anxious.", trait: "neuroticism", reversed: true },
]

const scaleLabels = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
]

export default function PersonaIQPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: number) => {
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

  const calculateScores = () => {
    const scores: Record<string, number> = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    }

    const counts: Record<string, number> = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    }

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId)
      if (question) {
        const value = question.reversed ? 6 - answer.value : answer.value
        scores[question.trait] += value
        counts[question.trait]++
      }
    })

    // Convert to percentages (6 questions per trait, max score 30)
    Object.keys(scores).forEach((trait) => {
      scores[trait] = Math.round((scores[trait] / 30) * 100)
    })

    return scores
  }

  const getInterpretation = (trait: string, score: number) => {
    const config = traits[trait as keyof typeof traits]
    if (score >= 60) return { level: "High", description: config.high }
    if (score <= 40) return { level: "Low", description: config.low }
    return { level: "Moderate", description: "Balanced between both tendencies" }
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

  const handleExportPDF = () => {
    window.print()
  }

  const progress = (answers.length / questions.length) * 100

  if (showResults) {
    const scores = calculateScores()
    const traitOrder = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"]

    // Determine dominant traits
    const sortedTraits = traitOrder.sort((a, b) => scores[b] - scores[a])
    const dominantTrait = sortedTraits[0]
    const secondaryTrait = sortedTraits[1]

    return (
      <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" id="personaiq-results">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">PersonaIQ™ Report</h1>
                <p className="text-sm text-muted-foreground">Big Five Personality Assessment</p>
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

          {/* Summary Card */}
          <Card className="glass-card-strong mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Radar-style visualization */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background pentagon */}
                    <polygon
                      points="100,20 180,70 160,160 40,160 20,70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                    />
                    <polygon
                      points="100,50 150,80 135,140 65,140 50,80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                    />
                    <polygon
                      points="100,80 120,95 112,120 88,120 80,95"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                    />
                    {/* Score polygon */}
                    <polygon
                      points={`
                        100,${20 + (80 - scores.openness * 0.8)},
                        ${100 + scores.extraversion * 0.8},${70 + (1 - scores.extraversion / 100) * 30},
                        ${100 + scores.agreeableness * 0.6},${160 - scores.agreeableness * 0.4},
                        ${100 - scores.conscientiousness * 0.6},${160 - scores.conscientiousness * 0.4},
                        ${100 - scores.neuroticism * 0.8},${70 + (1 - scores.neuroticism / 100) * 30}
                      `}
                      fill="currentColor"
                      fillOpacity="0.2"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                    />
                    {/* Labels */}
                    <text x="100" y="12" textAnchor="middle" className="text-[10px] fill-muted-foreground">
                      O
                    </text>
                    <text x="188" y="72" textAnchor="start" className="text-[10px] fill-muted-foreground">
                      E
                    </text>
                    <text x="165" y="170" textAnchor="middle" className="text-[10px] fill-muted-foreground">
                      A
                    </text>
                    <text x="35" y="170" textAnchor="middle" className="text-[10px] fill-muted-foreground">
                      C
                    </text>
                    <text x="12" y="72" textAnchor="end" className="text-[10px] fill-muted-foreground">
                      ES
                    </text>
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <Zap className="h-3.5 w-3.5" />
                    Personality Profile
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Dominant: {traits[dominantTrait as keyof typeof traits].name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Secondary: {traits[secondaryTrait as keyof typeof traits].name}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your personality profile shows strong{" "}
                    {traits[dominantTrait as keyof typeof traits].name.toLowerCase()} tendencies, suggesting you are{" "}
                    {getInterpretation(dominantTrait, scores[dominantTrait]).description.toLowerCase()}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trait Breakdown */}
          <div className="space-y-4 mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">Trait Breakdown</h2>
            {Object.entries(traits).map(([key, config]) => {
              const score = scores[key]
              const interpretation = getInterpretation(key, score)

              return (
                <Card key={key} className={`glass-card ${config.lightColor}`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{score}%</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-heading font-semibold ${config.textColor}`}>{config.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {interpretation.level}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{config.description}</p>
                        </div>
                      </div>
                      <div className="w-full sm:w-48">
                        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                          <div className={`h-full ${config.color} progress-fill`} style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{interpretation.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Career Insights */}
          <Card className="glass-card-strong mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Career & Work Style Insights</CardTitle>
              <CardDescription>Based on your personality profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-3">Recommended Career Paths</h4>
                  <div className="flex flex-wrap gap-2">
                    {traits[dominantTrait as keyof typeof traits].careers.map((career) => (
                      <Badge key={career} variant="secondary" className="text-xs">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-3">Work Environment</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {scores.extraversion >= 60
                      ? "You thrive in collaborative, social work environments with opportunities for interaction and teamwork."
                      : scores.extraversion <= 40
                        ? "You perform best in quiet, focused environments where you can work independently and deeply."
                        : "You're adaptable to both collaborative and independent work settings."}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-3">Strengths at Work</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {scores.conscientiousness >= 60 && <li>• Strong organizational and planning skills</li>}
                    {scores.openness >= 60 && <li>• Creative problem-solving abilities</li>}
                    {scores.agreeableness >= 60 && <li>• Excellent team collaboration</li>}
                    {scores.neuroticism >= 60 && <li>• Calm under pressure</li>}
                    {scores.extraversion >= 60 && <li>• Natural leadership and communication</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-3">Development Areas</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {scores.conscientiousness <= 40 && <li>• Building structure and routine</li>}
                    {scores.openness <= 40 && <li>• Embracing change and new ideas</li>}
                    {scores.agreeableness <= 40 && <li>• Collaborative soft skills</li>}
                    {scores.neuroticism <= 40 && <li>• Stress management techniques</li>}
                    {scores.extraversion <= 40 && <li>• Networking and self-promotion</li>}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-6">
            <p>Generated by PersonaIQ™ — Gaurab Labs</p>
            <p>
              This assessment is for self-reflection purposes. Not a substitute for professional psychological
              evaluation.
            </p>
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
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">PersonaIQ™</h1>
              <p className="text-sm text-muted-foreground">Big Five Personality Assessment</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Measure your personality across five core traits and convert insights into practical career and personal
            development direction.
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
            <p className="text-lg sm:text-xl font-medium text-foreground text-center mb-8">{question.text}</p>

            <div className="space-y-3">
              {scaleLabels.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    currentAnswer === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === option.value ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {currentAnswer === option.value && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
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
