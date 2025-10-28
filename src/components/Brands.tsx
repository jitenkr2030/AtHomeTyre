'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Shield, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const brands = [
  {
    name: "MRF",
    description: "India's largest tyre manufacturer",
    rating: 4.5,
    warranty: "5 years",
    specialties: ["Car", "Bike", "Truck"],
    popular: true,
    href: "/brands/mrf"
  },
  {
    name: "Apollo",
    description: "Premium tyres for all vehicles",
    rating: 4.3,
    warranty: "4 years",
    specialties: ["Car", "SUV", "Truck"],
    popular: true,
    href: "/brands/apollo"
  },
  {
    name: "JK Tyre",
    description: "Trusted by millions",
    rating: 4.2,
    warranty: "4 years",
    specialties: ["Car", "Truck", "Bus"],
    popular: false,
    href: "/brands/jk-tyre"
  },
  {
    name: "CEAT",
    description: "Performance driven tyres",
    rating: 4.4,
    warranty: "5 years",
    specialties: ["Car", "Bike", "SUV"],
    popular: true,
    href: "/brands/ceat"
  },
  {
    name: "Bridgestone",
    description: "Global leader in tyres",
    rating: 4.6,
    warranty: "6 years",
    specialties: ["Car", "SUV", "Premium"],
    popular: true,
    href: "/brands/bridgestone"
  },
  {
    name: "Goodyear",
    description: "Innovation in motion",
    rating: 4.5,
    warranty: "5 years",
    specialties: ["Car", "SUV", "Performance"],
    popular: false,
    href: "/brands/goodyear"
  }
]

export default function Brands() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Premium Brands</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Tyre Brands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from India's most trusted tyre brands with manufacturer warranty
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {brands.map((brand, index) => (
            <Link key={index} href={brand.href}>
              <Card className="hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-6">
                  {/* Brand Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                        {brand.popular && (
                          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-400">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{brand.description}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center font-bold text-gray-700">
                        {brand.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(brand.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{brand.rating}/5</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{brand.warranty} warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">
                        Specializes in: {brand.specialties.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-yellow-50 group-hover:border-yellow-300 group-hover:text-yellow-700"
                  >
                    View {brand.name} Tyres
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">50+</div>
              <div className="text-gray-600">Premium Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">10,000+</div>
              <div className="text-gray-600">Tyre Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">1M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find your preferred brand?
          </h3>
          <p className="text-gray-600 mb-6">
            We source tyres from all major manufacturers. Contact us for specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/brands">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
                View All Brands
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                Request Specific Brand
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}