"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Users, Lightbulb, Target, Zap, Shield, ArrowRight, User } from "lucide-react"
import { InsightCard } from "@/components/ui/insight-card"
import { exportToPDF } from "@/lib/pdf-export"

interface TeamMember {
  id: string
  name: string
  role: string
  personalityType: string
  strengths: string[]
}

const personalityTypes = [
  {
    value: "driver",
    label: "Driver",
    description: "Results-oriented, decisive, direct",
    color: "bg-red-500",
    icon: Target,
  },
  {
    value: "expressive",
    label: "Expressive",
    description: "Enthusiastic, creative, social",
    color: "bg-amber-500",
    icon: Lightbulb,
  },
  {
    value: "amiable",
    label: "Amiable",
    description: "Supportive, patient, diplomatic",
    color: "bg-emerald-500",
    icon: Users,
  },
  {
    value: "analytical",
    label: "Analytical",
    description: "Systematic, logical, detail-oriented",
    color: "bg-blue-500",
    icon: Zap,
  },
]

const roleStrengths: Record<string, string[]> = {
  driver: ["Leadership", "Decision-making", "Goal-setting", "Taking initiative"],
  expressive: ["Communication", "Creativity", "Motivation", "Brainstorming"],
  amiable: ["Collaboration", "Conflict resolution", "Team support", "Listening"],
  analytical: ["Problem-solving", "Planning", "Quality control", "Research"],
}

const compatibilityMatrix: Record<string, Record<string, { score: number; dynamic: string }>> = {
  driver: {
    driver: { score: 60, dynamic: "Competitive but productive if goals align" },
    expressive: { score: 85, dynamic: "High energy, driver provides direction" },
    amiable: { score: 75, dynamic: "Amiable supports driver's initiatives" },
    analytical: { score: 70, dynamic: "Analytical provides data, driver decides" },
  },
  expressive: {
    driver: { score: 85, dynamic: "High energy collaboration" },
    expressive: { score: 65, dynamic: "Creative but may lack follow-through" },
    amiable: { score: 90, dynamic: "Excellent harmony and creativity" },
    analytical: { score: 60, dynamic: "May clash on pace and detail" },
  },
  amiable: {
    driver: { score: 75, dynamic: "Amiable smooths driver's edges" },
    expressive: { score: 90, dynamic: "Supportive and harmonious" },
    amiable: { score: 70, dynamic: "Very harmonious but may avoid conflict" },
    analytical: { score: 80, dynamic: "Balanced and methodical" },
  },
  analytical: {
    driver: { score: 70, dynamic: "Analytical informs, driver acts" },
    expressive: { score: 60, dynamic: "Different paces and approaches" },
    amiable: { score: 80, dynamic: "Thoughtful and supportive pairing" },
    analytical: { score: 75, dynamic: "Thorough but may over-analyze" },
  },
}

