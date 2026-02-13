"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RotateCcw,
  Eye,
  Heart,
  ShoppingCart,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

interface FunnelStage {
  name: string
  icon: typeof Eye
  color: string
  visitors: number
  conversionRate: number
  dropOffReasons: string[]
  tactics: string[]
}

const defaultStages: FunnelStage[] = [
  {
    name: "Awareness",
    icon: Eye,
    color: "bg-blue-500",
    visitors: 10000,
    conversionRate: 100,
    dropOffReasons: [],
    tactics: [],
  },
  {
    name: "Interest",
    icon: Heart,
    color: "bg-purple-500",
    visitors: 0,
    conversionRate: 30,
    dropOffReasons: [],
    tactics: [],
  },
  {
    name: "Consideration",
    icon: ShoppingCart,
    color: "bg-amber-500",
    visitors: 0,
    conversionRate: 50,
    dropOffReasons: [],
    tactics: [],
  },
  {
    name: "Conversion",
    icon: DollarSign,
    color: "bg-green-500",
    visitors: 0,
    conversionRate: 20,
    dropOffReasons: [],
    tactics: [],
  },
  {
    name: "Retention",
    icon: RefreshCw,
    color: "bg-cyan-500",
    visitors: 0,
    conversionRate: 40,
    dropOffReasons: [],
    tactics: [],
  },
]

const funnelTypes = [
  { id: "b2b", label: "B2B Sales", description: "Business-to-business sales funnel" },
  { id: "b2c", label: "B2C E-commerce", description: "Consumer e-commerce funnel" },
  { id: "saas", label: "SaaS", description: "Software subscription funnel" },
  { id: "lead", label: "Lead Generation", description: "Lead capture and nurture funnel" },
]

const trafficSources = [
  "Organic Search",
  "Paid Ads",
  "Social Media",
  "Email",
  "Referral",
  "Direct",
  "Content Marketing",
  "Events",
]

