import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ServiceType, ServiceStatus } from '@prisma/client'
import { sendServiceBookingConfirmationEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
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

    // Get user's service bookings
    const bookings = await db.serviceBooking.findMany({
      where: { userId: user.id },
      orderBy: { bookingDate: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching service bookings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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
    const {
      serviceType,
      bookingDate,
      vehicleDetails,
      location,
      notes
    } = body

    // Validate required fields
    if (!serviceType || !bookingDate || !vehicleDetails || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate service type
    if (!Object.values(ServiceType).includes(serviceType)) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
    }

    // Validate vehicle details
    if (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.year) {
      return NextResponse.json({ error: 'Invalid vehicle details' }, { status: 400 })
    }

    // Validate location
    if (!location.address || !location.city || !location.pincode) {
      return NextResponse.json({ error: 'Invalid location details' }, { status: 400 })
    }

    // Create service booking
    const booking = await db.serviceBooking.create({
      data: {
        userId: user.id,
        serviceType: serviceType as ServiceType,
        bookingDate: new Date(bookingDate),
        status: ServiceStatus.PENDING,
        vehicleDetails: vehicleDetails,
        location: location,
        notes: notes || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Send service booking confirmation email (async, don't wait for it)
    sendServiceBookingConfirmationEmail(booking.id).catch(error => {
      console.error('Failed to send service booking confirmation email:', error)
    })

    return NextResponse.json({ 
      message: 'Service booking created successfully',
      booking 
    })
  } catch (error) {
    console.error('Error creating service booking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}