import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get recent orders with items count
    const recentOrders = await db.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          select: { quantity: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    const formattedOrders = recentOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt.toISOString(),
      items: order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error('Error fetching customer recent orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}