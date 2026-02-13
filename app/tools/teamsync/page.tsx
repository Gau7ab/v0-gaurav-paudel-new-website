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
  Users,
  MessageCircle,
  Target,
  Shield,
  Handshake,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  role: string
}

interface DimensionScore {
  communication: number
  roleClarity: number
  decisionAlignment: number
  trust: number
  conflictHandling: number
}

const dimensions = [
  { id: "communication", label: "Communication Clarity", icon: MessageCircle, color: "text-blue-500" },
  { id: "roleClarity", label: "Role Understanding", icon: Target, color: "text-purple-500" },
  { id: "decisionAlignment", label: "Decision Alignment", icon: Handshake, color: "text-amber-500" },
  { id: "trust", label: "Trust & Safety", icon: Shield, color: "text-green-500" },
  { id: "conflictHandling", label: "Conflict Handling", icon: Users, color: "text-red-500" },
]

const dimensionQuestions: Record<keyof DimensionScore, string[]> = {
  communication: [
    "Team members share information openly and proactively",
    "Feedback is given and received constructively",
    "Everyone has equal voice in discussions",
  ],
  roleClarity: [
    "Each person's responsibilities are clearly defined",
    "There is minimal overlap or confusion about who does what",
    "Team members understand how their work connects to others",
  ],
  decisionAlignment: [
    "The team has a clear decision-making process",
    "Decisions are made collaboratively when appropriate",
    "Team members support decisions once made",
  ],
  trust: [
    "Team members feel safe to express opinions",
    "People admit mistakes without fear",
    "There is genuine respect among team members",
  ],
  conflictHandling: [
    "Disagreements are addressed directly and respectfully",
    "The team resolves conflicts without lasting tension",
    "Different perspectives are valued in problem-solving",
  ],
}

const improvementActions: Record<keyof DimensionScore, string[]> = {
  communication: [
    "Implement daily standups or weekly sync meetings",
    "Create shared documentation practices",
    "Establish clear communication channels for different topics",
    "Practice active listening techniques in meetings",
  ],
  roleClarity: [
    "Create a RACI matrix for key responsibilities",
    "Hold role clarification sessions quarterly",
    "Document and share role descriptions",
    "Cross-train team members on adjacent roles",
  ],
  decisionAlignment: [
    "Define decision-making frameworks (RAPID, etc.)",
    "Clarify decision rights for different scenarios",
    "Document decisions and rationale",
    "Review past decisions for learning",
  ],
  trust: [
    "Practice vulnerability-based trust exercises",
    "Celebrate failures as learning opportunities",
    "Create psychological safety agreements",
    "Hold regular 1-on-1 conversations",
  ],
  conflictHandling: [
    "Establish conflict resolution protocols",
    "Train on constructive disagreement techniques",
    "Use structured debate for important decisions",
    "Address tensions early before escalation",
  ],
}

