"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { PrintHeader } from "@/components/print/print-header"
import { PrintFooter } from "@/components/print/print-footer"

interface SMARTData {
  originalGoal: string
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
}

const initialData: SMARTData = {
  originalGoal: "",
  specific: "",
  measurable: "",
  achievable: "",
  relevant: "",
  timeBound: "",
}

const steps = [
  {
    key: "originalGoal" as const,
    title: "Your Current Goal",
    question: "What is the goal you want to achieve?",
    hint: "Write your goal as you currently think of it. We will refine it step by step.",
    placeholder: "e.g., I want to grow my business",
    inputType: "textarea" as const,
  },
  {
    key: "specific" as const,
    title: "Specific",
    question: "What exactly do you want to achieve?",
    hint: "Be precise about what you want to accomplish. Who is involved? What do you want to accomplish? Where will it happen?",
    placeholder: "e.g., Increase monthly revenue by acquiring new B2B clients in Kathmandu",
    inputType: "textarea" as const,
  },
  {
    key: "measurable" as const,
    title: "Measurable",
    question: "How will you measure progress and success?",
    hint: "Define specific metrics or indicators. What data will tell you that you have achieved your goal?",
    placeholder: "e.g., Track number of new clients signed and monthly revenue increase in NPR",
    inputType: "textarea" as const,
  },
  {
    key: "achievable" as const,
    title: "Achievable",
    question: "Why is this goal realistic for you?",
    hint: "Consider your resources, skills, and constraints. What makes this goal attainable?",
    placeholder: "e.g., I have existing network in the industry and capacity to handle 5 more clients",
    inputType: "textarea" as const,
  },
  {
    key: "relevant" as const,
    title: "Relevant",
    question: "Why does this goal matter to you or your organization?",
    hint: "Connect the goal to your broader objectives. How does achieving this goal contribute to your success?",
    placeholder: "e.g., Revenue growth is essential for expanding the team and increasing market presence",
    inputType: "textarea" as const,
  },
  {
    key: "timeBound" as const,
    title: "Time-Bound",
    question: "What is your deadline for achieving this goal?",
    hint: "Set a specific date or timeframe. This creates urgency and helps with planning milestones.",
    placeholder: "e.g., December 31, 2024",
    inputType: "input" as const,
  },
]

export default function GrowthMapPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<SMARTData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const currentStepData = steps[currentStep - 1]

  const handleChange = (value: string) => {
    setData((prev) => ({ ...prev, [currentStepData.key]: value }))
  }

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
    else setShowResults(true)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(1)
    setShowResults(false)
  }

  const generateSMARTStatement = () => {
    if (!data.specific || !data.measurable || !data.timeBound)
      return "Complete all steps to generate your SMART goal statement."
    return `I will ${data.specific.toLowerCase()}, measuring progress by ${data.measurable.toLowerCase()}, by ${data.timeBound}.`
  }

  const generateActionItems = () => {
    const items: string[] = []
    if (data.specific) items.push("Define clear success criteria based on your specific goal")
    if (data.measurable) items.push("Set up tracking system for your metrics")
    if (data.achievable) items.push("Identify and secure necessary resources")
    if (data.relevant) items.push("Communicate goal alignment with stakeholders")
    if (data.timeBound) {
      items.push("Create milestone checkpoints toward your deadline")
      items.push("Schedule regular progress reviews")
    }
    return items
  }

  if (showResults) {
    const actionItems = generateActionItems()
    const smartStatement = generateSMARTStatement()
    const completionScore = Object.values(data).filter((v) => v.trim()).length * 17

    return (
      <ToolLayout
        title="GrowthMap™"
        description="Your refined, actionable goal"
        showExport
        showReset
        onExport={handlePrint}
        onReset={handleReset}
        category="strategy"
      >
        <div id="growthmap-results" className="space-y-6 print:space-y-4">
          <PrintHeader title="GrowthMap™ SMART Goal" subtitle="Strategic Goal Planning" />

          {/* Before & After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-border/50 bg-secondary/30 print:border print:shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">Before</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{data.originalGoal || "No original goal provided"}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-primary/30 bg-primary/5 print:border print:shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-primary">After (SMART Goal)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground">{smartStatement}</p>
              </CardContent>
            </Card>
          </div>

          {/* SMART Breakdown */}
          <Card className="glass-card border-border/50 print:border print:shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">SMART Breakdown</CardTitle>
              <CardDescription>Each component of your refined goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.slice(1).map((step) => (
                  <div key={step.key} className="flex gap-4 py-3 border-b border-border/50 last:border-0">
                    <div className="w-24 shrink-0">
                      <span className="text-sm font-semibold text-primary">{step.title}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        {data[step.key] || <span className="italic">Not specified</span>}
                      </p>
                    </div>
                    {data[step.key] && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Checklist */}
          <Card className="glass-card border-border/50 print:border print:shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">Action Checklist</CardTitle>
              <CardDescription>Recommended next steps to achieve your goal</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                      {index + 1}
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Completion Score */}
          <Card className="glass-card border-border/50 print:border print:shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">Goal Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">{completionScore}%</div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${completionScore}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {completionScore >= 85
                  ? "Excellent! Your goal is fully SMART-compliant and ready for execution."
                  : "Consider completing all SMART components for maximum clarity and actionability."}
              </p>
            </CardContent>
          </Card>

          <PrintFooter />
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="GrowthMap™"
      description="Transform vague goals into specific, measurable, achievable, relevant, and time-bound objectives"
      category="strategy"
    >
      <StepIndicator
        currentStep={currentStep}
        totalSteps={6}
        labels={["Goal", "Specific", "Measurable", "Achievable", "Relevant", "Time-Bound"]}
      />
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-3 text-sm text-muted-foreground">{currentStepData.hint}</div>
          <div className="space-y-2">
            <Label htmlFor="step-input" className="text-foreground">
              Your response
            </Label>
            {currentStepData.inputType === "textarea" ? (
              <Textarea
                id="step-input"
                value={data[currentStepData.key]}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="min-h-24 resize-none glass-card bg-transparent"
                rows={4}
              />
            ) : (
              <Input
                id="step-input"
                value={data[currentStepData.key]}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="glass-card bg-transparent"
              />
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2 glass-card bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep} className="gap-2 shadow-lg">
          {currentStep === 6 ? "Create Goal" : "Next"} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
