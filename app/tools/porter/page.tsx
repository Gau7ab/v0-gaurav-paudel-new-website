"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { exportToPDF } from "@/lib/pdf-export"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface ForceData {
  newEntrants: number
  buyerPower: number
  supplierPower: number
  substitutes: number
  rivalry: number
}

const initialData: ForceData = {
  newEntrants: 50,
  buyerPower: 50,
  supplierPower: 50,
  substitutes: 50,
  rivalry: 50,
}

const forces = [
  {
    key: "newEntrants" as const,
    title: "Threat of New Entrants",
    description: "How easy is it for new competitors to enter the market?",
    lowLabel: "High barriers to entry",
    highLabel: "Easy to enter",
    factors: ["Capital requirements", "Economies of scale", "Brand loyalty", "Regulatory barriers"],
  },
  {
    key: "buyerPower" as const,
    title: "Bargaining Power of Buyers",
    description: "How much power do customers have over pricing?",
    lowLabel: "Buyers have little power",
    highLabel: "Buyers control pricing",
    factors: ["Number of buyers", "Switching costs", "Product differentiation", "Price sensitivity"],
  },
  {
    key: "supplierPower" as const,
    title: "Bargaining Power of Suppliers",
    description: "How much control do suppliers have?",
    lowLabel: "Many supplier options",
    highLabel: "Suppliers control terms",
    factors: ["Number of suppliers", "Uniqueness of inputs", "Switching costs", "Forward integration threat"],
  },
  {
    key: "substitutes" as const,
    title: "Threat of Substitutes",
    description: "How easily can customers switch to alternatives?",
    lowLabel: "Few alternatives exist",
    highLabel: "Many alternatives",
    factors: [
      "Availability of substitutes",
      "Price-performance ratio",
      "Switching costs",
      "Buyer propensity to switch",
    ],
  },
  {
    key: "rivalry" as const,
    title: "Industry Rivalry",
    description: "How intense is competition among existing firms?",
    lowLabel: "Peaceful coexistence",
    highLabel: "Fierce competition",
    factors: ["Number of competitors", "Industry growth", "Fixed costs", "Product differentiation"],
  },
]

export default function PorterPage() {
  const [data, setData] = useState<ForceData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const handleChange = (key: keyof ForceData, value: number[]) => {
    setData((prev) => ({
      ...prev,
      [key]: value[0],
    }))
  }

  const handleExport = () => {
    exportToPDF("porter-results", {
      filename: "Porters_Five_Forces",
      title: "Porter's Five Forces Analysis",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setShowResults(false)
  }

  const calculateAttractiveness = () => {
    const avg = (data.newEntrants + data.buyerPower + data.supplierPower + data.substitutes + data.rivalry) / 5
    // Lower values = more attractive (less threat)
    return Math.round(100 - avg)
  }

  const getForceLevel = (value: number) => {
    if (value <= 33) return { label: "Low", color: "text-chart-2" }
    if (value <= 66) return { label: "Medium", color: "text-chart-4" }
    return { label: "High", color: "text-chart-5" }
  }

  const chartData = [
    { force: "New Entrants", value: data.newEntrants, fullMark: 100 },
    { force: "Buyer Power", value: data.buyerPower, fullMark: 100 },
    { force: "Supplier Power", value: data.supplierPower, fullMark: 100 },
    { force: "Substitutes", value: data.substitutes, fullMark: 100 },
    { force: "Rivalry", value: data.rivalry, fullMark: 100 },
  ]

  if (showResults) {
    const attractiveness = calculateAttractiveness()

    return (
      <ToolLayout
        title="Porter's Five Forces"
        description="Industry competitive analysis results"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="porter-results" className="space-y-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Forces Visualization</CardTitle>
              <CardDescription>Higher values indicate greater competitive pressure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="force" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="Force Level"
                      dataKey="value"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Attractiveness Score */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Attractiveness Score</CardTitle>
              <CardDescription>Based on the combined competitive forces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="text-5xl font-bold text-primary">{attractiveness}%</div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all bg-gradient-to-r from-chart-5 via-chart-4 to-chart-2"
                      style={{ width: `${attractiveness}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low Attractiveness</span>
                    <span>High Attractiveness</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {attractiveness >= 70
                  ? "The industry shows strong attractiveness with relatively low competitive pressures. This environment is favorable for profitability and growth."
                  : attractiveness >= 40
                    ? "The industry shows moderate attractiveness. Success will depend on strategic positioning and building competitive advantages."
                    : "The industry faces significant competitive pressures. Careful strategy and differentiation are essential for survival and profitability."}
              </p>
            </CardContent>
          </Card>

          {/* Force Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Force Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forces.map((force) => {
                  const level = getForceLevel(data[force.key])
                  return (
                    <div key={force.key} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                      <div className="w-48">
                        <div className="font-medium text-sm">{force.title}</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${data[force.key]}%` }}
                          />
                        </div>
                      </div>
                      <div className={`w-20 text-sm font-medium ${level.color}`}>{level.label}</div>
                      <div className="w-12 text-sm text-muted-foreground text-right">{data[force.key]}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Strategic Implications */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Implications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.newEntrants > 60 && (
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-5 text-sm">High threat of new entrants</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider building barriers such as brand loyalty, patents, or economies of scale.
                  </p>
                </div>
              )}
              {data.buyerPower > 60 && (
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-5 text-sm">High buyer power</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus on differentiation, customer loyalty programs, and increasing switching costs.
                  </p>
                </div>
              )}
              {data.supplierPower > 60 && (
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-5 text-sm">High supplier power</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider diversifying suppliers, backward integration, or developing substitutes.
                  </p>
                </div>
              )}
              {data.substitutes > 60 && (
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-5 text-sm">High threat of substitutes</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Invest in innovation, improve value proposition, and build customer relationships.
                  </p>
                </div>
              )}
              {data.rivalry > 60 && (
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-5 text-sm">Intense industry rivalry</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Differentiate your offering, focus on niche markets, or pursue cost leadership.
                  </p>
                </div>
              )}
              {Object.values(data).every((v) => v <= 60) && (
                <div className="bg-chart-2/10 rounded-lg p-3">
                  <h4 className="font-medium text-chart-2 text-sm">Favorable competitive environment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The industry shows manageable competitive pressures. Focus on capturing market share and building
                    sustainable competitive advantages.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Porter's Five Forces" description="Analyze the competitive forces shaping your industry">
      <div className="space-y-6">
        {forces.map((force) => (
          <Card key={force.key}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{force.title}</CardTitle>
              <CardDescription>{force.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <h4 className="text-xs font-medium mb-2">Factors to consider:</h4>
                <div className="flex flex-wrap gap-2">
                  {force.factors.map((factor, i) => (
                    <span key={i} className="text-xs bg-background px-2 py-1 rounded border border-border">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{force.lowLabel}</span>
                  <span className="font-medium">{data[force.key]}%</span>
                  <span className="text-muted-foreground">{force.highLabel}</span>
                </div>
                <Slider
                  value={[data[force.key]]}
                  onValueChange={(value) => handleChange(force.key, value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => setShowResults(true)} size="lg" className="gap-2">
          Analyze Forces
        </Button>
      </div>
    </ToolLayout>
  )
}
