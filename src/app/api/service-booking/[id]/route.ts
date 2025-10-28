import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ServiceStatus } from '@prisma/client'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params
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

    // Get the booking
    const booking = await db.serviceBooking.findUnique({
      where: { id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user owns the booking
    if (booking.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Check if booking can be cancelled (only pending bookings)
    if (booking.status !== ServiceStatus.PENDING) {
      return NextResponse.json({ 
        error: 'Cannot cancel booking. Booking is already in progress or completed.' 
      }, { status: 400 })
    }

    // Update booking status to cancelled
    const updatedBooking = await db.serviceBooking.update({
      where: { id },
      data: { status: ServiceStatus.CANCELLED }
    })

    return NextResponse.json({ 
      message: 'Service booking cancelled successfully',
      booking: updatedBooking 
    })
  } catch (error) {
    console.error('Error cancelling service booking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}