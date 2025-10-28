import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendOrderConfirmationEmail } from '@/lib/email'

// Helper function to get user ID from request
async function getUserId(request: NextRequest): Promise<string | null> {
  const userId = request.headers.get('x-user-id')
  return userId
}

// POST /api/checkout - Create order from cart
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const {
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes
    } = await request.json()

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Shipping address and payment method are required' }, { status: 400 })
    }

    // Get user with cart items
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        cartItems: {
          include: {
            tyre: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Check stock availability
    for (const cartItem of user.cartItems) {
      if (cartItem.tyre.stock < cartItem.quantity) {
        return NextResponse.json({ 
          error: `Insufficient stock for ${cartItem.tyre.name}` 
        }, { status: 400 })
      }
    }

    // Calculate totals
    const subtotal = user.cartItems.reduce((sum, item) => sum + (item.tyre.price * item.quantity), 0)
    const shippingAmount = subtotal >= 5000 ? 0 : 500 // Free shipping above ₹5000
    const totalAmount = subtotal + shippingAmount

    // Generate order number
    const orderNumber = 'JN' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 3).toUpperCase()

    // Create order
    const order = await db.order.create({
      data: {
        userId: user.id,
        orderNumber,
        totalAmount,
        discountAmount: 0,
        shippingAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        notes
      }
    })

    // Create order items and update stock
    const orderItems: any[] = []
    for (const cartItem of user.cartItems) {
      const orderItem = await db.orderItem.create({
        data: {
          orderId: order.id,
          tyreId: cartItem.tyreId,
          quantity: cartItem.quantity,
          unitPrice: cartItem.tyre.price,
          totalPrice: cartItem.tyre.price * cartItem.quantity
        }
      })
      orderItems.push(orderItem)

      // Update tyre stock
      await db.tyre.update({
        where: { id: cartItem.tyreId },
        data: {
          stock: {
            decrement: cartItem.quantity
          }
        }
      })
    }

    // Clear cart
    await db.cartItem.deleteMany({
      where: { userId: user.id }
    })

    // Send order confirmation email (async, don't wait for it)
    sendOrderConfirmationEmail(order.id).catch(error => {
      console.error('Failed to send order confirmation email:', error)
    })

    return NextResponse.json({
      message: 'Order created successfully',
      order: {
        ...order,
        orderItems
      }
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}