export default function FunnelFlowPage() {
  const [step, setStep] = useState(1)
  const [funnelType, setFunnelType] = useState("")
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [stages, setStages] = useState<FunnelStage[]>(defaultStages)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)

  const toggleSource = (source: string) => {
    setSelectedSources((prev) => (prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]))
  }

  const updateStage = (index: number, updates: Partial<FunnelStage>) => {
    setStages((prev) => prev.map((stage, i) => (i === index ? { ...stage, ...updates } : stage)))
  }

  const addDropOffReason = (index: number, reason: string) => {
    if (!reason.trim()) return
    setStages((prev) =>
      prev.map((stage, i) => (i === index ? { ...stage, dropOffReasons: [...stage.dropOffReasons, reason] } : stage)),
    )
  }

  const addTactic = (index: number, tactic: string) => {
    if (!tactic.trim()) return
    setStages((prev) =>
      prev.map((stage, i) => (i === index ? { ...stage, tactics: [...stage.tactics, tactic] } : stage)),
    )
  }

  const calculateFunnel = () => {
    const calculated = [...stages]
    let currentVisitors = calculated[0].visitors

    for (let i = 1; i < calculated.length; i++) {
      currentVisitors = Math.round(currentVisitors * (calculated[i].conversionRate / 100))
      calculated[i].visitors = currentVisitors
    }

    return calculated
  }

  const getBiggestDropOff = () => {
    let maxDrop = 0
    let maxDropIndex = 0

    for (let i = 1; i < stages.length; i++) {
      const drop = 100 - stages[i].conversionRate
      if (drop > maxDrop) {
        maxDrop = drop
        maxDropIndex = i
      }
    }

    return { stage: stages[maxDropIndex].name, drop: maxDrop }
  }

  const handlePrint = () => window.print()
  const handleReset = () => {
    setStep(1)
    setFunnelType("")
    setSelectedSources([])
    setStages(defaultStages)
    setCurrentStageIndex(0)
  }

  const funnelMetrics = useMemo(
    () => ({
      calculatedStages: calculateFunnel(),
      overallConversion: (() => {
        const first = calculateFunnel()[0].visitors
        const last = calculateFunnel()[calculateFunnel().length - 1].visitors
        return first > 0 ? ((last / first) * 100).toFixed(2) : "0"
      })(),
      biggestDropOff: getBiggestDropOff(),
    }),
    [stages],
  )

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="no-print inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">FunnelFlow™</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Design, analyze, and optimize your customer acquisition and conversion funnel.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-secondary/80">Step {step} of 4</span>
            </div>
          </div>
        </div>

        {/* Step 1: Funnel Setup */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Funnel Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Funnel Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {funnelTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFunnelType(type.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        funnelType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <h4 className="font-medium">{type.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Traffic Sources (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {trafficSources.map((source) => (
                    <button
                      key={source}
                      onClick={() => toggleSource(source)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedSources.includes(source)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Top of Funnel Visitors (monthly)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 10000"
                  value={stages[0].visitors || ""}
                  onChange={(e) => updateStage(0, { visitors: Number.parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">Total awareness-stage visitors per month</p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!funnelType || selectedSources.length === 0 || stages[0].visitors === 0}
                  className="gap-2"
                >
                  Configure Stages <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Stage Configuration */}
        {step === 2 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Stage Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">
                Set conversion rates and identify drop-off reasons for each stage
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stage Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {stages.slice(1).map((stage, i) => {
                  const Icon = stage.icon
                  return (
                    <button
                      key={stage.name}
                      onClick={() => setCurrentStageIndex(i + 1)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        currentStageIndex === i + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {stage.name}
                    </button>
                  )
                })}
              </div>

              {/* Current Stage Config */}
              {currentStageIndex > 0 && (
                <div className="p-6 rounded-xl bg-secondary/30 space-y-6">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = stages[currentStageIndex].icon
                      return <Icon className="h-6 w-6 text-primary" />
                    })()}
                    <h3 className="text-lg font-semibold">{stages[currentStageIndex].name} Stage</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Conversion Rate from Previous Stage</Label>
                        <span className="text-sm font-medium">{stages[currentStageIndex].conversionRate}%</span>
                      </div>
                      <Slider
                        value={[stages[currentStageIndex].conversionRate]}
                        onValueChange={([value]) => updateStage(currentStageIndex, { conversionRate: value })}
                        max={100}
                        min={1}
                        step={1}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Drop-off Reasons</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Why do users drop off at this stage?"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addDropOffReason(currentStageIndex, e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addDropOffReason(currentStageIndex, input.value)
                            input.value = ""
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stages[currentStageIndex].dropOffReasons.map((reason, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Optimization Tactics</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="What tactics will improve this stage?"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addTactic(currentStageIndex, e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addTactic(currentStageIndex, input.value)
                            input.value = ""
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stages[currentStageIndex].tactics.map((tactic, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">
                            {tactic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-border/50">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} className="gap-2">
                  View Funnel Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Funnel Visualization */}
        {step === 3 && (
          <div className="space-y-6 print-content" id="funnelflow-report">
            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">FunnelFlow™ Customer Funnel Analysis</h1>
              <p className="text-sm text-muted-foreground">
                Generated by Gaurab Labs • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground">Top of Funnel</p>
                  <p className="text-2xl font-bold">{funnelMetrics.calculatedStages[0].visitors.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground">Conversions</p>
                  <p className="text-2xl font-bold text-green-500">
                    {funnelMetrics.calculatedStages[3].visitors.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground">Overall Conversion</p>
                  <p className="text-2xl font-bold">{funnelMetrics.overallConversion}%</p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground">Biggest Drop-off</p>
                  <p className="text-2xl font-bold text-red-500">{funnelMetrics.biggestDropOff.stage}</p>
                </CardContent>
              </Card>
            </div>

            {/* Funnel Visualization */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Funnel Flow Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  {funnelMetrics.calculatedStages.map((stage, i) => {
                    const Icon = stage.icon
                    const widthPercent =
                      i === 0 ? 100 : (stage.visitors / funnelMetrics.calculatedStages[0].visitors) * 100
                    const dropOff = i > 0 ? 100 - stage.conversionRate : 0

                    return (
                      <div key={stage.name} className="w-full max-w-2xl">
                        <div
                          className={`${stage.color} rounded-lg p-4 text-white transition-all mx-auto`}
                          style={{ width: `${Math.max(widthPercent, 20)}%` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{stage.name}</span>
                            </div>
                            <span className="font-bold">{stage.visitors.toLocaleString()}</span>
                          </div>
                        </div>
                        {i < funnelMetrics.calculatedStages.length - 1 && (
                          <div className="text-center py-1">
                            <span className="text-xs text-red-500">↓ {dropOff.toFixed(0)}% drop-off</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Stage Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Stage Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-2">Stage</th>
                        <th className="text-right py-3 px-2">Visitors</th>
                        <th className="text-right py-3 px-2">Conv. Rate</th>
                        <th className="text-right py-3 px-2">Drop-off</th>
                        <th className="text-right py-3 px-2">Lost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funnelMetrics.calculatedStages.map((stage, i) => {
                        const prevVisitors = i > 0 ? funnelMetrics.calculatedStages[i - 1].visitors : stage.visitors
                        const lost = prevVisitors - stage.visitors
                        const dropOff = i > 0 ? 100 - stage.conversionRate : 0

                        return (
                          <tr key={stage.name} className="border-b border-border/30">
                            <td className="py-3 px-2 font-medium">{stage.name}</td>
                            <td className="text-right py-3 px-2">{stage.visitors.toLocaleString()}</td>
                            <td className="text-right py-3 px-2">{i === 0 ? "-" : `${stage.conversionRate}%`}</td>
                            <td className="text-right py-3 px-2 text-red-500">
                              {i === 0 ? "-" : `${dropOff.toFixed(0)}%`}
                            </td>
                            <td className="text-right py-3 px-2 text-muted-foreground">
                              {i === 0 ? "-" : lost.toLocaleString()}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Bottlenecks & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <TrendingDown className="h-5 w-5" />
                    Bottleneck Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {funnelMetrics.calculatedStages.slice(1).map((stage, i) => {
                      if (stage.dropOffReasons.length === 0) return null
                      return (
                        <div key={stage.name} className="p-3 rounded-lg bg-red-500/5">
                          <h4 className="font-medium text-sm mb-2">{stage.name} Stage</h4>
                          <ul className="space-y-1">
                            {stage.dropOffReasons.map((reason, j) => (
                              <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                    {funnelMetrics.calculatedStages.slice(1).every((s) => s.dropOffReasons.length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        No drop-off reasons documented. Add them in stage configuration.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <Lightbulb className="h-5 w-5" />
                    Optimization Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {funnelMetrics.calculatedStages.slice(1).map((stage, i) => {
                      if (stage.tactics.length === 0) return null
                      return (
                        <div key={stage.name} className="p-3 rounded-lg bg-green-500/5">
                          <h4 className="font-medium text-sm mb-2">{stage.name} Stage</h4>
                          <ul className="space-y-1">
                            {stage.tactics.map((tactic, j) => (
                              <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                                <Lightbulb className="h-3 w-3 text-green-500" />
                                {tactic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                    {funnelMetrics.calculatedStages.slice(1).every((s) => s.tactics.length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        No optimization tactics documented. Add them in stage configuration.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <Button onClick={handlePrint} className="gap-2">
                <FileText className="h-4 w-4" />
                Export Funnel Analysis PDF
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start New Funnel
              </Button>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t text-xs text-muted-foreground">
              <p>Generated by FunnelFlow™ from Gaurab Labs. For marketing and sales optimization.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
