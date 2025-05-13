"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import mockDB from "@/lib/mockDatabase"

export default function SettingsPage() {
  const router = useRouter()
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [productivityAlerts, setProductivityAlerts] = useState(true)
  const [autoReports, setAutoReports] = useState(true)
  const [privacyMode, setPrivacyMode] = useState(false)
  const [dataRetention, setDataRetention] = useState(30)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/login")
      return
    }

    const user = mockDB.getUser(userEmail)
    if (user) {
      setEmailNotifications(user.settings?.emailNotifications ?? false)
      setPushNotifications(user.settings?.pushNotifications ?? false)
      setDarkMode(user.settings?.darkMode ?? false)
      setProductivityAlerts(user.settings?.productivityAlerts ?? true)
      setAutoReports(user.settings?.autoReports ?? true)
      setPrivacyMode(user.settings?.privacyMode ?? false)
      setDataRetention(user.settings?.dataRetention ?? 30)
    }
  }, [router])

  const handleSave = () => {
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail) {
      const updatedUser = mockDB.updateUser(userEmail, {
        settings: { 
          emailNotifications, 
          pushNotifications, 
          darkMode,
          productivityAlerts,
          autoReports,
          privacyMode,
          dataRetention
        },
      })
      if (updatedUser) {
        console.log("Settings updated:", updatedUser.settings)
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your monitoring preferences and application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive email updates about employee activity and reports
                </span>
              </Label>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get instant alerts about important events on your devices
                </span>
              </Label>
              <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Monitoring Preferences</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="productivity-alerts" className="flex flex-col space-y-1">
                <span>Productivity Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive alerts when productivity metrics fall below threshold
                </span>
              </Label>
              <Switch id="productivity-alerts" checked={productivityAlerts} onCheckedChange={setProductivityAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-reports" className="flex flex-col space-y-1">
                <span>Automated Reports</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Generate and send daily/weekly performance reports automatically
                </span>
              </Label>
              <Switch id="auto-reports" checked={autoReports} onCheckedChange={setAutoReports} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-mode" className="flex flex-col space-y-1">
                <span>Privacy Mode</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Anonymize personal data in reports and dashboards
                </span>
              </Label>
              <Switch id="privacy-mode" checked={privacyMode} onCheckedChange={setPrivacyMode} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal text-sm text-muted-foreground">Use dark theme for better visibility</span>
              </Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-retention" className="flex flex-col space-y-1">
                <span>Data Retention (days)</span>
                <span className="font-normal text-sm text-muted-foreground">
                  How long to keep detailed monitoring data
                </span>
              </Label>
              <select
                id="data-retention"
                value={dataRetention}
                onChange={(e) => setDataRetention(Number(e.target.value))}
                className="w-24 rounded-md border border-input bg-background px-3 py-1"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

