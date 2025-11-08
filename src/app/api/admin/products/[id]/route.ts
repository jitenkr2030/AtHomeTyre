import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const product = await db.tyre.findUnique({
      where: { id },
      include: {
        brand: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        orderItems: {
          include: {
            order: {
              select: {
                id: true,
                orderNumber: true,
                createdAt: true
              }
            }
          }
        },
        compatibleVehicles: true
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Calculate stats
    const ratings = product.reviews.map(r => r.rating)
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : 0
    const reviewCount = ratings.length
    
    const totalSold = product.orderItems.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount,
      totalSold
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params
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
      season,
      isActive
    } = body

    // Check if product exists
    const existingProduct = await db.tyre.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if brand exists (if brandId is provided)
    if (brandId) {
      const brand = await db.brand.findUnique({
        where: { id: brandId }
      })

      if (!brand) {
        return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
      }
    }

    // Update product
    const product = await db.tyre.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description: description || null }),
        ...(brandId && { brandId }),
        ...(category && { category }),
        ...(width && { width: parseFloat(width) }),
        ...(aspectRatio && { aspectRatio: parseFloat(aspectRatio) }),
        ...(rimDiameter && { rimDiameter: parseFloat(rimDiameter) }),
        ...(price && { price: parseFloat(price) }),
        ...(b2bPrice !== undefined && { b2bPrice: b2bPrice ? parseFloat(b2bPrice) : null }),
        ...(stock !== undefined && { stock: parseInt(stock) || 0 }),
        ...(fuelEfficiency !== undefined && { fuelEfficiency: fuelEfficiency ? parseInt(fuelEfficiency) : null }),
        ...(wetGrip !== undefined && { wetGrip: wetGrip ? parseInt(wetGrip) : null }),
        ...(noiseLevel !== undefined && { noiseLevel: noiseLevel ? parseInt(noiseLevel) : null }),
        ...(warranty !== undefined && { warranty: warranty ? parseInt(warranty) : null }),
        ...(speedRating !== undefined && { speedRating: speedRating || null }),
        ...(loadIndex !== undefined && { loadIndex: loadIndex ? parseInt(loadIndex) : null }),
        ...(images !== undefined && { images: images ? JSON.stringify(images) : null }),
        ...(features !== undefined && { features: features ? JSON.stringify(features) : null }),
        ...(season !== undefined && { season: season || null }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        brand: true
      }
    })

    return NextResponse.json({
      message: 'Product updated successfully',
      product
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if product exists
    const existingProduct = await db.tyre.findUnique({
      where: { id },
      include: {
        orderItems: true,
        cartItems: true,
        wishlistItems: true,
        reviews: true
      }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if product has existing orders
    if (existingProduct.orderItems.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing orders' },
        { status: 400 }
      )
    }

    // Delete related records first
    await Promise.all([
      db.cartItem.deleteMany({ where: { tyreId: id } }),
      db.wishlistItem.deleteMany({ where: { tyreId: id } }),
      db.review.deleteMany({ where: { tyreId: id } }),
      db.compatibleVehicle.deleteMany({ where: { tyreId: id } })
    ])

    // Delete product
    await db.tyre.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}