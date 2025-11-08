'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, FileText, Download, ExternalLink, Mail, Phone, Building2, Award, TrendingUp, Users } from 'lucide-react'

export default function PressPage() {
  const pressReleases = [
    {
      title: "JaganNath Tyre Launches Revolutionary Eco-Friendly Tyre Line",
      date: "January 15, 2024",
      excerpt: "Introducing India's first fully recyclable tyre range, reducing environmental impact while maintaining superior performance.",
      category: "Product Launch",
      image: "/api/placeholder/400/200"
    },
    {
      title: "JaganNath Tyre Expands to 100+ Cities Across India",
      date: "December 20, 2023",
      excerpt: "Marking a significant milestone in our growth journey, we now serve customers in over 100 cities nationwide.",
      category: "Expansion",
      image: "/api/placeholder/400/200"
    },
    {
      title: "JaganNath Tyre Wins 'Best Customer Service Award 2023'",
      date: "November 10, 2023",
      excerpt: "Recognized for exceptional customer service and innovative solutions in the automotive retail sector.",
      category: "Award",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Partnership with Leading Electric Vehicle Manufacturers",
      date: "October 5, 2023",
      excerpt: "Strategic collaboration to develop specialized tyres for the growing electric vehicle market in India.",
      category: "Partnership",
      image: "/api/placeholder/400/200"
    }
  ]

  const mediaCoverage = [
    {
      publication: "Economic Times",
      title: "How JaganNath Tyre is Revolutionizing the Indian Tyre Industry",
      date: "January 8, 2024",
      excerpt: "An in-depth look at the company's innovative approach and rapid growth in the competitive tyre market.",
      link: "#"
    },
    {
      publication: "Business Standard",
      title: "JaganNath Tyre's Digital Transformation Success Story",
      date: "December 15, 2023",
      excerpt: "How the company leveraged technology to become India's leading online tyre retailer.",
      link: "#"
    },
    {
      publication: "The Hindu",
      title: "Sustainable Practices: JaganNath Tyre's Green Initiative",
      date: "November 28, 2023",
      excerpt: "Exploring the company's commitment to environmental sustainability and eco-friendly practices.",
      link: "#"
    },
    {
      publication: "Forbes India",
      title: "Top 10 Fastest-Growing Companies in India 2023",
      date: "October 20, 2023",
      excerpt: "JaganNath Tyre featured among India's most promising growth companies.",
      link: "#"
    }
  ]

  const companyStats = [
    { label: "Years in Business", value: "25+" },
    { label: "Cities Served", value: "100+" },
    { label: "Happy Customers", value: "1M+" },
    { label: "Tyre Brands", value: "15+" },
    { label: "Service Centers", value: "500+" },
    { label: "Employees", value: "500+" }
  ]

  const pressKit = [
    {
      title: "Company Profile",
      description: "Comprehensive information about JaganNath Tyre",
      icon: Building2,
      link: "#"
    },
    {
      title: "Logo & Brand Assets",
      description: "Official logos and brand guidelines",
      icon: FileText,
      link: "#"
    },
    {
      title: "Executive Biographies",
      description: "Leadership team profiles and photos",
      icon: Users,
      link: "#"
    },
    {
      title: "Product Images",
      description: "High-quality product and facility images",
      icon: FileText,
      link: "#"
    },
    {
      title: "Financial Reports",
      description: "Annual reports and financial statements",
      icon: TrendingUp,
      link: "#"
    },
    {
      title: "Fact Sheet",
      description: "Quick facts and figures about the company",
      icon: FileText,
      link: "#"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Press Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Welcome to the JaganNath Tyre Press Center. Here you'll find the latest press releases, 
            media coverage, and resources for journalists and media professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📰 25+ Years of Excellence
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🏆 Award-Winning Service
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🌱 Sustainable Innovation
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚀 Rapid Growth
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="releases" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="releases">Press Releases</TabsTrigger>
            <TabsTrigger value="coverage">Media Coverage</TabsTrigger>
            <TabsTrigger value="resources">Press Resources</TabsTrigger>
            <TabsTrigger value="contact">Media Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="releases" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Latest Press Releases</h2>
                <p className="text-lg text-muted-foreground">
                  Stay updated with our latest announcements and company news
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pressReleases.map((release, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{release.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {release.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight">{release.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{release.excerpt}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coverage" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Media Coverage</h2>
                <p className="text-lg text-muted-foreground">
                  See what the media is saying about JaganNath Tyre
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {mediaCoverage.map((coverage, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-primary">{coverage.publication}</h3>
                          <p className="text-sm text-muted-foreground">{coverage.date}</p>
                        </div>
                        <Badge variant="outline">Featured</Badge>
                      </div>
                      <h4 className="text-xl font-semibold mb-3">{coverage.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{coverage.excerpt}</p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Press Resources</h2>
                <p className="text-lg text-muted-foreground">
                  Download press kits, logos, and company information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressKit.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Company at a Glance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {companyStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Media Contact</CardTitle>
                  <CardDescription>
                    For press inquiries, interviews, and media-related questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Press Office</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">press@jagannathtyre.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">1800-123-4567 ext. 234</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Working Hours</h4>
                    <div className="space-y-1 text-sm">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Response Time</h4>
                    <div className="space-y-1 text-sm">
                      <p>Urgent inquiries: Within 2 hours</p>
                      <p>Standard inquiries: Within 24 hours</p>
                      <p>Feature requests: Within 48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Quick Links</CardTitle>
                  <CardDescription>
                    Fast access to commonly requested information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">For Immediate Release</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Latest Press Release
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Award className="h-4 w-4 mr-2" />
                        Awards & Recognition
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Financial Results
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Media Assets</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Building2 className="h-4 w-4 mr-2" />
                        Company Photos
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Executive Headshots
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Product Catalog
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Need Immediate Assistance?</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      For urgent media inquiries outside business hours, please contact our emergency press line.
                    </p>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Press Line
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}