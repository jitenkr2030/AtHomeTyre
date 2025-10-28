'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, MapPin, Award, Users, TrendingUp, Building2, Star, Shield } from 'lucide-react'

export default function OurStoryPage() {
  const timeline = [
    {
      year: '1999',
      title: 'The Beginning',
      description: 'JaganNath Tyre was founded with a single store in Mumbai, focusing on quality tyres and exceptional customer service.',
      icon: Building2,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      year: '2005',
      title: 'First Expansion',
      description: 'Expanded to 5 stores across Mumbai and Pune, establishing ourselves as a trusted name in the region.',
      icon: MapPin,
      color: 'bg-green-100 text-green-600'
    },
    {
      year: '2010',
      title: 'Digital Transformation',
      description: 'Launched our first e-commerce platform, bringing tyre shopping online for the first time in India.',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      year: '2015',
      title: 'National Presence',
      description: 'Expanded operations to 25 cities across India with over 100 partner garages.',
      icon: MapPin,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      year: '2018',
      title: 'Technology Innovation',
      description: 'Introduced AI-powered tyre finder and mobile app for enhanced customer experience.',
      icon: TrendingUp,
      color: 'bg-red-100 text-red-600'
    },
    {
      year: '2020',
      title: 'Pandemic Resilience',
      description: 'Adapted with contactless delivery and online services, supporting essential transportation needs.',
      icon: Shield,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Now serving 100+ cities with 1M+ customers, becoming India\'s leading tyre retailer.',
      icon: Award,
      color: 'bg-green-100 text-green-600'
    }
  ]

  const milestones = [
    {
      title: 'First Customer',
      year: '1999',
      description: 'Served our first customer in Mumbai, starting a journey of trust and quality.',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: '100th Store',
      year: '2012',
      description: 'Reached our 100th physical store milestone across India.',
      icon: Building2,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: '1 Million Customers',
      year: '2018',
      description: 'Achieved the milestone of serving 1 million satisfied customers.',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'National Award',
      year: '2021',
      description: 'Received the "Best Automotive Retailer" award from the Indian Automotive Association.',
      icon: Award,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From a single store in Mumbai to India's most trusted tyre retailer - a journey of passion, 
            innovation, and unwavering commitment to customer satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📅 Founded 1999
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚀 25 Years Journey
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🌟 1M+ Customers
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏆 Industry Leader
            </Badge>
          </div>
        </div>

        {/* Founder's Message */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Message from Our Founder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto"></div>
                </div>
                <div className="md:w-2/3">
                  <blockquote className="text-lg italic text-muted-foreground mb-4">
                    "When I started JaganNath Tyre in 1999, I had a simple vision - to provide every Indian 
                    driver with access to quality tyres at fair prices, backed by exceptional service. 
                    Today, as we serve over a million customers across 100+ cities, that vision remains unchanged."
                  </blockquote>
                  <div className="text-right">
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Founder & CEO, JaganNath Tyre</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey Through Time</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => {
              const Icon = event.icon
              return (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${event.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            {event.year}
                          </Badge>
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Milestones */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Key Milestones</CardTitle>
            <CardDescription className="text-center">
              Moments that defined our success story
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${milestone.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      <CardDescription>{milestone.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Growth Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Growth & Expansion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Stores (1999)</span>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Stores (2024)</span>
                  <Badge variant="secondary">500+</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Cities (1999)</span>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cities (2024)</span>
                  <Badge variant="secondary">100+</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Customers (1999)</span>
                  <Badge variant="outline">Hundreds</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customers (2024)</span>
                  <Badge variant="secondary">1M+</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Achievements & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Best Automotive Retailer 2021</p>
                    <p className="text-sm text-muted-foreground">Indian Automotive Association</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Customer Choice Award 2020</p>
                    <p className="text-sm text-muted-foreground">National Retail Federation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Fastest Growing Retailer 2019</p>
                    <p className="text-sm text-muted-foreground">Business Today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Excellence in Customer Service</p>
                    <p className="text-sm text-muted-foreground">Customer Satisfaction Council</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Impact */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Community Impact</CardTitle>
            <CardDescription className="text-center">
              Giving back to the community that has supported us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Road Safety Education</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Conducted 500+ road safety workshops across India
                </p>
                <Badge variant="outline">50,000+ Participants</Badge>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Employment Generation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Created 5,000+ direct and indirect jobs
                </p>
                <Badge variant="outline">Across India</Badge>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Environmental Initiatives</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tyre recycling and eco-friendly practices
                </p>
                <Badge variant="outline">100,000+ Tyres Recycled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Looking Ahead</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              As we continue our journey, we remain committed to innovation, quality, and customer satisfaction. 
              Our vision for the future includes expanding our digital footprint, introducing cutting-edge technologies, 
              and reaching every corner of India with our trusted services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium">Digital Innovation</h4>
                <p className="text-sm text-muted-foreground">AI-powered shopping experience</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium">Pan-India Reach</h4>
                <p className="text-sm text-muted-foreground">500+ cities by 2025</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium">Customer Excellence</h4>
                <p className="text-sm text-muted-foreground">5M+ happy customers</p>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8">
              Join Our Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}