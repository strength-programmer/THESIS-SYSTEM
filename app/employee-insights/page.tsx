"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, LayoutGrid, Activity, Clock, Users, Coffee } from "lucide-react"
import Link from "next/link"

interface EmployeeMetrics {
  name: string
  position: string
  status: "Active" | "Inactive" | "Break"
  serviceSpeed: number
  customerInteractions: number
  currentActivity: string
  productivityScore: number
  shiftDuration: string
}

export default function EmployeeInsightsPage() {
  const [employees, setEmployees] = useState<EmployeeMetrics[]>([
    {
      name: "John Smith",
      position: "Head Barista",
      status: "Active",
      serviceSpeed: 2.5,
      customerInteractions: 45,
      currentActivity: "Order preparation",
      productivityScore: 92,
      shiftDuration: "4h 30m"
    },
    {
      name: "Maria Garcia",
      position: "Barista",
      status: "Active",
      serviceSpeed: 3.2,
      customerInteractions: 38,
      currentActivity: "Customer service",
      productivityScore: 85,
      shiftDuration: "2h 15m"
    },
    {
      name: "Alex Chen",
      position: "Senior Barista",
      status: "Break",
      serviceSpeed: 2.8,
      customerInteractions: 52,
      currentActivity: "On break",
      productivityScore: 88,
      shiftDuration: "5h 45m"
    },
    {
      name: "Sarah Johnson",
      position: "Trainee Barista",
      status: "Active",
      serviceSpeed: 4.5,
      customerInteractions: 22,
      currentActivity: "Training session",
      productivityScore: 68,
      shiftDuration: "1h 30m"
    },
    {
      name: "James Wilson",
      position: "Shift Supervisor",
      status: "Active",
      serviceSpeed: 2.3,
      customerInteractions: 63,
      currentActivity: "Inventory check",
      productivityScore: 95,
      shiftDuration: "6h 20m"
    },
    {
      name: "Emma Thompson",
      position: "Barista",
      status: "Inactive",
      serviceSpeed: 3.0,
      customerInteractions: 0,
      currentActivity: "Shift ended",
      productivityScore: 82,
      shiftDuration: "8h 00m"
    },
    {
      name: "David Kim",
      position: "Barista",
      status: "Active",
      serviceSpeed: 2.7,
      customerInteractions: 41,
      currentActivity: "Coffee preparation",
      productivityScore: 89,
      shiftDuration: "3h 45m"
    },
    {
      name: "Lisa Martinez",
      position: "Senior Barista",
      status: "Break",
      serviceSpeed: 2.4,
      customerInteractions: 49,
      currentActivity: "Lunch break",
      productivityScore: 91,
      shiftDuration: "4h 15m"
    },
    {
      name: "Michael Brown",
      position: "Trainee Barista",
      status: "Active",
      serviceSpeed: 5.1,
      customerInteractions: 15,
      currentActivity: "Shadowing senior",
      productivityScore: 65,
      shiftDuration: "2h 00m"
    },
    {
      name: "Rachel Lee",
      position: "Barista",
      status: "Active",
      serviceSpeed: 2.9,
      customerInteractions: 37,
      currentActivity: "Register operation",
      productivityScore: 87,
      shiftDuration: "3h 30m"
    }
  ])

  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Employee Performance Insights</h1>
        <Button className="bg-blue-600">Export Analytics</Button>
      </div>

      {/* Real-time Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Service Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              <div className="text-2xl font-bold">2.8m</div>
            </div>
            <p className="text-xs text-muted-foreground">Per customer interaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">94%</div>
            </div>
            <p className="text-xs text-muted-foreground">Based on service speed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-purple-500" />
              <div className="text-2xl font-bold">8/10</div>
            </div>
            <p className="text-xs text-muted-foreground">Currently on shift</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Coffee className="mr-2 h-4 w-4 text-orange-500" />
              <div className="text-2xl font-bold">142</div>
            </div>
            <p className="text-xs text-muted-foreground">Today's total</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Employee Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Service Speed</TableHead>
                <TableHead>Customer Interactions</TableHead>
                <TableHead>Current Activity</TableHead>
                <TableHead>Productivity Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        employee.status === 'Break' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {employee.status}
                    </div>
                  </TableCell>
                  <TableCell>{employee.serviceSpeed}m/order</TableCell>
                  <TableCell>{employee.customerInteractions}</TableCell>
                  <TableCell>{employee.currentActivity}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`
                        ${employee.productivityScore >= 90 ? 'text-green-600' : 
                          employee.productivityScore >= 70 ? 'text-yellow-600' : 
                          'text-red-600'}`}>
                        {employee.productivityScore}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
      </Card>
      <CardFooter className="flex justify-start">
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </CardFooter>    
    </div>
  )
} 
