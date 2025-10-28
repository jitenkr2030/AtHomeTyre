'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Phone, Star, Clock, Wrench, Shield, Users, CheckCircle, Award, Search, Building2, Mail } from 'lucide-react'

export default function PartnerGaragesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedService, setSelectedService] = useState('all')

  const partnerGarages = [
    {
      id: 1,
      name: "Speedy Auto Care",
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      reviews: 234,
      services: ["Tyre Fitting", "Wheel Alignment", "Balancing", "Nitrogen Fill"],
      specialties: ["Luxury Cars", "Performance Vehicles"],
      hours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
      phone: "+91 98765 43210",
      distance: "2.5 km",
      featured: true
    },
    {
      id: 2,
      name: "City Garage Solutions",
      location: "Delhi, Delhi",
      rating: 4.6,
      reviews: 189,
      services: ["Tyre Fitting", "Wheel Alignment", "Balancing", "Puncture Repair"],
      specialties: ["All Vehicles", "Fleet Services"],
      hours: "Mon-Sat: 7AM-9PM, Sun: 8AM-7PM",
      phone: "+91 98765 43211",
      distance: "3.2 km",
      featured: true
    },
    {
      id: 3,
      name: "Precision Auto Works",
      location: "Bangalore, Karnataka",
      rating: 4.9,
      reviews: 312,
      services: ["Tyre Fitting", "Wheel Alignment", "Balancing", "Suspension Work"],
      specialties: ["German Cars", "European Vehicles"],
      hours: "Mon-Sat: 8AM-7PM, Sun: Closed",
      phone: "+91 98765 43212",
      distance: "1.8 km",
      featured: false
    },
    {
      id: 4,
      name: "Quick Fix Tyre Service",
      location: "Chennai, Tamil Nadu",
      rating: 4.5,
      reviews: 156,
      services: ["Tyre Fitting", "Puncture Repair", "Tyre Repair", "Mobile Service"],
      specialties: ["Quick Service", "Mobile Units"],
      hours: "24/7 Emergency Service",
      phone: "+91 98765 43213",
      distance: "4.1 km",
      featured: false
    },
    {
      id: 5,
      name: "Premium Auto Center",
      location: "Hyderabad, Telangana",
      rating: 4.7,
      reviews: 278,
      services: ["Tyre Fitting", "Wheel Alignment", "Balancing", "Custom Wheels"],
      specialties: ["Premium Vehicles", "Custom Work"],
      hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
      phone: "+91 98765 43214",
      distance: "2.9 km",
      featured: true
    },
    {
      id: 6,
      name: "Express Tyre Shop",
      location: "Pune, Maharashtra",
      rating: 4.4,
      reviews: 145,
      services: ["Tyre Fitting", "Puncture Repair", "Wheel Alignment"],
      specialties: ["Budget Friendly", "Fast Service"],
      hours: "Mon-Sat: 8AM-8PM, Sun: 9AM-5PM",
      phone: "+91 98765 43215",
      distance: "3.7 km",
      featured: false
    }
  ]

  const benefits = [
    {
      title: "Quality Assurance",
      description: "All partner garages are certified and regularly inspected",
      icon: Shield,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Competitive Pricing",
      description: "Special rates for JaganNath Tyre customers",
      icon: Award,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Expert Technicians",
      description: "Trained professionals with latest equipment",
      icon: Wrench,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Warranty Support",
      description: "Full warranty support on all services",
      icon: CheckCircle,
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const services = [
    { value: "all", label: "All Services" },
    { value: "tyre-fitting", label: "Tyre Fitting" },
    { value: "wheel-alignment", label: "Wheel Alignment" },
    { value: "balancing", label: "Wheel Balancing" },
    { value: "puncture-repair", label: "Puncture Repair" },
    { value: "nitrogen-fill", label: "Nitrogen Fill" }
  ]

  const cities = [
    { value: "all", label: "All Cities" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "pune", label: "Pune" }
  ]

  const filteredGarages = partnerGarages.filter(garage => {
    const matchesSearch = garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         garage.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = selectedCity === 'all' || 
                         garage.location.toLowerCase().includes(selectedCity)
    const matchesService = selectedService === 'all' || 
                           garage.services.some(service => 
                             service.toLowerCase().replace(' ', '-') === selectedService
                           )
    
    return matchesSearch && matchesCity && matchesService
  })

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Partner Garages</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find our certified partner garages near you for professional tyre fitting, wheel alignment, 
            and other automotive services with quality assurance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔧 Professional Service
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              ⭐ Quality Assured
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏆 Certified Partners
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              💰 Best Prices
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="find-garage" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="find-garage">Find Garage</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="become-partner">Become a Partner</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="find-garage" className="mt-8">
            <div className="space-y-8">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search garages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Garages */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Featured Partner Garages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partnerGarages.filter(garage => garage.featured).map((garage) => (
                    <Card key={garage.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary">Featured</Badge>
                          <Badge variant="outline">{garage.distance}</Badge>
                        </div>
                        <CardTitle className="text-xl">{garage.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {garage.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            {renderStars(garage.rating)}
                            <span className="text-sm text-muted-foreground">
                              {garage.reviews} reviews
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Services:</h4>
                            <div className="flex flex-wrap gap-1">
                              {garage.services.slice(0, 3).map((service, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Specialties:</h4>
                            <div className="flex flex-wrap gap-1">
                              {garage.specialties.map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{garage.hours}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>{garage.phone}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1" size="sm">
                              Book Service
                            </Button>
                            <Button variant="outline" size="sm">
                              Directions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Garages */}
              <div>
                <h2 className="text-2xl font-bold mb-6">All Partner Garages ({filteredGarages.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGarages.map((garage) => (
                    <Card key={garage.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          {garage.featured && <Badge variant="secondary">Featured</Badge>}
                          <Badge variant="outline">{garage.distance}</Badge>
                        </div>
                        <CardTitle className="text-xl">{garage.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {garage.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            {renderStars(garage.rating)}
                            <span className="text-sm text-muted-foreground">
                              {garage.reviews} reviews
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Services:</h4>
                            <div className="flex flex-wrap gap-1">
                              {garage.services.slice(0, 3).map((service, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{garage.hours}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>{garage.phone}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1" size="sm">
                              Book Service
                            </Button>
                            <Button variant="outline" size="sm">
                              Directions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Why Choose Partner Garages?</h2>
                <p className="text-lg text-muted-foreground">
                  Experience the difference with our certified partner network
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${benefit.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                        <CardDescription>{benefit.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quality Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Certified Technicians</h4>
                          <p className="text-sm text-muted-foreground">
                            All technicians are trained and certified by JaganNath Tyre
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Modern Equipment</h4>
                          <p className="text-sm text-muted-foreground">
                            State-of-the-art equipment for precise and efficient service
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Quality Parts</h4>
                          <p className="text-sm text-muted-foreground">
                            Only genuine and high-quality parts used for all services
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Regular Audits</h4>
                          <p className="text-sm text-muted-foreground">
                            Regular quality audits to maintain high standards
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Customer Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Special Pricing</h4>
                          <p className="text-sm text-muted-foreground">
                            Exclusive discounts for JaganNath Tyre customers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-purple-600" />
                        <div>
                          <h4 className="font-medium">Warranty Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Full warranty support on all products and services
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <h4 className="font-medium">Priority Service</h4>
                          <p className="text-sm text-muted-foreground">
                            Priority booking and faster service times
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Customer Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Dedicated customer support for all inquiries
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="become-partner" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Become a Partner Garage</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Join Our Network</h3>
                    <p className="text-muted-foreground mb-4">
                      Partner with JaganNath Tyre and grow your business with India's leading tyre retailer. 
                      Get access to more customers, better pricing, and comprehensive support.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Increased customer traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Better margins on tyre sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Marketing and promotional support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Training and technical support</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Established garage with good reputation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Modern equipment and tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Certified technicians</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Quality assurance processes</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Apply to Become a Partner
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Partner Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Application</h4>
                          <p className="text-sm text-muted-foreground">
                            Submit your garage details and requirements
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Evaluation</h4>
                          <p className="text-sm text-muted-foreground">
                            Our team evaluates your facility and capabilities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Agreement</h4>
                          <p className="text-sm text-muted-foreground">
                            Sign partnership agreement and complete onboarding
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Launch</h4>
                          <p className="text-sm text-muted-foreground">
                            Start receiving customers and enjoying partnership benefits
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Partnership Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Partnership Hotline</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567 ext. 789</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">partners@jagannathtyre.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Customer Support</CardTitle>
                  <CardDescription>
                    Get help with garage services, bookings, and inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">24/7 Support Line</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@jagannathtyre.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Find a Garage</p>
                        <p className="text-sm text-muted-foreground">Use our garage locator</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Common Support Topics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Booking and scheduling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Service pricing and estimates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Warranty and claims</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Quality complaints</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Garage Support</CardTitle>
                  <CardDescription>
                    Dedicated support for our partner garages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Partner Support Line</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567 ext. 789</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Partner Email</p>
                        <p className="text-sm text-muted-foreground">partners@jagannathtyre.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Technical Support</p>
                        <p className="text-sm text-muted-foreground">24/7 technical assistance</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Partner Support Services</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Technical training and certification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Equipment and tool support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Marketing and promotional materials</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Business development assistance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}