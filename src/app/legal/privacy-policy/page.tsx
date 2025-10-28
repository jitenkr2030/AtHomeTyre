'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Shield, Eye, Lock, Database, FileText, Mail, Phone, Calendar, MapPin, CreditCard } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            At Home Tyre is committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What We Collect</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Personal identification information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Contact and location details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment and transaction information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Browsing and usage data</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">How We Protect</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Secure data storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Compliance with regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Policy */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
              <CardDescription>
                We collect information to provide you with better service and improve your shopping experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="personal">
                  <AccordionTrigger>Personal Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p>When you create an account or place an order, we collect:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Full name and contact details</li>
                        <li>Email address and phone number</li>
                        <li>Shipping and billing addresses</li>
                        <li>Vehicle information for tyre recommendations</li>
                        <li>Payment information (processed securely by payment gateways)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="automatically">
                  <AccordionTrigger>Automatically Collected Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p>We automatically collect certain information when you visit our website:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>IP address and browser information</li>
                        <li>Pages visited and time spent on our site</li>
                        <li>Device type and operating system</li>
                        <li>Referring websites and search terms</li>
                        <li>Location data (with your consent)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cookies">
                  <AccordionTrigger>Cookies and Tracking Technologies</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p>We use cookies and similar technologies to:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Remember your preferences and login information</li>
                        <li>Analyze website traffic and user behavior</li>
                        <li>Provide personalized product recommendations</li>
                        <li>Process payments and prevent fraud</li>
                        <li>Improve our website functionality</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        You can manage cookie preferences through your browser settings.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
              <CardDescription>
                We use your information to provide, maintain, and improve our services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Service Provision</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support</li>
                    <li>Send order confirmations and updates</li>
                    <li>Manage your account and preferences</li>
                    <li>Offer personalized product recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Communication</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Send promotional offers and newsletters</li>
                    <li>Provide important service announcements</li>
                    <li>Respond to your inquiries and feedback</li>
                    <li>Conduct customer satisfaction surveys</li>
                    <li>Share relevant product information</li>
                  </ul>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Analytics and Improvement</h4>
                <p className="text-sm text-blue-700">
                  We use aggregated and anonymized data to analyze trends, improve our website, 
                  develop new features, and enhance the overall customer experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
              <CardDescription>
                We do not sell your personal information. We share it only in specific circumstances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">We may share your information with:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Payment Processors:</strong> To process your payments securely</li>
                    <li><strong>Shipping Partners:</strong> To deliver your orders</li>
                    <li><strong>Service Providers:</strong> For website hosting, analytics, and customer support</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Partners:</strong> With your explicit consent</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Data Security</h4>
                  <p className="text-sm text-green-700">
                    All third parties we work with are contractually obligated to protect your data 
                    and use it only for the purposes we specify.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
              <CardDescription>
                We implement robust security measures to protect your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Technical Security</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>256-bit SSL encryption for data transmission</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure data centers with 24/7 monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span>Regular security audits and penetration testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Compliance with industry security standards</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Organizational Security</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Strict access controls and authentication</li>
                    <li>Employee training on data protection</li>
                    <li>Confidentiality agreements with staff</li>
                    <li>Incident response and breach notification procedures</li>
                    <li>Regular security awareness programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights</CardTitle>
              <CardDescription>
                You have certain rights regarding your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">You have the right to:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Rectify:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Delete:</strong> Request deletion of your personal information</li>
                    <li><strong>Restrict:</strong> Limit how we use your information</li>
                    <li><strong>Port:</strong> Transfer your data to another service</li>
                    <li><strong>Object:</strong> Object to certain types of processing</li>
                    <li><strong>Withdraw Consent:</strong> Remove consent for specific processing</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">How to Exercise Your Rights</h4>
                  <p className="text-sm text-yellow-700">
                    To exercise any of these rights, please contact us at privacy@athometyre.com 
                    or call our privacy helpline at 1800-123-4567. We'll respond within 30 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. International Data Transfers</CardTitle>
              <CardDescription>
                Information about how we handle data across borders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                At Home Tyre is based in India and primarily processes data within India. 
                However, we may transfer your personal information to service providers located in other countries.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Safeguards for International Transfers</h4>
                <p className="text-sm text-blue-700">
                  When we transfer data internationally, we ensure appropriate safeguards are in place, 
                  including standard contractual clauses approved by data protection authorities and 
                  compliance with applicable data protection laws.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
              <CardDescription>
                How long we keep your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We retain your personal information only as long as necessary to fulfill the purposes 
                  for which it was collected, including legal, accounting, or reporting requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Retention Periods</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Account information: Until account deletion</li>
                      <li>Order history: 7 years (for tax purposes)</li>
                      <li>Payment data: 7 years (for accounting)</li>
                      <li>Marketing communications: Until opt-out</li>
                      <li>Website analytics: 2 years</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automatic Deletion</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Guest user data: 90 days</li>
                      <li>Abandoned carts: 30 days</li>
                      <li>Failed orders: 7 days</li>
                      <li>Temporary files: 24 hours</li>
                      <li>Log files: 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
              <CardDescription>
                Our policy regarding children's personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Age Restriction</h4>
                <p className="text-sm text-red-700">
                  JaganNath Tyre is not intended for children under the age of 18. We do not knowingly 
                  collect personal information from children under 18. If we become aware that we have 
                  collected such information, we will take immediate steps to delete it.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to This Policy</CardTitle>
              <CardDescription>
                How we notify you about changes to our privacy policy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li>Posting the new policy on this page</li>
                <li>Updating the "Last updated" date at the top</li>
                <li>Sending you an email notification for significant changes</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Review Period</h4>
                <p className="text-sm text-purple-700">
                  We encourage you to review this privacy policy periodically to stay informed about 
                  how we are protecting your personal information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
              <CardDescription>
                How to reach us with privacy concerns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Privacy Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">privacy@jagannathtyre.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          123 Tyre Street, Mumbai, Maharashtra 400001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Grievance Officer</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you have concerns about how we handle your personal information, 
                    you can also contact our Data Protection Officer:
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-medium text-sm">Mr. Rajesh Kumar</p>
                    <p className="text-xs text-muted-foreground">Data Protection Officer</p>
                    <p className="text-xs text-muted-foreground">dpo@jagannathtyre.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Badges */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Compliance & Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm py-2 px-4">
              🔒 ISO 27001 Certified
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              🛡️ GDPR Compliant
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              📋 PCI DSS Compliant
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              🇮🇳 IT Act Compliant
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}