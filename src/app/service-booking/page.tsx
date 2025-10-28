'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import ServiceBookingForm from '@/components/ServiceBookingForm'
import ServiceBookingList from '@/components/ServiceBookingList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wrench,
  Calendar,
  Clock,
  MapPin,
  Car,
  Shield,
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react'

export default function ServiceBookingPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('book')
  const [bookingUpdated, setBookingUpdated] = useState(false)

  const handleBookingSubmitted = () => {
    setBookingUpdated(true)
    setActiveTab('my-bookings')
    setTimeout(() => setBookingUpdated(false), 2000)
  }

  const handleBookingUpdated = () => {
    setBookingUpdated(true)
    setTimeout(() => setBookingUpdated(false), 2000)
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to book tyre services and manage your appointments
            </p>
            <Button onClick={() => window.location.href = '/auth/signin'} className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Tyre Service Booking
          </h1>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Book professional tyre services at your convenience. Installation, alignment, balancing, and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Book Service
            </TabsTrigger>
            <TabsTrigger value="my-bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <ServiceBookingForm onBookingSubmitted={handleBookingSubmitted} />
              </div>

              {/* Service Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Why Choose Our Services?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Expert Technicians</h4>
                        <p className="text-sm text-gray-600">Certified professionals with years of experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Quality Assurance</h4>
                        <p className="text-sm text-gray-600">All services backed by warranty</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Flexible Timing</h4>
                        <p className="text-sm text-gray-600">Book appointments at your convenience</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-yellow-600" />
                      Available Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'Tyre Installation', desc: 'Professional fitting', badge: 'Popular' },
                      { name: 'Wheel Alignment', desc: 'Precise adjustment', badge: 'Essential' },
                      { name: 'Wheel Balancing', desc: 'Smooth ride guarantee', badge: 'Recommended' },
                      { name: 'Nitrogen Fill', desc: 'Better tyre life', badge: 'Premium' },
                      { name: 'Puncture Repair', desc: 'Quick fix service', badge: 'Emergency' },
                      { name: 'Emergency Assistance', desc: '24/7 support', badge: 'Urgent' }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{service.name}</h4>
                          <p className="text-xs text-gray-600">{service.desc}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {service.badge}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-bookings" className="space-y-6">
            <ServiceBookingList onBookingUpdated={handleBookingUpdated} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Process Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your tyres serviced in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: <Calendar className="h-8 w-8 text-yellow-600" />,
                title: 'Book Online',
                description: 'Select service type and preferred time slot'
              },
              {
                step: 2,
                icon: <MapPin className="h-8 w-8 text-blue-600" />,
                title: 'Provide Details',
                description: 'Share vehicle and location information'
              },
              {
                step: 3,
                icon: <Wrench className="h-8 w-8 text-green-600" />,
                title: 'Service Execution',
                description: 'Our experts perform the service at your location'
              },
              {
                step: 4,
                icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
                title: 'Completion',
                description: 'Service completed with quality assurance'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}