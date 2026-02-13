"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LayoutGrid,
  Plus,
  X,
  Download,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Users,
  Heart,
  Truck,
  MessageSquare,
  DollarSign,
  Boxes,
  Handshake,
  Cog,
  Zap,
} from "lucide-react"

interface CanvasItem {
  id: string
  text: string
}

interface CanvasData {
  businessName: string
  keyPartners: CanvasItem[]
  keyActivities: CanvasItem[]
  keyResources: CanvasItem[]
  valuePropositions: CanvasItem[]
  customerRelationships: CanvasItem[]
  channels: CanvasItem[]
  customerSegments: CanvasItem[]
  costStructure: CanvasItem[]
  revenueStreams: CanvasItem[]
}

const initialData: CanvasData = {
  businessName: "",
  keyPartners: [],
  keyActivities: [],
  keyResources: [],
  valuePropositions: [],
  customerRelationships: [],
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: [],
}

const sections = [
  {
    key: "keyPartners",
    title: "Key Partners",
    icon: Handshake,
    color: "bg-violet-500",
    lightColor: "bg-violet-50 border-violet-200",
    description: "Who are your key partners and suppliers?",
    questions: ["Strategic alliances?", "Key suppliers?", "What resources do they provide?"],
  },
  {
    key: "keyActivities",
    title: "Key Activities",
    icon: Cog,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200",
    description: "What key activities does your value proposition require?",
    questions: ["Production?", "Problem-solving?", "Platform/network management?"],
  },
  {
    key: "keyResources",
    title: "Key Resources",
    icon: Boxes,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 border-emerald-200",
    description: "What key resources does your value proposition require?",
    questions: ["Physical assets?", "Intellectual property?", "Human resources?", "Financial resources?"],
  },
  {
    key: "valuePropositions",
    title: "Value Propositions",
    icon: Heart,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 border-rose-200",
    description: "What value do you deliver to the customer?",
    questions: [
      "What problem are you solving?",
      "What needs are you satisfying?",
      "What bundles of products/services?",
    ],
  },
  {
    key: "customerRelationships",
    title: "Customer Relationships",
    icon: MessageSquare,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 border-amber-200",
    description: "What type of relationship does each customer segment expect?",
    questions: ["Personal assistance?", "Self-service?", "Automated services?", "Communities?"],
  },
  {
    key: "channels",
    title: "Channels",
    icon: Truck,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50 border-cyan-200",
    description: "Through which channels do your customer segments want to be reached?",
    questions: ["Awareness?", "Evaluation?", "Purchase?", "Delivery?", "After sales?"],
  },
  {
    key: "customerSegments",
    title: "Customer Segments",
    icon: Users,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 border-indigo-200",
    description: "For whom are you creating value?",
    questions: ["Mass market?", "Niche market?", "Segmented?", "Diversified?"],
  },
  {
    key: "costStructure",
    title: "Cost Structure",
    icon: DollarSign,
    color: "bg-slate-500",
    lightColor: "bg-slate-50 border-slate-200",
    description: "What are the most important costs inherent in your business model?",
    questions: ["Fixed costs?", "Variable costs?", "Economies of scale?"],
  },
  {
    key: "revenueStreams",
    title: "Revenue Streams",
    icon: DollarSign,
    color: "bg-green-500",
    lightColor: "bg-green-50 border-green-200",
    description: "For what value are your customers willing to pay?",
    questions: ["Asset sale?", "Usage fee?", "Subscription?", "Licensing?", "Advertising?"],
  },
]

