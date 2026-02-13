"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RotateCcw,
  Users,
  Target,
  Frown,
  Smile,
  Package,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface CanvasData {
  customerSegment: string
  customerJobs: string[]
  customerPains: string[]
  customerGains: string[]
  productFeatures: string[]
  painRelievers: string[]
  gainCreators: string[]
}

const initialCanvas: CanvasData = {
  customerSegment: "",
  customerJobs: [""],
  customerPains: [""],
  customerGains: [""],
  productFeatures: [""],
  painRelievers: [""],
  gainCreators: [""],
}

const ArrayInput = ({
  field,
  placeholder,
  label,
  items,
  onUpdate,
  onAdd,
  onRemove,
}: {
  field: keyof CanvasData
  placeholder: string
  label: string
  items: string[]
  onUpdate: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}) => (
  <div className="space-y-3">
    <Label className="text-sm font-medium">{label}</Label>
    {items.map((item, index) => (
      <div key={index} className="flex gap-2">
        <Input placeholder={placeholder} value={item} onChange={(e) => onUpdate(index, e.target.value)} />
        {items.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            className="text-muted-foreground hover:text-destructive flex-shrink-0"
          >
            ×
          </Button>
        )}
      </div>
    ))}
    <Button variant="outline" size="sm" onClick={onAdd} className="w-full bg-transparent">
      + Add Another
    </Button>
  </div>
)

