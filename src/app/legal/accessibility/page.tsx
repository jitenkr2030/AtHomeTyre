'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Accessibility, 
  Eye, 
  Keyboard, 
  Volume2, 
  Contrast,
  ZoomIn,
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      title: "Visual Accessibility",
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      features: [
        "High contrast color schemes",
        "Resizable text without breaking layout",
        "Clear, readable fonts",
        "Alternative text for all images",
        "Consistent navigation structure"
      ]
    },
    {
      title: "Motor Accessibility",
      icon: <Keyboard className="h-6 w-6 text-green-600" />,
      features: [
        "Full keyboard navigation",
        "Large click targets",
        "Sufficient time to complete tasks",
        "No flashing content that could cause seizures",
        "Predictable navigation patterns"
      ]
    },
    {
      title: "Hearing Accessibility",
      icon: <Volume2 className="h-6 w-6 text-purple-600" />,
      features: [
        "Closed captions for video content",
        "Transcripts for audio content",
        "Visual indicators for audio alerts",
        "Multiple ways to contact support",
        "Text alternatives for audio information"
      ]
    },
    {
      title: "Cognitive Accessibility",
      icon: <Contrast className="h-6 w-6 text-orange-600" />,
      features: [
        "Clear and simple language",
        "Consistent layout and design",
        "Help and error messages",
        "Multiple ways to complete tasks",
        "Avoidance of complex navigation"
      ]
    }
  ]

  const wcagCompliance = [
    {
      level: "WCAG 2.1 Level A",
      description: "Essential accessibility requirements for web content",
      status: "Fully Compliant",
      examples: ["Non-text content has alternatives", "All functionality is keyboard operable"]
    },
    {
      level: "WCAG 2.1 Level AA",
      description: "Addresses the major barriers for disabled users",
      status: "Fully Compliant", 
      examples: ["Color contrast is sufficient", "Text is resizable up to 200%"]
    },
    {
      level: "WCAG 2.1 Level AAA",
      description: "Enhanced accessibility for the best user experience",
      status: "Partially Compliant",
      examples: ["Sign language interpretation available", "Extended audio descriptions"]
    }
  ]

  const assistiveTechnologies = [
    {
      name: "Screen Readers",
      description: "Compatible with popular screen reading software",
      examples: ["JAWS", "NVDA", "VoiceOver", "TalkBack"],
      support: "Full Support"
    },
    {
      name: "Speech Recognition",
      description: "Works with voice command software",
      examples: ["Dragon NaturallySpeaking", "Windows Speech Recognition"],
      support: "Full Support"
    },
    {
      name: "Screen Magnifiers",
      description: "Functions properly with screen magnification tools",
      examples: ["ZoomText", "Magic", "Built-in browser zoom"],
      support: "Full Support"
    },
    {
      name: "Alternative Input Devices",
      description: "Supports various input methods beyond mouse and keyboard",
      examples: ["Head pointers", "Eye tracking", "Switch devices"],
      support: "Partial Support"
    }
  ]

  const testingMethods = [
    {
      method: "Automated Testing",
      description: "Using accessibility testing tools to identify issues",
      tools: ["WAVE", "AXE", "Lighthouse", "Siteimprove"]
    },
    {
      method: "Manual Testing",
      description: "Human evaluation of accessibility features",
      tools: ["Keyboard navigation", "Screen reader testing", "Color contrast analysis"]
    },
    {
      method: "User Testing",
      description: "Testing with people with disabilities",
      tools: ["User feedback sessions", "Accessibility audits", "Task completion testing"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Our commitment to making JaganNath Tyre accessible to everyone, regardless of ability
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                ♿ Inclusive Design
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🌐 Universal Access
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🔍 WCAG Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-6 w-6 text-green-600" />
                Our Accessibility Commitment
              </CardTitle>
              <CardDescription>
                JaganNath Tyre is committed to ensuring digital accessibility for people with disabilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We believe that everyone should have equal access to our products and services, regardless of their abilities. 
                We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
            </CardContent>
          </Card>

          {/* Accessibility Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {accessibilityFeatures.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* WCAG Compliance */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">WCAG 2.1 Compliance</h2>
            <div className="space-y-4">
              {wcagCompliance.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.level}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <Badge variant={item.status === "Fully Compliant" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {item.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Assistive Technologies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Assistive Technology Support</h2>
            <div className="grid gap-4">
              {assistiveTechnologies.map((tech, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                        <CardDescription>{tech.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className={tech.support === "Full Support" ? "text-green-600 border-green-600" : "text-yellow-600 border-yellow-600"}>
                        {tech.support}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tech.examples.map((example, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testing Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ZoomIn className="h-6 w-6 text-blue-600" />
                Accessibility Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {testingMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{method.method}</h4>
                    <p className="text-sm text-gray-700 mb-3">{method.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {method.tools.map((tool, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browser and Device Support */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-6 w-6 text-purple-600" />
                Browser and Device Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Supported Browsers</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Chrome (latest 2 versions)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Firefox (latest 2 versions)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Safari (latest 2 versions)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Edge (latest 2 versions)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Supported Devices</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Desktop computers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Laptop computers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Tablet devices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Smartphone devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Help */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                Need Accessibility Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you experience any difficulty accessing our website or services, or if you have suggestions 
                for improving accessibility, please contact us:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm mb-1">Phone Support</h5>
                  <p className="text-xs text-gray-600">1800-123-4567</p>
                  <p className="text-xs text-gray-500">Monday-Saturday, 9AM-6PM</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm mb-1">Email Support</h5>
                  <p className="text-xs text-gray-600">accessibility@jagannathtyre.com</p>
                  <p className="text-xs text-gray-500">24-48 hour response</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm mb-1">Live Chat</h5>
                  <p className="text-xs text-gray-600">Available on website</p>
                  <p className="text-xs text-gray-500">Monday-Friday, 9AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Commitment */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Our Ongoing Commitment</h3>
            <p className="text-sm text-gray-700 mb-3">
              We are committed to maintaining and improving accessibility across our digital platforms. 
              Our accessibility efforts include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Regular accessibility audits and testing</li>
              <li>Training for our development and content teams</li>
              <li>Incorporating accessibility into our design and development processes</li>
              <li>Listening to feedback from users with disabilities</li>
              <li>Staying current with evolving accessibility standards and best practices</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3">
              This accessibility statement was last updated on January 15, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}