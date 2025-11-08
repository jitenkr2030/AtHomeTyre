'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Truck, Package, Clock, MapPin, Shield, CheckCircle, AlertCircle } from 'lucide-react'

export default function ShippingInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-muted-foreground">Fast, reliable, and affordable shipping across India</p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">Standard Shipping</CardTitle>
                  <CardDescription>3-5 Business Days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Time</span>
                  <Badge variant="secondary">3-5 Days</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost</span>
                  <Badge variant="outline">₹99</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tracking</span>
                  <Badge variant="outline">Yes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance</span>
                  <Badge variant="outline">Up to ₹5,000</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/20 bg-green-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle className="text-lg">Express Shipping</CardTitle>
                  <CardDescription>1-2 Business Days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Time</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">1-2 Days</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost</span>
                  <Badge variant="outline">₹299</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tracking</span>
                  <Badge variant="outline">Yes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance</span>
                  <Badge variant="outline">Up to ₹25,000</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <CardTitle className="text-lg">Same Day</CardTitle>
                  <CardDescription>Within 24 Hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Time</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">24 Hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost</span>
                  <Badge variant="outline">₹599</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tracking</span>
                  <Badge variant="outline">Yes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance</span>
                  <Badge variant="outline">Up to ₹50,000</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Free Shipping Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Free Shipping Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Free Standard Shipping</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Qualifying Orders</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Orders above ₹5,000</li>
                    <li>• Bulk orders (10+ tyres)</li>
                    <li>• Fleet customer orders</li>
                    <li>• Dealer orders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Coverage</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• All major cities</li>
                    <li>• Tier 1 & Tier 2 cities</li>
                    <li>• Select rural areas</li>
                    <li>• Industrial zones</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Areas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Major Cities (1-2 Days)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mumbai</span>
                    <Badge variant="secondary" className="bg-green-100">Express Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Delhi</span>
                    <Badge variant="secondary" className="bg-green-100">Express Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Bangalore</span>
                    <Badge variant="secondary" className="bg-green-100">Express Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Chennai</span>
                    <Badge variant="secondary" className="bg-green-100">Express Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Kolkata</span>
                    <Badge variant="secondary" className="bg-green-100">Express Available</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Other Cities (3-5 Days)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pune</span>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Hyderabad</span>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Ahmedabad</span>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Jaipur</span>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Chandigarh</span>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Remote Areas</h4>
              </div>
              <p className="text-sm text-yellow-700">
                For remote locations and rural areas, delivery may take 5-7 days. Additional charges may apply. 
                Please check delivery availability at checkout.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipping Process</CardTitle>
            <CardDescription>
              From order placement to delivery - here's how it works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Order Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    Once your order is confirmed and payment is processed, we prepare your items for shipping
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Quality Check & Packaging</h4>
                  <p className="text-sm text-muted-foreground">
                    Each tyre undergoes quality inspection and is carefully packaged to prevent damage during transit
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Dispatch</h4>
                  <p className="text-sm text-muted-foreground">
                    Your order is handed over to our trusted courier partners with tracking information
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">In Transit</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your order in real-time as it makes its way to your location
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold">Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Your order is delivered to your specified address. You'll receive SMS and email notifications
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipping FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number on our Track Order page or the courier partner's website to track your shipment in real-time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What if I'm not available during delivery?</AccordionTrigger>
                <AccordionContent>
                  If you're not available, the courier will attempt delivery 2 more times. After 3 failed attempts, the package will be returned to our warehouse. You can also provide alternative delivery instructions or authorize someone else to receive the package.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do you ship to remote areas?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most locations across India including remote areas. However, delivery times may be longer (5-7 days) and additional charges may apply. You can check delivery availability by entering your PIN code during checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I change my delivery address after ordering?</AccordionTrigger>
                <AccordionContent>
                  Address changes can be made within 2 hours of placing your order. Please contact our customer support team immediately with your order number and new address details. Changes may not be possible if the order has already been processed for shipping.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What happens if my order is damaged during shipping?</AccordionTrigger>
                <AccordionContent>
                  All shipments are insured. If your order arrives damaged, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund at no additional cost to you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* International Shipping */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              International Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Currently Available To:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <Badge variant="outline">Nepal</Badge>
                <Badge variant="outline">Bangladesh</Badge>
                <Badge variant="outline">Sri Lanka</Badge>
                <Badge variant="outline">Bhutan</Badge>
              </div>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Delivery time: 7-14 business days</p>
                <p>• Additional customs charges may apply</p>
                <p>• International tracking available</p>
                <p>• Customer must handle customs clearance</p>
              </div>
              <p className="text-sm text-blue-600 mt-3">
                For international shipping inquiries, please contact our export team at export@jagannathtyre.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}