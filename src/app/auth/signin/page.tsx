'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Eye, 
  EyeOff, 
  Car, 
  Building, 
  Shield, 
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Get user session to check role
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin')
        } else if (session?.user?.role === 'DEALER') {
          router.push('/dealer')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <Car className="h-8 w-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">At Home Tyre</h1>
          <p className="text-gray-600">Premium Tyres for Every Journey</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
            <p className="text-gray-600">Access your account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-11 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-11 px-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Quick Access Options */}
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Or continue as:</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 flex flex-col items-center gap-1"
                    onClick={() => {
                      setEmail('demo@customer.com')
                      setPassword('demo123')
                    }}
                  >
                    <Car className="h-4 w-4" />
                    <span className="text-xs">Customer</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 flex flex-col items-center gap-1"
                    onClick={() => {
                      setEmail('demo@dealer.com')
                      setPassword('demo123')
                    }}
                  >
                    <Building className="h-4 w-4" />
                    <span className="text-xs">Dealer</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>Secure authentication powered by NextAuth</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <Link href="/auth/forgot-password" className="hover:text-yellow-600">
              Forgot Password?
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-yellow-600">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}