import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/employees - Get all employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(employees)
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}

// POST /api/employees - Create a new employee
export async function POST(request: Request) {
  console.log('POST /api/employees called')
  
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    // Validate required fields
    if (!data.employeeId || !data.fullName || !data.role || !data.email || !data.hireDate) {
      console.log('Missing required fields:', {
        employeeId: !data.employeeId,
        fullName: !data.fullName,
        role: !data.role,
        email: !data.email,
        hireDate: !data.hireDate
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    try {
      console.log('Attempting to create employee in database...')
      
      // Format the data
      const employeeData = {
        employeeId: data.employeeId,
        fullName: data.fullName,
        role: data.role,
        hireDate: new Date(data.hireDate),
        email: data.email,
        phone: data.phone || null,
        department: data.department || null,
        status: data.status || 'Active'
      }
      
      console.log('Formatted employee data:', employeeData)

      const employee = await prisma.employee.create({
        data: employeeData
      })
      
      console.log('Employee created successfully:', employee)
      return NextResponse.json(employee, { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Handle specific Prisma errors
      if (dbError && typeof dbError === 'object' && 'code' in dbError) {
        if ((dbError as { code: string }).code === 'P2002') {
          return NextResponse.json(
            { error: 'An employee with this email or ID already exists' },
            { 
              status: 400,
              headers: {
                'Content-Type': 'application/json',
              }
            }
          )
        }
      }
      
      return NextResponse.json(
        { error: 'Database error: ' + (dbError as Error).message },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }
  } catch (error) {
    console.error('Failed to create employee:', error)
    return NextResponse.json(
      { error: 'Failed to create employee: ' + (error as Error).message },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
} 