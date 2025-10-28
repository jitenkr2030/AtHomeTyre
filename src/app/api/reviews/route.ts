import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/reviews - Fetch reviews for a tyre
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tyreId = searchParams.get('tyreId')
    const sortBy = searchParams.get('sortBy') || 'newest'

    if (!tyreId) {
      return NextResponse.json({ error: 'Tyre ID is required' }, { status: 400 })
    }

    let orderBy: any = { createdAt: 'desc' }
    
    if (sortBy === 'highest') {
      orderBy = { rating: 'desc' }
    } else if (sortBy === 'lowest') {
      orderBy = { rating: 'asc' }
    }

    const reviews = await db.review.findMany({
      where: { tyreId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const {
      tyreId,
      rating,
      title,
      comment,
      durability,
      grip,
      mileage
    } = await request.json()

    if (!tyreId || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if user has purchased this tyre (in a real app, this would check orders)
    // For demo purposes, we'll allow any authenticated user to review

    // Check if user already reviewed this tyre
    // Note: In a real app, you'd get the user ID from authentication
    const userId = 'demo-user-id' // This should come from the session

    const existingReview = await db.review.findUnique({
      where: {
        userId_tyreId: {
          userId,
          tyreId
        }
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this tyre' },
        { status: 400 }
      )
    }

    // Create review
    const review = await db.review.create({
      data: {
        userId,
        tyreId,
        rating,
        title,
        comment,
        durability,
        grip,
        mileage,
        isVerified: false // Would be true if user purchased the tyre
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Review created successfully',
      review
    })

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}