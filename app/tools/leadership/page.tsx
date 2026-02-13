"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { StepIndicator } from "@/components/tools/step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

interface Question {
  id: number
  text: string
  options: { value: string; text: string; style: string }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "When making important team decisions, you typically:",
    options: [
      { value: "a", text: "Make the decision yourself based on your expertise", style: "autocratic" },
      { value: "b", text: "Gather input but make the final call yourself", style: "authoritative" },
      { value: "c", text: "Facilitate a team discussion and reach consensus", style: "democratic" },
      { value: "d", text: "Delegate the decision to team members", style: "delegative" },
    ],
  },
  {
    id: 2,
    text: "How do you prefer to motivate your team?",
    options: [
      { value: "a", text: "By setting clear expectations and holding people accountable", style: "transactional" },
      { value: "b", text: "By inspiring them with a compelling vision", style: "transformational" },
      { value: "c", text: "By supporting their personal and professional growth", style: "servant" },
      { value: "d", text: "By building strong relationships and team cohesion", style: "affiliative" },
    ],
  },
  {
    id: 3,
    text: "When a team member is underperforming, you first:",
    options: [
      { value: "a", text: "Have a direct conversation about expectations", style: "authoritative" },
      { value: "b", text: "Provide coaching and development support", style: "coaching" },
      { value: "c", text: "Understand their challenges and offer help", style: "servant" },
      { value: "d", text: "Set clear consequences for continued underperformance", style: "transactional" },
    ],
  },
  {
    id: 4,
    text: "Your approach to setting goals is:",
    options: [
      { value: "a", text: "I set ambitious goals and expect the team to achieve them", style: "pacesetting" },
      { value: "b", text: "I involve the team in setting goals together", style: "democratic" },
      { value: "c", text: "I align goals with each person's strengths", style: "coaching" },
      { value: "d", text: "I focus on goals that serve the team's needs first", style: "servant" },
    ],
  },
  {
    id: 5,
    text: "During a crisis, you typically:",
    options: [
      { value: "a", text: "Take charge and give clear directives", style: "autocratic" },
      { value: "b", text: "Rally the team around a shared response strategy", style: "transformational" },
      { value: "c", text: "Stay calm and support the team emotionally", style: "affiliative" },
      { value: "d", text: "Quickly delegate tasks to the right people", style: "delegative" },
    ],
  },
  {
    id: 6,
    text: "How do you approach feedback?",
    options: [
      { value: "a", text: "Give direct, immediate feedback on performance", style: "transactional" },
      { value: "b", text: "Focus on coaching for long-term development", style: "coaching" },
      { value: "c", text: "Ensure feedback maintains team harmony", style: "affiliative" },
      { value: "d", text: "Lead by example and set high standards", style: "pacesetting" },
    ],
  },
  {
    id: 7,
    text: "Your view on team autonomy is:",
    options: [
      { value: "a", text: "Team members need clear direction to succeed", style: "autocratic" },
      { value: "b", text: "I set the vision, then empower them to execute", style: "authoritative" },
      { value: "c", text: "I trust the team to self-organize when possible", style: "delegative" },
      { value: "d", text: "Autonomy grows as I develop their capabilities", style: "coaching" },
    ],
  },
  {
    id: 8,
    text: "What drives your leadership approach most?",
    options: [
      { value: "a", text: "Achieving results and meeting targets", style: "pacesetting" },
      { value: "b", text: "Creating positive change and inspiring others", style: "transformational" },
      { value: "c", text: "Helping team members succeed and grow", style: "servant" },
      { value: "d", text: "Building a collaborative, harmonious team", style: "democratic" },
    ],
  },
]

const leadershipStyles: Record<
  string,
  { title: string; description: string; strengths: string[]; bestWhen: string; watchOut: string }
