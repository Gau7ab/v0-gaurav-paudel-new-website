"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface Factor {
  description: string
  impact: "opportunity" | "risk" | "neutral"
}

interface PESTLEData {
  country: string
  political: Factor[]
  economic: Factor[]
  social: Factor[]
  technological: Factor[]
  legal: Factor[]
  environmental: Factor[]
}

const initialData: PESTLEData = {
  country: "Nepal",
  political: [],
  economic: [],
  social: [],
  technological: [],
  legal: [],
  environmental: [],
}

const categories = [
  {
    key: "political" as const,
    title: "Political",
    letter: "P",
    color: "bg-chart-1",
    questions: [
      "What is the current political stability?",
      "How do government policies affect your industry?",
      "What are the trade regulations and tariffs?",
    ],
  },
  {
    key: "economic" as const,
    title: "Economic",
    letter: "E",
    color: "bg-chart-2",
    questions: [
      "What is the economic growth rate?",
      "How do inflation and interest rates impact you?",
      "What is the employment situation?",
    ],
  },
  {
    key: "social" as const,
    title: "Social",
    letter: "S",
    color: "bg-chart-3",
    questions: [
      "What are the demographic trends?",
      "How are consumer attitudes changing?",
      "What cultural factors are relevant?",
    ],
  },
  {
    key: "technological" as const,
    title: "Technological",
    letter: "T",
    color: "bg-chart-4",
    questions: [
      "What technology changes are affecting your industry?",
      "How is digital transformation impacting operations?",
      "What innovations could disrupt the market?",
    ],
  },
  {
    key: "legal" as const,
    title: "Legal",
    letter: "L",
    color: "bg-chart-5",
    questions: [
      "What laws and regulations apply to your business?",
      "Are there pending regulatory changes?",
      "What are the employment and health/safety requirements?",
    ],
  },
  {
    key: "environmental" as const,
    title: "Environmental",
    letter: "E",
    color: "bg-primary",
    questions: [
      "What environmental regulations apply?",
      "How does climate change affect your operations?",
      "What sustainability expectations exist?",
    ],
  },
]

const countries = ["Nepal", "India", "USA", "UK", "Australia", "Canada", "Germany", "Japan", "China", "Other"]

