"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Briefcase, Heart, Zap, Users, DollarSign, Lightbulb } from "lucide-react"
import { InsightCard } from "@/components/ui/insight-card"
import { exportToPDF } from "@/lib/pdf-export"

interface CareerDimensions {
  analytical: number
  creative: number
  social: number
  enterprising: number
  conventional: number
  investigative: number
}

interface CareerMatch {
  title: string
  field: string
  match: number
  description: string
  skills: string[]
  growth: string
}

const questions = [
  {
    id: 1,
    text: "When solving problems, I prefer to:",
    options: [
      { value: "a", label: "Analyze data and find logical patterns", scores: { analytical: 3, investigative: 2 } },
      {
        value: "b",
        label: "Brainstorm creative and unconventional solutions",
        scores: { creative: 3, enterprising: 1 },
      },
      {
        value: "c",
        label: "Discuss with others and consider different perspectives",
        scores: { social: 3, conventional: 1 },
      },
      { value: "d", label: "Take charge and make quick decisions", scores: { enterprising: 3, analytical: 1 } },
    ],
  },
  {
    id: 2,
    text: "My ideal work environment would be:",
    options: [
      {
        value: "a",
        label: "Structured with clear processes and expectations",
        scores: { conventional: 3, analytical: 2 },
      },
      {
        value: "b",
        label: "Dynamic with lots of variety and new challenges",
        scores: { creative: 2, enterprising: 3 },
      },
      { value: "c", label: "Collaborative with strong team relationships", scores: { social: 3, conventional: 1 } },
      {
        value: "d",
        label: "Research-focused with opportunities to learn deeply",
        scores: { investigative: 3, analytical: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "What motivates me most at work?",
    options: [
      { value: "a", label: "Making a positive impact on people's lives", scores: { social: 3, creative: 1 } },
      { value: "b", label: "Achieving targets and financial success", scores: { enterprising: 3, conventional: 1 } },
      {
        value: "c",
        label: "Discovering new knowledge or solving complex puzzles",
        scores: { investigative: 3, analytical: 2 },
      },
      {
        value: "d",
        label: "Creating something original and expressing ideas",
        scores: { creative: 3, investigative: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "I feel most satisfied when I:",
    options: [
      { value: "a", label: "Help someone overcome a challenge", scores: { social: 3, enterprising: 1 } },
      { value: "b", label: "Complete a task with precision and accuracy", scores: { conventional: 3, analytical: 2 } },
      { value: "c", label: "Lead a project or team to success", scores: { enterprising: 3, social: 1 } },
      { value: "d", label: "Design or build something new", scores: { creative: 3, investigative: 1 } },
    ],
  },
  {
    id: 5,
    text: "Which statement best describes your learning style?",
    options: [
      { value: "a", label: "I learn best through hands-on experimentation", scores: { investigative: 2, creative: 3 } },
      {
        value: "b",
        label: "I prefer structured courses with clear outcomes",
        scores: { conventional: 3, analytical: 2 },
      },
      {
        value: "c",
        label: "I enjoy learning through discussions and mentorship",
        scores: { social: 3, enterprising: 1 },
      },
      {
        value: "d",
        label: "I absorb information through reading and research",
        scores: { analytical: 3, investigative: 2 },
      },
    ],
  },
  {
    id: 6,
    text: "When faced with a deadline, I typically:",
    options: [
      { value: "a", label: "Plan meticulously and stick to the schedule", scores: { conventional: 3, analytical: 2 } },
      {
        value: "b",
        label: "Work intensely under pressure - it energizes me",
        scores: { enterprising: 3, creative: 1 },
      },
      { value: "c", label: "Delegate tasks and coordinate with the team", scores: { social: 2, enterprising: 2 } },
      {
        value: "d",
        label: "Find innovative shortcuts without compromising quality",
        scores: { creative: 3, investigative: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "My friends would describe me as:",
    options: [
      { value: "a", label: "Thoughtful and analytical", scores: { analytical: 3, investigative: 2 } },
      { value: "b", label: "Caring and supportive", scores: { social: 3, conventional: 1 } },
      { value: "c", label: "Ambitious and driven", scores: { enterprising: 3, analytical: 1 } },
      { value: "d", label: "Imaginative and original", scores: { creative: 3, investigative: 1 } },
    ],
  },
  {
    id: 8,
    text: "What type of tasks do you find most engaging?",
    options: [
      { value: "a", label: "Working with numbers, data, or systems", scores: { analytical: 3, conventional: 2 } },
      { value: "b", label: "Writing, designing, or creating content", scores: { creative: 3, social: 1 } },
      { value: "c", label: "Negotiating, selling, or persuading", scores: { enterprising: 3, social: 2 } },
      {
        value: "d",
        label: "Researching, experimenting, or investigating",
        scores: { investigative: 3, analytical: 2 },
      },
    ],
  },
  {
    id: 9,
    text: "How do you prefer to receive recognition?",
    options: [
      {
        value: "a",
        label: "Through promotions and increased responsibility",
        scores: { enterprising: 3, conventional: 1 },
      },
      { value: "b", label: "Through personal appreciation and gratitude", scores: { social: 3, creative: 1 } },
      {
        value: "c",
        label: "Through intellectual respect and expertise acknowledgment",
        scores: { investigative: 3, analytical: 2 },
      },
      { value: "d", label: "Through showcasing my creative work", scores: { creative: 3, enterprising: 1 } },
    ],
  },
  {
    id: 10,
    text: "In 5 years, I see myself:",
    options: [
      { value: "a", label: "Running my own business or leading a team", scores: { enterprising: 3, social: 1 } },
      { value: "b", label: "Becoming an expert in my specialized field", scores: { investigative: 3, analytical: 2 } },
      { value: "c", label: "Making a meaningful difference in my community", scores: { social: 3, conventional: 1 } },
      { value: "d", label: "Creating innovative products or services", scores: { creative: 3, enterprising: 1 } },
    ],
  },
]

const careerDatabase: CareerMatch[] = [
  {
    title: "Data Scientist",
    field: "Technology",
    match: 0,
    description: "Analyze complex data sets to help organizations make better decisions",
    skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
    growth: "High demand, 35% growth expected",
  },
  {
    title: "Product Manager",
    field: "Technology/Business",
    match: 0,
    description: "Lead product development by coordinating teams and defining strategy",
    skills: ["Strategic thinking", "Communication", "Technical understanding", "Leadership"],
    growth: "Very high demand across industries",
  },
  {
    title: "UX Designer",
    field: "Design/Technology",
    match: 0,
    description: "Create intuitive digital experiences that delight users",
    skills: ["User research", "Prototyping", "Visual design", "Empathy"],
    growth: "Strong growth, especially in tech",
  },
  {
    title: "Management Consultant",
    field: "Consulting",
    match: 0,
    description: "Help organizations solve complex business problems",
    skills: ["Problem solving", "Presentation", "Analysis", "Client management"],
    growth: "Steady demand, competitive field",
  },
  {
    title: "HR Manager",
    field: "Human Resources",
    match: 0,
    description: "Develop and manage people strategies for organizations",
    skills: ["Communication", "Conflict resolution", "Employment law", "Talent development"],
    growth: "Stable growth, evolving role",
  },
  {
    title: "Marketing Manager",
    field: "Marketing",
    match: 0,
    description: "Develop and execute marketing strategies to grow brands",
    skills: ["Digital marketing", "Analytics", "Creativity", "Budget management"],
    growth: "Strong demand for digital skills",
  },
  {
    title: "Financial Analyst",
    field: "Finance",
    match: 0,
    description: "Analyze financial data to guide investment and business decisions",
    skills: ["Financial modeling", "Excel", "Research", "Attention to detail"],
    growth: "Steady growth, essential role",
  },
  {
    title: "Entrepreneur",
    field: "Business",
    match: 0,
    description: "Build and scale your own business venture",
    skills: ["Risk tolerance", "Vision", "Networking", "Resourcefulness"],
    growth: "Unlimited potential, high risk",
  },
  {
    title: "Clinical Psychologist",
    field: "Healthcare",
    match: 0,
    description: "Help individuals overcome mental health challenges",
    skills: ["Active listening", "Empathy", "Assessment", "Therapy techniques"],
    growth: "Growing demand for mental health services",
  },
  {
    title: "Software Engineer",
    field: "Technology",
    match: 0,
    description: "Build software applications and systems",
    skills: ["Programming", "Problem solving", "System design", "Collaboration"],
    growth: "Very high demand globally",
  },
  {
    title: "Content Strategist",
    field: "Media/Marketing",
    match: 0,
    description: "Plan and create content that engages audiences",
    skills: ["Writing", "SEO", "Analytics", "Storytelling"],
    growth: "Growing with digital media expansion",
  },
  {
    title: "Operations Manager",
    field: "Operations",
    match: 0,
    description: "Oversee daily operations and improve efficiency",
    skills: ["Process improvement", "Leadership", "Problem solving", "Organization"],
    growth: "Essential role in all industries",
  },
]

const dimensionWeights: Record<string, Record<string, number>> = {
  "Data Scientist": {
    analytical: 0.35,
    investigative: 0.3,
    conventional: 0.15,
    creative: 0.1,
    social: 0.05,
    enterprising: 0.05,
  },
  "Product Manager": {
    enterprising: 0.25,
    social: 0.25,
    analytical: 0.2,
    creative: 0.15,
    conventional: 0.1,
    investigative: 0.05,
  },
  "UX Designer": {
    creative: 0.35,
    social: 0.25,
    investigative: 0.2,
    analytical: 0.1,
    enterprising: 0.05,
    conventional: 0.05,
  },
  "Management Consultant": {
    analytical: 0.3,
    enterprising: 0.25,
    social: 0.2,
    investigative: 0.15,
    conventional: 0.05,
    creative: 0.05,
  },
  "HR Manager": {
    social: 0.4,
    conventional: 0.2,
    enterprising: 0.2,
    analytical: 0.1,
    creative: 0.05,
    investigative: 0.05,
  },
  "Marketing Manager": {
    creative: 0.25,
    enterprising: 0.25,
    social: 0.2,
    analytical: 0.15,
    conventional: 0.1,
    investigative: 0.05,
  },
  "Financial Analyst": {
    analytical: 0.4,
    conventional: 0.25,
    investigative: 0.2,
    enterprising: 0.1,
    social: 0.03,
    creative: 0.02,
  },
  Entrepreneur: {
    enterprising: 0.4,
    creative: 0.2,
    social: 0.15,
    analytical: 0.15,
    investigative: 0.05,
    conventional: 0.05,
  },
  "Clinical Psychologist": {
    social: 0.4,
    investigative: 0.25,
    analytical: 0.15,
    creative: 0.1,
    conventional: 0.05,
    enterprising: 0.05,
  },
  "Software Engineer": {
    analytical: 0.3,
    investigative: 0.25,
    creative: 0.2,
    conventional: 0.15,
    social: 0.05,
    enterprising: 0.05,
  },
  "Content Strategist": {
    creative: 0.35,
    social: 0.2,
    analytical: 0.2,
    enterprising: 0.15,
    conventional: 0.05,
    investigative: 0.05,
  },
  "Operations Manager": {
    conventional: 0.3,
    enterprising: 0.25,
    analytical: 0.2,
    social: 0.15,
    investigative: 0.05,
    creative: 0.05,
  },
}

export default function CareerFitPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateDimensions = (): CareerDimensions => {
    const dimensions: CareerDimensions = {
      analytical: 0,
      creative: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
      investigative: 0,
    }

    Object.entries(answers).forEach(([qIndex, answer]) => {
      const question = questions[Number.parseInt(qIndex)]
      const option = question.options.find((o) => o.value === answer)
      if (option) {
        Object.entries(option.scores).forEach(([dim, score]) => {
          dimensions[dim as keyof CareerDimensions] += score
        })
      }
    })

    // Normalize to percentages
    const maxPossible = 30
    Object.keys(dimensions).forEach((key) => {
      dimensions[key as keyof CareerDimensions] = Math.round(
        (dimensions[key as keyof CareerDimensions] / maxPossible) * 100,
      )
    })

    return dimensions
  }

  const calculateCareerMatches = (dimensions: CareerDimensions): CareerMatch[] => {
    return careerDatabase
      .map((career) => {
        const weights = dimensionWeights[career.title]
        let matchScore = 0
        Object.entries(weights).forEach(([dim, weight]) => {
          matchScore += dimensions[dim as keyof CareerDimensions] * weight
        })
        return { ...career, match: Math.round(matchScore) }
      })
      .sort((a, b) => b.match - a.match)
  }

  const handleExport = () => {
    exportToPDF("career-fit-results", {
      filename: "Career_Fit_Analysis",
      title: "Career Fit Analysis Report",
    })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
  }

  if (showResults) {
    const dimensions = calculateDimensions()
    const careerMatches = calculateCareerMatches(dimensions)
    const topCareers = careerMatches.slice(0, 5)
    const topDimensions = Object.entries(dimensions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)

    const dimensionLabels: Record<string, { label: string; icon: typeof Briefcase; description: string }> = {
      analytical: { label: "Analytical", icon: Zap, description: "Data-driven, logical problem-solving" },
      creative: { label: "Creative", icon: Lightbulb, description: "Innovation, design, artistic expression" },
      social: { label: "Social", icon: Users, description: "Helping, teaching, relationship-building" },
      enterprising: { label: "Enterprising", icon: DollarSign, description: "Leadership, persuasion, risk-taking" },
      conventional: { label: "Conventional", icon: Briefcase, description: "Organization, structure, detail-oriented" },
      investigative: { label: "Investigative", icon: Heart, description: "Research, analysis, intellectual curiosity" },
    }

    return (
      <ToolLayout
        title="Career Fit Analyzer"
        description="Your personalized career guidance report"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
        category="career"
      >
        <div id="career-fit-results" className="space-y-6">
          {/* Profile Overview */}
          <Card className="glass-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
              <CardTitle className="text-foreground">Your Career Profile</CardTitle>
              <CardDescription>Based on your responses across 6 career dimensions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(dimensions).map(([key, value]) => {
                  const dim = dimensionLabels[key]
                  const Icon = dim.icon
                  return (
                    <div key={key} className="text-center">
                      <div className="relative mx-auto mb-2">
                        <svg width="80" height="80" className="transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="var(--secondary)"
                            strokeWidth="6"
                            className="opacity-50"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={201}
                            strokeDashoffset={201 - (value / 100) * 201}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground">{dim.label}</p>
                      <p className="text-lg font-bold text-primary">{value}%</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Career Matches */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Top Career Matches
              </CardTitle>
              <CardDescription>Careers aligned with your profile (highest fit first)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCareers.map((career, index) => (
                <div
                  key={career.title}
                  className={`rounded-xl p-4 sm:p-5 transition-all ${
                    index === 0
                      ? "bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/30"
                      : "glass-card"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {index === 0 && <span className="text-xs font-medium text-primary">Best Match</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{career.title}</h3>
                      <p className="text-sm text-muted-foreground">{career.field}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{career.match}%</p>
                        <p className="text-xs text-muted-foreground">Fit Score</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {career.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-accent font-medium">{career.growth}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Counselling Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard type="insight" title="Your Strengths">
              Your top dimensions are <strong>{topDimensions[0][0]}</strong> ({topDimensions[0][1]}%) and{" "}
              <strong>{topDimensions[1][0]}</strong> ({topDimensions[1][1]}%). Careers that leverage these traits will
              feel most natural and fulfilling.
            </InsightCard>
            <InsightCard type="growth" title="Development Areas">
              Consider developing skills in your lower-scoring dimensions to broaden career options and become more
              versatile in cross-functional roles.
            </InsightCard>
          </div>

          {/* Next Steps */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Recommended Next Steps</CardTitle>
              <CardDescription>Actionable guidance for your career journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm text-foreground">
                    Research your top 3 career matches in depth - explore job descriptions, required qualifications, and
                    day-to-day responsibilities.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                    2
                  </span>
                  <span className="text-sm text-foreground">
                    Conduct informational interviews with professionals in your target fields to gain real-world
                    insights.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                    3
                  </span>
                  <span className="text-sm text-foreground">
                    Identify skill gaps between your current abilities and requirements for your target roles.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                    4
                  </span>
                  <span className="text-sm text-foreground">
                    Consider taking complementary assessments (MBTI, Leadership Style) for a fuller picture.
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <ToolLayout
      title="Career Fit Analyzer"
      description="Discover careers aligned with your interests, values, and work style preferences"
      category="career"
    >
      <StepIndicator
        currentStep={currentQuestion + 1}
        totalSteps={questions.length}
        labels={questions.map((_, i) => `Q${i + 1}`)}
      />

      <Card className="glass-card border-border/50 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-foreground">Question {currentQuestion + 1}</CardTitle>
          <CardDescription className="text-base sm:text-lg">{currentQ.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswer} className="space-y-3">
            {currentQ.options.map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border/50 glass-card cursor-pointer transition-all hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground peer-data-[state=checked]:border-primary flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="gap-2 glass-card hover:bg-secondary/80 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextQuestion} disabled={!answers[currentQuestion]} className="gap-2 shadow-lg">
          {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