export default function ValuePropPage() {
  const [step, setStep] = useState(1)
  const [canvas, setCanvas] = useState<CanvasData>(initialCanvas)

  const updateArrayField = (field: keyof CanvasData, index: number, value: string) => {
    setCanvas((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: keyof CanvasData) => {
    setCanvas((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  const removeArrayItem = (field: keyof CanvasData, index: number) => {
    setCanvas((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const getFilledItems = (arr: string[]) => arr.filter((item) => item.trim()).length

  const calculateAlignmentScore = (): number => {
    const painsCovered = canvas.customerPains.filter((p) => p.trim()).length
    const painRelievers = canvas.painRelievers.filter((p) => p.trim()).length
    const gainsCovered = canvas.customerGains.filter((g) => g.trim()).length
    const gainCreators = canvas.gainCreators.filter((g) => g.trim()).length

    if (painsCovered === 0 && gainsCovered === 0) return 0

    const painAlignment = painsCovered > 0 ? Math.min(painRelievers / painsCovered, 1) : 0
    const gainAlignment = gainsCovered > 0 ? Math.min(gainCreators / gainsCovered, 1) : 0

    return Math.round(((painAlignment + gainAlignment) / 2) * 100)
  }

  const getStrongFits = (): string[] => {
    const fits: string[] = []
    canvas.painRelievers.forEach((pr) => {
      if (pr.trim()) {
        const matchingPain = canvas.customerPains.find(
          (p) =>
            p.toLowerCase().includes(pr.toLowerCase().split(" ")[0]) ||
            pr.toLowerCase().includes(p.toLowerCase().split(" ")[0]),
        )
        if (matchingPain) fits.push(`"${pr}" addresses "${matchingPain}"`)
      }
    })
    canvas.gainCreators.forEach((gc) => {
      if (gc.trim()) {
        const matchingGain = canvas.customerGains.find(
          (g) =>
            g.toLowerCase().includes(gc.toLowerCase().split(" ")[0]) ||
            gc.toLowerCase().includes(g.toLowerCase().split(" ")[0]),
        )
        if (matchingGain) fits.push(`"${gc}" delivers "${matchingGain}"`)
      }
    })
    return fits.slice(0, 5)
  }

  const getMisalignments = (): string[] => {
    const gaps: string[] = []
    canvas.customerPains.forEach((pain) => {
      if (pain.trim()) {
        const hasReliever = canvas.painRelievers.some(
          (pr) =>
            pr.toLowerCase().includes(pain.toLowerCase().split(" ")[0]) ||
            pain.toLowerCase().includes(pr.toLowerCase().split(" ")[0]),
        )
        if (!hasReliever) gaps.push(`No clear pain reliever for: "${pain}"`)
      }
    })
    canvas.customerGains.forEach((gain) => {
      if (gain.trim()) {
        const hasCreator = canvas.gainCreators.some(
          (gc) =>
            gc.toLowerCase().includes(gain.toLowerCase().split(" ")[0]) ||
            gain.toLowerCase().includes(gc.toLowerCase().split(" ")[0]),
        )
        if (!hasCreator) gaps.push(`No clear gain creator for: "${gain}"`)
      }
    })
    return gaps.slice(0, 5)
  }

  const handlePrint = () => window.print()
  const handleReset = () => {
    setStep(1)
    setCanvas(initialCanvas)
  }

  const alignmentData = useMemo(
    () => ({
      alignmentScore: calculateAlignmentScore(),
      strongFits: getStrongFits(),
      misalignments: getMisalignments(),
    }),
    [canvas],
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
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">ValueProp™</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Design and validate your value proposition using the Value Proposition Canvas framework.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-secondary/80">Step {step} of 4</span>
            </div>
          </div>
        </div>

        {/* Step 1: Customer Segment */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Define Your Customer Segment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="segment">Customer Segment Description</Label>
                <Textarea
                  id="segment"
                  placeholder="Describe your target customer segment in detail (demographics, behaviors, context)..."
                  value={canvas.customerSegment}
                  onChange={(e) => setCanvas((prev) => ({ ...prev, customerSegment: e.target.value }))}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">Be specific about who you're serving</p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!canvas.customerSegment.trim()} className="gap-2">
                  Define Customer Profile <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Customer Profile */}
        {step === 2 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Customer Profile
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Define what your customers are trying to accomplish and their pain points
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Customer Jobs</h3>
                  </div>
                  <ArrayInput
                    field="customerJobs"
                    placeholder="What tasks are they trying to complete?"
                    label="Functional, social, or emotional jobs"
                    items={canvas.customerJobs}
                    onUpdate={(index, value) => updateArrayField("customerJobs", index, value)}
                    onAdd={() => addArrayItem("customerJobs")}
                    onRemove={(index) => removeArrayItem("customerJobs", index)}
                  />
                </div>

                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Frown className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Customer Pains</h3>
                  </div>
                  <ArrayInput
                    field="customerPains"
                    placeholder="What frustrates them?"
                    label="Obstacles, risks, negative outcomes"
                    items={canvas.customerPains}
                    onUpdate={(index, value) => updateArrayField("customerPains", index, value)}
                    onAdd={() => addArrayItem("customerPains")}
                    onRemove={(index) => removeArrayItem("customerPains", index)}
                  />
                </div>

                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Smile className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Customer Gains</h3>
                  </div>
                  <ArrayInput
                    field="customerGains"
                    placeholder="What do they desire?"
                    label="Benefits, desires, expectations"
                    items={canvas.customerGains}
                    onUpdate={(index, value) => updateArrayField("customerGains", index, value)}
                    onAdd={() => addArrayItem("customerGains")}
                    onRemove={(index) => removeArrayItem("customerGains", index)}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border/50">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={getFilledItems(canvas.customerJobs) === 0}
                  className="gap-2"
                >
                  Define Value Map <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Value Map */}
        {step === 3 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Value Map
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Define your products/services and how they address customer needs
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Products & Services</h3>
                  </div>
                  <ArrayInput
                    field="productFeatures"
                    placeholder="What do you offer?"
                    label="Features, capabilities, offerings"
                    items={canvas.productFeatures}
                    onUpdate={(index, value) => updateArrayField("productFeatures", index, value)}
                    onAdd={() => addArrayItem("productFeatures")}
                    onRemove={(index) => removeArrayItem("productFeatures", index)}
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h3 className="font-medium">Pain Relievers</h3>
                  </div>
                  <ArrayInput
                    field="painRelievers"
                    placeholder="How do you eliminate pains?"
                    label="Solutions that address customer pains"
                    items={canvas.painRelievers}
                    onUpdate={(index, value) => updateArrayField("painRelievers", index, value)}
                    onAdd={() => addArrayItem("painRelievers")}
                    onRemove={(index) => removeArrayItem("painRelievers", index)}
                  />
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-cyan-500" />
                    <h3 className="font-medium">Gain Creators</h3>
                  </div>
                  <ArrayInput
                    field="gainCreators"
                    placeholder="How do you create gains?"
                    label="How you deliver desired outcomes"
                    items={canvas.gainCreators}
                    onUpdate={(index, value) => updateArrayField("gainCreators", index, value)}
                    onAdd={() => addArrayItem("gainCreators")}
                    onRemove={(index) => removeArrayItem("gainCreators", index)}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border/50">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={getFilledItems(canvas.productFeatures) === 0}
                  className="gap-2"
                >
                  View Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-6 print-content" id="valueprop-report">
            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">ValueProp™ Value Proposition Canvas</h1>
              <p className="text-sm text-muted-foreground">
                Generated by Gaurab Labs • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Alignment Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Value Proposition Alignment</CardTitle>
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
                        strokeDasharray={`${alignmentData.alignmentScore * 4.4} 440`}
                        className={
                          alignmentData.alignmentScore >= 70
                            ? "text-green-500"
                            : alignmentData.alignmentScore >= 40
                              ? "text-amber-500"
                              : "text-red-500"
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{alignmentData.alignmentScore}</span>
                      <span className="text-xs text-muted-foreground">Fit Score</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {alignmentData.alignmentScore >= 70
                        ? "Strong Product-Market Fit"
                        : alignmentData.alignmentScore >= 40
                          ? "Moderate Alignment"
                          : "Needs Improvement"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {alignmentData.alignmentScore >= 70
                        ? "Your value proposition strongly addresses customer needs. Focus on communication and delivery."
                        : alignmentData.alignmentScore >= 40
                          ? "There are gaps between what customers need and what you offer. Review misalignments below."
                          : "Significant gaps exist. Consider revisiting your customer understanding or product features."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Canvas */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Value Proposition Canvas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Profile Side */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                    <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">Customer Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4 p-3 bg-background/50 rounded-lg">
                      {canvas.customerSegment}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" /> Jobs ({getFilledItems(canvas.customerJobs)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.customerJobs
                            .filter((j) => j.trim())
                            .map((job, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-blue-500/50">
                                {job}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-red-500">
                          <Frown className="h-4 w-4" /> Pains ({getFilledItems(canvas.customerPains)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.customerPains
                            .filter((p) => p.trim())
                            .map((pain, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-red-500/50">
                                {pain}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-500">
                          <Smile className="h-4 w-4" /> Gains ({getFilledItems(canvas.customerGains)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.customerGains
                            .filter((g) => g.trim())
                            .map((gain, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-green-500/50">
                                {gain}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Value Map Side */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Value Map</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4" /> Products & Services ({getFilledItems(canvas.productFeatures)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.productFeatures
                            .filter((f) => f.trim())
                            .map((feature, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-purple-500/50">
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-amber-500">
                          <Sparkles className="h-4 w-4" /> Pain Relievers ({getFilledItems(canvas.painRelievers)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.painRelievers
                            .filter((p) => p.trim())
                            .map((reliever, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-amber-500/50">
                                {reliever}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-cyan-500">
                          <Sparkles className="h-4 w-4" /> Gain Creators ({getFilledItems(canvas.gainCreators)})
                        </h4>
                        <ul className="space-y-1">
                          {canvas.gainCreators
                            .filter((g) => g.trim())
                            .map((creator, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-cyan-500/50">
                                {creator}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fits & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    Strong Fit Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {alignmentData.strongFits.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No strong fits detected. Ensure pain relievers address specific customer pains.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {alignmentData.strongFits.map((fit, i) => (
                        <li key={i} className="text-sm p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          {fit}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    Misalignment Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {alignmentData.misalignments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Great! No obvious gaps detected in your value proposition.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {alignmentData.misalignments.map((gap, i) => (
                        <li key={i} className="text-sm p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                          {gap}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Refinement Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Strengthen Pain Relievers</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure each customer pain has a corresponding pain reliever. Be specific about how your solution
                      eliminates frustrations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Amplify Gain Creators</h4>
                    <p className="text-sm text-muted-foreground">
                      Map each desired gain to a specific feature or outcome your product delivers. Focus on emotional
                      and social gains.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Validate with Customers</h4>
                    <p className="text-sm text-muted-foreground">
                      Test your assumptions by interviewing target customers. Prioritize jobs, pains, and gains based on
                      real feedback.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h4 className="font-medium mb-2">Iterate Continuously</h4>
                    <p className="text-sm text-muted-foreground">
                      Your value proposition should evolve. Revisit this canvas quarterly or when entering new markets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <Button onClick={handlePrint} className="gap-2">
                <FileText className="h-4 w-4" />
                Generate Value Proposition Report
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start New Canvas
              </Button>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t text-xs text-muted-foreground">
              <p>Generated by ValueProp™ from Gaurab Labs. For strategic planning purposes.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
