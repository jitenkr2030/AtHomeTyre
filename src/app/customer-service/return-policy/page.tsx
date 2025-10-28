'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertTriangle, Info, Phone } from 'lucide-react'

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
          <p className="text-xl text-muted-foreground">Hassle-free returns and exchanges for your peace of mind</p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">30-Day Window</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Return unused products within 30 days of delivery for a full refund
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-green-600" />
                <CardTitle className="text-lg">Free Returns</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Free return shipping for defective products and shipping errors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <CardTitle className="text-lg">Quick Refund</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Refunds processed within 5-7 business days after return approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Policy Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Return Policy Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Eligibility for Returns</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Unused Products</p>
                    <p className="text-sm text-muted-foreground">
                      Products must be in original, unused condition with all tags and packaging intact
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Original Packaging</p>
                    <p className="text-sm text-muted-foreground">
                      Products must be returned in their original packaging with all accessories included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Time Frame</p>
                    <p className="text-sm text-muted-foreground">
                      Returns must be initiated within 30 days of delivery date
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Non-Returnable Items</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Used or Installed Tyres</p>
                    <p className="text-sm text-muted-foreground">
                      Tyres that have been mounted on vehicles or show signs of use
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Custom Orders</p>
                    <p className="text-sm text-muted-foreground">
                      Products specially ordered or customized as per customer requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Gift Cards</p>
                    <p className="text-sm text-muted-foreground">
                      Gift cards and vouchers are non-returnable and non-refundable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Return a Product</CardTitle>
            <CardDescription>
              Follow these simple steps to process your return
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Initiate Return</h4>
                  <p className="text-sm text-muted-foreground">
                    Log into your account, go to "Order History", select the order and click "Initiate Return"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Select Reason</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose the reason for return and provide any additional details or photos if required
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Get Approval</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your request and approve it if it meets our return policy criteria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Package & Ship</h4>
                  <p className="text-sm text-muted-foreground">
                    Pack the item securely and use the provided return shipping label to send it back
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold">Receive Refund</h4>
                  <p className="text-sm text-muted-foreground">
                    Once we receive and inspect the returned item, your refund will be processed within 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Charges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Return Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-800">Free Returns</h4>
                  <p className="text-sm text-green-700">No charges apply</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">Defective products</p>
                  <p className="text-sm text-green-600">Shipping errors</p>
                  <p className="text-sm text-green-600">Wrong items delivered</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-orange-800">Customer Preference</h4>
                  <p className="text-sm text-orange-700">₹100 - ₹500</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-600">Size change</p>
                  <p className="text-sm text-orange-600">Color preference</p>
                  <p className="text-sm text-orange-600">No longer needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does the return process take?</AccordionTrigger>
                <AccordionContent>
                  The complete return process typically takes 10-14 days from initiation to refund processing. This includes 3-5 days for shipping back to our warehouse, 1-2 days for inspection, and 5-7 days for refund processing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I exchange a product instead of returning it?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can exchange products for different sizes or models of the same brand. Exchanges are processed faster than returns as we can ship the replacement item while your return is in transit.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What if I received a damaged product?</AccordionTrigger>
                <AccordionContent>
                  If you receive a damaged product, please contact us immediately with photos of the damage. We'll arrange for a free return and send you a replacement or issue a full refund, including any shipping charges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How will I receive my refund?</AccordionTrigger>
                <AccordionContent>
                  Refunds are processed to the original payment method used for the purchase. If you paid by credit/debit card, the refund will appear on your statement within 5-7 business days after processing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I return products purchased during a sale?</AccordionTrigger>
                <AccordionContent>
                  Yes, products purchased during sales are eligible for return under the same 30-day policy. However, special clearance items marked as "Final Sale" are non-returnable.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Need Help with Returns?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium">Call Us</h4>
                <p className="text-sm text-muted-foreground">1800-123-4567</p>
                <p className="text-xs text-muted-foreground">Mon-Sat: 9AM-8PM</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-muted-foreground">returns@jagannathtyre.com</p>
                <p className="text-xs text-muted-foreground">24/7 Response</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium">Live Chat</h4>
                <p className="text-sm text-muted-foreground">Available on Website</p>
                <p className="text-xs text-muted-foreground">9AM-8PM Daily</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}