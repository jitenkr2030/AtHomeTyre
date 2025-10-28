'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Building2, Award, Users, Globe, Shield, Star, Truck, Target } from 'lucide-react'

export default function AboutJaganNathTyrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About At Home Tyre</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            India's trusted tyre destination, combining decades of expertise with cutting-edge technology 
            to deliver premium quality tyres and exceptional service across the nation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏆 25+ Years Experience
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📍 100+ Cities
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚗 1M+ Happy Customers
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔧 500+ Partner Garages
            </Badge>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To provide every Indian driver with access to high-quality, affordable tyres while delivering 
                exceptional customer service and promoting road safety through education and innovation.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Safety-first approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Customer-centric service</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span>Nationwide accessibility</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To become India's most trusted and innovative tyre retailer, setting new standards in 
                quality, service, and technology while contributing to safer roads across the country.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Industry leadership</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <span>Technological innovation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-red-600" />
                  <span>Sustainable growth</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Our Core Values</CardTitle>
            <CardDescription className="text-center">
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  Honest business practices and transparent pricing
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Only genuine, certified products from trusted brands
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Customer Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our top priority
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Embracing technology for better service
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose At Home Tyre?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Extensive Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  With over 500 partner garages and service centers across 100+ cities, we're always near you.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">100+ Cities</Badge>
                  <Badge variant="outline">500+ Garages</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Premium Brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer tyres from all major brands including MRF, Apollo, JK Tyre, CEAT, and more.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">MRF</Badge>
                  <Badge variant="outline">Apollo</Badge>
                  <Badge variant="outline">JK Tyre</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Quality Assurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  All our tyres are 100% genuine with manufacturer warranty and quality certification.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">100% Genuine</Badge>
                  <Badge variant="outline">Warranty</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Fast Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick delivery across India with options for same-day and express shipping.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Same Day</Badge>
                  <Badge variant="outline">Express</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Expert Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team of tyre experts is available to help you choose the right tyres for your vehicle.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">24/7 Support</Badge>
                  <Badge variant="outline">Expert Advice</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Competitive Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Best prices guaranteed with regular discounts and special offers for our customers.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Best Price</Badge>
                  <Badge variant="outline">Offers</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leadership Team */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Leadership Team</CardTitle>
            <CardDescription className="text-center">
              Meet the people driving our success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Rajesh Kumar</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
                <p className="text-xs text-muted-foreground mt-2">
                  25+ years in automotive industry
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Priya Sharma</h3>
                <p className="text-sm text-muted-foreground">COO</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Operations and supply chain expert
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Amit Patel</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Technology and innovation leader
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the At Home Tyre Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers who trust us for their tyre needs. 
              Quality, service, and satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}