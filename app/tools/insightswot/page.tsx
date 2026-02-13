"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Plus,
  X,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  AlertTriangle,
  Zap,
  Printer,
} from "lucide-react"
import { PrintHeader } from "@/components/print/print-header"
import { PrintFooter } from "@/components/print/print-footer"
import { printReport } from "@/lib/print-utils"

type SwotCategory = "strengths" | "weaknesses" | "opportunities" | "threats"

interface SwotItem {
  id: string
  text: string
  impact: "high" | "medium" | "low"
}

interface SwotData {
  context: string
  strengths: SwotItem[]
  weaknesses: SwotItem[]
  opportunities: SwotItem[]
  threats: SwotItem[]
}

const initialData: SwotData = {
  context: "",
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: [],
}

const categoryConfig = {
  strengths: {
    title: "Strengths",
    description: "Internal positive attributes and resources",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
    icon: TrendingUp,
    questions: [
      "What do you do better than competitors?",
      "What unique resources do you have?",
      "What do others see as your strengths?",
    ],
  },
  weaknesses: {
    title: "Weaknesses",
    description: "Internal factors that need improvement",
    color: "bg-amber-500",
    lightColor: "bg-amber-50 border-amber-200",
    textColor: "text-amber-700",
    icon: TrendingDown,
    questions: [
      "What could you improve?",
      "Where do you have fewer resources?",
      "What are others likely to see as weaknesses?",
    ],
  },
  opportunities: {
    title: "Opportunities",
    description: "External factors you could exploit",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    icon: Lightbulb,
    questions: [
      "What trends could you take advantage of?",
      "What opportunities are available to you?",
      "How can you turn strengths into opportunities?",
    ],
  },
  threats: {
    title: "Threats",
    description: "External factors that could cause trouble",
    color: "bg-red-500",
    lightColor: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    icon: AlertTriangle,
    questions: [
      "What obstacles do you face?",
      "What are your competitors doing?",
      "Is changing technology threatening your position?",
    ],
  },
}

