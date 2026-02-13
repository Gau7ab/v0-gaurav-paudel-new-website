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

interface FunnelData {
  awareness: string[]
  consideration: string[]
  conversion: string[]
  retention: string[]
}

const initialData: FunnelData = {
  awareness: [],
  consideration: [],
  conversion: [],
  retention: [],
}

const stages = [
  {
    key: "awareness" as const,
    title: "Awareness",
    description: "How do potential customers discover you?",
    questions: [
      "What channels will you use to reach new audiences?",
      "What content will attract attention?",
      "How will people first hear about you?",
    ],
    kpis: ["Impressions", "Reach", "Website visits", "Social followers"],
    examples: ["Social media ads", "SEO content", "PR/Media coverage", "Referral programs"],
    color: "bg-chart-1",
    width: "100%",
  },
  {
    key: "consideration" as const,
    title: "Consideration",
    description: "How do you engage interested prospects?",
    questions: [
      "What information helps them evaluate your offering?",
      "How do you build trust and credibility?",
      "What makes you stand out from alternatives?",
    ],
    kpis: ["Email signups", "Content downloads", "Product page views", "Demo requests"],
    examples: ["Email newsletters", "Case studies", "Free trials", "Comparison guides"],
    color: "bg-chart-2",
    width: "80%",
  },
  {
    key: "conversion" as const,
    title: "Conversion",
    description: "How do you turn prospects into customers?",
    questions: [
      "What triggers the purchase decision?",
      "How do you reduce friction in buying?",
      "What objections need to be addressed?",
    ],
    kpis: ["Conversion rate", "Cart abandonment", "Sales calls", "Deals closed"],
    examples: ["Limited offers", "Easy checkout", "Social proof", "Money-back guarantee"],
    color: "bg-chart-4",
    width: "60%",
  },
  {
    key: "retention" as const,
    title: "Retention",
    description: "How do you keep customers coming back?",
    questions: [
      "How do you deliver ongoing value?",
      "What encourages repeat purchases?",
      "How do you turn customers into advocates?",
    ],
    kpis: ["Repeat purchase rate", "Customer lifetime value", "NPS score", "Referrals"],
    examples: ["Loyalty programs", "Regular updates", "Exclusive access", "Community building"],
    color: "bg-chart-3",
    width: "40%",
  },
]

export default function MarketingFunnelPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<FunnelData>(initialData)
  const [currentInput, setCurrentInput] = useState("")
  const [showResults, setShowResults] = useState(false)

  const currentStage = stages[currentStep - 1]

  const addItem = () => {
    if (currentInput.trim()) {
      setData((prev) => ({
        ...prev,
        [currentStage.key]: [...prev[currentStage.key], currentInput.trim()],
      }))
      setCurrentInput("")
    }
  }

  const removeItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      [currentStage.key]: prev[currentStage.key].filter((_, i) => i !== index),
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
    exportToPDF("funnel-results", {
      filename: "Marketing_Funnel",
      title: "Marketing Funnel Plan",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(1)
    setCurrentInput("")
    setShowResults(false)
  }

  if (showResults) {
    const totalTactics = Object.values(data).flat().length

    return (
      <ToolLayout
        title="Marketing Funnel Planner"
        description="Your customer journey strategy"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="funnel-results" className="space-y-8">
          {/* Visual Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Your Marketing Funnel</CardTitle>
              <CardDescription>Visual overview of your customer journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stages.map((stage) => (
                <div key={stage.key} className="flex items-center gap-4">
                  <div
                    className={`${stage.color} text-white rounded-lg p-4 transition-all`}
                    style={{ width: stage.width }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{stage.title}</h4>
                      <span className="text-sm opacity-80">{data[stage.key].length} tactics</span>
                    </div>
                    {data[stage.key].length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {data[stage.key].map((item, i) => (
                          <span key={i} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* KPI Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>KPIs to Track</CardTitle>
              <CardDescription>Recommended metrics for each funnel stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stages.map((stage) => (
                  <div key={stage.key}>
                    <h4 className={`font-semibold mb-2 flex items-center gap-2`}>
                      <span className={`w-3 h-3 rounded-full ${stage.color}`} />
                      {stage.title}
                    </h4>
                    <ul className="space-y-1">
                      {stage.kpis.map((kpi, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-4 h-4 rounded border border-border flex items-center justify-center text-xs"></span>
                          {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-chart-1/10 rounded-lg p-4">
                <h4 className="font-medium text-chart-1 text-sm">Awareness Stage</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Focus on reach and brand recall. Test multiple channels and double down on what delivers the best cost
                  per impression.
                </p>
              </div>
              <div className="bg-chart-2/10 rounded-lg p-4">
                <h4 className="font-medium text-chart-2 text-sm">Consideration Stage</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Provide valuable content that addresses objections. Use retargeting to stay top-of-mind with
                  interested prospects.
                </p>
              </div>
              <div className="bg-chart-4/10 rounded-lg p-4">
                <h4 className="font-medium text-chart-4 text-sm">Conversion Stage</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Remove friction from the purchase process. A/B test your CTAs, forms, and checkout flow continuously.
                </p>
              </div>
              <div className="bg-chart-3/10 rounded-lg p-4">
                <h4 className="font-medium text-chart-3 text-sm">Retention Stage</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  It costs 5x more to acquire a new customer than retain one. Invest in customer success and loyalty
                  programs.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Funnel Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary">{totalTactics}</div>
                <div className="text-sm text-muted-foreground">Total tactics planned</div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {stages.map((stage) => (
                  <div key={stage.key} className={`${stage.color} text-white rounded-lg p-3 text-center`}>
                    <div className="text-xl font-bold">{data[stage.key].length}</div>
                    <div className="text-xs opacity-80">{stage.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Marketing Funnel Planner" description="Design your customer journey from awareness to retention">
      <StepIndicator currentStep={currentStep} totalSteps={4} labels={stages.map((s) => s.title)} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${currentStage.color} flex items-center justify-center text-white font-bold`}
            >
              {currentStep}
            </div>
            <div>
              <CardTitle>{currentStage.title}</CardTitle>
              <CardDescription>{currentStage.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guiding Questions */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Consider these questions:</h4>
            <ul className="space-y-1">
              {currentStage.questions.map((q, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span>•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div>
            <Label className="text-xs text-muted-foreground">Example tactics:</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {currentStage.examples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentInput(ex)}
                  className="text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <Label>Add a tactic</Label>
            <div className="flex gap-2">
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={`Add a ${currentStage.title.toLowerCase()} tactic...`}
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
          {data[currentStage.key].length > 0 && (
            <div className="space-y-2">
              <Label>Your tactics ({data[currentStage.key].length})</Label>
              <div className="space-y-2">
                {data[currentStage.key].map((item, index) => (
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
          {currentStep === 4 ? "View Funnel" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
