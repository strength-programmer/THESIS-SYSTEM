"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Dashboard } from "@/components/dashboard"
import { ROIVisualization } from "@/components/roi-visualization"
import { DailySummary } from "@/components/daily-summary"
import { LiveFeed } from "@/components/live-feed"
import { Alerts } from "@/components/alerts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutGrid } from "lucide-react"
import { EmployeeInsightsCard } from "@/components/employee-insights-card"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav onLogout={handleLogout} />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="w-full">
          <Dashboard />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ROIVisualization />
          <DailySummary />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <LiveFeed />
          <EmployeeInsightsCard />
        </div>
      </main>
      <Alerts />
    </div>
  )
}

