"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Mountain, MessageSquare, LogOut, ChevronRight, Menu, X, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Website Content", icon: Layers },
  { href: "/admin/treks", label: "Manage Treks", icon: Mountain },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-primary/20 bg-card">
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-full md:w-64 bg-card border-r border-primary/20 flex-col z-50",
          isSidebarOpen ? "flex fixed inset-0 top-[65px] md:top-0" : "hidden md:flex",
        )}
      >
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-primary/10">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Mountain className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">Himalayan CMS</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
                  <span className="font-medium">{link.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary/10 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto animate-fadeIn">{children}</div>
      </main>
    </div>
  )
}
