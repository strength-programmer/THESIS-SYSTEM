import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/employees/[id] - Get a single employee
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(params.id) }
    })
    
    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Failed to fetch employee:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    )
  }
}

// PUT /api/employees/[id] - Update an employee
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const employee = await prisma.employee.update({
      where: { id: parseInt(params.id) },
      data: {
        employeeId: data.employeeId,
        fullName: data.fullName,
        photoUrl: data.photoUrl,
        role: data.role,
        hireDate: new Date(data.hireDate),
        email: data.email,
        phone: data.phone,
        department: data.department,
        status: data.status
      }
    })
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Failed to update employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
}

// DELETE /api/employees/[id] - Delete an employee
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('Failed to delete employee:', error)
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    )
  }
} 