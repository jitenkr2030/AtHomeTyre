'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Heart, 
  ShoppingCart, 
  Package, 
  Star, 
  Eye,
  Trash2,
  Plus,
  ArrowRight
} from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  stock: number
  image?: string
  features: string[]
}

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Fuel Efficient',
      brand: 'Apollo',
      price: 4500,
      originalPrice: 5200,
      rating: 4.5,
      reviews: 234,
      stock: 50,
      features: ['Fuel Efficient', 'Wet Grip', 'Low Noise']
    },
    {
      id: '2',
      name: 'All Season',
      brand: 'MRF',
      price: 5200,
      rating: 4.3,
      reviews: 189,
      stock: 30,
      features: ['All Weather', 'Durable', 'Comfortable']
    },
    {
      id: '3',
      name: 'High Performance',
      brand: 'JK Tyre',
      price: 6800,
      originalPrice: 7500,
      rating: 4.7,
      reviews: 156,
      stock: 25,
      features: ['High Speed', 'Sporty', 'Premium']
    }
  ])

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
  }, [session, status, router])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id: string) => {
    // Simulate adding to cart
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/cart')
    }, 1000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading wishlist...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">Your saved tyres for future purchase</p>
            </div>
            <Badge variant="outline" className="text-pink-600 border-pink-600">
              {wishlistItems.length} Items
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite tyres by clicking the heart icon on any product</p>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
              onClick={() => router.push('/tyres')}
            >
              Browse Tyres
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wishlist Items */}
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-8 w-8 text-gray-600" />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                              <p className="text-gray-600 mb-2">{item.brand}</p>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < Math.floor(item.rating) 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {item.rating} ({item.reviews} reviews)
                                </span>
                              </div>
                              
                              {/* Features */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {item.features.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              
                              {/* Price */}
                              <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-gray-900">
                                  {formatPrice(item.price)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(item.originalPrice)}
                                  </span>
                                )}
                                <Badge variant="destructive" className="text-xs">
                                  Save {formatPrice((item.originalPrice || 0) - item.price)}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Stock Status */}
                            <div className="text-right">
                              <Badge 
                                variant={item.stock > 10 ? "default" : "secondary"}
                                className={item.stock > 10 ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                              >
                                {item.stock > 10 ? "In Stock" : `Only ${item.stock} left`}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/tyres/${item.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                        
                        <Button 
                          className="bg-yellow-500 hover:bg-yellow-400 text-black"
                          onClick={() => addToCart(item.id)}
                          disabled={loading || item.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wishlist Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Wishlist Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-medium">{wishlistItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-medium">
                        {formatPrice(wishlistItems.reduce((sum, item) => sum + item.price, 0))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential Savings</span>
                      <span className="font-medium text-green-600">
                        {formatPrice(wishlistItems.reduce((sum, item) => sum + ((item.originalPrice || 0) - item.price), 0))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
                      onClick={() => {
                        const allItems = wishlistItems.map(item => addToCart(item.id))
                        Promise.all(allItems)
                      }}
                      disabled={loading}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium text-sm">Price Alerts</p>
                      <p className="text-xs text-gray-600">Get notified of price drops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">Stock Alerts</p>
                      <p className="text-xs text-gray-600">Never miss out on stock</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">Easy Access</p>
                      <p className="text-xs text-gray-600">Quick access to favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                    <Plus className="h-4 w-4 mr-2" />
                    Browse More Tyres
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/cart')}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/compare')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Compare Tyres
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}