'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ShoppingCart, 
  Wrench, 
  Star, 
  Users, 
  Truck, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function Features() {
  const b2cFeatures = [
    {
      icon: <Search className="h-8 w-8 text-yellow-500" />,
      title: "Smart Tyre Finder",
      description: "Find perfect tyres by vehicle make, model, and year",
      features: ["Vehicle compatibility check", "Size recommendations", "Performance matching"]
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-yellow-500" />,
      title: "Easy Shopping",
      description: "Seamless buying experience with multiple payment options",
      features: ["Secure checkout", "Multiple payment methods", "Order tracking"]
    },
    {
      icon: <Wrench className="h-8 w-8 text-yellow-500" />,
      title: "Expert Installation",
      description: "Professional fitting at partner garages nationwide",
      features: ["Free installation", "Wheel alignment", "Nitrogen fill"]
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Reviews & Ratings",
      description: "Make informed decisions with user reviews",
      features: ["Customer reviews", "Expert ratings", "Performance feedback"]
    }
  ]

  const b2bFeatures = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Bulk Ordering",
      description: "Special pricing for dealers and fleet owners",
      features: ["Volume discounts", "Quick quotes", "Bulk inventory"]
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Fleet Management",
      description: "Track tyre usage across your entire fleet",
      features: ["Usage analytics", "Replacement scheduling", "Cost tracking"]
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Credit Facilities",
      description: "Flexible payment terms for verified dealers",
      features: ["Credit lines", "Monthly billing", "GST invoicing"]
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Quick Reorder",
      description: "Fast reordering for frequently purchased items",
      features: ["Order templates", "One-click reorder", "Purchase history"]
    }
  ]

  const uniqueFeatures = [
    {
      title: "AI-Powered Recommendations",
      description: "Get smart tyre suggestions based on driving style, climate, and budget",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Emergency Assistance",
      description: "24/7 roadside support for punctures and tyre emergencies",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Loyalty Rewards",
      description: "Earn points on every purchase and redeem for discounts",
      icon: <Star className="h-6 w-6" />
    },
    {
      title: "Price Match Guarantee",
      description: "Found it cheaper? We'll match the price",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Why Choose At Home Tyre</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Tyre Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a retail customer or a business, we have the perfect tyre solution for your needs
          </p>
        </div>

        {/* B2C Features */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">For Retail Customers (B2C)</h3>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              Consumer Focused
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {b2cFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* B2B Features */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">For Businesses (B2B)</h3>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              Business Solutions
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {b2bFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Unique Features */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">What Makes Us Different</h3>
            <p className="text-yellow-100">Unique features that set us apart from the competition</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-sm text-yellow-100">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/features">
              <Button variant="secondary" className="bg-white text-yellow-600 hover:bg-gray-100">
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}