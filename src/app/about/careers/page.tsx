'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Briefcase, MapPin, Clock, DollarSign, Users, Award, TrendingUp, Building2, Star, CheckCircle } from 'lucide-react'

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: '',
    message: ''
  })

  const jobOpenings = [
    {
      title: 'Senior Sales Manager',
      department: 'Sales',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '5+ years',
      salary: '₹8-12 LPA',
      description: 'Lead our sales team and drive business growth across India.',
      requirements: ['MBA preferred', '5+ years in sales', 'Team leadership experience', 'Automotive industry knowledge'],
      skills: ['Sales Strategy', 'Team Management', 'Business Development', 'CRM Software']
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3+ years',
      salary: '₹6-9 LPA',
      description: 'Drive our digital marketing initiatives and online presence.',
      requirements: ['Bachelor\'s degree in Marketing', '3+ years digital marketing experience', 'Google Analytics certified', 'SEO/SEM expertise'],
      skills: ['SEO/SEM', 'Content Marketing', 'Social Media', 'Google Analytics']
    },
    {
      title: 'Customer Service Representative',
      department: 'Customer Service',
      location: 'Delhi',
      type: 'Full-time',
      experience: '2+ years',
      salary: '₹3-5 LPA',
      description: 'Provide exceptional customer support and resolve customer inquiries.',
      requirements: ['Excellent communication skills', '2+ years customer service experience', 'Problem-solving abilities', 'Automotive knowledge preferred'],
      skills: ['Communication', 'Problem Solving', 'CRM', 'Product Knowledge']
    },
    {
      title: 'Warehouse Manager',
      department: 'Operations',
      location: 'Pune',
      type: 'Full-time',
      experience: '4+ years',
      salary: '₹5-8 LPA',
      description: 'Manage warehouse operations and inventory control.',
      requirements: ['Supply chain management experience', '4+ years in warehouse operations', 'Knowledge of inventory systems', 'Team management skills'],
      skills: ['Inventory Management', 'Team Leadership', 'Logistics', 'Quality Control']
    },
    {
      title: 'UI/UX Designer',
      department: 'Technology',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '3+ years',
      salary: '₹7-10 LPA',
      description: 'Design intuitive and engaging user interfaces for our digital platforms.',
      requirements: ['Portfolio showcasing design work', '3+ years UI/UX experience', 'Proficiency in design tools', 'Understanding of user-centered design'],
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research']
    },
    {
      title: 'Business Development Executive',
      department: 'Business Development',
      location: 'Chennai',
      type: 'Full-time',
      experience: '3+ years',
      salary: '₹5-8 LPA',
      description: 'Identify and develop new business opportunities and partnerships.',
      requirements: ['MBA preferred', '3+ years business development experience', 'Strong negotiation skills', 'Automotive industry knowledge'],
      skills: ['Business Development', 'Partnership Building', 'Market Research', 'Presentation Skills']
    }
  ]

  const benefits = [
    {
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family',
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Flexible Working',
      description: 'Hybrid work options and flexible hours',
      icon: Clock,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Growth Opportunities',
      description: 'Clear career progression and development programs',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Great Culture',
      description: 'Collaborative and inclusive work environment',
      icon: Users,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Learning & Development',
      description: 'Continuous learning and skill enhancement',
      icon: Award,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Careers at JaganNath Tyre</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our team and be part of India's leading tyre retail company. We're looking for passionate 
            individuals who want to make a difference and grow with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏢 500+ Employees
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📍 10+ Locations
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚀 Growing Fast
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              ⭐ Great Culture
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="openings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="openings">Job Openings</TabsTrigger>
            <TabsTrigger value="benefits">Benefits & Culture</TabsTrigger>
            <TabsTrigger value="apply">Apply Now</TabsTrigger>
          </TabsList>

          <TabsContent value="openings" className="mt-8">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
                <p className="text-lg text-muted-foreground">
                  Explore exciting career opportunities across various departments
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobOpenings.map((job, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-2">{job.department} Department</CardDescription>
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-gray-500" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Key Requirements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {job.requirements.slice(0, 3).map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Key Skills:</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
                <p className="text-lg text-muted-foreground">
                  We offer more than just a job - we offer a career with purpose and growth
                </p>
              </div>

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

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Our Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">Our Values</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Customer First</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Innovation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Integrity</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Teamwork</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Excellence</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Work Environment</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <span>Modern offices</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span>Collaborative teams</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span>Fun activities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span>Growth opportunities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-red-600" />
                          <span>Work-life balance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apply" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for Position</CardTitle>
                    <CardDescription>
                      Fill out the form below to apply for any of our open positions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div>
                          <Label htmlFor="position">Position Applied For *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              {jobOpenings.map((job, index) => (
                                <SelectItem key={index} value={job.title}>
                                  {job.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience *</Label>
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
                        <Label htmlFor="resume">Resume/CV *</Label>
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload your resume in PDF, DOC, or DOCX format (Max 5MB)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="message">Cover Letter</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us why you're the perfect fit for this role..."
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
                    <CardTitle className="text-lg">Recruitment Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Application Review</h4>
                          <p className="text-xs text-muted-foreground">3-5 business days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Initial Screening</h4>
                          <p className="text-xs text-muted-foreground">Phone/Video call</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Technical Interview</h4>
                          <p className="text-xs text-muted-foreground">With department head</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Final Interview</h4>
                          <p className="text-xs text-muted-foreground">With senior management</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          5
                        </div>
                        <div>
                          <h4 className="font-medium">Offer & Onboarding</h4>
                          <p className="text-xs text-muted-foreground">Welcome to the team!</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact HR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">careers@jagannathtyre.com</p>
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">1800-123-4567 ext. 123</p>
                      </div>
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM</p>
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