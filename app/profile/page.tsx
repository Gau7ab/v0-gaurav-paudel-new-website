"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

const allTools = [
  { name: "InsightSWOT™", key: "insightswot", category: "Strategy" },
  { name: "ModelCanvas™", key: "modelcanvas", category: "Strategy" },
  { name: "MarketForce™", key: "marketforce", category: "Strategy" },
  { name: "GrowthMap™", key: "growthmap", category: "Strategy" },
  { name: "RiskLens™", key: "risklens", category: "Strategy" },
  { name: "ValueProp™", key: "valueprop", category: "Strategy" },
  { name: "BreakPoint™", key: "breakpoint", category: "Strategy" },
  { name: "FunnelFlow™", key: "funnelflow", category: "Strategy" },
  { name: "PersonaIQ™", key: "personaiq", category: "Career" },
  { name: "TypeScope™", key: "typescope", category: "Career" },
  { name: "CareerFit™", key: "careerfit", category: "Career" },
  { name: "LeadStyle™", key: "leadstyle", category: "Career" },
  { name: "StressCheck™", key: "stresscheck", category: "Career" },
  { name: "FounderIQ™", key: "founderiq", category: "Career" },
  { name: "TeamSync™", key: "teamsync", category: "Career" },
]

export default function ProfilePage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [toolUsage, setToolUsage] = useState<any[]>([])
  const [usedTools, setUsedTools] = useState<Set<string>>(new Set())

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login")
          return
        }

        setSession(session)

        // Fetch tool usage history
        const { data: usage, error } = await supabase
          .from("tool_usage")
          .select("*")
          .eq("user_id", session.user.id)
          .order("accessed_at", { ascending: false })

        if (!error && usage) {
          setToolUsage(usage)
          const used = new Set(usage.map((u: any) => u.tool_key))
          setUsedTools(used)
        }
      } catch (err) {
        console.error("[v0] Error checking auth:", err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const strategyTools = allTools.filter((t) => t.category === "Strategy")
  const careerTools = allTools.filter((t) => t.category === "Career")

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-print">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Profile Header */}
        <div className="glass-card-strong rounded-2xl p-8 mb-8 border border-border/50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
              <p className="text-muted-foreground">Account: {session.user?.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date(session.user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* All Available Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Tools</h2>

          {/* Strategy Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-primary">Strategy Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategyTools.map((tool) => {
                const lastUsed = toolUsage.find((u) => u.tool_key === tool.key)?.accessed_at
                return (
                  <Link key={tool.key} href={`/tools/${tool.key}`}>
                    <Card className="glass-card hover:border-primary/50 cursor-pointer transition-all duration-300 h-full p-4 flex flex-col">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{tool.name}</h4>
                        {usedTools.has(tool.key) && (
                          <div className="flex items-center gap-1 text-xs text-emerald-600 mb-3">
                            <div className="h-1.5 w-1.5 bg-emerald-600 rounded-full" />
                            Used
                          </div>
                        )}
                      </div>
                      {lastUsed && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last used: {new Date(lastUsed).toLocaleDateString()}
                        </p>
                      )}
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Career Tools */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 text-primary">Career Intelligence Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {careerTools.map((tool) => {
                const lastUsed = toolUsage.find((u) => u.tool_key === tool.key)?.accessed_at
                return (
                  <Link key={tool.key} href={`/tools/${tool.key}`}>
                    <Card className="glass-card hover:border-primary/50 cursor-pointer transition-all duration-300 h-full p-4 flex flex-col">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{tool.name}</h4>
                        {usedTools.has(tool.key) && (
                          <div className="flex items-center gap-1 text-xs text-emerald-600 mb-3">
                            <div className="h-1.5 w-1.5 bg-emerald-600 rounded-full" />
                            Used
                          </div>
                        )}
                      </div>
                      {lastUsed && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last used: {new Date(lastUsed).toLocaleDateString()}
                        </p>
                      )}
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Usage History */}
        {toolUsage.length > 0 && (
          <div className="glass-card-strong rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {toolUsage.slice(0, 20).map((usage: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{usage.tool_name}</p>
                      <p className="text-xs text-muted-foreground">{usage.tool_key}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(usage.accessed_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {toolUsage.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tool usage history yet</p>
            <p className="text-sm text-muted-foreground">Start using tools to see your activity here</p>
          </div>
        )}
      </div>
    </main>
  )
}