export default function InsightSwotPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<SwotData>(initialData)
  const [currentInput, setCurrentInput] = useState("")
  const [currentImpact, setCurrentImpact] = useState<"high" | "medium" | "low">("medium")
  const [showResults, setShowResults] = useState(false)

  const steps = ["context", "strengths", "weaknesses", "opportunities", "threats", "results"]
  const currentStep = steps[step]

  const addItem = (category: SwotCategory) => {
    if (!currentInput.trim()) return
    const newItem: SwotItem = {
      id: Date.now().toString(),
      text: currentInput.trim(),
      impact: currentImpact,
    }
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], newItem],
    }))
    setCurrentInput("")
    setCurrentImpact("medium")
  }

  const removeItem = (category: SwotCategory, id: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }))
  }

  const generateStrategies = () => {
    const strategies = {
      SO: [] as string[],
      ST: [] as string[],
      WO: [] as string[],
      WT: [] as string[],
    }

    if (data.strengths.length > 0 && data.opportunities.length > 0) {
      strategies.SO.push(`Leverage "${data.strengths[0]?.text}" to pursue "${data.opportunities[0]?.text}"`)
      if (data.strengths.length > 1 && data.opportunities.length > 1) {
        strategies.SO.push(
          `Combine strengths in ${data.strengths
            .slice(0, 2)
            .map((s) => s.text)
            .join(" and ")} to maximize opportunity potential`,
        )
      }
    }

    if (data.strengths.length > 0 && data.threats.length > 0) {
      strategies.ST.push(`Use "${data.strengths[0]?.text}" to mitigate the threat of "${data.threats[0]?.text}"`)
    }

    if (data.weaknesses.length > 0 && data.opportunities.length > 0) {
      strategies.WO.push(`Address "${data.weaknesses[0]?.text}" to better capture "${data.opportunities[0]?.text}"`)
    }

    if (data.weaknesses.length > 0 && data.threats.length > 0) {
      strategies.WT.push(
        `Develop contingency plan: mitigate "${data.weaknesses[0]?.text}" before "${data.threats[0]?.text}" materializes`,
      )
    }

    return strategies
  }

  const getScoreAnalysis = () => {
    const totalItems = data.strengths.length + data.weaknesses.length + data.opportunities.length + data.threats.length
    const positiveItems = data.strengths.length + data.opportunities.length
    const highImpactPositive = [...data.strengths, ...data.opportunities].filter((i) => i.impact === "high").length
    const highImpactNegative = [...data.weaknesses, ...data.threats].filter((i) => i.impact === "high").length

    let outlook = "Balanced"
    let score = 50

    if (totalItems > 0) {
      score = Math.round((positiveItems / totalItems) * 100)
      if (score >= 65) outlook = "Favorable"
      else if (score <= 35) outlook = "Challenging"
    }

    return { outlook, score, highImpactPositive, highImpactNegative, totalItems }
  }

  const handleExportPDF = () => {
    printReport({
      title: data.context || "SWOT Analysis",
      toolName: "InsightSWOT™",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setStep(0)
    setShowResults(false)
    setCurrentInput("")
  }

  const renderContextStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label htmlFor="context" className="text-base font-medium">
          What are you analyzing?
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Define the business, project, product, or decision you want to analyze
        </p>
        <Textarea
          id="context"
          placeholder="e.g., Our company's expansion into the European market..."
          value={data.context}
          onChange={(e) => setData((prev) => ({ ...prev, context: e.target.value }))}
          className="min-h-[120px] glass-card"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => setStep(1)}
          disabled={!data.context.trim()}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90"
        >
          Continue to Strengths <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderCategoryStep = (category: SwotCategory) => {
    const config = categoryConfig[category]
    const items = data[category]
    const Icon = config.icon

    return (
      <div className="space-y-6 animate-fade-in">
        <div className={`p-4 rounded-xl ${config.lightColor} border`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className={`font-heading font-semibold ${config.textColor}`}>{config.title}</h3>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Guiding questions:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {config.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span> {q}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder={`Add a ${category.slice(0, -1)}...`}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem(category)}
              className="glass-card"
            />
            <select
              value={currentImpact}
              onChange={(e) => setCurrentImpact(e.target.value as "high" | "medium" | "low")}
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button onClick={() => addItem(category)} size="icon" className="bg-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-lg glass-card group">
                  <span className="text-sm flex-1">{item.text}</span>
                  <Badge
                    variant={item.impact === "high" ? "default" : item.impact === "medium" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {item.impact}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(category, item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={() => {
              if (step === 4) {
                setShowResults(true)
                setStep(5)
              } else {
                setStep(step + 1)
              }
            }}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90"
          >
            {step === 4 ? "Generate Analysis" : "Continue"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderResults = () => {
    const strategies = generateStrategies()
    const analysis = getScoreAnalysis()

    return (
      <div className="space-y-8 animate-fade-in" id="swot-results">
        <PrintHeader toolName="InsightSWOT™" title={data.context} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">InsightSWOT™ Analysis Report</h2>
            <p className="text-muted-foreground mt-1">{data.context}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleExportPDF} className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <Printer className="h-4 w-4" /> Print Report
            </Button>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block">
          <h2 className="font-heading text-2xl font-bold text-foreground">InsightSWOT™ Analysis Report</h2>
          <p className="text-muted-foreground mt-1">{data.context}</p>
        </div>

        {/* Score Overview */}
        <div className="glass-card-strong rounded-2xl p-6 avoid-break">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-secondary"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary score-ring"
                  style={
                    {
                      "--score-offset": 283 - (283 * analysis.score) / 100,
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                    } as React.CSSProperties
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{analysis.score}%</span>
                <span className="text-xs text-muted-foreground">Positive</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Zap className="h-3.5 w-3.5" />
                {analysis.outlook} Outlook
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your analysis contains {analysis.totalItems} factors with {analysis.highImpactPositive} high-impact
                positive elements and {analysis.highImpactNegative} high-impact concerns requiring attention.
              </p>
            </div>
          </div>
        </div>

        {/* SWOT Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(categoryConfig) as SwotCategory[]).map((category) => {
            const config = categoryConfig[category]
            const items = data[category]
            const Icon = config.icon

            return (
              <Card key={category} className={`glass-card ${config.lightColor} avoid-break`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${config.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className={`font-heading ${config.textColor}`}>
                      {config.title} ({items.length})
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {items.length > 0 ? (
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.id} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 mt-0.5 ${config.textColor}`} />
                          <span className="flex-1">{item.text}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.impact}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No items added</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Strategic Recommendations */}
        <Card className="glass-card-strong avoid-break">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Strategic Recommendations
            </CardTitle>
            <CardDescription>Cross-referenced strategies based on your SWOT factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategies.SO.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 text-sm mb-2">SO Strategies (Strength-Opportunity)</h4>
                  <ul className="space-y-1">
                    {strategies.SO.map((s, i) => (
                      <li key={i} className="text-sm text-emerald-800">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {strategies.ST.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h4 className="font-semibold text-blue-700 text-sm mb-2">ST Strategies (Strength-Threat)</h4>
                  <ul className="space-y-1">
                    {strategies.ST.map((s, i) => (
                      <li key={i} className="text-sm text-blue-800">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {strategies.WO.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <h4 className="font-semibold text-amber-700 text-sm mb-2">WO Strategies (Weakness-Opportunity)</h4>
                  <ul className="space-y-1">
                    {strategies.WO.map((s, i) => (
                      <li key={i} className="text-sm text-amber-800">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {strategies.WT.length > 0 && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <h4 className="font-semibold text-red-700 text-sm mb-2">WT Strategies (Weakness-Threat)</h4>
                  <ul className="space-y-1">
                    {strategies.WT.map((s, i) => (
                      <li key={i} className="text-sm text-red-800">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <PrintFooter
          toolName="InsightSWOT™"
          disclaimer="This SWOT analysis is for strategic planning purposes. Actual business decisions should involve comprehensive due diligence and professional consultation."
        />

        {/* Screen-only Footer */}
        <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-6 no-print">
          <p>Generated by InsightSWOT™ — Gaurab Labs</p>
          <p>This analysis is for educational purposes. Not a substitute for professional advice.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8 no-print">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">InsightSWOT™</h1>
              <p className="text-sm text-muted-foreground">Strategic Situation Analysis</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Analyze your business, project, or idea using a structured SWOT framework enhanced with strategic
            interpretation and actionable recommendations.
          </p>
        </div>

        {/* Progress Indicator */}
        {!showResults && (
          <div className="mb-8 no-print">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step + 1} of 5</span>
              <span>{Math.round(((step + 1) / 5) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${((step + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card className="glass-card-strong no-print">
          <CardContent className="p-6 sm:p-8">
            {currentStep === "context" && renderContextStep()}
            {currentStep === "strengths" && renderCategoryStep("strengths")}
            {currentStep === "weaknesses" && renderCategoryStep("weaknesses")}
            {currentStep === "opportunities" && renderCategoryStep("opportunities")}
            {currentStep === "threats" && renderCategoryStep("threats")}
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && renderResults()}
      </div>
    </div>
  )
}
