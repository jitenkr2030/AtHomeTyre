import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { PaymentStatus, PaymentMethod } from '@prisma/client'
import { getPaymentGatewayByKey, formatPaymentAmount, generateOrderId } from '@/lib/payment'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { paymentRequest, paymentMethod, paymentDetails } = body

    // Validate payment request
    if (!paymentRequest || !paymentMethod) {
      return NextResponse.json({ error: 'Invalid payment request' }, { status: 400 })
    }

    // Get the order
    const order = await db.order.findUnique({
      where: { id: paymentRequest.orderId },
      include: {
        orderItems: {
          include: {
            tyre: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Check if order belongs to user
    if (order.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Check if order is already paid
    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json({ error: 'Order already paid' }, { status: 400 })
    }

    // Process payment based on method
    switch (paymentMethod) {
      case 'cod':
        return await processCashOnDelivery(order, paymentRequest)
      case 'credit_card':
      case 'debit_card':
        return await processCardPayment(order, paymentRequest, paymentDetails)
      case 'upi':
        return await processUpiPayment(order, paymentRequest, paymentDetails)
      case 'wallet':
        return await processWalletPayment(order, paymentRequest, paymentDetails)
      default:
        return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function processCashOnDelivery(order: any, paymentRequest: any) {
  try {
    // Create payment record
    const payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod: PaymentMethod.COD,
        status: PaymentStatus.PENDING,
        paymentDate: null
      }
    })

    // Update order status
    await db.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.PENDING,
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Cash on delivery order confirmed',
      payment: {
        id: payment.id,
        transactionId: `COD-${generateOrderId()}`,
        status: 'PENDING'
      }
    })
  } catch (error) {
    console.error('Error processing COD payment:', error)
    return NextResponse.json({ error: 'Failed to process COD payment' }, { status: 500 })
  }
}

async function processCardPayment(order: any, paymentRequest: any, paymentDetails: any) {
  try {
    // For demo purposes, we'll simulate card payment
    // In production, integrate with actual payment gateway like Razorpay, Stripe, etc.
    
    // Simulate payment processing
    const transactionId = `CARD-${generateOrderId()}`
    
    // Create payment record
    const payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod: paymentRequest.paymentMethod === 'credit_card' ? PaymentMethod.CREDIT_CARD : PaymentMethod.DEBIT_CARD,
        status: PaymentStatus.PAID,
        transactionId: transactionId,
        paymentDate: new Date(),
        gatewayResponse: {
          cardType: paymentRequest.paymentMethod === 'credit_card' ? 'CREDIT' : 'DEBIT',
          last4Digits: paymentDetails.number?.slice(-4) || '0000',
          cardHolderName: paymentDetails.name || 'Card Holder'
        }
      }
    })

    // Update order status
    await db.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Card payment successful',
      payment: {
        id: payment.id,
        transactionId: transactionId,
        status: 'PAID'
      }
    })
  } catch (error) {
    console.error('Error processing card payment:', error)
    return NextResponse.json({ error: 'Failed to process card payment' }, { status: 500 })
  }
}

async function processUpiPayment(order: any, paymentRequest: any, paymentDetails: any) {
  try {
    // Simulate UPI payment processing
    const transactionId = `UPI-${generateOrderId()}`
    
    // Create payment record
    const payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod: PaymentMethod.UPI,
        status: PaymentStatus.PAID,
        transactionId: transactionId,
        paymentDate: new Date(),
        gatewayResponse: {
          upiId: paymentDetails.id,
          provider: paymentDetails.provider || 'Unknown'
        }
      }
    })

    // Update order status
    await db.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'UPI payment successful',
      payment: {
        id: payment.id,
        transactionId: transactionId,
        status: 'PAID'
      }
    })
  } catch (error) {
    console.error('Error processing UPI payment:', error)
    return NextResponse.json({ error: 'Failed to process UPI payment' }, { status: 500 })
  }
}

async function processWalletPayment(order: any, paymentRequest: any, paymentDetails: any) {
  try {
    // Simulate wallet payment processing
    const transactionId = `WALLET-${generateOrderId()}`
    
    // Create payment record
    const payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod: PaymentMethod.WALLET,
        status: PaymentStatus.PAID,
        transactionId: transactionId,
        paymentDate: new Date(),
        gatewayResponse: {
          provider: paymentDetails.provider || 'Unknown',
          mobileNumber: paymentDetails.number || '0000000000'
        }
      }
    })

    // Update order status
    await db.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Wallet payment successful',
      payment: {
        id: payment.id,
        transactionId: transactionId,
        status: 'PAID'
      }
    })
  } catch (error) {
    console.error('Error processing wallet payment:', error)
    return NextResponse.json({ error: 'Failed to process wallet payment' }, { status: 500 })
  }
}