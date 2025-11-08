import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      phone,
      role,
      companyName,
      gstNumber
    } = await request.json()

    // Validate required fields
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const userData: any = {
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      status: 'ACTIVE' // New accounts are active by default
    }

    const user = await db.user.create({
      data: userData
    })

    // Create role-specific profile
    if (role === 'CUSTOMER') {
      await db.customer.create({
        data: {
          userId: user.id
        }
      })
    } else if (role === 'DEALER') {
      await db.dealer.create({
        data: {
          userId: user.id,
          companyName: companyName || name,
          gstNumber
        }
      })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}