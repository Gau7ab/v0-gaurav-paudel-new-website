"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RotateCcw,
  Globe,
  DollarSign,
  Users,
  Cpu,
  Scale,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Shield,
} from "lucide-react"
import Link from "next/link"

type ImpactLevel = "low" | "medium" | "high"
type LikelihoodLevel = "low" | "medium" | "high"

interface PestleFactor {
  id: string
  factor: string
  impact: ImpactLevel
  likelihood: LikelihoodLevel
  isOpportunity: boolean
}

interface PestleData {
  political: PestleFactor[]
  economic: PestleFactor[]
  social: PestleFactor[]
  technological: PestleFactor[]
  legal: PestleFactor[]
  environmental: PestleFactor[]
}

const pestleCategories = [
  { id: "political", label: "Political", icon: Globe, color: "bg-blue-500" },
  { id: "economic", label: "Economic", icon: DollarSign, color: "bg-green-500" },
  { id: "social", label: "Social", icon: Users, color: "bg-purple-500" },
  { id: "technological", label: "Technological", icon: Cpu, color: "bg-cyan-500" },
  { id: "legal", label: "Legal", icon: Scale, color: "bg-amber-500" },
  { id: "environmental", label: "Environmental", icon: Leaf, color: "bg-emerald-500" },
]

const getScoreValue = (level: ImpactLevel | LikelihoodLevel): number => {
  switch (level) {
    case "high":
      return 3
    case "medium":
      return 2
    case "low":
      return 1
  }
}

const getRiskScore = (impact: ImpactLevel, likelihood: LikelihoodLevel): number => {
  return getScoreValue(impact) * getScoreValue(likelihood)
}

const getRiskLevel = (score: number): { label: string; color: string } => {
  if (score >= 6) return { label: "High Risk", color: "text-red-500" }
  if (score >= 3) return { label: "Medium Risk", color: "text-amber-500" }
  return { label: "Low Risk", color: "text-green-500" }
}

