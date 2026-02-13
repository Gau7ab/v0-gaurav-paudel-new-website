"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface BMCData {
  customerSegments: string
  valuePropositions: string
  channels: string
  customerRelationships: string
  revenueStreams: string
  keyResources: string
  keyActivities: string
  keyPartners: string
  costStructure: string
}

const initialData: BMCData = {
  customerSegments: "",
  valuePropositions: "",
  channels: "",
  customerRelationships: "",
  revenueStreams: "",
  keyResources: "",
  keyActivities: "",
  keyPartners: "",
  costStructure: "",
}

const sections = [
  {
    key: "customerSegments" as const,
    title: "Customer Segments",
    question: "Who are your most important customers? Who are you creating value for?",
    hint: "Examples: Mass market, niche market, segmented, diversified, multi-sided platform",
  },
  {
    key: "valuePropositions" as const,
    title: "Value Propositions",
    question: "What value do you deliver to the customer? What problem do you solve?",
    hint: "Examples: Newness, performance, customization, design, price, cost reduction, accessibility",
  },
  {
    key: "channels" as const,
    title: "Channels",
    question: "How do you reach and communicate with your customer segments?",
    hint: "Examples: Sales force, web sales, own stores, partner stores, wholesaler",
  },
  {
    key: "customerRelationships" as const,
    title: "Customer Relationships",
    question: "What type of relationship does each customer segment expect?",
    hint: "Examples: Personal assistance, self-service, automated services, communities, co-creation",
  },
  {
    key: "revenueStreams" as const,
    title: "Revenue Streams",
    question: "How does your business earn revenue from each customer segment?",
    hint: "Examples: Asset sale, usage fee, subscription, licensing, brokerage fees, advertising",
  },
  {
    key: "keyResources" as const,
    title: "Key Resources",
    question: "What key resources does your value proposition require?",
    hint: "Examples: Physical, intellectual, human, financial resources",
  },
  {
    key: "keyActivities" as const,
    title: "Key Activities",
    question: "What key activities does your value proposition require?",
    hint: "Examples: Production, problem-solving, platform/network management",
  },
  {
    key: "keyPartners" as const,
    title: "Key Partners",
    question: "Who are your key partners and suppliers?",
    hint: "Examples: Strategic alliances, joint ventures, buyer-supplier relationships",
  },
  {
    key: "costStructure" as const,
    title: "Cost Structure",
    question: "What are the most important costs in your business model?",
    hint: "Examples: Fixed costs, variable costs, economies of scale, economies of scope",
  },
]

export default function BMCPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<BMCData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const currentSection = sections[currentStep - 1]

  const handleChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      [currentSection.key]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleExport = () => {
    exportToPDF("bmc-results", {
      filename: "Business_Model_Canvas",
      title: "Business Model Canvas",
      orientation: "landscape",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setCurrentStep(1)
    setShowResults(false)
  }

  const generateSummary = () => {
    const filledSections = Object.values(data).filter((v) => v.trim()).length
    const strengths: string[] = []
    const risks: string[] = []

    if (data.valuePropositions && data.customerSegments) {
      strengths.push("Clear value-customer alignment defined")
    } else {
      risks.push("Value proposition or customer segments need clarification")
    }

    if (data.revenueStreams && data.costStructure) {
      strengths.push("Financial model outlined")
    } else {
      risks.push("Revenue or cost structure incomplete")
    }

    if (data.channels && data.customerRelationships) {
      strengths.push("Customer touchpoints identified")
    } else {
      risks.push("Customer engagement strategy needs work")
    }

    if (data.keyPartners && data.keyResources && data.keyActivities) {
      strengths.push("Operational backbone defined")
    } else {
      risks.push("Operational elements need more detail")
    }

    return { filledSections, strengths, risks }
  }

  if (showResults) {
    const { filledSections, strengths, risks } = generateSummary()

    return (
      <ToolLayout
        title="Business Model Canvas"
        description="Your complete business model overview"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="bmc-results" className="space-y-8">
          {/* Visual Canvas */}
          <Card>
            <CardHeader>
              <CardTitle>Business Model Canvas</CardTitle>
              <CardDescription>Visual overview of your business model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 text-sm">
                {/* Row 1 */}
                <div className="lg:row-span-2 border border-border rounded-lg p-3 bg-chart-1/5">
                  <h4 className="font-semibold text-chart-1 text-xs mb-2">Key Partners</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.keyPartners || "Not specified"}
                  </p>
                </div>
                <div className="border border-border rounded-lg p-3 bg-chart-2/5">
                  <h4 className="font-semibold text-chart-2 text-xs mb-2">Key Activities</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.keyActivities || "Not specified"}
                  </p>
                </div>
                <div className="lg:row-span-2 border border-border rounded-lg p-3 bg-chart-3/5">
                  <h4 className="font-semibold text-chart-3 text-xs mb-2">Value Propositions</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.valuePropositions || "Not specified"}
                  </p>
                </div>
                <div className="border border-border rounded-lg p-3 bg-chart-4/5">
                  <h4 className="font-semibold text-chart-4 text-xs mb-2">Customer Relationships</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.customerRelationships || "Not specified"}
                  </p>
                </div>
                <div className="lg:row-span-2 border border-border rounded-lg p-3 bg-chart-5/5">
                  <h4 className="font-semibold text-chart-5 text-xs mb-2">Customer Segments</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.customerSegments || "Not specified"}
                  </p>
                </div>

                {/* Row 2 */}
                <div className="border border-border rounded-lg p-3 bg-chart-2/5">
                  <h4 className="font-semibold text-chart-2 text-xs mb-2">Key Resources</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.keyResources || "Not specified"}
                  </p>
                </div>
                <div className="border border-border rounded-lg p-3 bg-chart-4/5">
                  <h4 className="font-semibold text-chart-4 text-xs mb-2">Channels</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.channels || "Not specified"}
                  </p>
                </div>

                {/* Row 3 - Cost & Revenue */}
                <div className="lg:col-span-2 border border-border rounded-lg p-3 bg-destructive/5">
                  <h4 className="font-semibold text-destructive text-xs mb-2">Cost Structure</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.costStructure || "Not specified"}
                  </p>
                </div>
                <div className="lg:col-span-3 border border-border rounded-lg p-3 bg-success/5">
                  <h4 className="font-semibold text-[var(--success)] text-xs mb-2">Revenue Streams</h4>
                  <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                    {data.revenueStreams || "Not specified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                {strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-chart-2">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Complete more sections to identify strengths</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Areas to Develop</CardTitle>
              </CardHeader>
              <CardContent>
                {risks.length > 0 ? (
                  <ul className="space-y-2">
                    {risks.map((r, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-chart-5">!</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Great job - all key areas covered</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">{filledSections}/9</div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${(filledSections / 9) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">sections completed</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Business Model Canvas" description="Map your entire business model on a single visual canvas">
      <StepIndicator currentStep={currentStep} totalSteps={9} labels={sections.map((s) => s.title)} />

      <Card>
        <CardHeader>
          <CardTitle>{currentSection.title}</CardTitle>
          <CardDescription>{currentSection.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">{currentSection.hint}</div>

          <div className="space-y-2">
            <Label htmlFor="section-input">Your response</Label>
            <Textarea
              id="section-input"
              value={data[currentSection.key]}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={`Describe your ${currentSection.title.toLowerCase()}...`}
              className="min-h-32 resize-none"
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} className="gap-2">
          {currentStep === 9 ? "View Canvas" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
