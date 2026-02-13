"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ArrowRight, ArrowLeft, Download, RotateCcw, CheckCircle, Zap, Star } from "lucide-react"

interface Answer {
  questionId: number
  value: string
}

const dimensions = {
  analytical: { name: "Analytical", color: "bg-blue-500", description: "Data-driven problem solving" },
  creative: { name: "Creative", color: "bg-violet-500", description: "Innovation and artistic expression" },
  social: { name: "Social", color: "bg-emerald-500", description: "Helping and connecting with people" },
  enterprising: { name: "Enterprising", color: "bg-amber-500", description: "Leadership and business ventures" },
  conventional: { name: "Conventional", color: "bg-slate-500", description: "Organization and systematic work" },
  realistic: { name: "Realistic", color: "bg-rose-500", description: "Hands-on and practical work" },
}

const questions = [
  {
    id: 1,
    text: "When solving a complex problem, I prefer to:",
    options: [
      { value: "analytical", label: "Analyze data and find patterns" },
      { value: "creative", label: "Brainstorm unique solutions" },
      { value: "social", label: "Discuss with others for input" },
      { value: "enterprising", label: "Take charge and make decisions quickly" },
    ],
  },
  {
    id: 2,
    text: "In my ideal work environment, I would:",
    options: [
      { value: "realistic", label: "Work with tools, machines, or outdoors" },
      { value: "conventional", label: "Follow clear procedures and organize information" },
      { value: "creative", label: "Have freedom to experiment and create" },
      { value: "social", label: "Interact with people regularly" },
    ],
  },
  {
    id: 3,
    text: "I feel most accomplished when I:",
    options: [
      { value: "analytical", label: "Solve a difficult logical problem" },
      { value: "enterprising", label: "Lead a project to success" },
      { value: "social", label: "Help someone overcome a challenge" },
      { value: "creative", label: "Create something new and original" },
    ],
  },
  {
    id: 4,
    text: "My strongest skill is:",
    options: [
      { value: "analytical", label: "Critical thinking and research" },
      { value: "conventional", label: "Attention to detail and organization" },
      { value: "enterprising", label: "Persuasion and negotiation" },
      { value: "realistic", label: "Technical or mechanical abilities" },
    ],
  },
  {
    id: 5,
    text: "When working on a team, I naturally:",
    options: [
      { value: "enterprising", label: "Take the lead and delegate" },
      { value: "social", label: "Mediate conflicts and build harmony" },
      { value: "analytical", label: "Provide research and analysis" },
      { value: "creative", label: "Generate innovative ideas" },
    ],
  },
  {
    id: 6,
    text: "I prefer tasks that involve:",
    options: [
      { value: "conventional", label: "Following established procedures" },
      { value: "realistic", label: "Building or fixing tangible things" },
      { value: "creative", label: "Designing or artistic expression" },
      { value: "analytical", label: "Research and investigation" },
    ],
  },
  {
    id: 7,
    text: "In my free time, I enjoy:",
    options: [
      { value: "creative", label: "Arts, writing, or music" },
      { value: "social", label: "Volunteering or community activities" },
      { value: "realistic", label: "Sports, crafts, or outdoor activities" },
      { value: "analytical", label: "Puzzles, reading, or learning new things" },
    ],
  },
  {
    id: 8,
    text: "I am motivated by:",
    options: [
      { value: "enterprising", label: "Achievement, status, and influence" },
      { value: "social", label: "Making a positive impact on others" },
      { value: "analytical", label: "Understanding how things work" },
      { value: "conventional", label: "Stability and financial security" },
    ],
  },
  {
    id: 9,
    text: "When facing uncertainty, I prefer to:",
    options: [
      { value: "analytical", label: "Gather more information before deciding" },
      { value: "enterprising", label: "Trust my instincts and act quickly" },
      { value: "social", label: "Seek advice from trusted people" },
      { value: "conventional", label: "Follow proven methods and procedures" },
    ],
  },
  {
    id: 10,
    text: "My communication style is:",
    options: [
      { value: "analytical", label: "Precise and factual" },
      { value: "creative", label: "Expressive and imaginative" },
      { value: "social", label: "Warm and empathetic" },
      { value: "enterprising", label: "Confident and persuasive" },
    ],
  },
]

const careerMatches: Record<string, string[]> = {
  analytical: [
    "Data Scientist",
    "Research Analyst",
    "Software Engineer",
    "Financial Analyst",
    "Scientist",
    "Economist",
  ],
  creative: ["Graphic Designer", "UX Designer", "Writer", "Marketing Creative", "Architect", "Art Director"],
  social: ["Counselor", "HR Manager", "Teacher", "Social Worker", "Nurse", "Customer Success Manager"],
  enterprising: ["Entrepreneur", "Sales Director", "Product Manager", "CEO", "Consultant", "Business Development"],
  conventional: [
    "Accountant",
    "Project Manager",
    "Operations Manager",
    "Compliance Officer",
    "Administrator",
    "Auditor",
  ],
  realistic: ["Engineer", "Technician", "Pilot", "Chef", "Physical Therapist", "Construction Manager"],
}