> = {
  autocratic: {
    title: "Autocratic / Commanding",
    description:
      "You make decisions independently and expect compliance. This style is direct and can be very effective in crisis situations.",
    strengths: ["Quick decision-making", "Clear direction", "Effective in emergencies", "Strong accountability"],
    bestWhen: "In crisis situations, with inexperienced teams, or when quick decisions are critical",
    watchOut: "May stifle creativity and reduce team engagement over time",
  },
  authoritative: {
    title: "Authoritative / Visionary",
    description:
      "You provide direction and vision while giving team members freedom in how they achieve goals. You mobilize people toward a vision.",
    strengths: ["Inspires and motivates", "Provides clear direction", "Encourages innovation", "Builds commitment"],
    bestWhen: "When change requires a new vision, or team needs clear direction",
    watchOut: "May not work well with experts who need less direction",
  },
  democratic: {
    title: "Democratic / Participative",
    description: "You build consensus through participation and value input from team members in decision-making.",
    strengths: ["Increases engagement", "Leverages team expertise", "Builds buy-in", "Develops team capability"],
    bestWhen: "When team input improves decisions, or buy-in is essential",
    watchOut: "Can slow decision-making; may not work in crises",
  },
  coaching: {
    title: "Coaching",
    description:
      "You focus on developing people for the future, helping team members identify strengths and weaknesses.",
    strengths: ["Develops talent", "Builds long-term capability", "Increases motivation", "Improves performance"],
    bestWhen: "When developing talent is priority, with motivated team members",
    watchOut: "Time-intensive; may not work if immediate results are needed",
  },
  affiliative: {
    title: "Affiliative",
    description: "You create emotional bonds and harmony, putting people first and building strong relationships.",
    strengths: ["Builds trust", "Improves morale", "Handles conflict well", "Creates loyal teams"],
    bestWhen: "Building team cohesion, healing rifts, or motivating during stress",
    watchOut: "May avoid tough conversations; performance issues may persist",
  },
  pacesetting: {
    title: "Pacesetting",
    description: "You set high standards and exemplify them yourself, expecting excellence and self-direction.",
    strengths: ["Achieves quick results", "Sets high standards", "Identifies poor performers", "Leads by example"],
    bestWhen: "With highly motivated, competent teams where quick results matter",
    watchOut: "Can overwhelm team; may cause burnout or reduce morale",
  },
  servant: {
    title: "Servant Leadership",
    description:
      "You put the needs of your team first, focusing on their growth and well-being as the path to organizational success.",
    strengths: ["Builds deep trust", "Develops strong teams", "Creates loyalty", "Empowers others"],
    bestWhen: "Building culture, developing teams, creating sustainable engagement",
    watchOut: "May be seen as lacking authority; results may take longer",
  },
  transformational: {
    title: "Transformational",
    description:
      "You inspire and motivate through vision and enthusiasm, encouraging innovation and challenging the status quo.",
    strengths: ["Drives change", "Inspires innovation", "Develops leaders", "Creates meaning"],
    bestWhen: "During organizational change, or when innovation is needed",
    watchOut: "May overlook daily operations; can be exhausting to maintain",
  },
  transactional: {
    title: "Transactional",
    description:
      "You focus on clear exchanges - reward for performance, consequences for failure. Structure and clarity define your approach.",
    strengths: ["Clear expectations", "Consistent standards", "Measurable outcomes", "Fair accountability"],
    bestWhen: "In stable environments where consistency and efficiency matter",
    watchOut: "May limit creativity; doesn't inspire beyond basic expectations",
  },
  delegative: {
    title: "Delegative / Laissez-faire",
    description:
      "You give team members freedom to make decisions and complete work independently with minimal oversight.",
    strengths: ["Empowers experts", "Builds autonomy", "Frees up leader time", "Develops decision-makers"],
    bestWhen: "With highly skilled, self-motivated experts who need freedom",
    watchOut: "Can seem disengaged; may lead to lack of direction with inexperienced teams",
  },
}

export default function LeadershipPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const results = useMemo(() => {
    const styleCounts: Record<string, number> = {}

    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find((o) => o.value === answer)
        if (option) {
          styleCounts[option.style] = (styleCounts[option.style] || 0) + 1
        }
      }
    })

    // Sort by count
    const sorted = Object.entries(styleCounts).sort(([, a], [, b]) => b - a)
    const dominant = sorted[0]?.[0] || "democratic"
    const secondary = sorted[1]?.[0]

    return { styleCounts, dominant, secondary, sorted }
  }, [answers])

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleExport = () => {
    exportToPDF("leadership-results", {
      filename: "Leadership_Style",
      title: "Leadership Style Assessment",
    })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestion(1)
    setShowResults(false)
  }

  const currentQ = questions[currentQuestion - 1]

  if (showResults) {
    const dominantStyle = leadershipStyles[results.dominant]
    const secondaryStyle = results.secondary ? leadershipStyles[results.secondary] : null

    return (
      <ToolLayout
        title="Leadership Style Assessment"
        description="Your leadership approach results"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
      >
        <div id="leadership-results" className="space-y-8">
          {/* Dominant Style */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardDescription>Your Dominant Leadership Style</CardDescription>
              <CardTitle className="text-2xl text-primary">{dominantStyle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{dominantStyle.description}</p>
            </CardContent>
          </Card>

          {/* Secondary Style */}
          {secondaryStyle && (
            <Card>
              <CardHeader>
                <CardDescription>Secondary Style</CardDescription>
                <CardTitle className="text-lg">{secondaryStyle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{secondaryStyle.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Style Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Style Distribution</CardTitle>
              <CardDescription>Your responses across leadership styles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.sorted.map(([style, count]) => (
                  <div key={style} className="flex items-center gap-3">
                    <div className="w-32 text-sm font-medium truncate">
                      {leadershipStyles[style]?.title.split(" /")[0] || style}
                    </div>
                    <div className="flex-1 bg-secondary rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${(count / questions.length) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm text-muted-foreground text-right">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Best When */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-chart-2">Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dominantStyle.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-chart-2">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Situations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dominantStyle.bestWhen}</p>
              </CardContent>
            </Card>
          </div>

          {/* Watch Out */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Areas to Watch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-chart-5/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">{dominantStyle.watchOut}</p>
              </div>
            </CardContent>
          </Card>

          {/* Development Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Development Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Great leaders adapt their style to the situation. While your dominant style is{" "}
                <strong>{dominantStyle.title}</strong>, consider:
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Practice other styles in lower-stakes situations to build flexibility</li>
                <li>• Observe how your team responds to different approaches</li>
                <li>• Ask for feedback on your leadership effectiveness</li>
                <li>• Consider the needs of different team members and situations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="Leadership Style Assessment"
      description="Identify your natural leadership approach and situational strengths"
    >
      <StepIndicator currentStep={currentQuestion} totalSteps={questions.length} />

      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentQuestion} of {questions.length}
          </CardTitle>
          <CardDescription>{currentQ.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={(value) => handleAnswer(currentQuestion, value)}
            className="space-y-3"
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`q${currentQuestion}-${option.value}`} />
                <Label htmlFor={`q${currentQuestion}-${option.value}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 1}
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextQuestion} disabled={!answers[currentQuestion]} className="gap-2">
          {currentQuestion === questions.length ? "View Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ToolLayout>
  )
}
