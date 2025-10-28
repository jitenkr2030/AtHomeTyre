'use client'

import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Package, 
  Truck, 
  CreditCard, 
  MapPin,
  ArrowLeft,
  Download,
  Eye,
  Share,
  AlertCircle
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Order {
  id: string
  orderNumber: string
  totalAmount: number
  shippingAmount: number
  status: string
  paymentStatus: string
  paymentMethod: string
  shippingAddress: any
  billingAddress?: any
  notes?: string
  createdAt: string
  orderItems: Array<{
    id: string
    tyre: {
      name: string
      brand: {
        name: string
      }
      price: number
      width: number
      aspectRatio: number
      rimDiameter: number
    }
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    }>
      <OrderConfirmationWrapper />
    </Suspense>
  )
}

function OrderConfirmationWrapper() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return <OrderConfirmationContent orderId={orderId || ''} />
}

function OrderConfirmationContent({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId)
    }
  }, [orderId])

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
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
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'PENDING': { variant: 'secondary' as const, text: 'Pending' },
      'CONFIRMED': { variant: 'default' as const, text: 'Confirmed' },
      'PROCESSING': { variant: 'default' as const, text: 'Processing' },
      'SHIPPED': { variant: 'default' as const, text: 'Shipped' },
      'DELIVERED': { variant: 'default' as const, text: 'Delivered' },
      'CANCELLED': { variant: 'destructive' as const, text: 'Cancelled' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Order not found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find the order you're looking for
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => window.location.href = '/'}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Confirmation</h1>
                <p className="text-sm text-gray-600">
                  Thank you for your order!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-1">
                Order Placed Successfully!
              </h2>
              <p className="text-green-700">
                Your order #{order.orderNumber} has been confirmed and is being processed.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-medium">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      {getStatusBadge(order.status)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.tyre.brand.name} {item.tyre.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Size: {item.tyre.width}/{item.tyre.aspectRatio}R{item.tyre.rimDiameter}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.totalPrice)}</p>
                          <p className="text-sm text-gray-600">
                            {formatPrice(item.unitPrice)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-600">{order.shippingAddress.phone}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.addressLine1}
                      {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.totalAmount - (order.shippingAmount || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(order.shippingAmount || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Paid</span>
                        <span>{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span>Paid via {order.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Order Processing</p>
                      <p className="text-xs text-gray-600">We're preparing your order for shipment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Truck className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Shipping</p>
                      <p className="text-xs text-gray-600">You'll receive tracking information via email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Delivery</p>
                      <p className="text-xs text-gray-600">Estimated delivery: 2-4 business days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
                <Button variant="outline" className="w-full">
                  <Share className="h-4 w-4 mr-2" />
                  Share Order
                </Button>
              </div>

              {/* Continue Shopping */}
              <Button 
                onClick={() => window.location.href = '/tyres'} 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}