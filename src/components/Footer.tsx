'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Truck, 
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically make an API call to subscribe the user
      console.log('Subscribing email:', email)
      setIsSubscribed(true)
      setEmail('')
      
      // Reset the success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const customerService = [
    { name: "Contact Us", href: "/customer-service/contact-us" },
    { name: "Help Center", href: "/customer-service/help-center" },
    { name: "Track Order", href: "/customer-service/track-order" },
    { name: "Return Policy", href: "/customer-service/return-policy" },
    { name: "Shipping Info", href: "/customer-service/shipping-info" },
    { name: "Size Guide", href: "/customer-service/size-guide" }
  ]

  const aboutUs = [
    { name: "About At Home Tyre", href: "/about/athometyre" },
    { name: "Our Story", href: "/about/our-story" },
    { name: "Careers", href: "/about/careers" },
    { name: "Press", href: "/about/press" },
    { name: "Blog", href: "/about/blog" },
    { name: "Sitemap", href: "/about/sitemap" }
  ]

  const business = [
    { name: "Dealer Login", href: "/dealer-login" },
    { name: "Become a Dealer", href: "/business/become-dealer" },
    { name: "Bulk Ordering", href: "/business/bulk-ordering" },
    { name: "Fleet Solutions", href: "/business/fleet-solutions" },
    { name: "Partner Garages", href: "/business/partner-garages" },
    { name: "API Integration", href: "/business/api-integration" }
  ]

  const legal = [
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms of Service", href: "/legal/terms-of-service" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
    { name: "Disclaimer", href: "/legal/disclaimer" },
    { name: "GDPR", href: "/legal/gdpr" },
    { name: "Accessibility", href: "/legal/accessibility" }
  ]

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      details: ["1800-123-4567", "+91 98765 43210"],
      description: "24/7 Customer Support"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: ["support@athometyre.com", "business@athometyre.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Head Office",
      details: ["123 Industrial Area", "Mumbai, Maharashtra 400001"],
      description: "Visit us by appointment"
    }
  ]

  const certifications = [
    { name: "ISO Certified", icon: <Shield className="h-6 w-6" /> },
    { name: "Govt Approved", icon: <Star className="h-6 w-6" /> },
    { name: "Fast Delivery", icon: <Truck className="h-6 w-6" /> }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black">
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-yellow-400">
                    {cert.icon}
                  </div>
                  <div className="text-sm font-medium">{cert.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10">
                <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">AH</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold">At Home Tyre</span>
            </div>
            <p className="text-gray-400 mb-4">
              India's most trusted tyre destination. Premium quality, competitive prices, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerService.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-semibold text-lg mb-4">About Us</h4>
            <ul className="space-y-2">
              {aboutUs.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Business</h4>
            <ul className="space-y-2">
              {business.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          {contactInfo.map((info, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-400 mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-300">{detail}</p>
                    ))}
                    <p className="text-xs text-gray-400 mt-1">{info.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 At Home Tyre. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Payment Methods:</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-gray-600 text-gray-400">UPI</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">Cards</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">COD</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">EMI</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}