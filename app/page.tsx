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
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee Performance</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/employee-insights">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Active Employees</div>
                  <div className="text-2xl font-bold text-green-600">7/10</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Avg Service Speed</div>
                  <div className="text-2xl font-bold text-blue-600">2.8m</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Team Productivity</div>
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Alerts />
    </div>
  )
}

