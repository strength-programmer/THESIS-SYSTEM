import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DailySummary() {
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
              <TableCell>289</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Peak Hour</TableCell>
              <TableCell>10:00 AM - 11:00 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Avg. Customer Stay</TableCell>
              <TableCell>24 minutes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Employee Productivity</TableCell>
              <TableCell>92%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

