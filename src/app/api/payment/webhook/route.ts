import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PaymentStatus } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, payload } = body

    // Handle different webhook events
    switch (event) {
      case 'payment.success':
        return await handlePaymentSuccess(payload)
      case 'payment.failed':
        return await handlePaymentFailed(payload)
      case 'payment.cancelled':
        return await handlePaymentCancelled(payload)
      default:
        console.log('Unhandled webhook event:', event)
        return NextResponse.json({ message: 'Event received' }, { status: 200 })
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handlePaymentSuccess(payload: any) {
  try {
    const { orderId, transactionId, amount, gatewayResponse } = payload

    // Find the order
    const order = await db.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      console.error('Order not found for webhook:', orderId)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update or create payment record
    const payment = await db.payment.upsert({
      where: { 
        id: `payment_${orderId}_${transactionId}` 
      },
      update: {
        status: PaymentStatus.PAID,
        paymentDate: new Date(),
        gatewayResponse: gatewayResponse
      },
      create: {
        id: `payment_${orderId}_${transactionId}`,
        orderId: orderId,
        amount: amount,
        paymentMethod: payload.paymentMethod || 'UNKNOWN',
        status: PaymentStatus.PAID,
        transactionId: transactionId,
        paymentDate: new Date(),
        gatewayResponse: gatewayResponse
      }
    })

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: 'CONFIRMED'
      }
    })

    console.log('Payment success processed for order:', orderId)
    return NextResponse.json({ success: true, paymentId: payment.id })
  } catch (error) {
    console.error('Error handling payment success:', error)
    return NextResponse.json({ error: 'Failed to process payment success' }, { status: 500 })
  }
}

async function handlePaymentFailed(payload: any) {
  try {
    const { orderId, transactionId, errorMessage, gatewayResponse } = payload

    // Find the order
    const order = await db.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      console.error('Order not found for webhook:', orderId)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update or create payment record
    const payment = await db.payment.upsert({
      where: { 
        id: `payment_${orderId}_${transactionId}` 
      },
      update: {
        status: PaymentStatus.FAILED,
        gatewayResponse: {
          ...gatewayResponse,
          error: errorMessage
        }
      },
      create: {
        id: `payment_${orderId}_${transactionId}`,
        orderId: orderId,
        amount: order.totalAmount,
        paymentMethod: payload.paymentMethod || 'UNKNOWN',
        status: PaymentStatus.FAILED,
        transactionId: transactionId,
        gatewayResponse: {
          ...gatewayResponse,
          error: errorMessage
        }
      }
    })

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: 'CANCELLED'
      }
    })

    console.log('Payment failure processed for order:', orderId)
    return NextResponse.json({ success: true, paymentId: payment.id })
  } catch (error) {
    console.error('Error handling payment failure:', error)
    return NextResponse.json({ error: 'Failed to process payment failure' }, { status: 500 })
  }
}

async function handlePaymentCancelled(payload: any) {
  try {
    const { orderId, transactionId, gatewayResponse } = payload

    // Find the order
    const order = await db.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      console.error('Order not found for webhook:', orderId)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update or create payment record
    const payment = await db.payment.upsert({
      where: { 
        id: `payment_${orderId}_${transactionId}` 
      },
      update: {
        status: PaymentStatus.FAILED,
        gatewayResponse: gatewayResponse
      },
      create: {
        id: `payment_${orderId}_${transactionId}`,
        orderId: orderId,
        amount: order.totalAmount,
        paymentMethod: payload.paymentMethod || 'UNKNOWN',
        status: PaymentStatus.FAILED,
        transactionId: transactionId,
        gatewayResponse: gatewayResponse
      }
    })

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: 'CANCELLED'
      }
    })

    console.log('Payment cancellation processed for order:', orderId)
    return NextResponse.json({ success: true, paymentId: payment.id })
  } catch (error) {
    console.error('Error handling payment cancellation:', error)
    return NextResponse.json({ error: 'Failed to process payment cancellation' }, { status: 500 })
  }
}