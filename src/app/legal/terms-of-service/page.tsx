'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { FileText, Shield, CreditCard, Truck, Calendar, AlertTriangle, CheckCircle, Info } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            By using JaganNath Tyre's website and services, you agree to be bound by these terms and conditions.
          </p>
        </div>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Terms at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Age requirement: 18+ years</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Accurate information required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Payment security guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>30-day return policy</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Your Responsibilities</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Protect account credentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span>Provide valid payment methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-orange-600" />
                    <span>Provide accurate delivery details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span>Review terms before purchase</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Terms */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
              <CardDescription>
                By accessing and using JaganNath Tyre's website and services, you accept and agree to be bound by these terms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  These Terms of Service constitute a legally binding agreement between you and JaganNath Tyre. 
                  If you do not agree to these terms, you may not use our website or services.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Age Requirement</h4>
                  <p className="text-sm text-blue-700">
                    You must be at least 18 years old to create an account and make purchases on our website. 
                    By using our services, you confirm that you meet this age requirement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Account Registration and Security</CardTitle>
              <CardDescription>
                Requirements for creating and maintaining your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Registration Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Use a valid email address and phone number</li>
                    <li>Create a strong password for account security</li>
                    <li>Keep your contact information updated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>You are responsible for maintaining account confidentiality</li>
                    <li>Notify us immediately of any unauthorized use</li>
                    <li>You are responsible for all activities under your account</li>
                    <li>Do not share your login credentials with others</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Account Termination</h4>
                  <p className="text-sm text-yellow-700">
                    We reserve the right to suspend or terminate accounts that violate these terms or 
                    engage in fraudulent activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Products and Services</CardTitle>
              <CardDescription>
                Information about our tyre products and related services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="products">
                  <AccordionTrigger>Product Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm">
                        We strive to provide accurate product information, including:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Detailed specifications and features</li>
                        <li>Pricing and availability information</li>
                        <li>Compatibility with vehicle types</li>
                        <li>Manufacturer warranties and guarantees</li>
                        <li>High-quality product images</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        While we make every effort to ensure accuracy, we reserve the right to correct 
                        any errors in pricing or product information.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="services">
                  <AccordionTrigger>Additional Services</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm">
                        In addition to tyre sales, we offer:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Tyre fitting and installation services</li>
                        <li>Wheel alignment and balancing</li>
                        <li>Tyre repair and maintenance</li>
                        <li>Mobile tyre fitting at your location</li>
                        <li>Fleet management solutions</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Service availability and pricing may vary by location. Please check with your 
                        local service center for specific offerings.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="availability">
                  <AccordionTrigger>Availability and Pricing</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm">
                        Product availability and pricing are subject to change without notice. 
                        We reserve the right to:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Modify prices at any time</li>
                        <li>Limit quantities purchased</li>
                        <li>Refuse service to anyone</li>
                        <li>Discontinue products without notice</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Prices displayed on our website are in Indian Rupees (INR) and include all 
                        applicable taxes unless otherwise stated.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Orders and Payment</CardTitle>
              <CardDescription>
                Terms related to placing orders and payment processing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Order Process</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Select products and add to cart</li>
                    <li>Provide accurate shipping and billing information</li>
                    <li>Choose payment method and complete checkout</li>
                    <li>Receive order confirmation via email</li>
                    <li>Track your order status online</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Methods</h4>
                  <p className="text-sm mb-3">
                    We accept the following payment methods:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    <Badge variant="outline">Credit Card</Badge>
                    <Badge variant="outline">Debit Card</Badge>
                    <Badge variant="outline">Net Banking</Badge>
                    <Badge variant="outline">UPI</Badge>
                    <Badge variant="outline">Wallet</Badge>
                    <Badge variant="outline">COD</Badge>
                    <Badge variant="outline">EMI</Badge>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Payment Security</h4>
                  <p className="text-sm text-green-700">
                    All payments are processed securely through encrypted connections. We do not store 
                    your payment information on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Shipping and Delivery</CardTitle>
              <CardDescription>
                Terms related to product shipping and delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Shipping Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm">Standard</h5>
                      <p className="text-xs text-muted-foreground">3-5 business days</p>
                      <Badge variant="outline" className="text-xs">₹99</Badge>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm">Express</h5>
                      <p className="text-xs text-muted-foreground">1-2 business days</p>
                      <Badge variant="outline" className="text-xs">₹299</Badge>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm">Same Day</h5>
                      <p className="text-xs text-muted-foreground">Within 24 hours</p>
                      <Badge variant="outline" className="text-xs">₹599</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping is available for orders above ₹5,000. Additional conditions 
                    may apply for remote locations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Responsibility</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Delivery times are estimates and not guaranteed</li>
                    <li>We are not responsible for delays caused by couriers</li>
                    <li>You must provide accurate delivery information</li>
                    <li>Someone must be available to receive the delivery</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Returns and Refunds</CardTitle>
              <CardDescription>
                Our return policy and refund process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Return Eligibility</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Unused products in original packaging</li>
                    <li>Within 30 days of delivery</li>
                    <li>With original receipt or proof of purchase</li>
                    <li>Not on the list of non-returnable items</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Return Process</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Log into your account and go to Order History</li>
                    <li>Select the order and click "Initiate Return"</li>
                    <li>Choose return reason and provide details</li>
                    <li>Print return label and package the item</li>
                    <li>Ship the item back to us</li>
                    <li>Receive refund within 5-7 business days</li>
                  </ol>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Non-Returnable Items</h4>
                  <p className="text-sm text-red-700">
                    The following items cannot be returned: used or installed tyres, custom orders, 
                    gift cards, and items marked as "Final Sale".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Intellectual Property</CardTitle>
              <CardDescription>
                Rights related to website content and materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of JaganNath Tyre or its content suppliers and is protected by 
                  intellectual property laws.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">What You Can Do</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>View and download content for personal use</li>
                    <li>Share links to our website on social media</li>
                    <li>Print pages for your reference</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What You Cannot Do</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Copy or redistribute our content</li>
                    <li>Use our content for commercial purposes</li>
                    <li>Modify or create derivative works</li>
                    <li>Remove any copyright notices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Prohibited Activities</CardTitle>
              <CardDescription>
              Activities that are not allowed on our website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Illegal Activities</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Fraudulent transactions</li>
                      <li>Identity theft</li>
                      <li>Money laundering</li>
                      <li>Hacking or unauthorized access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Website Abuse</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Spam or unsolicited communications</li>
                      <li>Automated data collection</li>
                      <li>Interfering with website functionality</li>
                      <li>Uploading malicious content</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Consequences</h4>
                  <p className="text-sm text-red-700">
                    Violation of these terms may result in account suspension, termination of services, 
                    and legal action where appropriate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
              <CardDescription>
                Our liability limitations and disclaimers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  JaganNath Tyre shall not be liable for any indirect, incidental, special, or 
                  consequential damages arising from your use of our website or services.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Exclusions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Product defects or failures</li>
                    <li>Delivery delays or errors</li>
                    <li>Website downtime or technical issues</li>
                    <li>Third-party service failures</li>
                    <li>Loss of profits or data</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Maximum Liability</h4>
                  <p className="text-sm text-yellow-700">
                    Our maximum liability to you for any claim related to our website or services 
                    shall not exceed the amount you paid for the products or services in question.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Indemnification</CardTitle>
              <CardDescription>
                Your responsibility to indemnify us against certain claims.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You agree to indemnify and hold JaganNath Tyre harmless from any claims, damages, 
                  losses, and expenses arising from:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your violation of these terms</li>
                  <li>Your use of our website or services</li>
                  <li>Your infringement of third-party rights</li>
                  <li>Any fraudulent or illegal activities</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Legal Defense</h4>
                  <p className="text-sm text-blue-700">
                    We reserve the right to assume the exclusive defense and control of any matter 
                    subject to indemnification by you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Termination</CardTitle>
              <CardDescription>
                Conditions under which these terms may be terminated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Termination by Us</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We may terminate or suspend your account and access to our services immediately, 
                    without prior notice, for reasons including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Breach of these terms</li>
                    <li>Fraudulent or illegal activities</li>
                    <li>Bankruptcy or insolvency</li>
                    <li>Security concerns</li>
                    <li>Extended periods of inactivity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Termination by You</h4>
                  <p className="text-sm text-muted-foreground">
                    You may terminate your account at any time by contacting customer support. 
                    Upon termination, your right to use our services will cease immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Governing Law and Dispute Resolution</CardTitle>
              <CardDescription>
                Legal jurisdiction and dispute resolution procedures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Governing Law</h4>
                  <p className="text-sm text-muted-foreground">
                    These Terms of Service shall be governed by and construed in accordance with 
                    the laws of India, without regard to its conflict of law principles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Any disputes arising from these terms shall be resolved through:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Good faith negotiations between parties</li>
                    <li>Mediation through a mutually agreed mediator</li>
                    <li>Arbitration under the Arbitration and Conciliation Act, 1996</li>
                    <li>Subject to the exclusive jurisdiction of courts in Mumbai</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>13. General Provisions</CardTitle>
              <CardDescription>
                Miscellaneous terms and conditions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="assignment">
                  <AccordionTrigger>Assignment</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      You may not assign or transfer these terms or your rights under these terms to any 
                      third party without our prior written consent. We may assign these terms to any 
                      successor or affiliate.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="waiver">
                  <AccordionTrigger>Waiver</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      Failure to enforce any provision of these terms shall not be deemed a waiver of 
                      such provision or any other provision. No waiver shall be effective unless made 
                      in writing and signed by an authorized representative.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="severability">
                  <AccordionTrigger>Severability</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      If any provision of these terms is found to be invalid or unenforceable, the 
                      remaining provisions shall continue in full force and effect. The invalid or 
                      unenforceable provision shall be replaced with a valid and enforceable provision 
                      that most closely achieves the original intent.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="entire">
                  <AccordionTrigger>Entire Agreement</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      These Terms of Service constitute the entire agreement between you and JaganNath Tyre 
                      regarding the use of our website and services, superseding all prior agreements 
                      and understandings.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>14. Contact Information</CardTitle>
              <CardDescription>
                How to reach us with questions about these terms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Questions About These Terms?</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">legal@jagannathtyre.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">1800-123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Tyre Street, Mumbai, Maharashtra 400001, India
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Please contact us if you have any questions about these Terms of Service or our practices.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acceptance Statement */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">By Using Our Services</h3>
            <p className="text-muted-foreground mb-4">
              You acknowledge that you have read, understood, and agree to be bound by these Terms of Service 
              and our Privacy Policy.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">✅ Legal Agreement</Badge>
              <Badge variant="outline">✅ Binding Contract</Badge>
              <Badge variant="outline">✅ Enforceable Terms</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}