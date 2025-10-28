import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Helper function to get user ID from request
async function getUserId(request: NextRequest): Promise<string | null> {
  const userId = request.headers.get('x-user-id')
  return userId
}

// GET /api/wishlist - Get user's wishlist items
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        wishlists: {
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
    const wishlistItemsWithRating = user.wishlists.map(item => {
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

    return NextResponse.json({
      wishlistItems: wishlistItemsWithRating
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { tyreId } = await request.json()

    if (!tyreId) {
      return NextResponse.json({ error: 'Tyre ID is required' }, { status: 400 })
    }

    // Check if tyre exists
    const tyre = await db.tyre.findUnique({
      where: { id: tyreId }
    })

    if (!tyre) {
      return NextResponse.json({ error: 'Tyre not found' }, { status: 404 })
    }

    // Get user
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await db.wishlistItem.findUnique({
      where: {
        userId_tyreId: {
          userId: user.id,
          tyreId: tyreId
        }
      }
    })

    if (existingWishlistItem) {
      return NextResponse.json({ error: 'Item already in wishlist' }, { status: 400 })
    }

    // Create new wishlist item
    const wishlistItem = await db.wishlistItem.create({
      data: {
        userId: user.id,
        tyreId: tyreId
      },
      include: {
        tyre: {
          include: {
            brand: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Item added to wishlist successfully',
      wishlistItem
    })
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 })
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { wishlistItemId } = await request.json()

    if (!wishlistItemId) {
      return NextResponse.json({ error: 'Wishlist item ID is required' }, { status: 400 })
    }

    // Get wishlist item with user info
    const wishlistItem = await db.wishlistItem.findUnique({
      where: { id: wishlistItemId },
      include: {
        user: true
      }
    })

    if (!wishlistItem) {
      return NextResponse.json({ error: 'Wishlist item not found' }, { status: 404 })
    }

    // Check if user owns this wishlist item
    if (wishlistItem.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete wishlist item
    await db.wishlistItem.delete({
      where: { id: wishlistItemId }
    })

    return NextResponse.json({
      message: 'Item removed from wishlist successfully'
    })
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 })
  }
}