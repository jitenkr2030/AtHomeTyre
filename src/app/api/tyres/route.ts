import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true
    }

    if (category) {
      where.category = category
    }

    if (brand) {
      where.brand = {
        name: {
          contains: brand,
          mode: 'insensitive'
        }
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          brand: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    // Get tyres with pagination
    const [tyres, total] = await Promise.all([
      db.tyre.findMany({
        where,
        include: {
          brand: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      }),
      db.tyre.count({ where })
    ])

    // Calculate average rating for each tyre
    const tyresWithRating = tyres.map(tyre => {
      const ratings = tyre.reviews.map(r => r.rating)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0
      const reviewCount = ratings.length

      return {
        ...tyre,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount
      }
    })

    return NextResponse.json({
      tyres: tyresWithRating,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching tyres:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tyres' },
      { status: 500 }
    )
  }
}