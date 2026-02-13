"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface VPCData {
  customerJobs: string[]
  customerPains: string[]
  customerGains: string[]
  products: string[]
  painRelievers: string[]
  gainCreators: string[]
}

const initialData: VPCData = {
  customerJobs: [],
  customerPains: [],
  customerGains: [],
  products: [],
  painRelievers: [],
  gainCreators: [],
}

const steps = [
  {
    key: "customerJobs" as const,
    section: "Customer Profile",
    title: "Customer Jobs",
    description: "What tasks are customers trying to accomplish?",
    questions: [
      "What functional jobs are they trying to get done?",
      "What social jobs are they trying to perform?",
      "What emotional jobs do they want to fulfill?",
    ],
    color: "bg-chart-1",
  },
  {
    key: "customerPains" as const,
    section: "Customer Profile",
    title: "Customer Pains",
    description: "What frustrations or obstacles do customers face?",
    questions: ["What does your customer find too costly?", "What makes them feel bad?", "What risks do they fear?"],
    color: "bg-chart-5",
  },
  {
    key: "customerGains" as const,
    section: "Customer Profile",
    title: "Customer Gains",
    description: "What benefits do customers want?",
    questions: [
      "What savings would make customers happy?",
      "What outcomes do they expect?",
      "What would make their job easier?",
    ],
    color: "bg-chart-2",
  },
  {
    key: "products" as const,
    section: "Value Map",
    title: "Products & Services",
    description: "What do you offer to help customers?",
    questions: [
      "What products and services do you offer?",
      "Which customer jobs do they help with?",
      "Are they physical, digital, or intangible?",
    ],
    color: "bg-chart-3",
  },
  {
    key: "painRelievers" as const,
    section: "Value Map",
    title: "Pain Relievers",
    description: "How do you alleviate customer pains?",
    questions: [
      "How do you eliminate or reduce negative emotions?",
      "How do you fix underperforming solutions?",
      "How do you reduce risks customers fear?",
    ],
    color: "bg-chart-4",
  },
  {
    key: "gainCreators" as const,
    section: "Value Map",
    title: "Gain Creators",
    description: "How do you create customer benefits?",
    questions: [
      "How do you create savings customers value?",
      "How do you produce outcomes they expect?",
      "How do you exceed their expectations?",
    ],
    color: "bg-primary",
  },
]

