'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Car, Truck, Bike, Shield, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Genuine",
      description: "Authentic tyres with manufacturer warranty"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Best Prices",
      description: "Competitive pricing with instant discounts"
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Free Installation",
      description: "At partner garages across India"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Get your tyres delivered in 24-48 hours"
    }
  ]

  const categories = [
    { name: "Car Tyres", icon: <Car className="h-8 w-8" />, count: "500+ Tyres", href: "/tyres/car" },
    { name: "Bike Tyres", icon: <Bike className="h-8 w-8" />, count: "300+ Tyres", href: "/tyres/bike" },
    { name: "Truck Tyres", icon: <Truck className="h-8 w-8" />, count: "200+ Tyres", href: "/tyres/truck" },
    { name: "More", icon: <Search className="h-8 w-8" />, count: "View All", href: "/tyres" }
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4 bg-yellow-500 text-black hover:bg-yellow-400">
              India's Most Trusted Tyre Store
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Tyres for
              <span className="text-yellow-400"> Every Journey</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Find the perfect tyres for your vehicle from top brands. 
              Enjoy competitive prices, expert installation, and nationwide delivery.
            </p>

            {/* Search Bar */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                      <option value="">Select Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="truck">Truck</option>
                      <option value="bus">Bus</option>
                      <option value="tractor">Tractor</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter tyre size (e.g., 205/55R16)"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <Link href="/tyre-finder">
                    <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3">
                      Search Tyres
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Link href="/tyre-finder">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Search className="mr-2 h-4 w-4" />
                  Tyre Finder
                </Button>
              </Link>
              <Link href="/service-booking">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Car className="mr-2 h-4 w-4" />
                  Book Installation
                </Button>
              </Link>
              <Link href="/compare-tyres">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Shield className="mr-2 h-4 w-4" />
                  Compare Tyres
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Categories */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3 text-yellow-400 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-300">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3 text-yellow-400">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}