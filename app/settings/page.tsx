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

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/login")
      return
    }

    const user = mockDB.getUser(userEmail)
    if (user) {
      setEmailNotifications(user.settings.emailNotifications)
      setPushNotifications(user.settings.pushNotifications)
      setDarkMode(user.settings.darkMode)
    }
  }, [router])

  const handleSave = () => {
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail) {
      const updatedUser = mockDB.updateUser(userEmail, {
        settings: { emailNotifications, pushNotifications, darkMode },
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
          <CardDescription>Manage your account and application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive email updates about your account
              </span>
            </Label>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive push notifications on your devices
              </span>
            </Label>
            <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal text-sm text-muted-foreground">Use dark theme for the application</span>
            </Label>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
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

