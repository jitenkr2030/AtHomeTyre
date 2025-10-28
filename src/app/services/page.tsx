'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Wrench, 
  Car, 
  Shield, 
  Droplets, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  Star
} from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      id: 'installation',
      title: 'Tyre Installation',
      description: 'Professional tyre fitting and balancing services for all vehicle types',
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      price: '₹200-500',
      duration: '30-45 mins',
      features: ['Professional fitting', 'Wheel balancing', 'Valve replacement'],
      popular: true
    },
    {
      id: 'alignment',
      title: 'Wheel Alignment',
      description: 'Precision wheel alignment for better handling and longer tyre life',
      icon: <Car className="h-8 w-8 text-green-600" />,
      price: '₹300-800',
      duration: '45-60 mins',
      features: ['Computerized alignment', 'Front & rear adjustment', 'Test drive'],
      popular: true
    },
    {
      id: 'balancing',
      title: 'Wheel Balancing',
      description: 'Eliminate vibrations and ensure smooth ride with professional balancing',
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      price: '₹150-400',
      duration: '20-30 mins',
      features: ['Dynamic balancing', 'Vibration analysis', 'Weight optimization']
    },
    {
      id: 'nitrogen',
      title: 'Nitrogen Filling',
      description: 'Nitrogen inflation for better tyre life and improved fuel efficiency',
      icon: <Droplets className="h-8 w-8 text-cyan-600" />,
      price: '₹100-250',
      duration: '10-15 mins',
      features: ['Pure nitrogen', 'Pressure maintenance', 'Leak prevention']
    },
    {
      id: 'repair',
      title: 'Puncture Repair',
      description: 'Quick and reliable puncture fixing for all types of tyres',
      icon: <Truck className="h-8 w-8 text-orange-600" />,
      price: '₹50-150',
      duration: '15-25 mins',
      features: ['Patch repair', 'Plug repair', 'Emergency service']
    },
    {
      id: 'emergency',
      title: 'Emergency Assistance',
      description: '24/7 roadside emergency support for tyre-related issues',
      icon: <CheckCircle className="h-8 w-8 text-red-600" />,
      price: '₹500-1500',
      duration: '30-90 mins',
      features: ['24/7 availability', 'On-site service', 'Tow assistance']
    }
  ]

  const benefits = [
    { icon: <Star className="h-5 w-5" />, title: 'Expert Technicians', description: 'Certified professionals with years of experience' },
    { icon: <Shield className="h-5 w-5" />, title: 'Quality Guarantee', description: 'All services backed by our quality guarantee' },
    { icon: <Clock className="h-5 w-5" />, title: 'Quick Service', description: 'Fast and efficient service to save you time' },
    { icon: <MapPin className="h-5 w-5" />, title: 'Multiple Locations', description: 'Service centers across the city for your convenience' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Professional Tyre Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert tyre care and maintenance services to keep your vehicle running smoothly and safely
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🔧 Expert Technicians
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                ⚡ Quick Service
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🛡️ Quality Guarantee
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tyre care solutions for all your vehicle needs. From basic maintenance to emergency assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        {service.popular && (
                          <Badge variant="secondary" className="text-xs mt-1">Popular</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Price and Duration */}
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">Price:</span>
                        <span className="ml-1 text-green-600 font-semibold">{service.price}</span>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <span className="ml-1 text-blue-600">{service.duration}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full" asChild>
                      <a href="/service-booking">
                        Book Service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose Our Services?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Your Tyres Serviced?</h3>
            <p className="text-lg mb-6 text-yellow-50">
              Book an appointment today and experience the difference of professional tyre care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold" asChild>
                <a href="/service-booking">
                  Book Service Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold" asChild>
                <a href="/customer-service/contact-us">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}