export default function ModelCanvasPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<CanvasData>(initialData)
  const [currentInput, setCurrentInput] = useState("")
  const [showResults, setShowResults] = useState(false)

  const addItem = (key: keyof CanvasData) => {
    if (!currentInput.trim() || key === "businessName") return
    const newItem: CanvasItem = { id: Date.now().toString(), text: currentInput.trim() }
    setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] as CanvasItem[]), newItem],
    }))
    setCurrentInput("")
  }

  const removeItem = (key: keyof CanvasData, id: string) => {
    if (key === "businessName") return
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as CanvasItem[]).filter((item) => item.id !== id),
    }))
  }

  const getCompletionScore = () => {
    let filled = 0
    const total = 9
    if (data.keyPartners.length > 0) filled++
    if (data.keyActivities.length > 0) filled++
    if (data.keyResources.length > 0) filled++
    if (data.valuePropositions.length > 0) filled++
    if (data.customerRelationships.length > 0) filled++
    if (data.channels.length > 0) filled++
    if (data.customerSegments.length > 0) filled++
    if (data.costStructure.length > 0) filled++
    if (data.revenueStreams.length > 0) filled++
    return Math.round((filled / total) * 100)
  }

  const handleExportPDF = () => window.print()
  const handleReset = () => {
    setData(initialData)
    setStep(0)
    setShowResults(false)
  }

  const renderNameStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label htmlFor="businessName" className="text-base font-medium">
          What business or idea are you modeling?
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Give your business model a name to identify it in your report.
        </p>
        <Input
          id="businessName"
          placeholder="e.g., My SaaS Startup, Coffee Shop Franchise..."
          value={data.businessName}
          onChange={(e) => setData((prev) => ({ ...prev, businessName: e.target.value }))}
          className="glass-card"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => setStep(1)}
          disabled={!data.businessName.trim()}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90"
        >
          Start Building Canvas <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderSectionStep = (sectionIndex: number) => {
    const section = sections[sectionIndex]
    const items = data[section.key as keyof CanvasData] as CanvasItem[]
    const Icon = section.icon

    return (
      <div className="space-y-6 animate-fade-in">
        <div className={`p-4 rounded-xl ${section.lightColor} border`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Consider:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {section.questions.map((q, i) => (
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
              placeholder={`Add ${section.title.toLowerCase()}...`}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem(section.key as keyof CanvasData)}
              className="glass-card"
            />
            <Button onClick={() => addItem(section.key as keyof CanvasData)} size="icon" className="bg-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-lg glass-card group">
                  <span className="text-sm flex-1">{item.text}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(section.key as keyof CanvasData, item.id)}
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
              if (sectionIndex === sections.length - 1) {
                setShowResults(true)
                setStep(10)
              } else {
                setStep(step + 1)
              }
            }}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90"
          >
            {sectionIndex === sections.length - 1 ? "Generate Canvas" : "Continue"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderResults = () => {
    const score = getCompletionScore()

    return (
      <div className="space-y-8 animate-fade-in" id="modelcanvas-results">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">ModelCanvas™ Report</h2>
            <p className="text-muted-foreground mt-1">{data.businessName}</p>
          </div>
          <div className="flex gap-2 no-print">
            <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleExportPDF} className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Completion Score */}
        <div className="glass-card-strong rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-secondary"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={251}
                  strokeDashoffset={251 - (251 * score) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-foreground">{score}%</span>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-1">
                <Zap className="h-3.5 w-3.5" />
                Canvas Completion
              </div>
              <p className="text-sm text-muted-foreground">
                {score === 100
                  ? "Excellent! Your business model canvas is complete."
                  : score >= 70
                    ? "Good progress! Consider filling remaining sections."
                    : "Keep building! A complete canvas provides better insights."}
              </p>
            </div>
          </div>
        </div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
          {/* Row 1 */}
          <div className={`glass-card rounded-xl p-4 ${sections[0].lightColor} md:row-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="h-4 w-4 text-violet-600" />
              <span className="font-semibold text-violet-700">Key Partners</span>
            </div>
            <ul className="space-y-1">
              {data.keyPartners.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[1].lightColor}`}>
            <div className="flex items-center gap-2 mb-3">
              <Cog className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-700">Key Activities</span>
            </div>
            <ul className="space-y-1">
              {data.keyActivities.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[3].lightColor} md:row-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-rose-600" />
              <span className="font-semibold text-rose-700">Value Propositions</span>
            </div>
            <ul className="space-y-1">
              {data.valuePropositions.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[4].lightColor}`}>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-amber-600" />
              <span className="font-semibold text-amber-700">Customer Relationships</span>
            </div>
            <ul className="space-y-1">
              {data.customerRelationships.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[6].lightColor} md:row-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-indigo-600" />
              <span className="font-semibold text-indigo-700">Customer Segments</span>
            </div>
            <ul className="space-y-1">
              {data.customerSegments.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[2].lightColor}`}>
            <div className="flex items-center gap-2 mb-3">
              <Boxes className="h-4 w-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Key Resources</span>
            </div>
            <ul className="space-y-1">
              {data.keyResources.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[5].lightColor}`}>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="h-4 w-4 text-cyan-600" />
              <span className="font-semibold text-cyan-700">Channels</span>
            </div>
            <ul className="space-y-1">
              {data.channels.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Row 3 - Full width */}
          <div className={`glass-card rounded-xl p-4 ${sections[7].lightColor} md:col-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-slate-600" />
              <span className="font-semibold text-slate-700">Cost Structure</span>
            </div>
            <ul className="space-y-1">
              {data.costStructure.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={`glass-card rounded-xl p-4 ${sections[8].lightColor} md:col-span-3`}>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-700">Revenue Streams</span>
            </div>
            <ul className="space-y-1">
              {data.revenueStreams.map((item) => (
                <li key={item.id} className="text-xs text-muted-foreground">
                  • {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analysis */}
        <Card className="glass-card-strong">
          <CardHeader>
            <CardTitle className="font-heading">Business Model Analysis</CardTitle>
            <CardDescription>Key insights and considerations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="insight-card">
                <h4 className="font-semibold text-sm text-foreground mb-2">Strengths</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {data.valuePropositions.length > 0 && <li>• Clear value proposition defined</li>}
                  {data.customerSegments.length > 0 && <li>• Target customers identified</li>}
                  {data.revenueStreams.length > 0 && <li>• Revenue model established</li>}
                  {data.keyPartners.length > 0 && <li>• Strategic partnerships in place</li>}
                </ul>
              </div>
              <div className="insight-card">
                <h4 className="font-semibold text-sm text-foreground mb-2">Areas to Develop</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {data.channels.length === 0 && <li>• Define distribution channels</li>}
                  {data.customerRelationships.length === 0 && <li>• Plan customer relationships</li>}
                  {data.keyResources.length === 0 && <li>• Identify key resources</li>}
                  {data.costStructure.length === 0 && <li>• Map cost structure</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-6">
          <p>Generated by ModelCanvas™ — Gaurab Labs</p>
          <p>This analysis is for educational purposes. Not a substitute for professional advice.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">ModelCanvas™</h1>
              <p className="text-sm text-muted-foreground">Business Model Canvas Tool</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Design and analyze your business model using the Business Model Canvas framework. Map all nine building
            blocks of your business in one visual canvas.
          </p>
        </div>

        {/* Progress */}
        {!showResults && (
          <div className="mb-8 no-print">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step + 1} of 10</span>
              <span>{Math.round((step / 9) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(step / 9) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <Card className="glass-card-strong">
          <CardContent className="p-6 sm:p-8">
            {step === 0 && renderNameStep()}
            {step >= 1 && step <= 9 && renderSectionStep(step - 1)}
            {step === 10 && showResults && renderResults()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
