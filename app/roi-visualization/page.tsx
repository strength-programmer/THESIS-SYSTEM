"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface ZoneMetrics {
  name: string
  status: "Active" | "Inactive"
  employeeCount: number
  customerCount: number
  avgServiceTime: string
  productivity: number
}

export default function ROIVisualizationPage() {
  const [zones, setZones] = useState<ZoneMetrics[]>([
    {
      name: "Counter Area",
      status: "Active",
      employeeCount: 3,
      customerCount: 5,
      avgServiceTime: "2.5m",
      productivity: 92
    },
    {
      name: "Coffee Station",
      status: "Active",
      employeeCount: 2,
      customerCount: 0,
      avgServiceTime: "3.1m",
      productivity: 88
    },
    {
      name: "Pickup Area",
      status: "Active",
      employeeCount: 1,
      customerCount: 3,
      avgServiceTime: "1.2m",
      productivity: 95
    }
  ])

  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Zone Analysis</h1>
        <Button className="bg-blue-600">Export Zone Data</Button>
      </div>

      {/* Floor Plan Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Coffee Shop Floor Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src="/images/floor-plan.png" // You can add a coffee shop floor plan image
              alt="Coffee Shop Floor Plan"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Overlay for zones */}
            <div className="absolute inset-0">
              <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] border-2 border-green-500 bg-green-500/20 rounded-lg">
                <span className="absolute -top-6 left-2 text-sm font-medium">Counter Area</span>
              </div>
              <div className="absolute top-[20%] right-[20%] w-[25%] h-[30%] border-2 border-blue-500 bg-blue-500/20 rounded-lg">
                <span className="absolute -top-6 left-2 text-sm font-medium">Coffee Station</span>
              </div>
              <div className="absolute bottom-[20%] left-[35%] w-[30%] h-[25%] border-2 border-purple-500 bg-purple-500/20 rounded-lg">
                <span className="absolute -top-6 left-2 text-sm font-medium">Pickup Area</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Avg. Service Time</TableHead>
                <TableHead>Productivity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${zone.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {zone.status}
                    </div>
                  </TableCell>
                  <TableCell>{zone.employeeCount}</TableCell>
                  <TableCell>{zone.customerCount}</TableCell>
                  <TableCell>{zone.avgServiceTime}</TableCell>
                  <TableCell>
                    <span className={`
                      ${zone.productivity >= 90 ? 'text-green-600' : 
                        zone.productivity >= 70 ? 'text-yellow-600' : 
                        'text-red-600'}`}>
                      {zone.productivity}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button asChild>
            <Link href="/">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

