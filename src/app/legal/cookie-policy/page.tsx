'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Cookie, 
  Shield, 
  Eye, 
  Settings,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      required: true,
      description: "Necessary for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas.",
      examples: ["Login authentication", "Shopping cart", "Security settings"]
    },
    {
      name: "Analytics Cookies",
      required: false,
      description: "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Google Analytics", "Page view statistics", "User behavior analysis"]
    },
    {
      name: "Marketing Cookies",
      required: false,
      description: "Used to track visitors across websites to display relevant advertisements based on their interests.",
      examples: ["Google Ads", "Facebook Pixel", "Retargeting campaigns"]
    },
    {
      name: "Preference Cookies",
      required: false,
      description: "Remember your settings and preferences to provide a personalized experience.",
      examples: ["Language settings", "Currency preferences", "Tyre size history"]
    }
  ]

  const yourRights = [
    "Accept or reject cookies based on type",
    "Withdraw consent at any time",
    "View stored cookies on your device",
    "Request deletion of your data",
    "Opt-out of targeted advertising"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Learn how we use cookies to enhance your experience and protect your privacy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🍪 Transparent
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🔒 Secure
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                👁️ Privacy-Focused
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-6 w-6 text-amber-600" />
                What Are Cookies?
              </CardTitle>
              <CardDescription>
                Cookies are small text files stored on your device when you visit websites. They help us provide you with a better browsing experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                At JaganNath Tyre, we use cookies to enhance your experience, analyze website traffic, and personalize content. 
                This policy explains what cookies are, how we use them, and your choices regarding their use.
              </p>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
            <div className="grid gap-4">
              {cookieTypes.map((cookie, index) => (
                <Card key={index} className={cookie.required ? 'border-l-4 border-l-green-500' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {cookie.required ? (
                          <Shield className="h-5 w-5 text-green-600" />
                        ) : (
                          <Settings className="h-5 w-5 text-blue-600" />
                        )}
                        <div>
                          <CardTitle className="text-lg">{cookie.name}</CardTitle>
                          {cookie.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription>{cookie.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{example}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-blue-600" />
                Your Cookie Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                You have full control over the cookies we place on your device. Here are your rights:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {yourRights.map((right, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{right}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Manage */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-600" />
                How to Manage Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Block all cookies or only third-party cookies</li>
                    <li>Delete existing cookies when you close your browser</li>
                    <li>Ask for permission before setting cookies</li>
                    <li>View and manage individual cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Our Cookie Banner</h4>
                  <p className="text-sm text-gray-700">
                    When you first visit our site, you'll see a cookie banner that allows you to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your cookie preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                Third-Party Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may use third-party services that set cookies on your device for analytics and marketing purposes:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-sm">Google Analytics</h5>
                  <p className="text-xs text-gray-600">Helps us understand how visitors use our website</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-sm">Google Ads</h5>
                  <p className="text-xs text-gray-600">Used for advertising and retargeting campaigns</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-sm">Facebook Pixel</h5>
                  <p className="text-xs text-gray-600">Helps measure the effectiveness of our advertising</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                Questions About Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about our cookie policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Email:</span>
                  <span className="text-sm text-gray-600">privacy@jagannathtyre.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Phone:</span>
                  <span className="text-sm text-gray-600">1800-123-4567</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Policy Updates</h3>
            <p className="text-sm text-gray-700">
              We may update this cookie policy from time to time to reflect changes in technology or regulations. 
              The updated policy will be posted on this page with a revised "Last Updated" date.
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