export default function PESTLEPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = country selection
  const [data, setData] = useState<PESTLEData>(initialData)
  const [currentInput, setCurrentInput] = useState("")
  const [currentImpact, setCurrentImpact] = useState<"opportunity" | "risk" | "neutral">("neutral")
  const [showResults, setShowResults] = useState(false)

  const currentCategory = currentStep > 0 ? categories[currentStep - 1] : null

  const addFactor = () => {
    if (currentInput.trim() && currentCategory) {
      setData((prev) => ({
        ...prev,
        [currentCategory.key]: [
          ...prev[currentCategory.key],
          { description: currentInput.trim(), impact: currentImpact },
        ],
      }))
      setCurrentInput("")
      setCurrentImpact("neutral")
    }
  }

  const removeFactor = (index: number) => {
    if (currentCategory) {
      setData((prev) => ({
        ...prev,
        [currentCategory.key]: prev[currentCategory.key].filter((_, i) => i !== index),
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
      setCurrentInput("")
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCurrentInput("")
    }
  }

  const handleExport = () => {
    exportToPDF("pestle-results", {
      filename: "PESTLE_Analysis",
      title: "PESTLE Analysis",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(0)
    setCurrentInput("")
    setShowResults(false)
  }

  const calculateStats = () => {
    let opportunities = 0
    let risks = 0
    let neutral = 0

    categories.forEach((cat) => {
      data[cat.key].forEach((factor) => {
        if (factor.impact === "opportunity") opportunities++
        else if (factor.impact === "risk") risks++
        else neutral++
      })
    })

    const total = opportunities + risks + neutral
    const score = total > 0 ? Math.round(((opportunities * 1 + neutral * 0.5 - risks * 0.5) / total + 0.5) * 100) : 50

    return { opportunities, risks, neutral, total, score }
  }

  if (showResults) {
    const stats = calculateStats()

    return (
      <ToolLayout
        title="PESTLE Analysis"
        description={`External environment analysis for ${data.country}`}
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="pestle-results" className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Overview</CardTitle>
              <CardDescription>Analysis for {data.country}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-chart-2/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-2">{stats.opportunities}</div>
                  <div className="text-xs text-muted-foreground">Opportunities</div>
                </div>
                <div className="p-4 bg-chart-5/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-5">{stats.risks}</div>
                  <div className="text-xs text-muted-foreground">Risks</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{stats.neutral}</div>
                  <div className="text-xs text-muted-foreground">Neutral</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.score}%</div>
                  <div className="text-xs text-muted-foreground">Favorability</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Card key={cat.key}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {cat.letter}
                    </div>
                    <CardTitle className="text-lg">{cat.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {data[cat.key].length > 0 ? (
                    <ul className="space-y-2">
                      {data[cat.key].map((factor, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Badge
                            variant={
                              factor.impact === "opportunity"
                                ? "default"
                                : factor.impact === "risk"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-xs shrink-0"
                          >
                            {factor.impact === "opportunity" ? "+" : factor.impact === "risk" ? "-" : "○"}
                          </Badge>
                          <span>{factor.description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No factors identified</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle>Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {stats.score >= 70
                  ? "The external environment appears largely favorable with more opportunities than risks. This suggests good conditions for growth and expansion."
                  : stats.score >= 50
                    ? "The external environment shows a balanced mix of opportunities and risks. Careful strategic planning is needed to capitalize on opportunities while mitigating risks."
                    : "The external environment presents significant challenges. Focus on risk mitigation strategies and building resilience before pursuing growth opportunities."}
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Monitor high-risk factors closely and develop contingency plans</li>
                  <li>• Prioritize opportunities that align with your core strengths</li>
                  <li>• Conduct regular reviews as the environment evolves</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  // Country Selection Step
  if (currentStep === 0) {
    return (
      <ToolLayout
        title="PESTLE Analysis"
        description="Analyze political, economic, social, technological, legal, and environmental factors"
      >
        <StepIndicator currentStep={1} totalSteps={7} labels={["Country", ...categories.map((c) => c.title)]} />

        <Card>
          <CardHeader>
            <CardTitle>Select Country</CardTitle>
            <CardDescription>Choose the country or region for your analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region</Label>
              <Select value={data.country} onValueChange={(value) => setData((prev) => ({ ...prev, country: value }))}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={nextStep} className="gap-2">
            Start Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </ToolLayout>
    )
  }

  // Factor Input Steps
  return (
    <ToolLayout
      title="PESTLE Analysis"
      description="Analyze political, economic, social, technological, legal, and environmental factors"
    >
      <StepIndicator
        currentStep={currentStep + 1}
        totalSteps={7}
        labels={["Country", ...categories.map((c) => c.title)]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${currentCategory?.color} flex items-center justify-center text-white font-bold`}
            >
              {currentCategory?.letter}
            </div>
            <div>
              <CardTitle>{currentCategory?.title} Factors</CardTitle>
              <CardDescription>
                Identify {currentCategory?.title.toLowerCase()} factors affecting your business
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guiding Questions */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Consider these questions:</h4>
            <ul className="space-y-1">
              {currentCategory?.questions.map((q, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span>•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <Label>Add a factor</Label>
            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={`Describe a ${currentCategory?.title.toLowerCase()} factor...`}
              className="resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <Select
                value={currentImpact}
                onValueChange={(v: "opportunity" | "risk" | "neutral") => setCurrentImpact(v)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opportunity">Opportunity</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addFactor} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Added Factors */}
          {currentCategory && data[currentCategory.key].length > 0 && (
            <div className="space-y-2">
              <Label>Added factors ({data[currentCategory.key].length})</Label>
              <div className="space-y-2">
                {data[currentCategory.key].map((factor, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                    <Badge
                      variant={
                        factor.impact === "opportunity"
                          ? "default"
                          : factor.impact === "risk"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs shrink-0"
                    >
                      {factor.impact}
                    </Badge>
                    <span className="text-sm flex-1">{factor.description}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => removeFactor(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} className="gap-2">
          {currentStep === 6 ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
