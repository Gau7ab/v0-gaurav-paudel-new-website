"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader, LogOut, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      setUser(session.user)
      setLoading(false)
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/login")
      } else {
        setUser(session.user)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to Gaurab Labs</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 glass-card bg-transparent">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Profile Card */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                <p className="text-lg font-medium text-foreground">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Account Status</label>
                <p className="text-lg font-medium text-green-600">Active ✓</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access to Tools */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Continue Your Journey</CardTitle>
            <CardDescription>Access strategic intelligence tools and assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/tools/insightswot">
                <Button
                  variant="outline"
                  className="w-full justify-between glass-card bg-transparent hover:bg-secondary/50"
                >
                  <span>Strategy Tools</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/personaiq">
                <Button
                  variant="outline"
                  className="w-full justify-between glass-card bg-transparent hover:bg-secondary/50"
                >
                  <span>Assessments</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-between glass-card bg-transparent hover:bg-secondary/50"
                >
                  <span>All Tools</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="w-full justify-between glass-card bg-transparent hover:bg-secondary/50"
                >
                  <span>About</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
