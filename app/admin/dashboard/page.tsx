"use client"

import { useEffect, useState } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (loggedIn === "true") {
      setIsAuth(true)
    } else {
      window.location.href = "/admin/login"
      return
    }
    setChecking(false)
  }, [])

  if (checking || !isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
