'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  Shield, 
  Info, 
  FileText,
  CheckCircle,
  Scale,
  Eye
} from 'lucide-react'

export default function DisclaimerPage() {
  const disclaimers = [
    {
      title: "Product Information",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      content: [
        "All product specifications, prices, and availability are subject to change without notice",
        "While we strive to provide accurate information, we cannot guarantee that all product details are complete, accurate, or current",
        "Product images are for illustrative purposes only and may differ from actual products",
        "Tyre performance may vary based on vehicle type, driving conditions, and maintenance"
      ]
    },
    {
      title: "Pricing and Payments",
      icon: <Scale className="h-6 w-6 text-green-600" />,
      content: [
        "Prices displayed on our website are in Indian Rupees (INR) and include applicable taxes",
        "We reserve the right to modify prices at any time without prior notice",
        "Payment processing times may vary depending on your bank and payment method",
        "All transactions are subject to our terms and conditions and privacy policy"
      ]
    },
    {
      title: "Service Availability",
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      content: [
        "Service availability may vary by location and time of day",
        "Emergency services are subject to weather conditions and resource availability",
        "Appointment times are estimates and may be affected by unforeseen circumstances",
        "We reserve the right to refuse service to anyone for any reason"
      ]
    },
    {
      title: "Technical Information",
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      content: [
        "Technical advice and recommendations are provided based on general information",
        "Always consult your vehicle's manual and a qualified mechanic for specific advice",
        "We are not responsible for damage resulting from improper installation or use",
        "Tyre compatibility should be verified with your vehicle manufacturer"
      ]
    }
  ]

  const limitations = [
    "Our liability is limited to the purchase price of the product or service",
    "We are not liable for indirect, incidental, or consequential damages",
    "Some jurisdictions do not allow the exclusion of implied warranties, so these limitations may not apply to you",
    "This disclaimer applies to the maximum extent permitted by law"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Legal Disclaimer
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Important information about the use of our website, products, and services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                ⚖️ Legal Protection
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                📋 Terms Apply
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🔍 Read Carefully
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <Card className="mb-8 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The information provided on this website is for general informational purposes only. 
                By using our website, products, and services, you agree to the terms and conditions outlined in this disclaimer.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer Sections */}
          <div className="space-y-6 mb-8">
            {disclaimers.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Limitation of Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-blue-600" />
                Limitation of Liability
              </CardTitle>
              <CardDescription>
                JaganNath Tyre shall not be liable for any damages arising from the use of our website, products, or services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{limitation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-600" />
                External Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>The content or accuracy of external websites</li>
                <li>The privacy practices of external websites</li>
                <li>Any damages or losses resulting from your use of external websites</li>
                <li>The availability or functionality of external websites</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Links to external websites do not constitute our endorsement or recommendation.
              </p>
            </CardContent>
          </Card>

          {/* Professional Advice */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Professional Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                The information provided on this website does not constitute professional advice. You should:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Consult with qualified professionals before making decisions</li>
                <li>Verify all information with appropriate experts</li>
                <li>Consider your specific circumstances and needs</li>
                <li>Seek independent advice where necessary</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibility */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                User Responsibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                By using our website, you agree to:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Use Information Responsibly</h5>
                  <p className="text-xs text-gray-600">Verify all information before making decisions</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Follow Safety Guidelines</h5>
                  <p className="text-xs text-gray-600">Adhere to all safety instructions and warnings</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Respect Intellectual Property</h5>
                  <p className="text-xs text-gray-600">Do not reproduce content without permission</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Comply with Laws</h5>
                  <p className="text-xs text-gray-600">Follow all applicable laws and regulations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-orange-600" />
                Questions About This Disclaimer?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about this disclaimer or our legal policies, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Legal Department:</span>
                  <span className="text-sm text-gray-600">legal@jagannathtyre.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Phone:</span>
                  <span className="text-sm text-gray-600">1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Address:</span>
                  <span className="text-sm text-gray-600">123 Industrial Area, Mumbai, Maharashtra 400001</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Policy Updates</h3>
            <p className="text-sm text-gray-700">
              This disclaimer may be updated from time to time to reflect changes in our business practices or legal requirements. 
              The updated disclaimer will be posted on this page with a revised "Last Updated" date.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Last Updated: January 15, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}