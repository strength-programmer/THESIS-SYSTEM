import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ROIVisualization() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Region of Interest Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted"></div>
      </CardContent>
    </Card>
  )
}