export default function TeamMapperPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState({ name: "", role: "", personalityType: "" })
  const [showResults, setShowResults] = useState(false)

  const addMember = () => {
    if (newMember.name && newMember.role && newMember.personalityType) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        role: newMember.role,
        personalityType: newMember.personalityType,
        strengths: roleStrengths[newMember.personalityType] || [],
      }
      setTeamMembers((prev) => [...prev, member])
      setNewMember({ name: "", role: "", personalityType: "" })
    }
  }

  const removeMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const calculateTeamDynamics = () => {
    const typeCounts = {
      driver: teamMembers.filter((m) => m.personalityType === "driver").length,
      expressive: teamMembers.filter((m) => m.personalityType === "expressive").length,
      amiable: teamMembers.filter((m) => m.personalityType === "amiable").length,
      analytical: teamMembers.filter((m) => m.personalityType === "analytical").length,
    }

    // Calculate compatibility scores
    let totalCompatibility = 0
    let pairCount = 0
    const pairAnalysis: { pair: string; score: number; dynamic: string }[] = []

    for (let i = 0; i < teamMembers.length; i++) {
      for (let j = i + 1; j < teamMembers.length; j++) {
        const type1 = teamMembers[i].personalityType
        const type2 = teamMembers[j].personalityType
        const compat = compatibilityMatrix[type1][type2]
        totalCompatibility += compat.score
        pairCount++
        pairAnalysis.push({
          pair: `${teamMembers[i].name} & ${teamMembers[j].name}`,
          score: compat.score,
          dynamic: compat.dynamic,
        })
      }
    }

    const avgCompatibility = pairCount > 0 ? Math.round(totalCompatibility / pairCount) : 0

    // Determine team balance
    const hasLeadership = typeCounts.driver > 0
    const hasCreativity = typeCounts.expressive > 0
    const hasHarmony = typeCounts.amiable > 0
    const hasAnalysis = typeCounts.analytical > 0
    const balanceScore = [hasLeadership, hasCreativity, hasHarmony, hasAnalysis].filter(Boolean).length * 25

    // Identify gaps
    const gaps: string[] = []
    if (!hasLeadership) gaps.push("Leadership/Direction (Driver)")
    if (!hasCreativity) gaps.push("Creativity/Innovation (Expressive)")
    if (!hasHarmony) gaps.push("Team Cohesion (Amiable)")
    if (!hasAnalysis) gaps.push("Analysis/Planning (Analytical)")

    return { typeCounts, avgCompatibility, balanceScore, gaps, pairAnalysis }
  }

  const handleExport = () => {
    exportToPDF("team-mapper-results", {
      filename: "Team_Personality_Map",
      title: "Team Personality Map",
    })
  }

  const handleReset = () => {
    setTeamMembers([])
    setShowResults(false)
  }

  if (showResults && teamMembers.length >= 2) {
    const { typeCounts, avgCompatibility, balanceScore, gaps, pairAnalysis } = calculateTeamDynamics()

    return (
      <ToolLayout
        title="Team Personality Mapper"
        description="Your team dynamics and compatibility analysis"
        showExport
        showReset
        onExport={handleExport}
        onReset={handleReset}
        category="career"
      >
        <div id="team-mapper-results" className="space-y-6">
          {/* Team Overview */}
          <Card className="glass-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
              <CardTitle className="text-foreground">Team Overview</CardTitle>
              <CardDescription>{teamMembers.length} members analyzed</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {personalityTypes.map((type) => {
                  const count = typeCounts[type.value as keyof typeof typeCounts]
                  const Icon = type.icon
                  return (
                    <div key={type.value} className="text-center glass-card rounded-xl p-4">
                      <div
                        className={`w-10 h-10 rounded-full ${type.color} mx-auto mb-2 flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-xs text-muted-foreground">{type.label}s</p>
                    </div>
                  )
                })}
              </div>

              {/* Team Members List */}
              <div className="space-y-2">
                {teamMembers.map((member) => {
                  const type = personalityTypes.find((t) => t.value === member.personalityType)
                  return (
                    <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <div className={`w-8 h-8 rounded-full ${type?.color} flex items-center justify-center`}>
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.role} - {type?.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Compatibility & Balance Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Team Compatibility</p>
                <p className="text-4xl font-bold text-primary">{avgCompatibility}%</p>
                <p className="text-xs text-muted-foreground mt-1">Average pair compatibility</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Team Balance</p>
                <p className="text-4xl font-bold text-accent">{balanceScore}%</p>
                <p className="text-xs text-muted-foreground mt-1">Personality type coverage</p>
              </CardContent>
            </Card>
          </div>

          {/* Pair Analysis */}
          {pairAnalysis.length > 0 && (
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Pair Dynamics</CardTitle>
                <CardDescription>How each pair works together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pairAnalysis
                  .sort((a, b) => b.score - a.score)
                  .map((pair, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-secondary/30"
                    >
                      <div>
                        <p className="font-medium text-foreground">{pair.pair}</p>
                        <p className="text-xs text-muted-foreground">{pair.dynamic}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pair.score >= 80 ? "bg-emerald-500" : pair.score >= 60 ? "bg-blue-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${pair.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-foreground w-12">{pair.score}%</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}

          {/* Gaps & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gaps.length > 0 ? (
              <InsightCard type="warning" title="Team Gaps">
                Your team may be missing:
                <ul className="mt-2 space-y-1">
                  {gaps.map((gap) => (
                    <li key={gap} className="text-foreground">
                      {gap}
                    </li>
                  ))}
                </ul>
              </InsightCard>
            ) : (
              <InsightCard type="success" title="Balanced Team">
                Your team has representation across all four personality types, providing a well-rounded mix of
                leadership, creativity, harmony, and analysis.
              </InsightCard>
            )}
            <InsightCard type="insight" title="Team Development Tips">
              {avgCompatibility >= 75
                ? "High compatibility! Focus on challenging the team to avoid groupthink and encourage constructive debate."
                : avgCompatibility >= 50
                  ? "Moderate compatibility. Establish clear communication norms and role expectations to minimize friction."
                  : "Lower compatibility requires active management. Consider team-building activities and conflict resolution training."}
            </InsightCard>
          </div>

          {/* Role Recommendations */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Role Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member) => {
                  const type = personalityTypes.find((t) => t.value === member.personalityType)
                  const strengths = roleStrengths[member.personalityType]
                  return (
                    <div key={member.id} className="p-4 rounded-xl bg-secondary/30">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{type?.label} - Best suited for:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {strengths.map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout
      title="Team Personality Mapper"
      description="Map your team's personality types to optimize collaboration and role allocation"
      category="career"
    >
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Add Team Members</CardTitle>
          <CardDescription>Add at least 2 team members to analyze dynamics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Member Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., John Doe"
                value={newMember.name}
                onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                className="glass-card bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="e.g., Product Manager"
                value={newMember.role}
                onChange={(e) => setNewMember((prev) => ({ ...prev, role: e.target.value }))}
                className="glass-card bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personality">Personality Type</Label>
              <Select
                value={newMember.personalityType}
                onValueChange={(value) => setNewMember((prev) => ({ ...prev, personalityType: value }))}
              >
                <SelectTrigger className="glass-card bg-transparent">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="glass-card-strong">
                  {personalityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={addMember}
            disabled={!newMember.name || !newMember.role || !newMember.personalityType}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>

          {/* Personality Type Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border/50">
            {personalityTypes.map((type) => {
              const Icon = type.icon
              return (
                <div key={type.value} className="p-3 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-full ${type.color} flex items-center justify-center`}>
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium text-sm text-foreground">{type.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              )
            })}
          </div>

          {/* Team Members List */}
          {teamMembers.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <h4 className="font-medium text-foreground">Team Members ({teamMembers.length})</h4>
              <div className="space-y-2">
                {teamMembers.map((member) => {
                  const type = personalityTypes.find((t) => t.value === member.personalityType)
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 animate-scale-in"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${type?.color} flex items-center justify-center`}>
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role} - {type?.label}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {teamMembers.length >= 2 && (
        <div className="flex justify-end">
          <Button onClick={() => setShowResults(true)} className="gap-2 shadow-lg">
            Analyze Team Dynamics
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {teamMembers.length < 2 && teamMembers.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Add at least one more team member to analyze dynamics
        </p>
      )}
    </ToolLayout>
  )
}
