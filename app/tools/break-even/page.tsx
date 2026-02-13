"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { exportToPDF } from "@/lib/pdf-export"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"

interface BreakEvenData {
  fixedCosts: string
  variableCost: string
  sellingPrice: string
  currency: string
}

const initialData: BreakEvenData = {
  fixedCosts: "",
  variableCost: "",
  sellingPrice: "",
  currency: "NPR",
}

export default function BreakEvenPage() {
  const [data, setData] = useState<BreakEvenData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const handleChange = (key: keyof BreakEvenData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const calculations = useMemo(() => {
    const fixed = Number.parseFloat(data.fixedCosts) || 0
    const variable = Number.parseFloat(data.variableCost) || 0
    const price = Number.parseFloat(data.sellingPrice) || 0

    if (price <= variable || price === 0) {
      return null
    }

    const contributionMargin = price - variable
    const breakEvenUnits = Math.ceil(fixed / contributionMargin)
    const breakEvenRevenue = breakEvenUnits * price
    const contributionMarginRatio = (contributionMargin / price) * 100

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
    }
  }, [data])

  const chartData = useMemo(() => {
    if (!calculations) return []

    const fixed = Number.parseFloat(data.fixedCosts) || 0
    const variable = Number.parseFloat(data.variableCost) || 0
    const price = Number.parseFloat(data.sellingPrice) || 0
    const maxUnits = Math.ceil(calculations.breakEvenUnits * 2)

    const points = []
    for (let units = 0; units <= maxUnits; units += Math.ceil(maxUnits / 20)) {
      points.push({
        units,
        revenue: units * price,
        totalCosts: fixed + units * variable,
        profit: units * price - (fixed + units * variable),
      })
    }

    return points
  }, [calculations, data])

  const handleExport = () => {
    exportToPDF("break-even-results", {
      filename: "Break_Even_Analysis",
      title: "Break-Even Analysis",
    })
  }

  const handleReset = () => {
    setData(initialData)
    setShowResults(false)
  }

  const canCalculate =
    Number.parseFloat(data.fixedCosts) > 0 &&
    Number.parseFloat(data.variableCost) >= 0 &&
    Number.parseFloat(data.sellingPrice) > Number.parseFloat(data.variableCost)

  if (showResults && calculations) {
    return (
      <ToolLayout
        title="Break-Even Calculator"
        description="Your profitability analysis"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="break-even-results" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>Break-Even Point</CardDescription>
                <CardTitle className="text-3xl text-primary">
                  {calculations.breakEvenUnits.toLocaleString()} units
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-chart-2/5 border-chart-2/20">
              <CardHeader className="pb-2">
                <CardDescription>Break-Even Revenue</CardDescription>
                <CardTitle className="text-3xl text-chart-2">
                  {data.currency} {calculations.breakEvenRevenue.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-chart-4/5 border-chart-4/20">
              <CardHeader className="pb-2">
                <CardDescription>Contribution Margin</CardDescription>
                <CardTitle className="text-3xl text-chart-4">
                  {calculations.contributionMarginRatio.toFixed(1)}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cost vs Revenue Analysis</CardTitle>
              <CardDescription>Break-even occurs where revenue equals total costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="units"
                      label={{ value: "Units Sold", position: "insideBottom", offset: -5 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      label={{ value: `${data.currency}`, angle: -90, position: "insideLeft" }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${data.currency} ${value.toLocaleString()}`, ""]}
                      labelFormatter={(label) => `${label} units`}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <ReferenceLine
                      x={calculations.breakEvenUnits}
                      stroke="var(--primary)"
                      strokeDasharray="5 5"
                      label={{ value: "Break-Even", position: "top", fill: "var(--primary)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      name="Revenue"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalCosts"
                      stroke="var(--chart-5)"
                      strokeWidth={2}
                      name="Total Costs"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Input Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Input Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">
                    {data.currency} {Number.parseFloat(data.fixedCosts).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Fixed Costs</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">
                    {data.currency} {Number.parseFloat(data.variableCost).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Variable Cost / Unit</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">
                    {data.currency} {Number.parseFloat(data.sellingPrice).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Selling Price / Unit</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle>Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You need to sell <strong>{calculations.breakEvenUnits.toLocaleString()} units</strong> to cover all your
                costs. Each unit sold contributes{" "}
                <strong>
                  {data.currency} {calculations.contributionMargin.toLocaleString()}
                </strong>{" "}
                ({calculations.contributionMarginRatio.toFixed(1)}%) toward fixed costs and profit.
              </p>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Quick Analysis</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {calculations.contributionMarginRatio >= 50 ? (
                    <li>• Strong contribution margin - pricing appears healthy</li>
                  ) : calculations.contributionMarginRatio >= 30 ? (
                    <li>• Moderate contribution margin - consider if there is room to optimize</li>
                  ) : (
                    <li>• Low contribution margin - review pricing or cost structure</li>
                  )}
                  <li>
                    • Each unit sold beyond break-even generates {data.currency}{" "}
                    {calculations.contributionMargin.toLocaleString()} profit
                  </li>
                  <li>
                    • To double your profit target, you would need to sell{" "}
                    {(calculations.breakEvenUnits * 2).toLocaleString()} units
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Break-Even Calculator" description="Calculate when your business becomes profitable">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Numbers</CardTitle>
          <CardDescription>Provide your cost and pricing information to calculate break-even point</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Fixed Costs (Total)</Label>
              <Input
                id="fixedCosts"
                type="number"
                value={data.fixedCosts}
                onChange={(e) => handleChange("fixedCosts", e.target.value)}
                placeholder="e.g., 100000"
              />
              <p className="text-xs text-muted-foreground">Total fixed costs (rent, salaries, equipment, etc.)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variableCost">Variable Cost per Unit</Label>
              <Input
                id="variableCost"
                type="number"
                value={data.variableCost}
                onChange={(e) => handleChange("variableCost", e.target.value)}
                placeholder="e.g., 50"
              />
              <p className="text-xs text-muted-foreground">Cost to produce or acquire one unit</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price per Unit</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={data.sellingPrice}
                onChange={(e) => handleChange("sellingPrice", e.target.value)}
                placeholder="e.g., 100"
              />
              <p className="text-xs text-muted-foreground">Price at which you sell one unit</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={data.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                placeholder="NPR"
              />
              <p className="text-xs text-muted-foreground">Currency symbol for display</p>
            </div>
          </div>

          {Number.parseFloat(data.sellingPrice) > 0 &&
            Number.parseFloat(data.sellingPrice) <= Number.parseFloat(data.variableCost) && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
                Selling price must be greater than variable cost per unit to calculate break-even.
              </div>
            )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setShowResults(true)} disabled={!canCalculate} size="lg" className="gap-2">
          Calculate Break-Even
        </Button>
      </div>
    </ToolLayout>
  )
}
