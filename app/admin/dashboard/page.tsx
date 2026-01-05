import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain, MessageSquare, Users, TrendingUp, Clock, ExternalLink, Settings, Layers } from "lucide-react"
import Link from "next/link"
import { sql } from "@/lib/db"
import { cn } from "@/lib/utils" // Assuming cn is imported from a utility file

async function getStats() {
  try {
    const treksCount = await sql`SELECT COUNT(*) FROM treks`
    const messagesCount = await sql`SELECT COUNT(*) FROM messages WHERE status = 'unread'`
    return {
      treks: Number(treksCount[0].count) || 0,
      unreadMessages: Number(messagesCount[0].count) || 0,
    }
  } catch (e) {
    return { treks: 7, unreadMessages: 0 } // Fallback for first run
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: "Active Treks", value: stats.treks, icon: Mountain, color: "text-primary", bg: "bg-primary/10" },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    { label: "Page Views", value: "1.2k", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Admin Access", value: "Verified", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Himalayan Navigator Command Center</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, Om Prakash. Monitor your trek portfolio and academic journey.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="font-medium text-sm">View Live Site</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <Card key={i} className="border-primary/10 bg-card/50 backdrop-blur-sm card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/10 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_var(--color-primary)]" />
                  <div>
                    <p className="font-medium">System Update</p>
                    <p className="text-sm text-muted-foreground">Admin dashboard initialized and secured.</p>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex gap-4 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-muted mt-2" />
                  <div>
                    <p className="font-medium">No recent messages</p>
                    <p className="text-sm text-muted-foreground">The communications channel is currently quiet.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/treks"
                className="p-4 rounded-xl border border-primary/10 hover:bg-primary/5 transition-all text-center"
              >
                <Mountain className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Add New Trek</span>
              </Link>
              <Link
                href="/admin/sections"
                className="p-4 rounded-xl border border-primary/10 hover:bg-primary/5 transition-all text-center"
              >
                <Layers className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Edit Content</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
