'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Truck, Users, Calculator, TrendingUp, Shield, Clock, MapPin, Phone, Mail, FileText, CheckCircle, Star, Wrench } from 'lucide-react'

export default function FleetSolutionsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    fleetSize: '',
    vehicleTypes: '',
    currentTyreBrand: '',
    challenges: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Fleet solution inquiry submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fleetServices = [
    {
      title: "Fleet Tyre Management",
      description: "Comprehensive tyre management solutions for your entire fleet",
      icon: Truck,
      color: "bg-blue-100 text-blue-600",
      features: ["Tyre lifecycle tracking", "Performance monitoring", "Cost optimization", "Maintenance scheduling"]
    },
    {
      title: "Predictive Maintenance",
      description: "AI-powered predictive maintenance to prevent downtime",
      icon: Calculator,
      color: "bg-green-100 text-green-600",
      features: ["Wear pattern analysis", "Failure prediction", "Optimal replacement timing", "Cost savings"]
    },
    {
      title: "24/7 Roadside Assistance",
      description: "Round-the-clock support for fleet emergencies",
      icon: Shield,
      color: "bg-purple-100 text-purple-600",
      features: ["Emergency tyre service", "Mobile repair units", "Fast response times", "Nationwide coverage"]
    },
    {
      title: "Performance Analytics",
      description: "Detailed analytics and reporting on fleet performance",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
      features: ["Performance dashboards", "Cost analysis", "Efficiency metrics", "Custom reports"]
    }
  ]

  const fleetBenefits = [
    {
      title: "Reduce Operating Costs",
      description: "Save up to 25% on total tyre-related costs",
      icon: Calculator,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Minimize Downtime",
      description: "Keep your fleet on the road with proactive maintenance",
      icon: Clock,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Extend Tyre Life",
      description: "Maximize tyre lifespan with proper maintenance",
      icon: Truck,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Improve Safety",
      description: "Enhance fleet safety with quality tyres and monitoring",
      icon: Shield,
      color: "bg-red-100 text-red-600"
    }
  ]

  const caseStudies = [
    {
      company: "ABC Logistics",
      industry: "Transportation",
      fleetSize: "150 vehicles",
      challenges: ["High tyre costs", "Frequent breakdowns", "Unplanned downtime"],
      solutions: ["Fleet management system", "Predictive maintenance", "Emergency support"],
      results: ["23% cost reduction", "40% less downtime", "Improved driver satisfaction"]
    },
    {
      company: "City Express Delivery",
      industry: "Courier Service",
      fleetSize: "80 vehicles",
      challenges: ["Rapid tyre wear", "Maintenance delays", "Budget overruns"],
      solutions: ["Performance monitoring", "Scheduled maintenance", "Cost optimization"],
      results: ["18% longer tyre life", "35% fewer delays", "Better budget control"]
    },
    {
      company: "FarmFresh Co-op",
      industry: "Agriculture",
      fleetSize: "45 vehicles",
      challenges: ["Harsh conditions", "Limited maintenance access", "High replacement costs"],
      solutions: ["Heavy-duty tyres", "Mobile service", "Custom maintenance plans"],
      results: ["30% cost savings", "Reduced field breakdowns", "Improved reliability"]
    }
  ]

  const vehicleTypes = [
    { type: "Light Trucks", icon: Truck, description: "Pickups, vans, and light commercial vehicles" },
    { type: "Heavy Trucks", icon: Truck, description: "Semi-trucks, dump trucks, and heavy haulers" },
    { type: "Buses", icon: Users, description: "City buses, coaches, and passenger vehicles" },
    { type: "Specialized", icon: Wrench, description: "Construction, agricultural, and industrial vehicles" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Fleet Solutions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive tyre management solutions for fleets of all sizes. Optimize performance, 
            reduce costs, and keep your vehicles on the road.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚛 Fleet Management
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              💰 Cost Reduction
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔧 Maintenance
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📊 Analytics
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Our Services</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="contact">Get Started</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Comprehensive Fleet Services</h2>
                <p className="text-lg text-muted-foreground">
                  End-to-end tyre solutions designed specifically for fleet operations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fleetServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${service.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Service Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        1
                      </div>
                      <h4 className="font-semibold mb-2">Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Fleet evaluation and needs analysis
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        2
                      </div>
                      <h4 className="font-semibold mb-2">Customization</h4>
                      <p className="text-sm text-muted-foreground">
                        Tailored solution development
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        3
                      </div>
                      <h4 className="font-semibold mb-2">Implementation</h4>
                      <p className="text-sm text-muted-foreground">
                        System setup and integration
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        4
                      </div>
                      <h4 className="font-semibold mb-2">Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Ongoing monitoring and optimization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Why Choose Our Fleet Solutions?</h2>
                <p className="text-lg text-muted-foreground">
                  Transform your fleet operations with data-driven tyre management
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fleetBenefits.map((benefit, index) => {
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Technology Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Calculator className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">IoT Sensors</h4>
                          <p className="text-sm text-muted-foreground">
                            Real-time tyre pressure and temperature monitoring
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">AI Analytics</h4>
                          <p className="text-sm text-muted-foreground">
                            Predictive maintenance and performance optimization
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cloud Platform</h4>
                          <p className="text-sm text-muted-foreground">
                            Centralized fleet management and reporting
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Vehicle Types Supported</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vehicleTypes.map((vehicle, index) => {
                        const Icon = vehicle.icon
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <Icon className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{vehicle.type}</h4>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.description}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="case-studies" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                <p className="text-lg text-muted-foreground">
                  See how we've helped fleets like yours achieve remarkable results
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{study.industry}</Badge>
                        <Badge variant="secondary">{study.fleetSize}</Badge>
                      </div>
                      <CardTitle className="text-xl">{study.company}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Challenges</h4>
                          <ul className="space-y-1">
                            {study.challenges.map((challenge, challengeIndex) => (
                              <li key={challengeIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Our Solutions</h4>
                          <ul className="space-y-1">
                            {study.solutions.map((solution, solutionIndex) => (
                              <li key={solutionIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Results</h4>
                          <ul className="space-y-1">
                            {study.results.map((result, resultIndex) => (
                              <li key={resultIndex} className="text-sm text-green-600 flex items-center gap-2">
                                <Star className="h-3 w-3" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Fleet?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join hundreds of satisfied fleet operators who have reduced costs and improved efficiency with our solutions.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">25%</div>
                      <div className="text-sm text-muted-foreground">Average Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">40%</div>
                      <div className="text-sm text-muted-foreground">Less Downtime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">Fleets Managed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Fleet Solution Consultation</CardTitle>
                    <CardDescription>
                      Get a customized fleet tyre management solution for your business
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
                          <Label htmlFor="contactPerson">Contact Person *</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
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
                          <Label htmlFor="fleetSize">Fleet Size *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fleet size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 vehicles</SelectItem>
                              <SelectItem value="11-50">11-50 vehicles</SelectItem>
                              <SelectItem value="51-100">51-100 vehicles</SelectItem>
                              <SelectItem value="101-500">101-500 vehicles</SelectItem>
                              <SelectItem value="500+">500+ vehicles</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicleTypes">Primary Vehicle Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light-trucks">Light Trucks/Vans</SelectItem>
                              <SelectItem value="heavy-trucks">Heavy Trucks</SelectItem>
                              <SelectItem value="buses">Buses</SelectItem>
                              <SelectItem value="specialized">Specialized Vehicles</SelectItem>
                              <SelectItem value="mixed">Mixed Fleet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="currentTyreBrand">Current Tyre Brand</Label>
                        <Input
                          id="currentTyreBrand"
                          name="currentTyreBrand"
                          value={formData.currentTyreBrand}
                          onChange={handleChange}
                          placeholder="e.g., MRF, Apollo, JK Tyre"
                        />
                      </div>

                      <div>
                        <Label htmlFor="challenges">Current Challenges</Label>
                        <Textarea
                          id="challenges"
                          name="challenges"
                          rows={3}
                          value={formData.challenges}
                          onChange={handleChange}
                          placeholder="Describe your current fleet tyre challenges..."
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
                          placeholder="Any other information about your fleet requirements..."
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Request Consultation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fleet Solutions Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Dedicated Fleet Specialists</p>
                        <p className="text-sm text-muted-foreground">Experts in fleet management</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Direct Contact</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567 ext. 567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">fleet@jagannathtyre.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Free fleet analysis</span>
                        <Badge variant="outline">Yes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Custom quote</span>
                        <Badge variant="outline">24 hours</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Implementation support</span>
                        <Badge variant="outline">Included</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ongoing optimization</span>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Service Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Nationwide Coverage</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Our fleet solutions are available across India with service centers in all major cities.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">100+ service locations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">24/7 emergency support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Mobile service units</span>
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