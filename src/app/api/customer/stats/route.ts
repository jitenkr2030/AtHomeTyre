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

    // Get customer stats
    const [
      totalOrders,
      orderStats,
      customerProfile
    ] = await Promise.all([
      // Total orders count
      db.order.count({
        where: { userId }
      }),
      
      // Order statistics
      db.order.aggregate({
        where: { userId },
        _sum: { totalAmount: true },
        _count: true
      }),
      
      // Customer profile with loyalty points
      db.customer.findUnique({
        where: { userId },
        select: { loyaltyPoints: true }
      })
    ])

    // Get pending orders count
    const pendingOrders = await db.order.count({
      where: { 
        userId,
        status: 'PENDING'
      }
    })

    const stats = {
      totalOrders: orderStats._count,
      totalSpent: orderStats._sum.totalAmount || 0,
      loyaltyPoints: customerProfile?.loyaltyPoints || 0,
      pendingOrders
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching customer stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}