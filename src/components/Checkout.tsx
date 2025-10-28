'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import PaymentGateway from '@/components/PaymentGateway'
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Truck, 
  Shield, 
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
  Phone,
  Building
} from 'lucide-react'

interface CartItem {
  id: string
  userId: string
  tyreId: string
  quantity: number
  tyre: {
    id: string
    name: string
    price: number
    width: number
    aspectRatio: number
    rimDiameter: number
    speedRating?: string
    brand: {
      id: string
      name: string
    }
  }
}

interface CartSummary {
  subtotal: number
  totalItems: number
  itemCount: number
}

interface Address {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [summary, setSummary] = useState<CartSummary>({ subtotal: 0, totalItems: 0, itemCount: 0 })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Review
  const [userId, setUserId] = useState<string>('')

  // Form states
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })
  const [billingAddress, setBillingAddress] = useState<Address>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [sameAsBilling, setSameAsBilling] = useState(true)

  const paymentMethods = [
    { value: 'CREDIT_CARD', label: 'Credit Card', icon: <CreditCard className="h-4 w-4" /> },
    { value: 'DEBIT_CARD', label: 'Debit Card', icon: <CreditCard className="h-4 w-4" /> },
    { value: 'UPI', label: 'UPI', icon: <Smartphone className="h-4 w-4" /> },
    { value: 'WALLET', label: 'Digital Wallet', icon: <Smartphone className="h-4 w-4" /> },
    { value: 'COD', label: 'Cash on Delivery', icon: <Truck className="h-4 w-4" /> }
  ]

  useEffect(() => {
    // Get user ID from localStorage - only run on client side
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId')
      if (!storedUserId) {
        window.location.href = '/tyres'
        return
      }
      setUserId(storedUserId)
      fetchCart(storedUserId)
    }
  }, [])

  const fetchCart = async (userId: string) => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'x-user-id': userId
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.cartItems || [])
        setSummary(data.summary || { subtotal: 0, totalItems: 0, itemCount: 0 })
      } else {
        if (typeof window !== 'undefined') {
          window.location.href = '/tyres'
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      if (typeof window !== 'undefined') {
        window.location.href = '/tyres'
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({
          shippingAddress,
          billingAddress: sameAsBilling ? shippingAddress : billingAddress,
          paymentMethod,
          notes
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect to order confirmation page
        if (typeof window !== 'undefined') {
          window.location.href = `/order-confirmation?orderId=${data.order.id}`
        }
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to place order')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  const shippingCost = summary.subtotal >= 5000 ? 0 : 500
  const totalAmount = summary.subtotal + shippingCost

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Add some tyres to your cart to proceed with checkout
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
                  window.location.href = '/cart'
                }
              }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                <p className="text-sm text-gray-600">
                  {summary.itemCount} item{summary.itemCount !== 1 ? 's' : ''} in your cart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {[
              { step: 1, title: 'Shipping Address' },
              { step: 2, title: 'Payment Method' },
              { step: 3, title: 'Review Order' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= item.step 
                    ? 'bg-yellow-500 border-yellow-500 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= item.step ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > item.step ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <Input
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                      placeholder="123, Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <Input
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                      placeholder="Apartment, Suite, etc."
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Input
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <Input
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <Input
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sameAsBilling"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
                      Billing address is same as shipping address
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <PaymentGateway
                amount={totalAmount}
                orderId={`ORDER-${typeof window !== 'undefined' ? Date.now() : 'STATIC'}`}
                customerInfo={{
                  name: shippingAddress.fullName,
                  email: 'customer@example.com', // This should come from user session
                  phone: shippingAddress.phone,
                  address: {
                    address: shippingAddress.addressLine1,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    pincode: shippingAddress.postalCode,
                    country: shippingAddress.country
                  }
                }}
                onPaymentSuccess={(response) => {
                  // Handle successful payment
                  console.log('Payment successful:', response)
                  // Proceed to order confirmation
                  handlePlaceOrder()
                }}
                onPaymentError={(error) => {
                  console.error('Payment error:', error)
                  alert(`Payment failed: ${error}`)
                }}
                onPaymentCancel={() => {
                  setStep(1)
                }}
              />
            )}

            {step === 3 && (
              <div className="space-y-6">
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
                      <p className="font-medium">{shippingAddress.fullName}</p>
                      <p className="text-gray-600">{shippingAddress.phone}</p>
                      <p className="text-gray-600">
                        {shippingAddress.addressLine1}
                        {shippingAddress.addressLine2 && `, ${shippingAddress.addressLine2}`}
                      </p>
                      <p className="text-gray-600">
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-600">{shippingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {paymentMethods.find(m => m.value === paymentMethod)?.icon}
                      <span className="font-medium">
                        {paymentMethods.find(m => m.value === paymentMethod)?.label}
                      </span>
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
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">
                              {item.tyre.brand.name} {item.tyre.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {item.tyre.width}/{item.tyre.aspectRatio}R{item.tyre.rimDiameter}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × {formatPrice(item.tyre.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatPrice(item.tyre.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Processing...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </div>
              </div>
            )}
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
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {shippingCost > 0 && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 text-sm">
                      Add {formatPrice(5000 - summary.subtotal)} more to get FREE shipping!
                    </AlertDescription>
                  </Alert>
                )}

                {/* Security Info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Fast delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
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