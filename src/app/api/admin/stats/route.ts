import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Fetch admin statistics
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingDealers,
      lowStockTyres,
      recentReviews
    ] = await Promise.all([
      // Total users
      db.user.count(),
      
      // Total orders
      db.order.count(),
      
      // Total revenue
      db.order.aggregate({
        _sum: { totalAmount: true }
      }),
      
      // Pending dealers
      db.dealer.count({
        where: { isVerified: false }
      }),
      
      // Low stock tyres (less than 10)
      db.tyre.count({
        where: { stock: { lt: 10 } }
      }),
      
      // Recent reviews (last 7 days)
      db.review.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    const stats = {
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingDealers,
      lowStockTyres,
      recentReviews
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    )
  }
}