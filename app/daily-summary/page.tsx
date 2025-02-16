"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import mockDB from "@/lib/mockDatabase"

export default function DailySummaryPage() {
  const [summary, setSummary] = useState({
    totalCoffees: 0,
    peakHour: "",
    avgCustomerStay: "",
    employeeProductivity: ""
  })

  useEffect(() => {
    // Fetch data from the backend or mock database
    const data = mockDB.getDailySummary()
    setSummary(data)
  }, [])

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A summary of today's activities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Coffees Served</TableCell>
              <TableCell>{summary.totalCoffees}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Peak Hour</TableCell>
              <TableCell>{summary.peakHour}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Avg. Customer Stay</TableCell>
              <TableCell>{summary.avgCustomerStay}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Employee Productivity</TableCell>
              <TableCell>{summary.employeeProductivity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}