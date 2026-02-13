"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Download,
  RefreshCcw,
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import Link from "next/link"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts"

interface BreakEvenData {
  fixedCosts: number
  variableCostPerUnit: number
  sellingPricePerUnit: number
  expectedMonthlySales: number
}

interface Results {
  breakEvenUnits: number
  breakEvenRevenue: number
  contributionMargin: number
  contributionMarginRatio: number
  marginOfSafety: number
  marginOfSafetyPercent: number
  profitAtExpectedSales: number
  isProfitable: boolean
}

export default function BreakPointPage() {
  const [data, setData] = useState<BreakEvenData>({
    fixedCosts: 50000,
    variableCostPerUnit: 30,
    sellingPricePerUnit: 50,
    expectedMonthlySales: 3500,
  })

  const [showResults, setShowResults] = useState(false)

  const results = useMemo<Results | null>(() => {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit, expectedMonthlySales } = data

    if (sellingPricePerUnit <= variableCostPerUnit) {
      return null
    }

    const contributionMargin = sellingPricePerUnit - variableCostPerUnit
    const contributionMarginRatio = contributionMargin / sellingPricePerUnit
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
    const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit

    const revenueAtExpected = expectedMonthlySales * sellingPricePerUnit
    const totalCostsAtExpected = fixedCosts + expectedMonthlySales * variableCostPerUnit
    const profitAtExpectedSales = revenueAtExpected - totalCostsAtExpected
    const marginOfSafety = expectedMonthlySales - breakEvenUnits
    const marginOfSafetyPercent = expectedMonthlySales > 0 ? (marginOfSafety / expectedMonthlySales) * 100 : 0

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
      marginOfSafety,
      marginOfSafetyPercent,
      profitAtExpectedSales,
      isProfitable: profitAtExpectedSales > 0,
    }
  }, [data])

  const chartData = useMemo(() => {
    if (!results) return []

    const maxUnits = Math.max(results.breakEvenUnits * 2, data.expectedMonthlySales * 1.5)
    const points = []
    const step = Math.ceil(maxUnits / 20)

    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * data.sellingPricePerUnit
      const totalCost = data.fixedCosts + units * data.variableCostPerUnit
      const profit = revenue - totalCost

      points.push({
        units,
        revenue,
        totalCost,
        fixedCost: data.fixedCosts,
        profit,
      })
    }

    return points
  }, [data, results])

  const handleInputChange = (field: keyof BreakEvenData, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setData((prev) => ({ ...prev, [field]: numValue }))
  }

  const handleCalculate = () => {
    setShowResults(true)
  }

  const resetCalculator = () => {
    setData({
      fixedCosts: 50000,
      variableCostPerUnit: 30,
      sellingPricePerUnit: 50,
      expectedMonthlySales: 3500,
    })
    setShowResults(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  const isValidInput = data.sellingPricePerUnit > data.variableCostPerUnit

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <span className="brand-badge">Financial Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground">BreakPoint™</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Calculate and visualize your break-even point. Understand how many units you need to sell to cover costs and
            start making profit.
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card className="glass-card-strong">
              <CardHeader>
                <CardTitle className="text-lg">Financial Inputs</CardTitle>
                <CardDescription>Enter your cost and pricing data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fixedCosts">Fixed Costs (Monthly)</Label>
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Costs that don't change with sales volume: rent, salaries, insurance, etc.
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fixedCosts"
                      type="number"
                      value={data.fixedCosts}
                      onChange={(e) => handleInputChange("fixedCosts", e.target.value)}
                      className="pl-9"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="variableCost">Variable Cost per Unit</Label>
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Cost to produce/acquire one unit: materials, labor, shipping per unit.
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="variableCost"
                      type="number"
                      value={data.variableCostPerUnit}
                      onChange={(e) => handleInputChange("variableCostPerUnit", e.target.value)}
                      className="pl-9"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sellingPrice">Selling Price per Unit</Label>
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        The price at which you sell each unit to customers.
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="sellingPrice"
                      type="number"
                      value={data.sellingPricePerUnit}
                      onChange={(e) => handleInputChange("sellingPricePerUnit", e.target.value)}
                      className={`pl-9 ${!isValidInput ? "border-destructive" : ""}`}
                      placeholder="50"
                    />
                  </div>
                  {!isValidInput && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Price must exceed variable cost
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expectedSales">Expected Monthly Sales (Units)</Label>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <Input
                    id="expectedSales"
                    type="number"
                    value={data.expectedMonthlySales}
                    onChange={(e) => handleInputChange("expectedMonthlySales", e.target.value)}
                    placeholder="3500"
                  />
                </div>

                <Button onClick={handleCalculate} className="w-full" size="lg" disabled={!isValidInput}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Break-Even
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {showResults && results && (
              <Card className="glass-card animate-fade-in">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Contribution Margin</span>
                    <span className="font-semibold">{formatCurrency(results.contributionMargin)}/unit</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">CM Ratio</span>
                    <span className="font-semibold">{(results.contributionMarginRatio * 100).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            {!showResults ? (
              <Card className="glass-card-strong h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enter Your Data</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your financial inputs to calculate your break-even point and visualize profitability.
                  </p>
                </div>
              </Card>
            ) : results ? (
              <div className="space-y-6 animate-fade-in">
                {/* Print Header */}
                <div className="hidden print:flex print-header items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/images/logo-teal.png" alt="Gaurab Labs" className="h-10 w-auto" />
                    <div>
                      <h2 className="font-bold text-lg">BreakPoint™ Analysis Report</h2>
                      <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="glass-card-strong">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Break-Even Point</p>
                          <p className="text-3xl font-bold text-primary">{formatNumber(results.breakEvenUnits)}</p>
                          <p className="text-sm text-muted-foreground">units per month</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Target className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card-strong">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Break-Even Revenue</p>
                          <p className="text-3xl font-bold text-primary">{formatCurrency(results.breakEvenRevenue)}</p>
                          <p className="text-sm text-muted-foreground">monthly revenue needed</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profitability Status */}
                {data.expectedMonthlySales > 0 && (
                  <Card
                    className={`overflow-hidden ${results.isProfitable ? "border-success/50" : "border-warning/50"}`}
                  >
                    <div className={`h-1 ${results.isProfitable ? "bg-success" : "bg-warning"}`} />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${results.isProfitable ? "bg-success/10" : "bg-warning/10"}`}
                        >
                          {results.isProfitable ? (
                            <CheckCircle className="h-6 w-6 text-success" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-warning" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg">
                            {results.isProfitable ? "Profitable at Expected Sales" : "Below Break-Even Point"}
                          </p>
                          <p className="text-muted-foreground">
                            At {formatNumber(data.expectedMonthlySales)} units/month:{" "}
                            <span className={`font-semibold ${results.isProfitable ? "text-success" : "text-warning"}`}>
                              {results.isProfitable ? "+" : ""}
                              {formatCurrency(results.profitAtExpectedSales)} profit
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Margin of Safety</p>
                          <p
                            className={`text-xl font-bold ${results.marginOfSafety >= 0 ? "text-success" : "text-warning"}`}
                          >
                            {results.marginOfSafetyPercent.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Chart */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Cost-Revenue-Profit Analysis</CardTitle>
                    <CardDescription>Visual representation of your break-even dynamics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis
                            dataKey="units"
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickFormatter={(value) => formatNumber(value)}
                            label={{ value: "Units Sold", position: "bottom", offset: 0, fontSize: 12 }}
                          />
                          <YAxis
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--popover)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                            formatter={(value: number, name: string) => [formatCurrency(value), name]}
                            labelFormatter={(label) => `${formatNumber(label)} units`}
                          />
                          <Legend />
                          <ReferenceLine
                            x={results.breakEvenUnits}
                            stroke="#0f766e"
                            strokeDasharray="5 5"
                            label={{ value: "Break-Even", position: "top", fill: "#0f766e", fontSize: 11 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#0f766e"
                            strokeWidth={2.5}
                            name="Revenue"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalCost"
                            stroke="#dc2626"
                            strokeWidth={2.5}
                            name="Total Cost"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="fixedCost"
                            stroke="#6b7280"
                            strokeWidth={1.5}
                            strokeDasharray="5 5"
                            name="Fixed Cost"
                            dot={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            fill="#0f766e"
                            fillOpacity={0.1}
                            stroke="none"
                            name="Profit/Loss Zone"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretation */}
                <Card className="insight-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Business Counselling Interpretation</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">What this means:</strong> You need to sell at least{" "}
                        <strong className="text-primary">{formatNumber(results.breakEvenUnits)} units</strong> per month
                        to cover all your costs. Every unit sold beyond this point generates{" "}
                        <strong className="text-primary">{formatCurrency(results.contributionMargin)}</strong> in
                        profit.
                      </p>

                      {data.expectedMonthlySales > 0 && (
                        <p>
                          <strong className="text-foreground">Current projection:</strong>{" "}
                          {results.isProfitable ? (
                            <>
                              At your expected sales of {formatNumber(data.expectedMonthlySales)} units, you'll be{" "}
                              <strong className="text-success">
                                {formatNumber(results.marginOfSafety)} units above
                              </strong>{" "}
                              break-even, giving you a healthy margin of safety.
                            </>
                          ) : (
                            <>
                              At your expected sales of {formatNumber(data.expectedMonthlySales)} units, you'll be{" "}
                              <strong className="text-warning">
                                {formatNumber(Math.abs(results.marginOfSafety))} units below
                              </strong>{" "}
                              break-even. Consider increasing price, reducing costs, or boosting sales volume.
                            </>
                          )}
                        </p>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-xl bg-background/50">
                          <p className="text-sm font-medium text-foreground mb-2">If you increase price by 10%:</p>
                          <p className="text-sm">
                            New break-even: ~
                            {formatNumber(
                              Math.ceil(data.fixedCosts / (data.sellingPricePerUnit * 1.1 - data.variableCostPerUnit)),
                            )}{" "}
                            units
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-background/50">
                          <p className="text-sm font-medium text-foreground mb-2">
                            If you reduce variable cost by 10%:
                          </p>
                          <p className="text-sm">
                            New break-even: ~
                            {formatNumber(
                              Math.ceil(data.fixedCosts / (data.sellingPricePerUnit - data.variableCostPerUnit * 0.9)),
                            )}{" "}
                            units
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Input Summary for Print */}
                <Card className="glass-card hidden print:block">
                  <CardHeader>
                    <CardTitle className="text-lg">Input Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Fixed Costs:</span> {formatCurrency(data.fixedCosts)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Variable Cost/Unit:</span>{" "}
                        {formatCurrency(data.variableCostPerUnit)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Selling Price/Unit:</span>{" "}
                        {formatCurrency(data.sellingPricePerUnit)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected Sales:</span>{" "}
                        {formatNumber(data.expectedMonthlySales)} units
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Print Footer */}
                <div className="hidden print:block print-footer">
                  <p>Generated by Gaurab Labs | www.gaurablabs.com | paudelg97@gmail.com</p>
                  <p className="mt-1">
                    This analysis is for planning purposes. Actual results may vary based on market conditions.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center no-print">
                  <Button onClick={handlePrint} size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Export Breakeven Analysis PDF
                  </Button>
                  <Button variant="outline" onClick={resetCalculator} size="lg">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Reset Calculator
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="glass-card-strong">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Invalid Input</h3>
                  <p className="text-muted-foreground">
                    Selling price must be greater than variable cost per unit for break-even analysis to work.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