export default function RiskLensPage() {
  const [step, setStep] = useState(1)
  const [context, setContext] = useState({
    businessName: "",
    industry: "",
    scope: "",
    timeframe: "12 months",
  })
  const [activeTab, setActiveTab] = useState("political")
  const [pestleData, setPestleData] = useState<PestleData>({
    political: [],
    economic: [],
    social: [],
    technological: [],
    legal: [],
    environmental: [],
  })
  const [newFactor, setNewFactor] = useState({
    factor: "",
    impact: "medium" as ImpactLevel,
    likelihood: "medium" as LikelihoodLevel,
    isOpportunity: false,
  })

  const addFactor = (category: keyof PestleData) => {
    if (!newFactor.factor.trim()) return

    const factor: PestleFactor = {
      id: Date.now().toString(),
      ...newFactor,
    }

    setPestleData((prev) => ({
      ...prev,
      [category]: [...prev[category], factor],
    }))

    setNewFactor({
      factor: "",
      impact: "medium",
      likelihood: "medium",
      isOpportunity: false,
    })
  }

  const removeFactor = (category: keyof PestleData, id: string) => {
    setPestleData((prev) => ({
      ...prev,
      [category]: prev[category].filter((f) => f.id !== id),
    }))
  }

  const calculateCategoryScore = (factors: PestleFactor[]): number => {
    if (factors.length === 0) return 0
    const risks = factors.filter((f) => !f.isOpportunity)
    if (risks.length === 0) return 0
    const totalScore = risks.reduce((sum, f) => sum + getRiskScore(f.impact, f.likelihood), 0)
    return Math.round((totalScore / (risks.length * 9)) * 100)
  }

  const calculateOverallRiskScore = (): number => {
    const allFactors = Object.values(pestleData).flat()
    const risks = allFactors.filter((f) => !f.isOpportunity)
    if (risks.length === 0) return 0
    const totalScore = risks.reduce((sum, f) => sum + getRiskScore(f.impact, f.likelihood), 0)
    return Math.round((totalScore / (risks.length * 9)) * 100)
  }

  const getTopRisks = () => {
    const allFactors = Object.entries(pestleData).flatMap(([category, factors]) =>
      factors.filter((f) => !f.isOpportunity).map((f) => ({ ...f, category })),
    )
    return allFactors
      .sort((a, b) => getRiskScore(b.impact, b.likelihood) - getRiskScore(a.impact, a.likelihood))
      .slice(0, 5)
  }

  const getTopOpportunities = () => {
    const allFactors = Object.entries(pestleData).flatMap(([category, factors]) =>
      factors.filter((f) => f.isOpportunity).map((f) => ({ ...f, category })),
    )
    return allFactors
      .sort((a, b) => getRiskScore(b.impact, b.likelihood) - getRiskScore(a.impact, a.likelihood))
      .slice(0, 5)
  }

  const getTotalFactors = () => Object.values(pestleData).flat().length

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    setStep(1)
    setContext({ businessName: "", industry: "", scope: "", timeframe: "12 months" })
    setPestleData({
      political: [],
      economic: [],
      social: [],
      technological: [],
      legal: [],
      environmental: [],
    })
  }

  const calculatedScores = useMemo(
    () => ({
      overallRiskScore: calculateOverallRiskScore(),
      topRisks: getTopRisks(),
      topOpportunities: getTopOpportunities(),
      totalFactors: getTotalFactors(),
    }),
    [pestleData],
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
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">RiskLens™</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                PESTLE risk analysis to identify and evaluate external macro-environmental factors affecting your
                business.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-secondary/80">Step {step} of 3</span>
            </div>
          </div>
        </div>

        {/* Step 1: Context Setup */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Define Analysis Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business / Project Name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., TechStartup Nepal"
                    value={context.businessName}
                    onChange={(e) => setContext((prev) => ({ ...prev, businessName: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">The entity being analyzed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry / Sector</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., E-commerce, Healthcare, FinTech"
                    value={context.industry}
                    onChange={(e) => setContext((prev) => ({ ...prev, industry: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">Primary industry context</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope">Analysis Scope</Label>
                <Textarea
                  id="scope"
                  placeholder="Describe the specific market, geography, or strategic initiative being analyzed..."
                  value={context.scope}
                  onChange={(e) => setContext((prev) => ({ ...prev, scope: e.target.value }))}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">Define boundaries for the PESTLE analysis</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Analysis Timeframe</Label>
                <Select
                  value={context.timeframe}
                  onValueChange={(v) => setContext((prev) => ({ ...prev, timeframe: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="12 months">12 months</SelectItem>
                    <SelectItem value="2 years">2 years</SelectItem>
                    <SelectItem value="5 years">5 years</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Planning horizon for risk assessment</p>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!context.businessName || !context.industry}
                  className="gap-2"
                >
                  Continue to PESTLE Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: PESTLE Input */}
        {step === 2 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                PESTLE Factor Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add factors for each dimension. Mark items as opportunities or risks.
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1 h-auto p-1 mb-6">
                  {pestleCategories.map((cat) => {
                    const Icon = cat.icon
                    const count = pestleData[cat.id as keyof PestleData].length
                    return (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="flex flex-col gap-1 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{cat.label}</span>
                        {count > 0 && <span className="text-[10px] opacity-70">({count})</span>}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                {pestleCategories.map((cat) => (
                  <TabsContent key={cat.id} value={cat.id} className="space-y-6">
                    {/* Add new factor form */}
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-4">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <cat.icon className="h-4 w-4 text-primary" />
                        Add {cat.label} Factor
                      </h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Factor Description</Label>
                          <Textarea
                            placeholder={`Describe a ${cat.label.toLowerCase()} factor affecting your business...`}
                            value={newFactor.factor}
                            onChange={(e) => setNewFactor((prev) => ({ ...prev, factor: e.target.value }))}
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Impact Level</Label>
                            <Select
                              value={newFactor.impact}
                              onValueChange={(v: ImpactLevel) => setNewFactor((prev) => ({ ...prev, impact: v }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Likelihood</Label>
                            <Select
                              value={newFactor.likelihood}
                              onValueChange={(v: LikelihoodLevel) =>
                                setNewFactor((prev) => ({ ...prev, likelihood: v }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                              value={newFactor.isOpportunity ? "opportunity" : "risk"}
                              onValueChange={(v) =>
                                setNewFactor((prev) => ({ ...prev, isOpportunity: v === "opportunity" }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="risk">Risk</SelectItem>
                                <SelectItem value="opportunity">Opportunity</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          onClick={() => addFactor(cat.id as keyof PestleData)}
                          disabled={!newFactor.factor.trim()}
                          className="w-full sm:w-auto"
                        >
                          Add Factor
                        </Button>
                      </div>
                    </div>

                    {/* Existing factors list */}
                    <div className="space-y-3">
                      {pestleData[cat.id as keyof PestleData].length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No {cat.label.toLowerCase()} factors added yet. Add your first factor above.
                        </p>
                      ) : (
                        pestleData[cat.id as keyof PestleData].map((factor) => {
                          const riskScore = getRiskScore(factor.impact, factor.likelihood)
                          const riskLevel = getRiskLevel(riskScore)
                          return (
                            <div
                              key={factor.id}
                              className={`p-4 rounded-xl border ${factor.isOpportunity ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {factor.isOpportunity ? (
                                      <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <AlertTriangle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span
                                      className={`text-xs font-medium ${factor.isOpportunity ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {factor.isOpportunity ? "Opportunity" : "Risk"}
                                    </span>
                                    {!factor.isOpportunity && (
                                      <span className={`text-xs font-medium ${riskLevel.color}`}>
                                        • {riskLevel.label} (Score: {riskScore})
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-foreground">{factor.factor}</p>
                                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>
                                      Impact: <span className="capitalize">{factor.impact}</span>
                                    </span>
                                    <span>
                                      Likelihood: <span className="capitalize">{factor.likelihood}</span>
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFactor(cat.id as keyof PestleData, factor.id)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="flex justify-between pt-6 border-t border-border/50 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={calculatedScores.totalFactors < 3} className="gap-2">
                  Generate Risk Report <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results Dashboard */}
        {step === 3 && (
          <div className="space-y-6 print-content" id="risklens-report">
            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">RiskLens™ PESTLE Analysis Report</h1>
              <p className="text-sm text-muted-foreground">
                Generated by Gaurab Labs • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Context Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Analysis Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Business/Project</p>
                    <p className="font-medium">{context.businessName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="font-medium">{context.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Timeframe</p>
                    <p className="font-medium">{context.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Factors</p>
                    <p className="font-medium">{calculatedScores.totalFactors}</p>
                  </div>
                </div>
                {context.scope && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Scope</p>
                    <p className="text-sm">{context.scope}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Overall Risk Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Overall Risk Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-secondary"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${calculatedScores.overallRiskScore * 4.4} 440`}
                        className={
                          calculatedScores.overallRiskScore >= 60
                            ? "text-red-500"
                            : calculatedScores.overallRiskScore >= 40
                              ? "text-amber-500"
                              : "text-green-500"
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{calculatedScores.overallRiskScore}</span>
                      <span className="text-xs text-muted-foreground">Risk Score</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {pestleCategories.map((cat) => {
                      const score = calculateCategoryScore(pestleData[cat.id as keyof PestleData])
                      return (
                        <div key={cat.id} className="flex items-center gap-3">
                          <cat.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm w-28">{cat.label}</span>
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${score >= 60 ? "bg-red-500" : score >= 40 ? "bg-amber-500" : "bg-green-500"}`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{score}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Heatmap */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Heatmap (Impact vs Likelihood)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div></div>
                  <div className="text-center font-medium py-2">Low Impact</div>
                  <div className="text-center font-medium py-2">Medium Impact</div>
                  <div className="text-center font-medium py-2">High Impact</div>

                  <div className="font-medium flex items-center">High Likelihood</div>
                  {["low", "medium", "high"].map((impact) => {
                    const risks = Object.values(pestleData)
                      .flat()
                      .filter((f) => !f.isOpportunity && f.likelihood === "high" && f.impact === impact)
                    const bgColor =
                      impact === "high" ? "bg-red-500/20" : impact === "medium" ? "bg-amber-500/20" : "bg-yellow-500/20"
                    return (
                      <div key={`high-${impact}`} className={`${bgColor} rounded p-2 min-h-16 flex flex-col gap-1`}>
                        {risks.map((r) => (
                          <span key={r.id} className="text-[10px] truncate">
                            {r.factor.slice(0, 20)}...
                          </span>
                        ))}
                      </div>
                    )
                  })}

                  <div className="font-medium flex items-center">Medium Likelihood</div>
                  {["low", "medium", "high"].map((impact) => {
                    const risks = Object.values(pestleData)
                      .flat()
                      .filter((f) => !f.isOpportunity && f.likelihood === "medium" && f.impact === impact)
                    const bgColor =
                      impact === "high"
                        ? "bg-amber-500/20"
                        : impact === "medium"
                          ? "bg-yellow-500/20"
                          : "bg-green-500/10"
                    return (
                      <div key={`med-${impact}`} className={`${bgColor} rounded p-2 min-h-16 flex flex-col gap-1`}>
                        {risks.map((r) => (
                          <span key={r.id} className="text-[10px] truncate">
                            {r.factor.slice(0, 20)}...
                          </span>
                        ))}
                      </div>
                    )
                  })}

                  <div className="font-medium flex items-center">Low Likelihood</div>
                  {["low", "medium", "high"].map((impact) => {
                    const risks = Object.values(pestleData)
                      .flat()
                      .filter((f) => !f.isOpportunity && f.likelihood === "low" && f.impact === impact)
                    const bgColor = impact === "high" ? "bg-yellow-500/20" : "bg-green-500/10"
                    return (
                      <div key={`low-${impact}`} className={`${bgColor} rounded p-2 min-h-16 flex flex-col gap-1`}>
                        {risks.map((r) => (
                          <span key={r.id} className="text-[10px] truncate">
                            {r.factor.slice(0, 20)}...
                          </span>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Risks & Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="h-5 w-5" />
                    Top Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculatedScores.topRisks.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No risks identified</p>
                    ) : (
                      calculatedScores.topRisks.map((risk, i) => (
                        <div key={risk.id} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5">
                          <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium">{risk.factor}</p>
                            <p className="text-xs text-muted-foreground capitalize mt-1">
                              {risk.category} • Impact: {risk.impact} • Likelihood: {risk.likelihood}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <TrendingUp className="h-5 w-5" />
                    Top Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculatedScores.topOpportunities.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No opportunities identified</p>
                    ) : (
                      calculatedScores.topOpportunities.map((opp, i) => (
                        <div key={opp.id} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5">
                          <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium">{opp.factor}</p>
                            <p className="text-xs text-muted-foreground capitalize mt-1">
                              {opp.category} • Impact: {opp.impact} • Likelihood: {opp.likelihood}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategic Implications */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Strategic Implications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Risk Mitigation Priorities</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your analysis, focus on high-impact, high-likelihood risks first.
                      {calculatedScores.overallRiskScore >= 60
                        ? " Your overall risk exposure is elevated - consider implementing risk controls and monitoring mechanisms."
                        : calculatedScores.overallRiskScore >= 40
                          ? " Your risk profile is moderate - maintain vigilance and develop contingency plans."
                          : " Your risk exposure is manageable - continue monitoring and capitalize on identified opportunities."}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Opportunity Leverage</h4>
                    <p className="text-sm text-muted-foreground">
                      {calculatedScores.topOpportunities.length > 0
                        ? `You've identified ${calculatedScores.topOpportunities.length} opportunities. Prioritize those with high impact and likelihood to maximize strategic value.`
                        : "Consider revisiting your PESTLE factors to identify potential opportunities that could benefit your business."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <Button onClick={handlePrint} className="gap-2">
                <FileText className="h-4 w-4" />
                Export PESTLE Risk Report (PDF)
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start New Analysis
              </Button>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t text-xs text-muted-foreground">
              <p>This report is generated by RiskLens™ from Gaurab Labs for educational and planning purposes.</p>
              <p>It should not be considered professional legal, financial, or strategic advice.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
