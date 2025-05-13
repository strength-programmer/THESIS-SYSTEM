"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Employee {
  id: number
  employeeId: string
  fullName: string
  photoUrl: string | null
  role: string
  hireDate: string
  email: string
  phone: string | null
  status: string
  department: string | null
}

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    photoUrl: '',
    role: '',
    hireDate: '',
    email: '',
    phone: '',
    status: 'Active',
    department: ''
  })

  const roles = [
    'Barista',
    'Cashier',
    'Manager',
    'Server/Waitstaff'
  ]

  useEffect(() => {
    if (params.id !== 'new') {
      fetchEmployee()
    } else {
      setLoading(false)
    }
  }, [params.id])

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${params.id}`)
      const data = await response.json()
      setEmployee(data)
      setFormData({
        employeeId: data.employeeId,
        fullName: data.fullName,
        photoUrl: data.photoUrl || '',
        role: data.role,
        hireDate: new Date(data.hireDate).toISOString().split('T')[0],
        email: data.email,
        phone: data.phone || '',
        status: data.status,
        department: data.department || ''
      })
    } catch (error) {
      console.error('Failed to fetch employee:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    
    // Validate form data
    if (!formData.employeeId || !formData.fullName || !formData.role || !formData.email || !formData.hireDate) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const method = params.id === 'new' ? 'POST' : 'PUT'
      const url = params.id === 'new' ? '/api/employees' : `/api/employees/${params.id}`
      
      console.log('Sending request to:', url, 'with method:', method)
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      
      // Check if the response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        throw new Error('Server returned non-JSON response')
      }

      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        alert('Employee created successfully!')
        router.push('/employees')
      } else {
        // Show error message to user
        alert('Error: ' + (responseData.error || 'Failed to save employee'))
      }
    } catch (error) {
      console.error('Failed to save employee:', error)
      alert('Error: ' + (error instanceof Error ? error.message : 'Failed to save employee'))
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{params.id === 'new' ? 'Add New Employee' : 'Edit Employee'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => {
                    console.log('Role selected:', value)
                    setFormData({ ...formData, role: value })
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL</Label>
              <Input
                id="photoUrl"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push('/employees')}>
              Cancel
            </Button>
            <Button type="submit">
              {params.id === 'new' ? 'Create Employee' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 