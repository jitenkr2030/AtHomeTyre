'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Building, 
  Shield, 
  Star, 
  Truck, 
  Users, 
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

export default function DealerLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Redirect to dealer dashboard
        window.location.href = '/dealer'
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: 'Exclusive Dealer Pricing',
      description: 'Access to special dealer-only pricing and bulk discounts'
    },
    {
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      title: 'Priority Shipping',
      description: 'Fast and reliable shipping with priority handling for dealers'
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: 'Dedicated Support',
      description: '24/7 dedicated dealer support team for all your needs'
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: 'Marketing Materials',
      description: 'Access to marketing materials and promotional content'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">AH</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">At Home Tyre</span>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              Dealer Portal
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Dealer Login
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Access your exclusive dealer dashboard and unlock premium benefits
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    🏆 Premium Dealers
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    💰 Best Prices
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    🚚 Fast Delivery
                  </Badge>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">Why Partner With Us?</h3>
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {benefit.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Dealer Support: 1800-123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">dealers@athometyre.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Visit our dealer support center</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Building className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your dealer credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dealer@yourcompany.com"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In to Dealer Portal
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have a dealer account?{' '}
                      <a href="/business/become-dealer" className="text-blue-600 hover:text-blue-800 font-medium">
                        Become a Dealer
                      </a>
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                    <div className="space-y-2">
                      <a href="/business/become-dealer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <CheckCircle className="h-4 w-4" />
                        Become a Dealer
                      </a>
                      <a href="/business/bulk-ordering" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <Truck className="h-4 w-4" />
                        Bulk Ordering
                      </a>
                      <a href="/business/fleet-solutions" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <Users className="h-4 w-4" />
                        Fleet Solutions
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}