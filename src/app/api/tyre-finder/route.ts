import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const make = searchParams.get('make')
    const model = searchParams.get('model')
    const year = searchParams.get('year')
    const category = searchParams.get('category')

    // If make, model, and year are provided, find compatible tyres
    if (make && model && year) {
      const compatibleVehicles = await db.compatibleVehicle.findMany({
        where: {
          make: {
            contains: make
          },
          model: {
            contains: model
          },
          year: parseInt(year)
        },
        include: {
          tyre: {
            include: {
              brand: true,
              reviews: {
                select: {
                  rating: true
                }
              }
            }
          }
        }
      })

      // Calculate average rating for each tyre
      const tyresWithRating = compatibleVehicles.map(cv => {
        const ratings = cv.tyre.reviews.map(r => r.rating)
        const avgRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
          : 0
        const reviewCount = ratings.length

        return {
          ...cv.tyre,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount
        }
      })

      return NextResponse.json({
        tyres: tyresWithRating,
        vehicle: { make, model, year }
      })
    }

    // If only category is provided, get tyres by category
    if (category) {
      const tyres = await db.tyre.findMany({
        where: {
          category: category as any,
          isActive: true
        },
        include: {
          brand: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        take: 10 // Limit for preview
      })

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
        category
      })
    }

    // Get unique makes for the dropdown
    const makes = await db.compatibleVehicle.findMany({
      select: {
        make: true
      },
      distinct: ['make'],
      orderBy: {
        make: 'asc'
      }
    })

    return NextResponse.json({
      makes: makes.map(m => m.make)
    })
  } catch (error) {
    console.error('Error in tyre finder:', error)
    return NextResponse.json(
      { error: 'Failed to process tyre finder request' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { make, model, year } = await request.json()

    if (!make || !model || !year) {
      return NextResponse.json(
        { error: 'Make, model, and year are required' },
        { status: 400 }
      )
    }

    // Find compatible tyres for the specific vehicle
    const compatibleVehicles = await db.compatibleVehicle.findMany({
      where: {
        make: {
          contains: make
        },
        model: {
          contains: model
        },
        year: parseInt(year)
      },
      include: {
        tyre: {
          include: {
            brand: true,
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    })

    if (compatibleVehicles.length === 0) {
      return NextResponse.json({
        message: 'No compatible tyres found for this vehicle',
        recommendations: []
      })
    }

    // Calculate average rating and get recommendations
    const recommendations = compatibleVehicles.map(cv => {
      const ratings = cv.tyre.reviews.map(r => r.rating)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0
      const reviewCount = ratings.length

      return {
        tyre: {
          ...cv.tyre,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount
        },
        compatibility: {
          make: cv.make,
          model: cv.model,
          year: cv.year,
          variant: cv.variant
        }
      }
    })

    // Sort by rating and price
    recommendations.sort((a, b) => {
      // First by rating (higher is better)
      if (a.tyre.avgRating !== b.tyre.avgRating) {
        return b.tyre.avgRating - a.tyre.avgRating
      }
      // Then by price (lower is better)
      return a.tyre.price - b.tyre.price
    })

    return NextResponse.json({
      vehicle: { make, model, year },
      recommendations,
      count: recommendations.length
    })
  } catch (error) {
    console.error('Error finding compatible tyres:', error)
    return NextResponse.json(
      { error: 'Failed to find compatible tyres' },
      { status: 500 }
    )
  }
}