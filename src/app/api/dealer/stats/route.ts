import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'DEALER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get dealer stats
    const [
      totalOrders,
      orderStats,
      pendingOrders,
      uniqueCustomers,
      dealerProfile
    ] = await Promise.all([
      // Total orders count
      db.order.count({}),
      
      // Order statistics
      db.order.aggregate({
        _sum: { totalAmount: true },
        _count: true
      }),
      
      // Pending orders count
      db.order.count({
        where: { status: 'PENDING' }
      }),
      
      // Unique customers count
      db.user.count({
        where: { role: 'CUSTOMER' }
      }),
      
      // Dealer profile for credit info
      db.dealer.findUnique({
        where: { userId: session.user.id },
        select: { creditLimit: true }
      })
    ])

    // Calculate monthly target and achieved (mock data for now)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyOrders = await db.order.count({
      where: {
        createdAt: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1)
        }
      }
    })

    const stats = {
      totalOrders: orderStats._count,
      totalRevenue: orderStats._sum.totalAmount || 0,
      pendingOrders,
      activeCustomers: uniqueCustomers,
      monthlyTarget: 50, // Mock target
      monthlyAchieved: monthlyOrders,
      creditUtilized: Math.floor(Math.random() * (dealerProfile?.creditLimit || 100000)), // Mock utilized credit
      creditLimit: dealerProfile?.creditLimit || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dealer stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}