export default function CareerFitPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
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
      analytical: 0,
      creative: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
      realistic: 0,
    }

    answers.forEach((answer) => {
      scores[answer.value] = (scores[answer.value] || 0) + 1
    })

    // Convert to percentages
    const total = answers.length
    Object.keys(scores).forEach((key) => {
      scores[key] = Math.round((scores[key] / total) * 100)
    })

    return scores
  }

  const getTopDimensions = (scores: Record<string, number>) => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([key]) => key)
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
    const topDimensions = getTopDimensions(scores)
    const primaryDimension = topDimensions[0]
    const secondaryDimension = topDimensions[1]

    // Get career recommendations based on top dimensions
    const primaryCareers = careerMatches[primaryDimension] || []
    const secondaryCareers = careerMatches[secondaryDimension] || []
    const combinedCareers = [...new Set([...primaryCareers.slice(0, 3), ...secondaryCareers.slice(0, 2)])]

    return (
      <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" id="careerfit-results">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">CareerFit™ Report</h1>
                <p className="text-sm text-muted-foreground">Career Recommendation Engine</p>
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

          {/* Career Profile Summary */}
          <Card className="glass-card-strong mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Visual representation */}
                <div className="grid grid-cols-3 gap-2 w-48">
                  {Object.entries(dimensions).map(([key, dim]) => {
                    const score = scores[key]
                    const isTop = topDimensions.includes(key)
                    return (
                      <div
                        key={key}
                        className={`aspect-square rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all ${dim.color} ${
                          isTop ? "ring-2 ring-primary ring-offset-2" : "opacity-40"
                        }`}
                        title={dim.name}
                      >
                        {score}%
                      </div>
                    )
                  })}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <Zap className="h-3.5 w-3.5" />
                    Career Profile
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {dimensions[primaryDimension as keyof typeof dimensions]?.name}-
                    {dimensions[secondaryDimension as keyof typeof dimensions]?.name} Type
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your career profile combines{" "}
                    <span className="font-medium text-foreground">
                      {dimensions[primaryDimension as keyof typeof dimensions]?.description.toLowerCase()}
                    </span>{" "}
                    with{" "}
                    <span className="font-medium text-foreground">
                      {dimensions[secondaryDimension as keyof typeof dimensions]?.description.toLowerCase()}
                    </span>
                    . This suggests you thrive in roles that blend both aspects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <div className="space-y-3 mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">Interest Dimensions</h2>
            {Object.entries(dimensions).map(([key, dim]) => {
              const score = scores[key]
              const isTop = topDimensions.includes(key)

              return (
                <div
                  key={key}
                  className={`glass-card rounded-xl p-4 transition-all ${isTop ? "ring-2 ring-primary/50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${dim.color}`} />
                      <span className="font-medium text-foreground">{dim.name}</span>
                      {isTop && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Star className="h-3 w-3" /> Top Match
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{score}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${dim.color} progress-fill`} style={{ width: `${score}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{dim.description}</p>
                </div>
              )
            })}
          </div>

          {/* Career Recommendations */}
          <Card className="glass-card-strong mb-8">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Recommended Career Paths
              </CardTitle>
              <CardDescription>Based on your top interest dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {combinedCareers.map((career, index) => (
                  <div
                    key={career}
                    className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover-lift transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="number-badge w-8 h-8 text-sm">{index + 1}</div>
                      <span className="font-medium text-foreground">{career}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Counselling Insights */}
          <Card className="glass-card-strong mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Career Counselling Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Work Environment Fit</h4>
                  <p className="text-sm text-muted-foreground">
                    {scores.social > 40
                      ? "You thrive in collaborative environments with regular human interaction."
                      : "You may prefer focused, independent work with less social demands."}
                    {scores.conventional > 40
                      ? " Structured settings with clear expectations suit you well."
                      : " Flexible, dynamic workplaces may energize you more."}
                  </p>
                </div>
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Growth Direction</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider developing skills in your secondary dimension (
                    {dimensions[secondaryDimension as keyof typeof dimensions]?.name}) to broaden your career options.
                    Combining your primary strength with complementary skills creates unique value.
                  </p>
                </div>
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Next Steps</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Research the recommended career paths in depth</li>
                    <li>• Identify required skills and qualifications</li>
                    <li>• Connect with professionals in these fields</li>
                    <li>• Consider internships or job shadowing</li>
                  </ul>
                </div>
                <div className="insight-card">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Industry Alignment</h4>
                  <p className="text-sm text-muted-foreground">
                    {scores.analytical > 30 ? "Technology, Finance, Research. " : ""}
                    {scores.creative > 30 ? "Media, Design, Marketing. " : ""}
                    {scores.social > 30 ? "Healthcare, Education, HR. " : ""}
                    {scores.enterprising > 30 ? "Business, Sales, Startups. " : ""}
                    {scores.conventional > 30 ? "Administration, Banking, Legal. " : ""}
                    {scores.realistic > 30 ? "Engineering, Construction, Manufacturing." : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-6">
            <p>Generated by CareerFit™ — Gaurab Labs</p>
            <p>
              This assessment is for guidance purposes. Consider consulting with a career counselor for personalized
              advice.
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
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">CareerFit™</h1>
              <p className="text-sm text-muted-foreground">Career Recommendation Engine</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Discover career paths that align with your interests, values, and natural inclinations through this
            structured assessment.
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
              {question.options.map((option) => (
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
