'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MapPin, Home, ShoppingCart, Car, Wrench, Users, Building2, FileText, Phone, Mail, Search } from 'lucide-react'

export default function SitemapPage() {
  const sitemapData = [
    {
      title: "Main Navigation",
      icon: Home,
      items: [
        { name: "Home", url: "/", description: "Landing page with featured products and offers" },
        { name: "Tyres", url: "/tyres", description: "Browse our complete tyre collection" },
        { name: "Tyre Finder", url: "/tyre-finder", description: "Find the perfect tyres for your vehicle" },
        { name: "Service Booking", url: "/service-booking", description: "Book tyre services and maintenance" },
        { name: "Shopping Cart", url: "/cart", description: "View and manage your cart items" },
        { name: "Checkout", url: "/checkout", description: "Complete your purchase" }
      ]
    },
    {
      title: "Customer Service",
      icon: Phone,
      items: [
        { name: "Contact Us", url: "/customer-service/contact-us", description: "Get in touch with our support team" },
        { name: "Help Center", url: "/customer-service/help-center", description: "Find answers to common questions" },
        { name: "Track Order", url: "/customer-service/track-order", description: "Monitor your order status" },
        { name: "Return Policy", url: "/customer-service/return-policy", description: "Learn about our return process" },
        { name: "Shipping Info", url: "/customer-service/shipping-info", description: "Shipping options and delivery details" },
        { name: "Size Guide", url: "/customer-service/size-guide", description: "Tyre size guide and compatibility" }
      ]
    },
    {
      title: "About Us",
      icon: Users,
      items: [
        { name: "About At Home Tyre", url: "/about/athometyre", description: "Learn about our company and mission" },
        { name: "Our Story", url: "/about/our-story", description: "Our journey and growth over the years" },
        { name: "Careers", url: "/about/careers", description: "Join our team and explore job opportunities" },
        { name: "Press", url: "/about/press", description: "Latest news and press releases" },
        { name: "Blog", url: "/about/blog", description: "Expert articles and industry insights" },
        { name: "Sitemap", url: "/about/sitemap", description: "Complete site structure and navigation" }
      ]
    },
    {
      title: "Business Solutions",
      icon: Building2,
      items: [
        { name: "Dealer Login", url: "/business/dealer-login", description: "Access dealer portal and dashboard" },
        { name: "Become a Dealer", url: "/business/become-dealer", description: "Partner with us as a dealer" },
        { name: "Bulk Ordering", url: "/business/bulk-ordering", description: "Place bulk orders at special prices" },
        { name: "Fleet Solutions", url: "/business/fleet-solutions", description: "Tyre solutions for fleet management" },
        { name: "Partner Garages", url: "/business/partner-garages", description: "Find our authorized service centers" },
        { name: "API Integration", url: "/business/api-integration", description: "Integrate with our systems via API" }
      ]
    },
    {
      title: "Legal Information",
      icon: FileText,
      items: [
        { name: "Privacy Policy", url: "/legal/privacy-policy", description: "How we handle your data and privacy" },
        { name: "Terms of Service", url: "/legal/terms-of-service", description: "Terms and conditions for using our site" },
        { name: "Cookie Policy", url: "/legal/cookie-policy", description: "Information about cookies we use" },
        { name: "Disclaimer", url: "/legal/disclaimer", description: "Legal disclaimers and limitations" },
        { name: "GDPR", url: "/legal/gdpr", description: "GDPR compliance and data protection" },
        { name: "Accessibility", url: "/legal/accessibility", description: "Our commitment to accessibility" }
      ]
    },
    {
      title: "Product Categories",
      icon: Car,
      items: [
        { name: "Car Tyres", url: "/tyres/car", description: "Tyres for all types of cars and sedans" },
        { name: "Bike Tyres", url: "/tyres/bike", description: "Motorcycle and scooter tyres" },
        { name: "Truck Tyres", url: "/tyres/truck", description: "Heavy-duty truck and commercial vehicle tyres" },
        { name: "Bus Tyres", url: "/tyres/bus", description: "Bus and commercial passenger vehicle tyres" },
        { name: "Tractor Tyres", url: "/tyres/tractor", description: "Agricultural and tractor tyres" },
        { name: "Off-Road Tyres", url: "/tyres/off-road", description: "Off-road and all-terrain vehicle tyres" }
      ]
    },
    {
      title: "Services",
      icon: Wrench,
      items: [
        { name: "Tyre Installation", url: "/services/installation", description: "Professional tyre fitting services" },
        { name: "Wheel Alignment", url: "/services/alignment", description: "Precision wheel alignment services" },
        { name: "Tyre Balancing", url: "/services/balancing", description: "Wheel balancing for smooth ride" },
        { name: "Nitrogen Filling", url: "/services/nitrogen", description: "Nitrogen tyre inflation services" },
        { name: "Tyre Repair", url: "/services/repair", description: "Puncture and damage repair services" },
        { name: "Mobile Service", url: "/services/mobile", description: "On-site tyre services at your location" }
      ]
    },
    {
      title: "User Accounts",
      icon: Users,
      items: [
        { name: "Sign In", url: "/auth/signin", description: "Login to your account" },
        { name: "Sign Up", url: "/auth/signup", description: "Create a new account" },
        { name: "Order History", url: "/account/orders", description: "View your past orders" },
        { name: "Wishlist", url: "/account/wishlist", description: "Manage your saved items" },
        { name: "Profile", url: "/account/profile", description: "Update your personal information" },
        { name: "Addresses", url: "/account/addresses", description: "Manage your shipping addresses" }
      ]
    }
  ]

  const quickLinks = [
    { name: "Popular Tyres", url: "/tyres/popular", icon: ShoppingCart },
    { name: "New Arrivals", url: "/tyres/new", icon: Car },
    { name: "Special Offers", url: "/offers", icon: Search },
    { name: "Customer Reviews", url: "/reviews", icon: Users },
    { name: "Store Locator", url: "/stores", icon: MapPin },
    { name: "Contact Support", url: "/customer-service/contact-us", icon: Phone }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Navigate through At Home Tyre's complete website structure. Find all the pages, 
            services, and information you need quickly and easily.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🗺️ Complete Navigation
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔍 Easy to Find
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📱 Mobile Friendly
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              ⚡ Fast Access
            </Badge>
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Quick Links
            </CardTitle>
            <CardDescription>
              Most frequently visited pages and popular destinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                    asChild
                  >
                    <a href={link.url}>
                      <Icon className="h-6 w-6" />
                      <span className="text-sm text-center">{link.name}</span>
                    </a>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Sitemap */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">Complete Website Structure</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {sitemapData.map((section, index) => {
              const Icon = section.icon
              return (
                <AccordionItem key={index} value={section.title}>
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {section.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {section.items.map((item, itemIndex) => (
                        <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-100 p-2 rounded-lg mt-1">
                                <MapPin className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                <a 
                                  href={item.url} 
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  Visit Page →
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {/* Alphabetical Index */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Alphabetical Index</CardTitle>
            <CardDescription className="text-center">
              All pages listed alphabetically for quick reference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sitemapData.flatMap(section => section.items).sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <a href={item.url} className="text-sm hover:text-blue-600">
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact & Help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Need Help Finding Something?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-muted-foreground">1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@athometyre.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-sm text-muted-foreground">Find a store near you</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Still Can't Find What You're Looking For?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use our search function or browse through the categories to find what you need. 
                  If you still can't find it, our customer support team is here to help.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Search Entire Site
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find a Store
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Website Last Updated</h3>
          <p className="text-muted-foreground mb-4">
            This sitemap was last updated on January 15, 2024. Our website is continuously updated with new content and features.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Regular Updates</Badge>
            <Badge variant="outline">New Content Added</Badge>
            <Badge variant="outline">Improved Navigation</Badge>
            <Badge variant="outline">Mobile Optimized</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}