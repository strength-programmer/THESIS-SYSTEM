"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import mockDB from "@/lib/mockDatabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UploadCloud } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [avatar, setAvatar] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/login")
      return
    }

    const user = mockDB.getUser(userEmail)
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
      setAvatar(user.avatar)
    }
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveStatus('loading')
    setErrorMessage("")

    const originalEmail = localStorage.getItem("userEmail")
    if (!originalEmail) return

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords don't match")
        setSaveStatus('error')
        return
      }
      const passwordUpdated = mockDB.updatePassword(originalEmail, currentPassword, newPassword)
      if (!passwordUpdated) {
        setErrorMessage("Current password is incorrect")
        setSaveStatus('error')
        return
      }
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }

    const updatedUser = mockDB.updateUser(originalEmail, { 
      name,
      role,
      email,
    })

    if (updatedUser) {
      localStorage.setItem("userEmail", updatedUser.email)
      setSaveStatus('success')
      console.log("Profile updated:", updatedUser)
    } else {
      setErrorMessage("Email already taken or update failed")
      setSaveStatus('error')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("File selected:", file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        console.log("Image converted to base64")
        setAvatar(base64String)
        
        const userEmail = localStorage.getItem("userEmail")
        if (userEmail) {
          const updated = mockDB.updateUser(userEmail, { avatar: base64String })
          console.log("Database updated:", updated)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>View and edit your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>
                    {name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {saveStatus === 'success' && (
              <Alert className="mt-4">
                <AlertDescription>Profile updated successfully!</AlertDescription>
              </Alert>
            )}
            {saveStatus === 'error' && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saveStatus === 'loading'}
          >
            {saveStatus === 'loading' ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

