import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Helper function to get user ID from request
async function getUserId(request: NextRequest): Promise<string | null> {
  // For now, get user ID from header (in real app, this would be from authentication)
  const userId = request.headers.get('x-user-id')
  return userId
}

// GET /api/cart - Get user's cart items
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        cartItems: {
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
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate average rating for each tyre
    const cartItemsWithRating = user.cartItems.map(item => {
      const ratings = item.tyre.reviews.map(r => r.rating)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0
      const reviewCount = ratings.length

      return {
        ...item,
        tyre: {
          ...item.tyre,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount
        }
      }
    })

    // Calculate totals
    const subtotal = cartItemsWithRating.reduce((sum, item) => sum + (item.tyre.price * item.quantity), 0)
    const totalItems = cartItemsWithRating.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      cartItems: cartItemsWithRating,
      summary: {
        subtotal,
        totalItems,
        itemCount: cartItemsWithRating.length
      }
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { tyreId, quantity = 1 } = await request.json()

    if (!tyreId) {
      return NextResponse.json({ error: 'Tyre ID is required' }, { status: 400 })
    }

    // Check if tyre exists and is in stock
    const tyre = await db.tyre.findUnique({
      where: { id: tyreId }
    })

    if (!tyre) {
      return NextResponse.json({ error: 'Tyre not found' }, { status: 404 })
    }

    if (tyre.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
    }

    // Get user
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if item already exists in cart
    const existingCartItem = await db.cartItem.findUnique({
      where: {
        userId_tyreId: {
          userId: user.id,
          tyreId: tyreId
        }
      }
    })

    let cartItem
    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity
      if (newQuantity > tyre.stock) {
        return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
      }

      cartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: {
          tyre: {
            include: {
              brand: true
            }
          }
        }
      })
    } else {
      // Create new cart item
      cartItem = await db.cartItem.create({
        data: {
          userId: user.id,
          tyreId: tyreId,
          quantity
        },
        include: {
          tyre: {
            include: {
              brand: true
            }
          }
        }
      })
    }

    return NextResponse.json({
      message: 'Item added to cart successfully',
      cartItem
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { cartItemId, quantity } = await request.json()

    if (!cartItemId || !quantity) {
      return NextResponse.json({ error: 'Cart item ID and quantity are required' }, { status: 400 })
    }

    // Get cart item with user and tyre info
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        user: true,
        tyre: true
      }
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
    }

    // Check if user owns this cart item
    if (cartItem.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check stock
    if (cartItem.tyre.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
    }

    // Update cart item
    const updatedCartItem = await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: {
        tyre: {
          include: {
            brand: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Cart updated successfully',
      cartItem: updatedCartItem
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { cartItemId } = await request.json()

    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 })
    }

    // Get cart item with user info
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        user: true
      }
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
    }

    // Check if user owns this cart item
    if (cartItem.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete cart item
    await db.cartItem.delete({
      where: { id: cartItemId }
    })

    return NextResponse.json({
      message: 'Item removed from cart successfully'
    })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 })
  }
}