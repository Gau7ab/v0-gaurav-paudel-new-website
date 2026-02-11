"use client"

import { useEffect, useState } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return undefined
}

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = getCookie("admin_session")
    if (session === "authenticated") {
      setIsAuth(true)
    } else {
      window.location.href = "/admin/login"
    }
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuth) return null

  return <AdminDashboard />
}
