'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Calendar, User, Eye, Heart, MessageCircle, Share2, Clock, TrendingUp } from 'lucide-react'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Choosing the Right Tyres for Your Car",
      excerpt: "Everything you need to know about selecting the perfect tyres for your vehicle, including size, type, and performance considerations.",
      author: "Rajesh Kumar",
      date: "January 15, 2024",
      category: "Buying Guide",
      tags: ["Tyres", "Car Maintenance", "Safety"],
      readTime: "8 min read",
      image: "/api/placeholder/400/200",
      likes: 245,
      comments: 32,
      views: 1520,
      featured: true
    },
    {
      id: 2,
      title: "Electric Vehicle Tyres: What Makes Them Different?",
      excerpt: "Discover the unique features of EV tyres and why they're essential for electric vehicle performance and efficiency.",
      author: "Priya Sharma",
      date: "January 12, 2024",
      category: "Technology",
      tags: ["Electric Vehicles", "Tyre Technology", "Innovation"],
      readTime: "6 min read",
      image: "/api/placeholder/400/200",
      likes: 189,
      comments: 28,
      views: 1240,
      featured: true
    },
    {
      id: 3,
      title: "5 Signs It's Time to Replace Your Tyres",
      excerpt: "Learn to identify the warning signs that indicate your tyres need replacement to ensure your safety on the road.",
      author: "Amit Patel",
      date: "January 10, 2024",
      category: "Maintenance",
      tags: ["Tyre Safety", "Maintenance", "Warning Signs"],
      readTime: "5 min read",
      image: "/api/placeholder/400/200",
      likes: 167,
      comments: 41,
      views: 980,
      featured: false
    },
    {
      id: 4,
      title: "Summer vs Winter Tyres: Which One Do You Need?",
      excerpt: "Understanding the differences between summer and winter tyres and how to choose the right ones for your driving conditions.",
      author: "Sneha Reddy",
      date: "January 8, 2024",
      category: "Seasonal",
      tags: ["Seasonal Tyres", "Weather", "Driving Safety"],
      readTime: "7 min read",
      image: "/api/placeholder/400/200",
      likes: 134,
      comments: 23,
      views: 876,
      featured: false
    },
    {
      id: 5,
      title: "The Future of Sustainable Tyres: Eco-Friendly Innovations",
      excerpt: "Exploring the latest innovations in sustainable tyre technology and how they're shaping the future of the automotive industry.",
      author: "Vikram Mehta",
      date: "January 5, 2024",
      category: "Sustainability",
      tags: ["Eco-Friendly", "Sustainability", "Innovation"],
      readTime: "10 min read",
      image: "/api/placeholder/400/200",
      likes: 298,
      comments: 45,
      views: 2100,
      featured: true
    },
    {
      id: 6,
      title: "Tyre Pressure 101: Maintaining Optimal Performance",
      excerpt: "A comprehensive guide to understanding and maintaining proper tyre pressure for better performance, safety, and fuel efficiency.",
      author: "Neha Gupta",
      date: "January 3, 2024",
      category: "Maintenance",
      tags: ["Tyre Pressure", "Performance", "Fuel Efficiency"],
      readTime: "6 min read",
      image: "/api/placeholder/400/200",
      likes: 156,
      comments: 19,
      views: 745,
      featured: false
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'buying-guide', label: 'Buying Guide' },
    { value: 'technology', label: 'Technology' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'sustainability', label: 'Sustainability' }
  ]

  const popularTags = [
    { value: 'all', label: 'All Tags' },
    { value: 'tyres', label: 'Tyres' },
    { value: 'safety', label: 'Safety' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'electric-vehicles', label: 'Electric Vehicles' },
    { value: 'innovation', label: 'Innovation' }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().replace(' ', '-') === selectedCategory
    const matchesTag = selectedTag === 'all' || 
                       post.tags.some(tag => tag.toLowerCase().replace(' ', '-') === selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">JaganNath Tyre Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert insights, tips, and latest news about tyres, vehicle maintenance, and automotive technology. 
            Stay informed and make better decisions for your vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              📝 Expert Articles
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🔧 Practical Tips
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              🚗 Latest Trends
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              💡 Industry Insights
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                {popularTags.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button className="w-full">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{filteredPosts.length} articles</Badge>
              <Badge variant="outline">
                <TrendingUp className="h-4 w-4 mr-1" />
                Trending
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-600"></div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest articles, expert tips, and exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Join 10,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Card key={category.value} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium">{category.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {blogPosts.filter(post => post.category.toLowerCase().replace(' ', '-') === category.value).length} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}