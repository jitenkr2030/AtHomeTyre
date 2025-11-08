'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Code, Database, Globe, Shield, Zap, CheckCircle, FileText, Download, Copy, Key, Server, Cloud, Smartphone, Monitor, Mail } from 'lucide-react'

export default function APIIntegrationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    developerName: '',
    email: '',
    phone: '',
    businessType: '',
    integrationType: '',
    technicalRequirements: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('API integration inquiry submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const apiFeatures = [
    {
      title: "Product Catalog API",
      description: "Access our complete tyre catalog with real-time pricing and inventory",
      icon: Database,
      color: "bg-blue-100 text-blue-600",
      endpoints: ["GET /products", "GET /products/{id}", "GET /products/search", "GET /inventory"]
    },
    {
      title: "Order Management API",
      description: "Create and manage orders programmatically",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      endpoints: ["POST /orders", "GET /orders", "PUT /orders/{id}", "GET /orders/{id}/status"]
    },
    {
      title: "User Authentication API",
      description: "Integrate user authentication and management",
      icon: Key,
      color: "bg-purple-100 text-purple-600",
      endpoints: ["POST /auth/login", "POST /auth/register", "GET /users", "PUT /users/{id}"]
    },
    {
      title: "Payment Processing API",
      description: "Secure payment processing and transaction management",
      icon: Shield,
      color: "bg-orange-100 text-orange-600",
      endpoints: ["POST /payments", "GET /payments/{id}", "POST /refunds", "GET /transactions"]
    }
  ]

  const integrationBenefits = [
    {
      title: "Seamless Integration",
      description: "RESTful API with comprehensive documentation",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Real-time Data",
      description: "Live pricing and inventory information",
      icon: Globe,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime",
      icon: Shield,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Scalable Architecture",
      description: "Built to handle high-volume requests",
      icon: Server,
      color: "bg-blue-100 text-blue-600"
    }
  ]

  const useCases = [
    {
      title: "E-commerce Integration",
      description: "Integrate JaganNath Tyre products into your e-commerce platform",
      icon: Monitor,
      features: ["Product catalog sync", "Real-time pricing", "Order processing", "Inventory management"]
    },
    {
      title: "Mobile Applications",
      description: "Build mobile apps with our tyre data and services",
      icon: Smartphone,
      features: ["Native SDK support", "Offline capabilities", "Push notifications", "Location services"]
    },
    {
      title: "Fleet Management Systems",
      description: "Integrate tyre management into fleet software",
      icon: Database,
      features: ["Bulk ordering", "Fleet pricing", "Service scheduling", "Performance tracking"]
    },
    {
      title: "Business Intelligence",
      description: "Access data analytics and reporting for business insights",
      icon: Cloud,
      features: ["Sales analytics", "Market trends", "Performance metrics", "Custom reports"]
    }
  ]

  const codeExamples = [
    {
      language: "JavaScript",
      code: `// Get product catalog
const response = await fetch('https://api.jagannathtyre.com/v1/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const products = await response.json();

// Create order
const orderData = {
  products: [
    { id: 'tyre-123', quantity: 4 },
    { id: 'tyre-456', quantity: 2 }
  ],
  shipping_address: {
    name: 'John Doe',
    address: '123 Main St',
    city: 'Mumbai',
    state: 'MH',
    pincode: '400001'
  }
};

const orderResponse = await fetch('https://api.jagannathtyre.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(orderData)
});`
    },
    {
      language: "Python",
      code: `import requests
import json

# Configure API
API_KEY = 'YOUR_API_KEY'
BASE_URL = 'https://api.jagannathtyre.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# Get products
response = requests.get(f'{BASE_URL}/products', headers=headers)
products = response.json()

# Create order
order_data = {
    'products': [
        {'id': 'tyre-123', 'quantity': 4},
        {'id': 'tyre-456', 'quantity': 2}
    ],
    'shipping_address': {
        'name': 'John Doe',
        'address': '123 Main St',
        'city': 'Mumbai',
        'state': 'MH',
        'pincode': '400001'
    }
}

order_response = requests.post(
    f'{BASE_URL}/orders',
    headers=headers,
    json=order_data
)
order = order_response.json()`
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">API Integration</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Integrate JaganNath Tyre's powerful API into your applications and systems. 
            Access real-time data, manage orders, and create seamless customer experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔌 RESTful API
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📊 Real-time Data
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔒 Secure
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📚 Documentation
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">API Features</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="get-started">Get Started</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Powerful API for Your Business</h2>
                <p className="text-lg text-muted-foreground">
                  Build innovative applications and integrate seamlessly with JaganNath Tyre's platform
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {integrationBenefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${benefit.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                        <CardDescription>{benefit.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Key Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">Technical Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>RESTful API design</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>JSON/XML response formats</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>OAuth 2.0 authentication</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Rate limiting and throttling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Comprehensive error handling</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Business Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Real-time inventory data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Dynamic pricing information</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Order status tracking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Customer management</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Analytics and reporting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">API Features</h2>
                <p className="text-lg text-muted-foreground">
                  Explore our comprehensive API endpoints and capabilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${feature.color}`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-2">Available Endpoints:</h4>
                        <div className="space-y-1">
                          {feature.endpoints.map((endpoint, endpointIndex) => (
                            <div key={endpointIndex} className="flex items-center gap-2">
                              <Code className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-mono">{endpoint}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">API Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">REST</div>
                      <p className="text-sm text-muted-foreground">RESTful architecture</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">JSON</div>
                      <p className="text-sm text-muted-foreground">JSON/XML formats</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">HTTPS</div>
                      <p className="text-sm text-muted-foreground">Secure connections</p>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Authentication</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        OAuth 2.0 with API keys for secure access
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">API Key authentication</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm">OAuth 2.0 support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">JWT tokens</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Rate Limits</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Fair usage limits to ensure system stability
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Standard tier</span>
                          <Badge variant="outline">1000 req/hour</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Premium tier</span>
                          <Badge variant="outline">5000 req/hour</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Enterprise tier</span>
                          <Badge variant="outline">Custom limits</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="use-cases" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Common Use Cases</h2>
                <p className="text-lg text-muted-foreground">
                  See how businesses are using our API to build innovative solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => {
                  const Icon = useCase.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{useCase.title}</CardTitle>
                            <CardDescription>{useCase.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="font-medium mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {useCase.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">AutoTech Solutions</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Integrated our fleet management system with JaganNath Tyre API, resulting in 40% faster order processing."
                      </p>
                      <Badge variant="outline">Fleet Management</Badge>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">QuickCommerce</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Built a complete e-commerce platform using the API, with real-time inventory and pricing."
                      </p>
                      <Badge variant="outline">E-commerce</Badge>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">MobileFirst Apps</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Created a mobile app for tyre comparison and purchasing, serving 50K+ users."
                      </p>
                      <Badge variant="outline">Mobile App</Badge>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">DataInsights Pro</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Leveraged the API for market analytics and business intelligence reporting."
                      </p>
                      <Badge variant="outline">Analytics</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">API Documentation</h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive documentation to get you started quickly
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Quick Start Guide</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Step-by-step guide to make your first API call
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Read Guide
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">API Reference</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Complete API documentation with all endpoints
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Code className="h-4 w-4 mr-2" />
                          View Reference
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Learn about authentication methods
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Key className="h-4 w-4 mr-2" />
                          Auth Guide
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Sample Code</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Ready-to-use code samples in multiple languages
                        </p>
                        <div className="space-y-2">
                          {codeExamples.map((example, index) => (
                            <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                              <Code className="h-4 w-4 mr-2" />
                              {example.language}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">SDKs & Libraries</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Official SDKs for popular platforms
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Monitor className="h-4 w-4 mr-2" />
                            JavaScript SDK
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Server className="h-4 w-4 mr-2" />
                            Python SDK
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Mobile SDKs
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Interactive API Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">API Explorer</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try out our API endpoints directly in your browser
                    </p>
                    <Button>Launch API Explorer</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="get-started" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Get API Access</CardTitle>
                    <CardDescription>
                      Apply for API access and start building your integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="developerName">Developer Name *</Label>
                          <Input
                            id="developerName"
                            name="developerName"
                            value={formData.developerName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessType">Business Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                              <SelectItem value="fleet">Fleet Management</SelectItem>
                              <SelectItem value="mobile">Mobile App Developer</SelectItem>
                              <SelectItem value="analytics">Analytics Provider</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="integrationType">Integration Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select integration type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="catalog">Product Catalog</SelectItem>
                              <SelectItem value="orders">Order Management</SelectItem>
                              <SelectItem value="payments">Payment Processing</SelectItem>
                              <SelectItem value="users">User Management</SelectItem>
                              <SelectItem value="all">Full Integration</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="technicalRequirements">Technical Requirements</Label>
                        <Textarea
                          id="technicalRequirements"
                          name="technicalRequirements"
                          rows={3}
                          value={formData.technicalRequirements}
                          onChange={handleChange}
                          placeholder="Describe your technical requirements and expected usage..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any additional information about your integration needs..."
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Apply for API Access
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Developer</h4>
                          <Badge variant="outline">Free</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Perfect for testing and development
                        </p>
                        <div className="space-y-1 text-xs">
                          <div>• 1000 requests/hour</div>
                          <div>• Sandbox environment</div>
                          <div>• Basic support</div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Business</h4>
                          <Badge variant="outline">₹999/month</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          For small to medium businesses
                        </p>
                        <div className="space-y-1 text-xs">
                          <div>• 5000 requests/hour</div>
                          <div>• Production access</div>
                          <div>• Priority support</div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Enterprise</h4>
                          <Badge variant="outline">Custom</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          For large organizations with high volume
                        </p>
                        <div className="space-y-1 text-xs">
                          <div>• Custom limits</div>
                          <div>• Dedicated support</div>
                          <div>• SLA guarantee</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Documentation</p>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive guides and references
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Code Samples</p>
                          <p className="text-sm text-muted-foreground">
                            Ready-to-use examples
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">
                            api-support@jagannathtyre.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}