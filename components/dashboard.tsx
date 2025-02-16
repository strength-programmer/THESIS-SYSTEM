"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { name: "9AM", customers: 40, employees: 4 },
  { name: "10AM", customers: 30, employees: 5 },
  { name: "11AM", customers: 20, employees: 6 },
  { name: "12PM", customers: 27, employees: 7 },
  { name: "1PM", customers: 18, employees: 6 },
  { name: "2PM", customers: 23, employees: 5 },
  { name: "3PM", customers: 34, employees: 4 },
]

export function Dashboard() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Customer Flow</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              customers: {
                label: "Customers",
                color: "hsl(var(--chart-1))",
              },
              employees: {
                label: "Employees",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke="var(--color-customers)"
                  fill="var(--color-customers)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="employees"
                  stroke="var(--color-employees)"
                  fill="var(--color-employees)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <p className="text-xs text-muted-foreground">+20.1% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchasing Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+15.2% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24m</div>
            <p className="text-xs text-muted-foreground">-2 minutes from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+4% from last hour</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

