'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, User, Car, Building } from 'lucide-react'

const testimonials = [
  {
    name: "Rajesh Kumar",
    type: "Individual Customer",
    vehicle: "Honda City",
    rating: 5,
    comment: "Excellent service! Found the perfect tyres for my car at a great price. The installation was done professionally at their partner garage. Highly recommended!",
    date: "2 weeks ago",
    avatar: <User className="h-12 w-12" />
  },
  {
    name: "Mahesh Transport Co.",
    type: "Fleet Owner",
    vehicle: "Truck Fleet",
    rating: 5,
    comment: "As a fleet owner, we need reliable tyres at competitive prices. At Home Tyre has been our trusted partner for 3 years. Their bulk pricing and timely delivery are exceptional.",
    date: "1 month ago",
    avatar: <Building className="h-12 w-12" />
  },
  {
    name: "Priya Sharma",
    type: "Individual Customer",
    vehicle: "Hyundai Creta",
    rating: 4,
    comment: "The tyre finder tool helped me choose the right tyres for my SUV. The quality is outstanding and the customer service team was very helpful throughout the process.",
    date: "3 weeks ago",
    avatar: <User className="h-12 w-12" />
  },
  {
    name: "Speed Motors Garage",
    type: "Dealer Partner",
    vehicle: "Multi-brand",
    rating: 5,
    comment: "Being a dealer partner with At Home Tyre has boosted our business. Their credit facilities, quick delivery, and competitive margins make them the best in the industry.",
    date: "2 months ago",
    avatar: <Building className="h-12 w-12" />
  }
]

const stats = [
  { label: "Customer Satisfaction", value: "98%", icon: <Star className="h-6 w-6" /> },
  { label: "On-time Delivery", value: "99%", icon: <Car className="h-6 w-6" /> },
  { label: "Quality Guarantee", value: "100%", icon: <Star className="h-6 w-6" /> },
  { label: "Service Coverage", value: "500+ Cities", icon: <Building className="h-6 w-6" /> }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Customer Stories</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from customers who trust us for their tyre needs
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3 text-yellow-500">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{testimonial.type}</span>
                        <span>•</span>
                        <span>{testimonial.vehicle}</span>
                      </div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-yellow-400 opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{testimonial.rating}/5</span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {testimonial.comment}
                </p>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  {testimonial.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Satisfied Customers
          </h3>
          <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
            Experience the best tyre shopping and service experience in India. 
            From individual customers to large fleets, we serve everyone with the same commitment to excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">50,000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">4.8/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}