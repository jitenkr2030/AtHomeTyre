'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ShoppingCart as ShoppingCartIcon, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface CartItem {
  id: string
  userId: string
  tyreId: string
  quantity: number
  createdAt: string
  updatedAt: string
  tyre: {
    id: string
    name: string
    description?: string
    category: string
    price: number
    b2bPrice?: number
    stock: number
    images?: string
    features?: string
    fuelEfficiency?: number
    wetGrip?: number
    noiseLevel?: number
    warranty?: number
    width: number
    aspectRatio: number
    rimDiameter: number
    speedRating?: string
    loadIndex?: number
    brand: {
      id: string
      name: string
      logo?: string
    }
    avgRating: number
    reviewCount: number
  }
}

interface CartSummary {
  subtotal: number
  totalItems: number
  itemCount: number
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [summary, setSummary] = useState<CartSummary>({ subtotal: 0, totalItems: 0, itemCount: 0 })
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState<string[]>([])
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Get or create user ID from localStorage - only run on client side
    if (typeof window !== 'undefined') {
      let storedUserId = localStorage.getItem('userId')
      if (!storedUserId) {
        storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('userId', storedUserId)
      }
      setUserId(storedUserId)
      fetchCart(storedUserId)
    }
  }, [])

  const fetchCart = async (userId: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/cart', {
        headers: {
          'x-user-id': userId
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.cartItems || [])
        setSummary(data.summary || { subtotal: 0, totalItems: 0, itemCount: 0 })
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdating(prev => [...prev, cartItemId])
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({
          cartItemId,
          quantity: newQuantity
        })
      })

      if (response.ok) {
        await fetchCart(userId)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setUpdating(prev => prev.filter(id => id !== cartItemId))
    }
  }

  const removeItem = async (cartItemId: string) => {
    setUpdating(prev => [...prev, cartItemId])
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({
          cartItemId
        })
      })

      if (response.ok) {
        await fetchCart(userId)
      }
    } catch (error) {
      console.error('Error removing item:', error)
    } finally {
      setUpdating(prev => prev.filter(id => id !== cartItemId))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getStockBadge = (stock: number, quantity: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < quantity) {
      return <Badge variant="secondary">Limited Stock</Badge>
    } else {
      return <Badge variant="default" className="bg-green-500">In Stock</Badge>
    }
  }

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Add some tyres from our catalog to get started
            </p>
            <Button onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/tyres'
              }
            }} className="w-full">
              Browse Tyres
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.back()
                }
              }}>
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-sm text-gray-600">
                  {summary.itemCount} item{summary.itemCount !== 1 ? 's' : ''} ({summary.totalItems} total)
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/tyres'
              }
            }}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <div className="md:w-32 md:h-32 w-full h-32 bg-gray-100 rounded-lg flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-gray-600 font-bold text-sm">
                                {item.tyre.brand.name.charAt(0)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.tyre.width}/{item.tyre.aspectRatio}R{item.tyre.rimDiameter}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between start">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {item.tyre.brand.name} {item.tyre.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Size: {item.tyre.width}/{item.tyre.aspectRatio}R{item.tyre.rimDiameter}
                              {item.tyre.speedRating && ` • Speed: ${item.tyre.speedRating}`}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              {getStockBadge(item.tyre.stock, item.quantity)}
                              {item.tyre.warranty && (
                                <Badge variant="outline">
                                  <Shield className="h-3 w-3 mr-1" />
                                  {item.tyre.warranty} months
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={updating.includes(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updating.includes(item.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1
                                  updateQuantity(item.id, newQuantity)
                                }}
                                className="w-16 h-8 text-center border-0"
                                min="1"
                                max={item.tyre.stock}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.tyre.stock || updating.includes(item.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatPrice(item.tyre.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatPrice(item.tyre.price)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({summary.totalItems} items)</span>
                    <span>{formatPrice(summary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(summary.subtotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.href = '/tyres'
                    }
                  }}>
                    Continue Shopping
                  </Button>
                </div>

                {/* Shipping Info */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    Free shipping on orders above ₹5000. Estimated delivery: 2-4 business days.
                  </AlertDescription>
                </Alert>

                {/* Security Info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Manufacturer warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span>Easy returns</span>
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