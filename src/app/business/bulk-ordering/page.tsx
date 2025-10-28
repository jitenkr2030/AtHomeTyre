'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ShoppingCart, 
  Package, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator,
  Truck,
  CreditCard,
  FileText,
  ArrowRight
} from 'lucide-react'

interface BulkOrderItem {
  id: string
  name: string
  brand: string
  price: number
  b2bPrice: number
  quantity: number
  stock: number
}

export default function BulkOrderPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderItems, setOrderItems] = useState<BulkOrderItem[]>([
    {
      id: '1',
      name: 'Fuel Efficient',
      brand: 'Apollo',
      price: 4500,
      b2bPrice: 3800,
      quantity: 10,
      stock: 50
    },
    {
      id: '2',
      name: 'All Season',
      brand: 'MRF',
      price: 5200,
      b2bPrice: 4400,
      quantity: 15,
      stock: 30
    },
    {
      id: '3',
      name: 'High Performance',
      brand: 'JK Tyre',
      price: 6800,
      b2bPrice: 5800,
      quantity: 8,
      stock: 25
    }
  ])

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'DEALER') {
      router.push('/dealer-login')
      return
    }
  }, [session, status, router])

  const updateQuantity = (id: string, newQuantity: number) => {
    setOrderItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, Math.min(newQuantity, item.stock)) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setOrderItems(items => items.filter(item => item.id !== id))
  }

  const getTotalItems = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalRetail = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getTotalB2B = () => {
    return orderItems.reduce((sum, item) => sum + (item.b2bPrice * item.quantity), 0)
  }

  const getTotalSavings = () => {
    return getTotalRetail() - getTotalB2B()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/order-confirmation')
    } catch (error) {
      console.error('Error placing order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading bulk ordering...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'DEALER') {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bulk Ordering</h1>
              <p className="text-gray-600 mt-1">Place bulk orders with exclusive dealer pricing</p>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              Dealer Portal
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.brand}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.price)}
                                </span>
                                <span className="text-sm font-medium text-green-600">
                                  {formatPrice(item.b2bPrice)}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.stock} in stock
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                              className="w-16 text-center"
                              min="0"
                              max={item.stock}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Products
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium">{getTotalItems()} tyres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retail Value</span>
                    <span className="font-medium">{formatPrice(getTotalRetail())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dealer Price</span>
                    <span className="font-medium text-green-600">{formatPrice(getTotalB2B())}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Your Savings</span>
                    <span className="text-green-600">{formatPrice(getTotalSavings())}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-yellow-600">{formatPrice(getTotalB2B())}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                    onClick={handlePlaceOrder}
                    disabled={loading || getTotalItems() === 0}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        Place Bulk Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bulk Ordering Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Special Pricing</p>
                    <p className="text-xs text-gray-600">Exclusive dealer rates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders above 50 tyres</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Easy Invoicing</p>
                    <p className="text-xs text-gray-600">Digital invoices & GST bills</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Priority Processing</p>
                    <p className="text-xs text-gray-600">Fast order fulfillment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Order Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Minimum Order</p>
                  <p className="text-gray-600">10 tyres per order</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery Time</p>
                  <p className="text-gray-600">3-5 business days</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment Terms</p>
                  <p className="text-gray-600">Credit facility available</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Return Policy</p>
                  <p className="text-gray-600">30 days return window</p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Bulk Order Support</p>
                  <p className="text-gray-600">1800-123-4567</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">bulk@athometyre.com</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Chat with Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}