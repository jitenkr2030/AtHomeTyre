'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Building, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Truck,
  CreditCard,
  Settings,
  Eye,
  Download,
  BarChart3,
  Target,
  Award,
  Shield,
  Headphones,
  FileText,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

interface DealerStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  activeCustomers: number
  monthlyTarget: number
  monthlyAchieved: number
  creditUtilized: number
  creditLimit: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  status: string
  totalAmount: number
  createdAt: string
  items: number
}

interface DealerPerformance {
  tier: number
  totalVolume: number
  discountRate: number
  nextTierTarget: number
}

export default function DealerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DealerStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeCustomers: 0,
    monthlyTarget: 0,
    monthlyAchieved: 0,
    creditUtilized: 0,
    creditLimit: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [performance, setPerformance] = useState<DealerPerformance>({
    tier: 1,
    totalVolume: 0,
    discountRate: 0,
    nextTierTarget: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (session.user.role !== 'DEALER') {
      router.push('/')
      return
    }

    fetchDealerData()
  }, [session, status, router])

  const fetchDealerData = async () => {
    try {
      const response = await fetch('/api/dealer/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        
        // Set performance data
        if (session?.user?.dealerProfile) {
          setPerformance({
            tier: session.user.dealerProfile.tier || 1,
            totalVolume: data.totalOrders,
            discountRate: data.totalOrders > 50 ? 15 : data.totalOrders > 20 ? 10 : 5,
            nextTierTarget: (session.user.dealerProfile.tier || 1) < 5 ? (session.user.dealerProfile.tier || 1) * 25 : 100
          })
        } else {
          setPerformance({
            tier: 1,
            totalVolume: data.totalOrders,
            discountRate: data.totalOrders > 50 ? 15 : data.totalOrders > 20 ? 10 : 5,
            nextTierTarget: 25
          })
        }
      }

      // Fetch recent orders
      const ordersResponse = await fetch('/api/dealer/recent-orders')
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        setRecentOrders(ordersData)
      }
    } catch (error) {
      console.error('Error fetching dealer data:', error)
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

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-bronze-100 text-bronze-800'
      case 2: return 'bg-silver-100 text-silver-800'
      case 3: return 'bg-gold-100 text-gold-800'
      case 4: return 'bg-platinum-100 text-platinum-800'
      case 5: return 'bg-diamond-100 text-diamond-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierName = (tier: number) => {
    switch (tier) {
      case 1: return 'Bronze'
      case 2: return 'Silver'
      case 3: return 'Gold'
      case 4: return 'Platinum'
      case 5: return 'Diamond'
      default: return 'Bronze'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading dealer dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'DEALER') {
    return null // Will redirect in useEffect
  }

  const dealer = session.user.dealerProfile

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {session.user.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={dealer?.isVerified ? "default" : "secondary"}>
                {dealer?.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Dealer
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pending Verification
                  </>
                )}
              </Badge>
              <Badge className={getTierColor(dealer?.tier || 1)}>
                <Award className="h-3 w-3 mr-1" />
                {getTierName(dealer?.tier || 1)} Tier
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!dealer?.isVerified && (
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Your dealer account is pending verification. Please complete your business profile and submit required documents for verification.
            </AlertDescription>
          </Alert>
        )}

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
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Company Name</p>
                    <p className="text-gray-900">{dealer?.companyName || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">GST Number</p>
                    <p className="text-gray-900">{dealer?.gstNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credit Limit</p>
                    <p className="text-gray-900">{formatPrice(dealer?.creditLimit || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credit Utilized</p>
                    <p className="text-gray-900">{formatPrice(stats.creditUtilized || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business Address</p>
                    <p className="text-gray-900">{dealer?.businessAddress || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dealer Tier</p>
                    <p className="text-gray-900">{getTierName(dealer?.tier || 1)} (Level {dealer?.tier || 1})</p>
                  </div>
                </div>
                
                {!dealer?.isVerified && (
                  <div className="pt-4">
                    <Button 
                      className="bg-yellow-500 hover:bg-yellow-400 text-black"
                      onClick={() => router.push('/business/become-dealer')}
                    >
                      Complete Verification
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Target</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.monthlyTarget} Orders</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Achieved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.monthlyAchieved} Orders</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Discount Rate</p>
                    <p className="text-2xl font-bold text-blue-600">{performance.discountRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next Tier Target</p>
                    <p className="text-2xl font-bold text-purple-600">{performance.nextTierTarget} Orders</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Monthly Progress</span>
                    <span>{Math.round((stats.monthlyAchieved / stats.monthlyTarget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, Math.round((stats.monthlyAchieved / stats.monthlyTarget) * 100))}%` }}
                    ></div>
                  </div>
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
                          {order.customerName} • {order.items} items • {formatPrice(order.totalAmount)} • {formatDate(order.createdAt)}
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
                      <p>No recent orders</p>
                      <p className="text-sm">Your recent orders will appear here</p>
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
                  Place Bulk Order
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('/api/tyres?format=csv', '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Price List
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/customer-service/track-order')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Invoices
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/customer-service/track-order')}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Track Shipments
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/admin')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>

            {/* B2B Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>B2B Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Special Pricing</p>
                    <p className="text-xs text-gray-600">Up to {performance.discountRate}% discount</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Priority Shipping</p>
                    <p className="text-xs text-gray-600">Fast delivery guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Credit Facility</p>
                    <p className="text-xs text-gray-600">Flexible payment terms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Dedicated Support</p>
                    <p className="text-xs text-gray-600">Personal account manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Dealer Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Dealer Support</p>
                    <p className="text-xs text-gray-600">1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Email Support</p>
                    <p className="text-xs text-gray-600">dealers@athometyre.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Find Branch</p>
                    <p className="text-xs text-gray-600">Locate nearest branch</p>
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