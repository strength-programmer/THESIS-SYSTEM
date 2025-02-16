"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"
import Link from "next/link"

export function EmployeeInsightsCard() {
  return (
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
            <div className="text-2xl font-bold text-purple-600">88%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 