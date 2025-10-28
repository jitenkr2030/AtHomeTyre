'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  ShoppingCart, 
  Package, 
  Star, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Car,
  CreditCard,
  Settings,
  Eye,
  Download,
  Truck,
  Heart,
  History,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react'

interface CustomerStats {
  totalOrders: number
  totalSpent: number
  loyaltyPoints: number
  pendingOrders: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: string
  items: number
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate?: string
  currentTyreSpec?: string
}

export default function CustomerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<CustomerStats>({
    totalOrders: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    pendingOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (session.user.role !== 'CUSTOMER') {
      router.push('/')
      return
    }

    fetchCustomerData()
  }, [session, status, router])

  const fetchCustomerData = async () => {
    try {
      // Fetch customer stats
      const statsResponse = await fetch('/api/customer/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent orders
      const ordersResponse = await fetch('/api/customer/recent-orders')
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        setRecentOrders(ordersData)
      }

      // Fetch vehicles
      const vehiclesResponse = await fetch('/api/customer/vehicles')
      if (vehiclesResponse.ok) {
        const vehiclesData = await vehiclesResponse.json()
        setVehicles(vehiclesData)
      }
    } catch (error) {
      console.error('Error fetching customer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800'
      case 'PROCESSING': return 'bg-purple-100 text-purple-800'
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-800'
      case 'DELIVERED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading customer dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'CUSTOMER') {
    return null // Will redirect in useEffect
  }

  const customer = session.user.customerProfile

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {session.user.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                {customer?.loyaltyPoints || 0} Points
              </Badge>
              <Badge variant="default">
                <Star className="h-3 w-3 mr-1" />
                {customer?.loyaltyPoints > 1000 ? 'Gold' : customer?.loyaltyPoints > 500 ? 'Silver' : 'Bronze'} Member
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.loyaltyPoints}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Full Name</p>
                    <p className="text-gray-900">{session.user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Address</p>
                    <p className="text-gray-900">{session.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone Number</p>
                    <p className="text-gray-900">{session.user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                    <p className="text-gray-900">
                      {customer?.dateOfBirth ? formatDate(customer.dateOfBirth) : 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/auth/signin')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.length > 0 ? recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {order.items} items • {formatPrice(order.totalAmount)} • {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push(`/customer-service/track-order?order=${order.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No orders yet</p>
                      <p className="text-sm">Start shopping to see your orders here</p>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/customer-service/track-order')}
                  >
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  My Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vehicles.length > 0 ? vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                        <p className="text-sm text-gray-600">
                          {vehicle.year} • {vehicle.licensePlate || 'No plate'}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => router.push(`/tyre-finder?vehicle=${vehicle.id}`)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      <Car className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No vehicles added</p>
                      <p className="text-sm">Add your vehicles for better recommendations</p>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/tyre-finder')}
                  >
                    Add Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/tyres')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/tyres')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/service-booking')}
                >
                  <Car className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/customer-service/track-order')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoices
                </Button>
              </CardContent>
            </Card>

            {/* Customer Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Your Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Loyalty Rewards</p>
                    <p className="text-xs text-gray-600">Earn points on every purchase</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders above ₹5000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% secure transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Premium Support</p>
                    <p className="text-xs text-gray-600">24/7 customer service</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Customer Support</p>
                    <p className="text-xs text-gray-600">1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Email Support</p>
                    <p className="text-xs text-gray-600">support@athometyre.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Find Service Center</p>
                    <p className="text-xs text-gray-600">Locate nearest center</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}