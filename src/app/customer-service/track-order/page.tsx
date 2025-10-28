'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setOrderData({
        orderNumber: 'JNT2024' + Math.floor(Math.random() * 10000),
        status: 'in_transit',
        orderDate: '2024-01-15',
        estimatedDelivery: '2024-01-20',
        trackingNumber: 'TRK123456789',
        items: [
          {
            name: 'MRF ZLX',
            size: '195/65R15',
            quantity: 4,
            price: 3200
          },
          {
            name: 'Apollo Alnac',
            size: '185/70R14',
            quantity: 2,
            price: 2800
          }
        ],
        shippingAddress: {
          name: 'Rajesh Kumar',
          address: '123 Main Street, Mumbai, Maharashtra 400001',
          phone: '+91 98765 43210'
        },
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-01-15 10:30 AM',
            description: 'Order successfully placed',
            completed: true
          },
          {
            status: 'Order Confirmed',
            date: '2024-01-15 11:00 AM',
            description: 'Payment confirmed and order processed',
            completed: true
          },
          {
            status: 'Packed',
            date: '2024-01-15 2:00 PM',
            description: 'Items packed and ready for shipment',
            completed: true
          },
          {
            status: 'Shipped',
            date: '2024-01-16 9:00 AM',
            description: 'Order handed over to courier partner',
            completed: true
          },
          {
            status: 'In Transit',
            date: '2024-01-17 3:00 PM',
            description: 'Package is on the way',
            completed: true,
            current: true
          },
          {
            status: 'Out for Delivery',
            date: 'Expected: 2024-01-20 10:00 AM',
            description: 'Package out for delivery',
            completed: false
          },
          {
            status: 'Delivered',
            date: 'Expected: 2024-01-20 6:00 PM',
            description: 'Package delivered to your address',
            completed: false
          }
        ]
      })
      setIsLoading(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in_transit': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'in_transit': return 'In Transit'
      case 'shipped': return 'Shipped'
      case 'cancelled': return 'Cancelled'
      default: return 'Processing'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">Get real-time updates on your order status</p>
        </div>

        {/* Tracking Form */}
        {!orderData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Order Details</CardTitle>
              <CardDescription>
                Please provide your order number and email address to track your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number *</Label>
                    <Input
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="JNT20241234"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order #{orderData.orderNumber}
                    </CardTitle>
                    <CardDescription>
                      Placed on {new Date(orderData.orderDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(orderData.status)}>
                    {getStatusText(orderData.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.name} ({item.size}) x {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{orderData.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Shipping Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{orderData.shippingAddress.name}</p>
                          <p className="text-sm text-muted-foreground">{orderData.shippingAddress.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{orderData.shippingAddress.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
                <CardDescription>
                  Tracking Number: {orderData.trackingNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${event.completed ? 'bg-green-500' : 'bg-gray-300'} ${event.current ? 'ring-4 ring-green-200' : ''}`}></div>
                        {index < orderData.timeline.length - 1 && (
                          <div className={`w-0.5 h-16 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${event.completed ? 'text-green-700' : 'text-gray-500'}`}>
                            {event.status}
                          </h4>
                          {event.current && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expected Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Expected Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-2xl font-bold text-primary mb-2">
                    {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Your order is expected to be delivered by 6:00 PM
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Courier
                    </Button>
                    <Button variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Track Another Order */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setOrderData(null)
                  setOrderNumber('')
                  setEmail('')
                }}
              >
                Track Another Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}