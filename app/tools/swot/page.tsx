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

interface SWOTData {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
}

const initialData: SWOTData = {
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: [],
}

const steps = [
  {
    key: "strengths" as const,
    title: "Strengths",
    description: "Internal positive attributes and resources",
    questions: [
      "What internal advantages does your business/person have?",
      "What resources or skills set you apart?",
      "What do others see as your strengths?",
    ],
    color: "bg-chart-2/10 border-chart-2/30",
    headerColor: "bg-chart-2 text-white",
  },
  {
    key: "weaknesses" as const,
    title: "Weaknesses",
    description: "Internal limitations and areas for improvement",
    questions: [
      "What internal limitations exist?",
      "What skills or resources are lacking?",
      "What do others see as your weaknesses?",
    ],
    color: "bg-chart-3/10 border-chart-3/30",
    headerColor: "bg-chart-3 text-white",
  },
  {
    key: "opportunities" as const,
    title: "Opportunities",
    description: "External factors you could exploit",
    questions: [
      "What external trends can you leverage?",
      "What unmet market needs exist?",
      "What changes in your environment could benefit you?",
    ],
    color: "bg-chart-1/10 border-chart-1/30",
    headerColor: "bg-chart-1 text-white",
  },
  {
    key: "threats" as const,
    title: "Threats",
    description: "External factors that could cause problems",
    questions: [
      "What external risks could harm you?",
      "Who are your competitors and what are they doing?",
      "What obstacles do you face?",
    ],
    color: "bg-chart-5/10 border-chart-5/30",
    headerColor: "bg-chart-5 text-white",
  },
]

export default function SWOTPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<SWOTData>(initialData)
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
    if (currentStep < 4) {
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
    exportToPDF("swot-results", {
      filename: "SWOT_Analysis",
      title: "SWOT Analysis",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(1)
    setCurrentInput("")
    setShowResults(false)
  }

  const generateStrategies = () => {
    const strategies = {
      SO: [] as string[],
      ST: [] as string[],
      WO: [] as string[],
      WT: [] as string[],
    }

    // Generate SO Strategies (Strengths + Opportunities)
    if (data.strengths.length > 0 && data.opportunities.length > 0) {
      strategies.SO.push(`Leverage "${data.strengths[0]}" to capitalize on "${data.opportunities[0]}"`)
    }

    // Generate ST Strategies (Strengths + Threats)
    if (data.strengths.length > 0 && data.threats.length > 0) {
      strategies.ST.push(`Use "${data.strengths[0]}" to mitigate "${data.threats[0]}"`)
    }

    // Generate WO Strategies (Weaknesses + Opportunities)
    if (data.weaknesses.length > 0 && data.opportunities.length > 0) {
      strategies.WO.push(`Address "${data.weaknesses[0]}" to better exploit "${data.opportunities[0]}"`)
    }

    // Generate WT Strategies (Weaknesses + Threats)
    if (data.weaknesses.length > 0 && data.threats.length > 0) {
      strategies.WT.push(`Minimize "${data.weaknesses[0]}" to reduce vulnerability to "${data.threats[0]}"`)
    }

    return strategies
  }

  if (showResults) {
    const strategies = generateStrategies()

    return (
      <ToolLayout
        title="SWOT Analysis"
        description="Your strategic analysis results"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="swot-results" className="space-y-8">
          {/* SWOT Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>SWOT Matrix</CardTitle>
              <CardDescription>Visual overview of your analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map((step) => (
                  <div key={step.key} className={`rounded-lg border ${step.color} overflow-hidden`}>
                    <div className={`${step.headerColor} px-4 py-2`}>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <div className="p-4">
                      {data[step.key].length > 0 ? (
                        <ul className="space-y-2">
                          {data[step.key].map((item, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No items added</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strategic Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>Action strategies based on your SWOT analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-chart-2 mb-2">SO Strategies</h4>
                  <p className="text-xs text-muted-foreground mb-2">Use strengths to exploit opportunities</p>
                  {strategies.SO.length > 0 ? (
                    <ul className="space-y-1">
                      {strategies.SO.map((s, i) => (
                        <li key={i} className="text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Add strengths and opportunities to generate</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-chart-3 mb-2">ST Strategies</h4>
                  <p className="text-xs text-muted-foreground mb-2">Use strengths to minimize threats</p>
                  {strategies.ST.length > 0 ? (
                    <ul className="space-y-1">
                      {strategies.ST.map((s, i) => (
                        <li key={i} className="text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Add strengths and threats to generate</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-chart-1 mb-2">WO Strategies</h4>
                  <p className="text-xs text-muted-foreground mb-2">Overcome weaknesses by exploiting opportunities</p>
                  {strategies.WO.length > 0 ? (
                    <ul className="space-y-1">
                      {strategies.WO.map((s, i) => (
                        <li key={i} className="text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Add weaknesses and opportunities to generate</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-chart-5 mb-2">WT Strategies</h4>
                  <p className="text-xs text-muted-foreground mb-2">Minimize weaknesses and avoid threats</p>
                  {strategies.WT.length > 0 ? (
                    <ul className="space-y-1">
                      {strategies.WT.map((s, i) => (
                        <li key={i} className="text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Add weaknesses and threats to generate</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-chart-2">{data.strengths.length}</div>
                  <div className="text-xs text-muted-foreground">Strengths</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-3">{data.weaknesses.length}</div>
                  <div className="text-xs text-muted-foreground">Weaknesses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-1">{data.opportunities.length}</div>
                  <div className="text-xs text-muted-foreground">Opportunities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-5">{data.threats.length}</div>
                  <div className="text-xs text-muted-foreground">Threats</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="SWOT Analysis"
      description="Identify strengths, weaknesses, opportunities, and threats for strategic planning"
    >
      <StepIndicator
        currentStep={currentStep}
        totalSteps={4}
        labels={["Strengths", "Weaknesses", "Opportunities", "Threats"]}
      />

      <Card className={`${currentStepData.color} border`}>
        <CardHeader>
          <CardTitle>{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guiding Questions */}
          <div className="bg-card rounded-lg p-4 border border-border">
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
            <Label htmlFor="item-input">Add {currentStepData.title.toLowerCase()}</Label>
            <div className="flex gap-2">
              <Textarea
                id="item-input"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={`Enter a ${currentStepData.title.toLowerCase().slice(0, -1)}...`}
                className="bg-card resize-none"
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
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-card rounded-lg px-3 py-2 border border-border"
                  >
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

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} className="gap-2">
          {currentStep === 4 ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
