'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar,
  Clock,
  MapPin,
  Car,
  Wrench,
  Shield,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Eye
} from 'lucide-react'

interface ServiceBooking {
  id: string
  serviceType: string
  bookingDate: string
  status: string
  vehicleDetails: {
    make: string
    model: string
    year: number
    variant?: string
    licensePlate?: string
  }
  location: {
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  notes?: string
  estimatedCost?: number
  actualCost?: number
  createdAt: string
  updatedAt: string
}

interface ServiceBookingListProps {
  userId?: string
  onBookingUpdated?: () => void
}

export default function ServiceBookingList({ userId, onBookingUpdated }: ServiceBookingListProps) {
  const [bookings, setBookings] = useState<ServiceBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string[]>([])

  useEffect(() => {
    fetchBookings()
  }, [userId])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/service-booking')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      }
    } catch (error) {
      console.error('Error fetching service bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId: string) => {
    setCancelling(prev => [...prev, bookingId])
    try {
      const response = await fetch(`/api/service-booking/${bookingId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBookings(prev => prev.filter(booking => booking.id !== bookingId))
        if (onBookingUpdated) {
          onBookingUpdated()
        }
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
    } finally {
      setCancelling(prev => prev.filter(id => id !== bookingId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: 'secondary' as const, label: 'Pending', icon: <Clock className="h-3 w-3" /> },
      CONFIRMED: { variant: 'default' as const, label: 'Confirmed', icon: <CheckCircle className="h-3 w-3" /> },
      IN_PROGRESS: { variant: 'default' as const, label: 'In Progress', icon: <Wrench className="h-3 w-3" /> },
      COMPLETED: { variant: 'default' as const, label: 'Completed', icon: <Shield className="h-3 w-3" /> },
      CANCELLED: { variant: 'destructive' as const, label: 'Cancelled', icon: <X className="h-3 w-3" /> }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const getServiceLabel = (serviceType: string) => {
    const labels: Record<string, string> = {
      INSTALLATION: 'Tyre Installation',
      WHEEL_ALIGNMENT: 'Wheel Alignment',
      WHEEL_BALANCING: 'Wheel Balancing',
      NITROGEN_FILL: 'Nitrogen Fill',
      PUNCTURE_REPAIR: 'Puncture Repair',
      EMERGENCY_ASSISTANCE: 'Emergency Assistance'
    }
    return labels[serviceType] || serviceType
  }

  const getServiceIcon = (serviceType: string) => {
    const icons: Record<string, React.ReactNode> = {
      INSTALLATION: <Wrench className="h-4 w-4" />,
      WHEEL_ALIGNMENT: <Shield className="h-4 w-4" />,
      WHEEL_BALANCING: <Car className="h-4 w-4" />,
      NITROGEN_FILL: <RefreshCw className="h-4 w-4" />,
      PUNCTURE_REPAIR: <CheckCircle className="h-4 w-4" />,
      EMERGENCY_ASSISTANCE: <AlertCircle className="h-4 w-4" />
    }
    return icons[serviceType] || <Wrench className="h-4 w-4" />
  }

  if (loading && bookings.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Service Bookings</h3>
          <p className="text-gray-600 mb-4">
            You haven't booked any services yet. Book your first service appointment!
          </p>
          <Button onClick={() => window.location.href = '/service-booking'}>
            Book Service
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Service Bookings</h3>
          <p className="text-gray-600">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(booking.serviceType)}
                      <span className="font-medium">
                        {getServiceLabel(booking.serviceType)}
                      </span>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  {booking.status === 'PENDING' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => cancelBooking(booking.id)}
                      disabled={cancelling.includes(booking.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(booking.bookingDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(booking.bookingDate)}</span>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Vehicle</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Car className="h-4 w-4" />
                    <span>
                      {booking.vehicleDetails.year} {booking.vehicleDetails.make} {booking.vehicleDetails.model}
                      {booking.vehicleDetails.variant && ` ${booking.vehicleDetails.variant}`}
                      {booking.vehicleDetails.licensePlate && ` • ${booking.vehicleDetails.licensePlate}`}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Service Location</h4>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {booking.location.address}, {booking.location.city}
                      {booking.location.state && `, ${booking.location.state}`}
                      {booking.location.pincode && ` - ${booking.location.pincode}`}
                      {booking.location.landmark && ` (Near: ${booking.location.landmark})`}
                    </span>
                  </div>
                </div>

                {/* Cost Information */}
                {(booking.estimatedCost || booking.actualCost) && (
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    {booking.estimatedCost && (
                      <div>
                        <span className="text-sm text-gray-600">Estimated Cost:</span>
                        <div className="font-medium">₹{booking.estimatedCost}</div>
                      </div>
                    )}
                    {booking.actualCost && (
                      <div>
                        <span className="text-sm text-gray-600">Actual Cost:</span>
                        <div className="font-medium">₹{booking.actualCost}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {booking.notes && (
                  <div className="pt-3 border-t">
                    <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                    <p className="text-sm text-gray-600">{booking.notes}</p>
                  </div>
                )}

                {/* Booking Info */}
                <div className="flex items-center justify-between pt-3 border-t text-xs text-gray-500">
                  <span>Booked on: {formatDate(booking.createdAt)}</span>
                  {booking.updatedAt !== booking.createdAt && (
                    <span>Last updated: {formatDate(booking.updatedAt)}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}