'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Users, TrendingUp, Award, Shield, Star, CheckCircle, FileText, Phone, Mail, MapPin } from 'lucide-react'

export default function BecomeDealerPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    businessType: '',
    currentBusiness: '',
    experience: '',
    investmentCapacity: '',
    spaceAvailable: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Dealer application submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const benefits = [
    {
      title: 'High Margins',
      description: 'Attractive profit margins on all tyre brands',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Brand Support',
      description: 'Marketing and promotional support from leading brands',
      icon: Award,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Training Programs',
      description: 'Comprehensive training for your staff',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Technology Tools',
      description: 'Access to our dealer management system',
      icon: Building2,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Exclusive Products',
      description: 'Access to exclusive tyre ranges and new launches',
      icon: Star,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team for all your needs',
      icon: Shield,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  const requirements = [
    {
      title: 'Business Space',
      items: [
        'Minimum 1000 sq. ft. showroom space',
        'Prime location with good visibility',
        'Adequate parking space for customers'
      ]
    },
    {
      title: 'Financial Requirements',
      items: [
        'Minimum investment capacity of ₹10 Lakhs',
        'Good credit history and financial stability',
        'Ability to maintain inventory levels'
      ]
    },
    {
      title: 'Experience & Skills',
      items: [
        'Prior experience in automotive/retail business preferred',
        'Basic knowledge of tyre products',
        'Strong customer service orientation'
      ]
    },
    {
      title: 'Documentation',
      items: [
        'Valid business registration certificate',
        'GST registration',
        'Trade license and other statutory documents'
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">Become an At Home Tyre Dealer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join India's leading tyre retail network and grow your business with our proven success model, 
            comprehensive support, and exclusive benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏆 500+ Active Dealers
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              💰 High Profit Margins
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📈 95% Success Rate
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚀 Rapid Growth
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="apply">Apply Now</TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Why Partner With Us?</CardTitle>
                <CardDescription className="text-center">
                  Discover the advantages of becoming an At Home Tyre dealer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${benefit.color}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Dealer Requirements</CardTitle>
                  <CardDescription className="text-center">
                    Check if you meet our partnership criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {requirements.map((req, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            {req.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {req.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">One-Time Investment</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Dealer Fee</span>
                          <Badge variant="outline">₹50,000</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Store Setup</span>
                          <Badge variant="outline">₹2-5 Lakhs</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Equipment & Tools</span>
                          <Badge variant="outline">₹1-2 Lakhs</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Initial Marketing</span>
                          <Badge variant="outline">₹50,000</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Working Capital</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Initial Inventory</span>
                          <Badge variant="outline">₹5-10 Lakhs</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Staff Salaries (3 months)</span>
                          <Badge variant="outline">₹1-2 Lakhs</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Rent & Utilities (3 months)</span>
                          <Badge variant="outline">₹1-3 Lakhs</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Miscellaneous</span>
                          <Badge variant="outline">₹50,000</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <p className="text-lg font-semibold">Total Investment Range: ₹10-25 Lakhs</p>
                    <p className="text-sm text-muted-foreground">Varies based on location and store size</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Partnership Process</CardTitle>
                <CardDescription className="text-center">
                  Simple, transparent, and efficient onboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Initial Application</h3>
                      <p className="text-muted-foreground mb-3">
                        Submit your dealer application form with all required details and documents.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2-3 Days</Badge>
                        <span className="text-sm text-muted-foreground">Processing time</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Document Verification</h3>
                      <p className="text-muted-foreground mb-3">
                        Our team will verify your business documents, financial capacity, and location suitability.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">5-7 Days</Badge>
                        <span className="text-sm text-muted-foreground">Verification time</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Site Visit & Interview</h3>
                      <p className="text-muted-foreground mb-3">
                        Our representative will visit your proposed location and conduct a personal interview.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">3-5 Days</Badge>
                        <span className="text-sm text-muted-foreground">Visit & interview</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Approval & Agreement</h3>
                      <p className="text-muted-foreground mb-3">
                        Upon successful verification, you'll receive approval and sign the dealer partnership agreement.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2-3 Days</Badge>
                        <span className="text-sm text-muted-foreground">Legal processing</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Training & Setup</h3>
                      <p className="text-muted-foreground mb-3">
                        Comprehensive training program and store setup assistance to get you operational.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">15-30 Days</Badge>
                        <span className="text-sm text-muted-foreground">Training & setup</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Grand Opening</h3>
                      <p className="text-muted-foreground mb-3">
                        Launch your JaganNath Tyre dealership with marketing support and promotional activities.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Day 1</Badge>
                        <span className="text-sm text-muted-foreground">Business starts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dealer Application Form</CardTitle>
                    <CardDescription>
                      Fill out the form below to apply for dealership
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="ownerName">Owner Name *</Label>
                          <Input
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
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

                      <div>
                        <Label htmlFor="address">Business Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                              <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                              <SelectItem value="gujarat">Gujarat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="proprietorship">Proprietorship</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="pvtltd">Private Limited</SelectItem>
                            <SelectItem value="ltd">Public Limited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="currentBusiness">Current Business (if any)</Label>
                        <Input
                          id="currentBusiness"
                          name="currentBusiness"
                          value={formData.currentBusiness}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 Years</SelectItem>
                            <SelectItem value="2-5">2-5 Years</SelectItem>
                            <SelectItem value="5-10">5-10 Years</SelectItem>
                            <SelectItem value="10+">10+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="investmentCapacity">Investment Capacity *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-15">₹10-15 Lakhs</SelectItem>
                            <SelectItem value="15-20">₹15-20 Lakhs</SelectItem>
                            <SelectItem value="20-25">₹20-25 Lakhs</SelectItem>
                            <SelectItem value="25+">₹25+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="spaceAvailable">Available Space (sq. ft.) *</Label>
                        <Input
                          id="spaceAvailable"
                          name="spaceAvailable"
                          value={formData.spaceAvailable}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Application
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Dealer Helpline</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">dealer@jagannathtyre.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Head Office</p>
                        <p className="text-sm text-muted-foreground">Mumbai, Maharashtra</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>Business Registration Certificate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>GST Registration Certificate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>PAN Card</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>Address Proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>Bank Statement (6 months)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>Property Documents (if owned)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-medium text-sm">Rajesh Tyres, Pune</p>
                        <p className="text-xs text-muted-foreground">
                          "Became a dealer in 2020, now 300% growth in 4 years"
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium text-sm">Shiva Automobiles, Delhi</p>
                        <p className="text-xs text-muted-foreground">
                          "Excellent support and high margins, best decision ever"
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-medium text-sm">Speedy Wheels, Bangalore</p>
                        <p className="text-xs text-muted-foreground">
                          "Comprehensive training made our startup smooth"
                        </p>
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