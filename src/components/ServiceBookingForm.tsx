'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Car,
  Wrench,
  Shield,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react'

interface ServiceBookingFormProps {
  onBookingSubmitted?: () => void
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  variant?: string
  licensePlate?: string
}

export default function ServiceBookingForm({ onBookingSubmitted }: ServiceBookingFormProps) {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [serviceType, setServiceType] = useState<string>('')
  const [vehicleDetails, setVehicleDetails] = useState({
    make: '',
    model: '',
    year: '',
    variant: '',
    licensePlate: ''
  })
  const [location, setLocation] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  })
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const serviceTypes = [
    { value: 'INSTALLATION', label: 'Tyre Installation', icon: <Wrench className="h-4 w-4" />, description: 'Professional tyre fitting and balancing' },
    { value: 'WHEEL_ALIGNMENT', label: 'Wheel Alignment', icon: <Shield className="h-4 w-4" />, description: 'Precise wheel alignment for better handling' },
    { value: 'WHEEL_BALANCING', label: 'Wheel Balancing', icon: <Car className="h-4 w-4" />, description: 'Eliminate vibrations and ensure smooth ride' },
    { value: 'NITROGEN_FILL', label: 'Nitrogen Fill', icon: <Plus className="h-4 w-4" />, description: 'Nitrogen inflation for better tyre life' },
    { value: 'PUNCTURE_REPAIR', label: 'Puncture Repair', icon: <CheckCircle className="h-4 w-4" />, description: 'Quick and reliable puncture fixing' },
    { value: 'EMERGENCY_ASSISTANCE', label: 'Emergency Assistance', icon: <AlertCircle className="h-4 w-4" />, description: '24/7 roadside emergency support' }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!session) {
      setError('Please sign in to book a service')
      return
    }

    if (!selectedDate || !selectedTime || !serviceType) {
      setError('Please select date, time, and service type')
      return
    }

    if (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.year) {
      setError('Please provide complete vehicle details')
      return
    }

    if (!location.address || !location.city || !location.pincode) {
      setError('Please provide complete location details')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/service-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          serviceType,
          bookingDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1])).toISOString(),
          vehicleDetails: {
            make: vehicleDetails.make,
            model: vehicleDetails.model,
            year: parseInt(vehicleDetails.year),
            variant: vehicleDetails.variant || null,
            licensePlate: vehicleDetails.licensePlate || null
          },
          location: {
            address: location.address,
            city: location.city,
            state: location.state,
            pincode: location.pincode,
            landmark: location.landmark || null
          },
          notes: notes.trim() || null
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Service booking confirmed! We will contact you shortly.')
        // Reset form
        setSelectedDate(undefined)
        setSelectedTime('')
        setServiceType('')
        setVehicleDetails({
          make: '',
          model: '',
          year: '',
          variant: '',
          licensePlate: ''
        })
        setLocation({
          address: '',
          city: '',
          state: '',
          pincode: '',
          landmark: ''
        })
        setNotes('')
        
        if (onBookingSubmitted) {
          onBookingSubmitted()
        }
      } else {
        setError(data.error || 'Failed to book service')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sign In to Book Service</h3>
          <p className="text-gray-600 mb-4">
            Please sign in to book a tyre service appointment
          </p>
          <Button onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin'
            }
          }}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-yellow-600" />
          Book a Service Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Service Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Service Type *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceTypes.map((service) => (
                <div
                  key={service.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    serviceType === service.value
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setServiceType(service.value)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{service.label}</h4>
                      <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Select Date *</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Select Time *</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-sm"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Vehicle Details *</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make" className="text-sm">Make *</Label>
                <Input
                  id="make"
                  value={vehicleDetails.make}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="e.g., Toyota"
                  required
                />
              </div>
              <div>
                <Label htmlFor="model" className="text-sm">Model *</Label>
                <Input
                  id="model"
                  value={vehicleDetails.model}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g., Camry"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-sm">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={vehicleDetails.year}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g., 2020"
                  min="1990"
                  max="2024"
                  required
                />
              </div>
              <div>
                <Label htmlFor="variant" className="text-sm">Variant</Label>
                <Input
                  id="variant"
                  value={vehicleDetails.variant}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, variant: e.target.value }))}
                  placeholder="e.g., GLI"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="licensePlate" className="text-sm">License Plate</Label>
                <Input
                  id="licensePlate"
                  value={vehicleDetails.licensePlate}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, licensePlate: e.target.value }))}
                  placeholder="e.g., MH01AB1234"
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Service Location *</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-sm">Address *</Label>
                <Textarea
                  id="address"
                  value={location.address}
                  onChange={(e) => setLocation(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your complete address"
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-sm">City *</Label>
                <Input
                  id="city"
                  value={location.city}
                  onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g., Mumbai"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm">State</Label>
                <Input
                  id="state"
                  value={location.state}
                  onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g., Maharashtra"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-sm">Pincode *</Label>
                <Input
                  id="pincode"
                  value={location.pincode}
                  onChange={(e) => setLocation(prev => ({ ...prev, pincode: e.target.value }))}
                  placeholder="e.g., 400001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="landmark" className="text-sm">Landmark</Label>
                <Input
                  id="landmark"
                  value={location.landmark}
                  onChange={(e) => setLocation(prev => ({ ...prev, landmark: e.target.value }))}
                  placeholder="e.g., Near City Mall"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base font-medium">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements or additional information..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {notes.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking Service...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Book Service Appointment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}