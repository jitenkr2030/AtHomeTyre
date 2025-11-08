import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/brands - Get all brands for admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const brands = await db.brand.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            tyres: true
          }
        }
      }
    })

    return NextResponse.json({ brands })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}

// POST /api/admin/brands - Create new brand
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, logo } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      )
    }

    // Check if brand already exists
    const existingBrand = await db.brand.findUnique({
      where: { name }
    })

    if (existingBrand) {
      return NextResponse.json(
        { error: 'Brand already exists' },
        { status: 400 }
      )
    }

    const brand = await db.brand.create({
      data: {
        name,
        description: description || null,
        logo: logo || null
      }
    })

    return NextResponse.json({
      message: 'Brand created successfully',
      brand
    })
  } catch (error) {
    console.error('Error creating brand:', error)
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    )
  }
}