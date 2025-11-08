import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const pendingDealers = await db.dealer.findMany({
      where: { isVerified: false },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        user: {
          createdAt: 'desc'
        }
      }
    })

    return NextResponse.json({ dealers: pendingDealers })
  } catch (error) {
    console.error('Error fetching pending dealers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending dealers' },
      { status: 500 }
    )
  }
}