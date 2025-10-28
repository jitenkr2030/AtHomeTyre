import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/products - Get all products for admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

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

    // Get products with pagination
    const [products, total] = await Promise.all([
      db.tyre.findMany({
        where,
        include: {
          brand: true,
          reviews: {
            select: {
              rating: true
            }
          },
          orderItems: {
            select: {
              quantity: true
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

    // Calculate average rating and total sold for each product
    const productsWithStats = products.map(product => {
      const ratings = product.reviews.map(r => r.rating)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0
      const reviewCount = ratings.length
      
      const totalSold = product.orderItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount,
        totalSold
      }
    })

    return NextResponse.json({
      products: productsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      brandId,
      category,
      width,
      aspectRatio,
      rimDiameter,
      price,
      b2bPrice,
      stock,
      fuelEfficiency,
      wetGrip,
      noiseLevel,
      warranty,
      speedRating,
      loadIndex,
      images,
      features,
      season
    } = body

    // Validate required fields
    if (!name || !brandId || !category || !width || !aspectRatio || !rimDiameter || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if brand exists
    const brand = await db.brand.findUnique({
      where: { id: brandId }
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Create product
    const product = await db.tyre.create({
      data: {
        name,
        description: description || null,
        brandId,
        category,
        width: parseFloat(width),
        aspectRatio: parseFloat(aspectRatio),
        rimDiameter: parseFloat(rimDiameter),
        price: parseFloat(price),
        b2bPrice: b2bPrice ? parseFloat(b2bPrice) : null,
        stock: parseInt(stock) || 0,
        fuelEfficiency: fuelEfficiency ? parseInt(fuelEfficiency) : null,
        wetGrip: wetGrip ? parseInt(wetGrip) : null,
        noiseLevel: noiseLevel ? parseInt(noiseLevel) : null,
        warranty: warranty ? parseInt(warranty) : null,
        speedRating: speedRating || null,
        loadIndex: loadIndex ? parseInt(loadIndex) : null,
        images: images ? JSON.stringify(images) : null,
        features: features ? JSON.stringify(features) : null,
        season: season || null
      },
      include: {
        brand: true
      }
    })

    return NextResponse.json({
      message: 'Product created successfully',
      product
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}