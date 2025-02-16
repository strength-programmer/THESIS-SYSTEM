"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "High Customer Flow",
      description: "Unusually high customer flow detected in the past 30 minutes.",
    },
    {
      id: 2,
      title: "Long Interaction Time",
      description: "Employee-customer interaction time exceeding 5 minutes at register 2.",
    },
  ])

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.id}>
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
          <Button className="absolute top-2 right-2" variant="ghost" size="icon" onClick={() => removeAlert(alert.id)}>
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      ))}
    </div>
  )
}

