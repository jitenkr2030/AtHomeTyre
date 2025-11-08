'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Eye, 
  Database, 
  User,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText,
  Download
} from 'lucide-react'

export default function GDPRPage() {
  const dataRights = [
    {
      title: "Right to be Informed",
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      description: "You have the right to know what personal data we collect and how we use it.",
      details: "We provide clear, transparent information about our data processing activities."
    },
    {
      title: "Right of Access",
      icon: <Database className="h-6 w-6 text-green-600" />,
      description: "You can request a copy of all personal data we hold about you.",
      details: "We'll provide your data in a commonly used electronic format within 30 days."
    },
    {
      title: "Right to Rectification",
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      description: "You can ask us to correct inaccurate or incomplete personal data.",
      details: "We'll promptly update your information upon verification."
    },
    {
      title: "Right to Erasure",
      icon: <User className="h-6 w-6 text-red-600" />,
      description: "You can request deletion of your personal data in certain circumstances.",
      details: "We'll remove your data unless we have a legitimate reason to keep it."
    },
    {
      title: "Right to Restrict Processing",
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      description: "You can limit how we use your personal data.",
      details: "We'll mark your data as restricted and only process it with your consent."
    },
    {
      title: "Right to Data Portability",
      icon: <Download className="h-6 w-6 text-cyan-600" />,
      description: "You can obtain and reuse your personal data across different services.",
      details: "We'll provide your data in a machine-readable format."
    },
    {
      title: "Right to Object",
      icon: <AlertCircle className="h-6 w-6 text-yellow-600" />,
      description: "You can object to certain types of data processing.",
      details: "We'll stop processing your data unless we have compelling legitimate grounds."
    },
    {
      title: "Rights Related to Automated Decision Making",
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      description: "You have rights regarding automated decision-making and profiling.",
      details: "You can request human intervention or explanation for automated decisions."
    }
  ]

  const dataCategories = [
    {
      category: "Identity Data",
      examples: ["Name", "Email address", "Phone number", "Date of birth"],
      purpose: "Account management, customer service, order processing"
    },
    {
      category: "Contact Data",
      examples: ["Billing address", "Shipping address", "Emergency contact"],
      purpose: "Order fulfillment, delivery, customer communication"
    },
    {
      category: "Technical Data",
      examples: ["IP address", "Browser type", "Device information", "Cookies"],
      purpose: "Website functionality, security, analytics"
    },
    {
      category: "Transaction Data",
      examples: ["Order history", "Payment details", "Service bookings", "Product preferences"],
      purpose: "Order processing, service delivery, personalization"
    }
  ]

  const lawfulBases = [
    {
      basis: "Consent",
      description: "You have given clear, explicit consent for us to process your data",
      example: "Newsletter subscription, marketing preferences"
    },
    {
      basis: "Contract",
      description: "Processing is necessary to fulfill our contract with you",
      example: "Order processing, service delivery, account management"
    },
    {
      basis: "Legal Obligation",
      description: "We need to process your data to comply with legal requirements",
      example: "Tax records, anti-money laundering checks"
    },
    {
      basis: "Legitimate Interests",
      description: "Processing is necessary for our legitimate interests, provided it doesn't override your rights",
      example: "Fraud prevention, service improvement, direct marketing"
    },
    {
      basis: "Public Interest",
      description: "Processing is necessary for tasks in the public interest",
      example: "Public safety, health protection"
    },
    {
      basis: "Vital Interests",
      description: "Processing is necessary to protect someone's life",
      example: "Emergency contact information, medical data"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              GDPR Compliance
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Our commitment to protecting your personal data under the General Data Protection Regulation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🛡️ GDPR Compliant
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                🔒 Data Secure
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white border-white/30">
                👁️ Transparent
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
                <Shield className="h-6 w-6 text-blue-600" />
                Our GDPR Commitment
              </CardTitle>
              <CardDescription>
                JaganNath Tyre is committed to protecting your personal data and complying with the GDPR.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy 
                for individuals within the European Union. While we primarily operate in India, we extend GDPR-level 
                protections to all our customers worldwide, ensuring your data is handled with the utmost care and respect.
              </p>
            </CardContent>
          </Card>

          {/* Data Subject Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Data Subject Rights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {dataRights.map((right, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {right.icon}
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{right.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{right.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Data We Collect</h2>
            <div className="grid gap-4">
              {dataCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Examples:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {category.examples.map((example, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Purpose:</h4>
                        <p className="text-sm text-gray-600">{category.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Lawful Bases for Processing */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Lawful Bases for Processing</h2>
            <div className="grid gap-4">
              {lawfulBases.map((basis, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{basis.basis}</CardTitle>
                    <CardDescription>{basis.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      <strong>Example:</strong> {basis.example}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Data Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Technical Measures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      SSL/TLS encryption for all data transmission
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Secure server infrastructure with firewalls
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Regular security audits and penetration testing
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Secure data storage with access controls
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Organizational Measures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Employee training on data protection
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Strict access control policies
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Data protection officer designation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Incident response procedures
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-600" />
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may transfer your personal data to countries outside the European Economic Area (EEA) only when:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>The destination country has adequate data protection laws</li>
                <li>We use appropriate safeguards such as Standard Contractual Clauses</li>
                <li>You have given explicit consent for the transfer</li>
                <li>The transfer is necessary for contract performance</li>
              </ul>
              <p className="text-sm text-gray-700 mt-4">
                We ensure that any international transfers comply with GDPR requirements and that your data 
                continues to be protected to the same high standards.
              </p>
            </CardContent>
          </Card>

          {/* How to Exercise Your Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-purple-600" />
                How to Exercise Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  To exercise any of your data subject rights, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">Email:</span>
                      <span className="text-sm text-gray-600">privacy@jagannathtyre.com</span>
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
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">What to Include in Your Request:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Your full name and contact information</li>
                    <li>Clear description of your request</li>
                    <li>Proof of identity (if required)</li>
                    <li>Any relevant account or reference numbers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Breach Notification */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                Data Breach Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, 
                we will notify you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Without undue delay, and where feasible, within 72 hours of becoming aware of the breach</li>
                <li>With clear information about the nature of the breach and the categories of data concerned</li>
                <li>With likely consequences and the measures we're taking to address the breach</li>
                <li>With contact information for further details</li>
              </ul>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Policy Updates</h3>
            <p className="text-sm text-gray-700">
              This GDPR compliance statement may be updated from time to time to reflect changes in our practices 
              or applicable laws. The updated policy will be posted on this page with a revised "Last Updated" date.
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