export default function ValuePropositionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<VPCData>(initialData)
  const [currentInput, setCurrentInput] = useState("")
  const [showResults, setShowResults] = useState(false)

  const currentStepData = steps[currentStep - 1]

  const addItem = () => {
    if (currentInput.trim()) {
      setData((prev) => ({
        ...prev,
        [currentStepData.key]: [...prev[currentStepData.key], currentInput.trim()],
      }))
      setCurrentInput("")
    }
  }

  const removeItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      [currentStepData.key]: prev[currentStepData.key].filter((_, i) => i !== index),
    }))
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setCurrentInput("")
    }
  }

  const handleExport = () => {
    exportToPDF("vpc-results", {
      filename: "Value_Proposition_Canvas",
      title: "Value Proposition Canvas",
      orientation: "landscape",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(1)
    setCurrentInput("")
    setShowResults(false)
  }

  const calculateFitScore = () => {
    const customerTotal = data.customerJobs.length + data.customerPains.length + data.customerGains.length
    const valueTotal = data.products.length + data.painRelievers.length + data.gainCreators.length

    if (customerTotal === 0 || valueTotal === 0) return 0

    // Score based on balance and completeness
    const balance = Math.min(customerTotal, valueTotal) / Math.max(customerTotal, valueTotal)
    const completeness = Math.min(customerTotal + valueTotal, 18) / 18

    return Math.round((balance * 0.4 + completeness * 0.6) * 100)
  }

  const generateSuggestions = () => {
    const suggestions: string[] = []

    if (data.customerPains.length > data.painRelievers.length) {
      suggestions.push("Consider adding more pain relievers to address all identified customer pains")
    }
    if (data.customerGains.length > data.gainCreators.length) {
      suggestions.push("You may need more gain creators to deliver all desired customer benefits")
    }
    if (data.products.length === 0) {
      suggestions.push("Define your products and services to complete the value map")
    }
    if (data.customerJobs.length === 0) {
      suggestions.push("Identify customer jobs to understand what they are trying to accomplish")
    }
    if (suggestions.length === 0) {
      suggestions.push("Good balance between customer profile and value map - validate with real customers")
    }

    return suggestions
  }

  if (showResults) {
    const fitScore = calculateFitScore()
    const suggestions = generateSuggestions()

    return (
      <ToolLayout
        title="Value Proposition Canvas"
        description="Your product-market fit analysis"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="vpc-results" className="space-y-8">
          {/* Visual Canvas */}
          <Card>
            <CardHeader>
              <CardTitle>Value Proposition Canvas</CardTitle>
              <CardDescription>Customer Profile (right) and Value Map (left)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Value Map - Square */}
                <div className="border-2 border-chart-3 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-chart-3 text-center">Value Map</h3>
                  <div className="space-y-3">
                    <div className="bg-chart-3/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-chart-3 mb-2">Products & Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.products.length > 0 ? (
                          data.products.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-chart-4/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-chart-4 mb-2">Pain Relievers</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.painRelievers.length > 0 ? (
                          data.painRelievers.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-primary mb-2">Gain Creators</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.gainCreators.length > 0 ? (
                          data.gainCreators.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Profile - Circle representation */}
                <div className="border-2 border-chart-1 rounded-full aspect-square p-4 flex flex-col justify-center space-y-3">
                  <h3 className="font-semibold text-chart-1 text-center">Customer Profile</h3>
                  <div className="space-y-3 px-4">
                    <div className="bg-chart-1/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-chart-1 mb-2">Jobs</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.customerJobs.length > 0 ? (
                          data.customerJobs.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-chart-5/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-chart-5 mb-2">Pains</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.customerPains.length > 0 ? (
                          data.customerPains.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-chart-2/10 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-chart-2 mb-2">Gains</h4>
                      <div className="flex flex-wrap gap-1">
                        {data.customerGains.length > 0 ? (
                          data.customerGains.map((item, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None added</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fit Score */}
          <Card>
            <CardHeader>
              <CardTitle>Product-Market Fit Score</CardTitle>
              <CardDescription>How well your value map addresses customer needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div
                  className={`text-5xl font-bold ${fitScore >= 70 ? "text-chart-2" : fitScore >= 40 ? "text-chart-4" : "text-chart-5"}`}
                >
                  {fitScore}%
                </div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${fitScore >= 70 ? "bg-chart-2" : fitScore >= 40 ? "bg-chart-4" : "bg-chart-5"}`}
                      style={{ width: `${fitScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Poor Fit</span>
                    <span>Problem-Solution Fit</span>
                    <span>Product-Market Fit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Value Proposition Canvas" description="Align your products and services with customer needs">
      <StepIndicator currentStep={currentStep} totalSteps={6} labels={steps.map((s) => s.title)} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${currentStepData.color} flex items-center justify-center text-white font-bold text-sm`}
            >
              {currentStep}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{currentStepData.section}</div>
              <CardTitle>{currentStepData.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="mt-2">{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guiding Questions */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Consider these questions:</h4>
            <ul className="space-y-1">
              {currentStepData.questions.map((q, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span>•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <Label>Add item</Label>
            <div className="flex gap-2">
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={`Add a ${currentStepData.title.toLowerCase().slice(0, -1)}...`}
                className="resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    addItem()
                  }
                }}
              />
              <Button onClick={addItem} size="icon" className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Added Items */}
          {data[currentStepData.key].length > 0 && (
            <div className="space-y-2">
              <Label>Added items ({data[currentStepData.key].length})</Label>
              <div className="space-y-2">
                {data[currentStepData.key].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                    <span className="text-sm flex-1">{item}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => removeItem(index)}>
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
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} className="gap-2">
          {currentStep === 6 ? "View Canvas" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