export default function TeamSyncPage() {
  const [step, setStep] = useState(1)
  const [teamName, setTeamName] = useState("")
  const [members, setMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState({ name: "", role: "" })
  const [scores, setScores] = useState<DimensionScore>({
    communication: 50,
    roleClarity: 50,
    decisionAlignment: 50,
    trust: 50,
    conflictHandling: 50,
  })
  const [currentDimension, setCurrentDimension] = useState(0)

  const addMember = () => {
    if (!newMember.name.trim() || !newMember.role.trim()) return
    setMembers((prev) => [...prev, { id: Date.now().toString(), ...newMember }])
    setNewMember({ name: "", role: "" })
  }

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const updateScore = (dimension: keyof DimensionScore, value: number) => {
    setScores((prev) => ({ ...prev, [dimension]: value }))
  }

  const calculateOverallScore = (): number => {
    const values = Object.values(scores)
    return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
  }

  const getScoreLevel = (score: number): { label: string; color: string } => {
    if (score >= 75) return { label: "Strong", color: "text-green-500" }
    if (score >= 50) return { label: "Moderate", color: "text-amber-500" }
    return { label: "Needs Work", color: "text-red-500" }
  }

  const getStrengths = () => {
    return Object.entries(scores)
      .filter(([_, score]) => score >= 70)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([dim]) => dimensions.find((d) => d.id === dim)!)
  }

  const getFrictionPoints = () => {
    return Object.entries(scores)
      .filter(([_, score]) => score < 60)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .map(([dim]) => dimensions.find((d) => d.id === dim)!)
  }

  const handlePrint = () => window.print()
  const handleReset = () => {
    setStep(1)
    setTeamName("")
    setMembers([])
    setScores({
      communication: 50,
      roleClarity: 50,
      decisionAlignment: 50,
      trust: 50,
      conflictHandling: 50,
    })
    setCurrentDimension(0)
  }

  const teamMetrics = useMemo(
    () => ({
      overallScore: calculateOverallScore(),
      overallLevel: getScoreLevel(calculateOverallScore()),
      strengths: getStrengths(),
      frictionPoints: getFrictionPoints(),
    }),
    [scores],
  )

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">TeamSync™</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Map team dynamics, communication patterns, and alignment to improve collaboration.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-secondary/80">Step {step} of 3</span>
            </div>
          </div>
        </div>

        {/* Step 1: Team Setup */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="e.g., Product Development Team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>Team Members</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Role"
                    value={newMember.role}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, role: e.target.value }))}
                    className="flex-1"
                  />
                  <Button onClick={addMember} disabled={!newMember.name || !newMember.role}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {members.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Add team members to begin the assessment
                    </p>
                  ) : (
                    members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMember(member.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!teamName || members.length < 2} className="gap-2">
                  Begin Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Dimension Assessment */}
        {step === 2 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Team Dynamics Assessment</CardTitle>
              <p className="text-sm text-muted-foreground">
                Rate your team on each dimension based on your collective experience
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dimension Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dimensions.map((dim, i) => {
                  const Icon = dim.icon
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setCurrentDimension(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        currentDimension === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{dim.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Current Dimension */}
              <div className="p-6 rounded-xl bg-secondary/30 space-y-6">
                {(() => {
                  const dim = dimensions[currentDimension]
                  const Icon = dim.icon
                  const dimId = dim.id as keyof DimensionScore

                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${dim.color}`} />
                        <h3 className="text-lg font-semibold">{dim.label}</h3>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Consider these aspects when rating:</p>
                        <ul className="space-y-2">
                          {dimensionQuestions[dimId].map((q, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs flex-shrink-0">
                                {i + 1}
                              </span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label>Team Rating</Label>
                          <span className="font-medium">{scores[dimId]}%</span>
                        </div>
                        <Slider
                          value={[scores[dimId]]}
                          onValueChange={([value]) => updateScore(dimId, value)}
                          max={100}
                          min={0}
                          step={5}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Needs significant improvement</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => (currentDimension > 0 ? setCurrentDimension((prev) => prev - 1) : setStep(1))}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {currentDimension > 0 ? "Previous" : "Back"}
                </Button>
                <Button
                  onClick={() =>
                    currentDimension < dimensions.length - 1 ? setCurrentDimension((prev) => prev + 1) : setStep(3)
                  }
                  className="gap-2"
                >
                  {currentDimension < dimensions.length - 1 ? "Next Dimension" : "View Results"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-6 print-content" id="teamsync-report">
            {/* Print Header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">TeamSync™ Team Dynamics Report</h1>
              <p className="text-sm text-muted-foreground">
                Generated by Gaurab Labs • {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Team Info */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{teamName}</h2>
                    <p className="text-muted-foreground">{members.length} team members</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {members.map((m) => (
                      <span key={m.id} className="px-3 py-1 rounded-full bg-secondary text-xs">
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Team Alignment Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="84"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        className="text-secondary"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="84"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${teamMetrics.overallScore * 5.28} 528`}
                        className={teamMetrics.overallLevel.color}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">{teamMetrics.overallScore}</span>
                      <span className="text-sm text-muted-foreground">Alignment</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className={`text-2xl font-bold ${teamMetrics.overallLevel.color}`}>
                      {teamMetrics.overallLevel.label} Team Alignment
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {teamMetrics.overallScore >= 75
                        ? "Your team demonstrates strong dynamics across key dimensions. Focus on maintaining and building on these strengths."
                        : teamMetrics.overallScore >= 50
                          ? "Your team has solid foundations but there's room for improvement in some areas."
                          : "Your team would benefit from focused attention on improving dynamics and alignment."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dimension Radar */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Dimension Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dimensions.map((dim) => {
                    const Icon = dim.icon
                    const score = scores[dim.id as keyof DimensionScore]
                    const level = getScoreLevel(score)

                    return (
                      <div key={dim.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${dim.color}`} />
                            <span className="font-medium text-sm">{dim.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${level.color}`}>{level.label}</span>
                            <span className="text-sm font-medium w-10 text-right">{score}%</span>
                          </div>
                        </div>
                        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              score >= 75 ? "bg-green-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Friction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    Team Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamMetrics.strengths.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No dimensions scored above 70%. Focus on improving overall team dynamics.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {teamMetrics.strengths.map((dim) => {
                        const Icon = dim.icon
                        return (
                          <div key={dim.id} className="p-3 rounded-lg bg-green-500/5 flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${dim.color}`} />
                            <span className="font-medium text-sm">{dim.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="h-5 w-5" />
                    Friction Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamMetrics.frictionPoints.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No major friction points detected. All dimensions are at moderate levels or above.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {teamMetrics.frictionPoints.map((dim) => {
                        const Icon = dim.icon
                        return (
                          <div key={dim.id} className="p-3 rounded-lg bg-red-500/5 flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${dim.color}`} />
                            <span className="font-medium text-sm">{dim.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Improvement Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Recommended Improvement Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamMetrics.frictionPoints.length > 0 ? (
                    teamMetrics.frictionPoints.map((dim) => {
                      const dimId = dim.id as keyof DimensionScore
                      const actions = improvementActions[dimId]
                      const Icon = dim.icon

                      return (
                        <div key={dim.id} className="p-4 rounded-xl bg-secondary/30">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon className={`h-4 w-4 ${dim.color}`} />
                            <h4 className="font-medium text-sm">{dim.label}</h4>
                          </div>
                          <ul className="space-y-2">
                            {actions.slice(0, 3).map((action, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground col-span-2 text-center py-4">
                      Your team is performing well across all dimensions. Consider advanced team development activities
                      to reach excellence.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <Button onClick={handlePrint} className="gap-2">
                <FileText className="h-4 w-4" />
                Generate Team Dynamics Report
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start New Assessment
              </Button>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t text-xs text-muted-foreground">
              <p>Generated by TeamSync™ from Gaurab Labs. For team development and alignment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
