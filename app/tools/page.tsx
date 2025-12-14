"use client"

import { useState, useEffect } from "react"
import { EnhancedButton } from "@/components/enhanced-button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/enhanced-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { ToolsSkeleton } from "@/components/loading-states"
import { Calendar, Calculator, Type, Palette, Ruler, Lock, AlertCircle, CheckCircle, Copy } from "lucide-react"
import {
  convertBSToAD,
  convertADToBS,
  formatNepaliDate,
  formatEnglishDate,
  getCurrentNepaliDate,
  nepaliMonths,
  englishMonths,
} from "@/lib/nepali-date-converter"

export default function Tools() {
  const [loading, setLoading] = useState(true)

  // Date Converter State
  const [dateType, setDateType] = useState<"AD_TO_BS" | "BS_TO_AD">("AD_TO_BS")
  const [inputDate, setInputDate] = useState({ year: "", month: "", day: "" })
  const [convertedResult, setConvertedResult] = useState<{
    success: boolean
    data?: any
    error?: string
  } | null>(null)
  const [dateLoading, setDateLoading] = useState(false)

  // Text Tools State
  const [textInput, setTextInput] = useState("")
  const [textResult, setTextResult] = useState("")
  const [textLoading, setTextLoading] = useState(false)

  // Color Picker State
  const [selectedColor, setSelectedColor] = useState("#3b82f6")

  // Unit Converter State
  const [unitValue, setUnitValue] = useState("")
  const [unitType, setUnitType] = useState<"LENGTH" | "WEIGHT" | "TEMPERATURE">("LENGTH")
  const [unitLoading, setUnitLoading] = useState(false)

  // Password Generator State
  const [passwordLength, setPasswordLength] = useState(12)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDateConversion = async () => {
    setDateLoading(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const year = Number.parseInt(inputDate.year)
      const month = Number.parseInt(inputDate.month)
      const day = Number.parseInt(inputDate.day)

      if (!year || !month || !day) {
        setConvertedResult({
          success: false,
          error: "Please enter valid year, month, and day",
        })
        return
      }

      if (dateType === "AD_TO_BS") {
        const result = convertADToBS(year, month, day)
        setConvertedResult({
          success: true,
          data: {
            type: "BS",
            formatted: formatNepaliDate(result),
            raw: result,
          },
        })
      } else {
        const result = convertBSToAD(year, month, day)
        setConvertedResult({
          success: true,
          data: {
            type: "AD",
            formatted: formatEnglishDate(result),
            raw: result,
          },
        })
      }
    } catch (error) {
      setConvertedResult({
        success: false,
        error: error instanceof Error ? error.message : "Conversion failed",
      })
    } finally {
      setDateLoading(false)
    }
  }

  const setTodayDate = () => {
    const today = new Date()
    if (dateType === "AD_TO_BS") {
      setInputDate({
        year: today.getFullYear().toString(),
        month: (today.getMonth() + 1).toString(),
        day: today.getDate().toString(),
      })
    } else {
      const nepaliToday = getCurrentNepaliDate()
      setInputDate({
        year: nepaliToday.year.toString(),
        month: nepaliToday.month.toString(),
        day: nepaliToday.day.toString(),
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleTextTransform = async (type: "UPPER" | "LOWER" | "TITLE" | "COUNT") => {
    setTextLoading(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 300))

    switch (type) {
      case "UPPER":
        setTextResult(textInput.toUpperCase())
        break
      case "LOWER":
        setTextResult(textInput.toLowerCase())
        break
      case "TITLE":
        setTextResult(textInput.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
        break
      case "COUNT":
        const words = textInput
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
        const chars = textInput.length
        const charsNoSpaces = textInput.replace(/\s/g, "").length
        const lines = textInput.split("\n").length
        setTextResult(
          `Words: ${words.length} | Characters: ${chars} | Characters (no spaces): ${charsNoSpaces} | Lines: ${lines}`,
        )
        break
    }

    setTextLoading(false)
  }

  const generatePassword = async () => {
    setPasswordLoading(true)

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 400))

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedPassword(password)
    setPasswordLoading(false)
  }

  const convertUnits = async () => {
    setUnitLoading(true)

    // Simulate conversion time
    await new Promise((resolve) => setTimeout(resolve, 300))

    const value = Number.parseFloat(unitValue)
    if (!value) {
      setUnitLoading(false)
      return
    }

    switch (unitType) {
      case "LENGTH":
        const feet = value * 3.28084
        const inches = value * 39.3701
        const cm = value * 100
        const km = value / 1000
        setTextResult(
          `${value} meters = ${feet.toFixed(2)} feet = ${inches.toFixed(2)} inches = ${cm} cm = ${km.toFixed(3)} km`,
        )
        break
      case "WEIGHT":
        const pounds = value * 2.20462
        const grams = value * 1000
        const ounces = value * 35.274
        setTextResult(`${value} kg = ${pounds.toFixed(2)} pounds = ${grams} grams = ${ounces.toFixed(2)} ounces`)
        break
      case "TEMPERATURE":
        const fahrenheit = (value * 9) / 5 + 32
        const kelvin = value + 273.15
        const rankine = ((value + 273.15) * 9) / 5
        setTextResult(`${value}°C = ${fahrenheit.toFixed(2)}°F = ${kelvin.toFixed(2)}K = ${rankine.toFixed(2)}°R`)
        break
    }

    setUnitLoading(false)
  }

  const tools = [
    {
      id: "date-converter",
      title: "Date Converter (AD ↔ BS)",
      description: "Convert dates between Gregorian (AD) and Bikram Sambat (BS) calendars",
      icon: Calendar,
      category: "Date & Time",
    },
    {
      id: "text-tools",
      title: "Text Tools",
      description: "Transform text case, count words/characters, and more",
      icon: Type,
      category: "Text",
    },
    {
      id: "color-picker",
      title: "Color Picker & Converter",
      description: "Pick colors and convert between HEX, RGB, and HSL",
      icon: Palette,
      category: "Design",
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between different units of measurement",
      icon: Ruler,
      category: "Calculator",
    },
    {
      id: "password-generator",
      title: "Password Generator",
      description: "Generate secure random passwords",
      icon: Lock,
      category: "Security",
    },
  ]

  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const renderTool = () => {
    switch (selectedTool) {
      case "date-converter":
        return (
          <EnhancedCard hover>
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Date Converter (AD ↔ BS)
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent className="space-y-4">
              <div className="flex gap-2">
                <EnhancedButton
                  variant={dateType === "AD_TO_BS" ? "default" : "outline"}
                  onClick={() => {
                    setDateType("AD_TO_BS")
                    setInputDate({ year: "", month: "", day: "" })
                    setConvertedResult(null)
                  }}
                >
                  AD to BS
                </EnhancedButton>
                <EnhancedButton
                  variant={dateType === "BS_TO_AD" ? "default" : "outline"}
                  onClick={() => {
                    setDateType("BS_TO_AD")
                    setInputDate({ year: "", month: "", day: "" })
                    setConvertedResult(null)
                  }}
                >
                  BS to AD
                </EnhancedButton>
                <EnhancedButton onClick={setTodayDate} variant="outline" size="sm">
                  Today
                </EnhancedButton>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Year</Label>
                  <Input
                    placeholder={dateType === "AD_TO_BS" ? "2024" : "2081"}
                    value={inputDate.year}
                    onChange={(e) => setInputDate((prev) => ({ ...prev, year: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Month</Label>
                  <Select
                    value={inputDate.month}
                    onValueChange={(value) => setInputDate((prev) => ({ ...prev, month: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {(dateType === "AD_TO_BS" ? englishMonths : nepaliMonths).map((month, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1}. {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Day</Label>
                  <Input
                    placeholder="1-31"
                    value={inputDate.day}
                    onChange={(e) => setInputDate((prev) => ({ ...prev, day: e.target.value }))}
                  />
                </div>
              </div>

              <EnhancedButton
                onClick={handleDateConversion}
                className="w-full"
                loading={dateLoading}
                disabled={!inputDate.year || !inputDate.month || !inputDate.day}
              >
                Convert Date
              </EnhancedButton>

              {convertedResult && (
                <div
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    convertedResult.success
                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                      : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-2">
                    {convertedResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      {convertedResult.success ? (
                        <div>
                          <p className="font-semibold text-green-800 dark:text-green-200">Converted Date:</p>
                          <p className="text-green-700 dark:text-green-300 text-lg">{convertedResult.data.formatted}</p>
                          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                            <p>Year: {convertedResult.data.raw.year}</p>
                            <p>
                              Month: {convertedResult.data.raw.month} ({convertedResult.data.raw.monthName})
                            </p>
                            <p>Day: {convertedResult.data.raw.day}</p>
                            {convertedResult.data.raw.dayName && <p>Day of Week: {convertedResult.data.raw.dayName}</p>}
                          </div>
                          <EnhancedButton
                            onClick={() => copyToClipboard(convertedResult.data.formatted)}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Result
                          </EnhancedButton>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-200">Conversion Error:</p>
                          <p className="text-red-700 dark:text-red-300">{convertedResult.error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Supported ranges:</strong>
                </p>
                <p>• AD: 1943-2043 (English Calendar)</p>
                <p>• BS: 2000-2100 (Bikram Sambat Calendar)</p>
                <p>
                  <strong>Reference:</strong> 1st Baishakh 2000 BS = 13th April 1943 AD
                </p>
                <p>
                  <strong>Note:</strong> Uses verified conversion algorithms with accurate calendar data.
                </p>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        )

      case "text-tools":
        return (
          <EnhancedCard hover>
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Text Tools
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent className="space-y-4">
              <div>
                <Label>Input Text</Label>
                <Textarea
                  placeholder="Enter your text here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <EnhancedButton
                  onClick={() => handleTextTransform("UPPER")}
                  variant="outline"
                  size="sm"
                  loading={textLoading}
                  disabled={!textInput}
                >
                  UPPERCASE
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => handleTextTransform("LOWER")}
                  variant="outline"
                  size="sm"
                  loading={textLoading}
                  disabled={!textInput}
                >
                  lowercase
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => handleTextTransform("TITLE")}
                  variant="outline"
                  size="sm"
                  loading={textLoading}
                  disabled={!textInput}
                >
                  Title Case
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => handleTextTransform("COUNT")}
                  variant="outline"
                  size="sm"
                  loading={textLoading}
                  disabled={!textInput}
                >
                  Count Words
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => {
                    setTextInput("")
                    setTextResult("")
                  }}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Clear
                </EnhancedButton>
              </div>

              {textResult && (
                <div className="p-4 bg-primary/10 rounded-lg transition-all duration-200">
                  <Label>Result:</Label>
                  <p className="mt-2 font-mono text-sm break-all">{textResult}</p>
                  <EnhancedButton
                    onClick={() => copyToClipboard(textResult)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </EnhancedButton>
                </div>
              )}
            </EnhancedCardContent>
          </EnhancedCard>
        )

      case "color-picker":
        return (
          <EnhancedCard hover>
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Picker & Converter
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent className="space-y-4">
              <div>
                <Label>Pick a Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-16 rounded border cursor-pointer transition-transform hover:scale-105"
                    aria-label="Color picker"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>HEX:</strong> {selectedColor.toUpperCase()}
                      </div>
                      <div>
                        <strong>RGB:</strong>{" "}
                        {`rgb(${Number.parseInt(selectedColor.slice(1, 3), 16)}, ${Number.parseInt(selectedColor.slice(3, 5), 16)}, ${Number.parseInt(selectedColor.slice(5, 7), 16)})`}
                      </div>
                    </div>
                    <EnhancedButton onClick={() => copyToClipboard(selectedColor)} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy HEX
                    </EnhancedButton>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-lg border-2 border-dashed transition-all duration-200"
                style={{ backgroundColor: selectedColor }}
              >
                <p className="text-white font-semibold text-center drop-shadow-lg">Color Preview</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="w-full h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`Select color ${color}`}
                    />
                  ),
                )}
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        )

      case "password-generator":
        return (
          <EnhancedCard hover>
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password Generator
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent className="space-y-4">
              <div>
                <Label>Password Length: {passwordLength}</Label>
                <input
                  type="range"
                  min="4"
                  max="50"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number.parseInt(e.target.value))}
                  className="w-full mt-2 accent-primary"
                  aria-label={`Password length: ${passwordLength} characters`}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>4</span>
                  <span>50</span>
                </div>
              </div>

              <EnhancedButton onClick={generatePassword} className="w-full" loading={passwordLoading}>
                Generate Password
              </EnhancedButton>

              {generatedPassword && (
                <div className="p-4 bg-primary/10 rounded-lg transition-all duration-200">
                  <Label>Generated Password:</Label>
                  <div className="mt-2 p-2 bg-background rounded border font-mono text-lg break-all select-all">
                    {generatedPassword}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <EnhancedButton onClick={() => copyToClipboard(generatedPassword)} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Password
                    </EnhancedButton>
                    <EnhancedButton onClick={generatePassword} variant="outline" size="sm" loading={passwordLoading}>
                      Generate New
                    </EnhancedButton>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>
                      Password strength: <span className="text-green-600 font-semibold">Strong</span>
                    </p>
                    <p>Contains: Uppercase, lowercase, numbers, and symbols</p>
                  </div>
                </div>
              )}
            </EnhancedCardContent>
          </EnhancedCard>
        )

      case "unit-converter":
        return (
          <EnhancedCard hover>
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Unit Converter
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent className="space-y-4">
              <div className="flex gap-2">
                <EnhancedButton
                  variant={unitType === "LENGTH" ? "default" : "outline"}
                  onClick={() => setUnitType("LENGTH")}
                  size="sm"
                >
                  Length
                </EnhancedButton>
                <EnhancedButton
                  variant={unitType === "WEIGHT" ? "default" : "outline"}
                  onClick={() => setUnitType("WEIGHT")}
                  size="sm"
                >
                  Weight
                </EnhancedButton>
                <EnhancedButton
                  variant={unitType === "TEMPERATURE" ? "default" : "outline"}
                  onClick={() => setUnitType("TEMPERATURE")}
                  size="sm"
                >
                  Temperature
                </EnhancedButton>
              </div>

              <div>
                <Label>
                  Enter value in {unitType === "LENGTH" ? "meters" : unitType === "WEIGHT" ? "kilograms" : "Celsius"}
                </Label>
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={unitValue}
                  onChange={(e) => setUnitValue(e.target.value)}
                />
              </div>

              <EnhancedButton onClick={convertUnits} className="w-full" disabled={!unitValue} loading={unitLoading}>
                Convert
              </EnhancedButton>

              {textResult && (
                <div className="p-4 bg-primary/10 rounded-lg transition-all duration-200">
                  <Label>Conversion Result:</Label>
                  <p className="mt-2 font-mono text-sm">{textResult}</p>
                  <EnhancedButton
                    onClick={() => copyToClipboard(textResult)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </EnhancedButton>
                </div>
              )}
            </EnhancedCardContent>
          </EnhancedCard>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded mx-auto"></div>
        </div>
        <ToolsSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateOnScroll animation="fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Utility Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of useful tools to help with everyday tasks and calculations
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Tools Grid */}
        <div>
          <AnimateOnScroll animation="slideRight" delay={0.2}>
            <h2 className="text-2xl font-bold mb-6">Available Tools</h2>
            <div className="grid gap-4">
              {tools.map((tool, index) => (
                <AnimateOnScroll key={tool.id} animation="slideUp" delay={0.1 + index * 0.1}>
                  <EnhancedCard
                    interactive
                    hover
                    className={`cursor-pointer transition-all ${
                      selectedTool === tool.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedTool(tool.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setSelectedTool(tool.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${tool.title} tool`}
                  >
                    <EnhancedCardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{tool.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {tool.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Tool Interface */}
        <div>
          <AnimateOnScroll animation="slideLeft" delay={0.2}>
            {selectedTool ? (
              renderTool()
            ) : (
              <EnhancedCard className="h-full flex items-center justify-center">
                <EnhancedCardContent className="text-center p-8">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
                  <p className="text-muted-foreground">Choose a tool from the left to get started</p>
                </EnhancedCardContent>
              </EnhancedCard>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
