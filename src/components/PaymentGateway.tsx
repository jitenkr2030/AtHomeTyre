'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Calendar,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock
} from 'lucide-react'
import { PAYMENT_METHODS, PaymentMethod, PaymentRequest } from '@/lib/payment'

interface PaymentGatewayProps {
  amount: number
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone?: string
    address?: {
      address: string
      city: string
      state: string
      pincode: string
      country?: string
    }
  }
  onPaymentSuccess: (response: any) => void
  onPaymentError: (error: string) => void
  onPaymentCancel?: () => void
}

export default function PaymentGateway({
  amount,
  orderId,
  customerInfo,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card')
  const [processing, setProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [upiDetails, setUpiDetails] = useState({
    id: '',
    provider: ''
  })
  const [walletDetails, setWalletDetails] = useState({
    provider: '',
    number: ''
  })
  const [error, setError] = useState('')

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    const icons = {
      'credit-card': CreditCard,
      'smartphone': Smartphone,
      'building-2': Building2,
      'wallet': Wallet,
      'calendar': Calendar,
      'truck': Truck
    }
    const Icon = icons[method.icon as keyof typeof icons] || CreditCard
    return <Icon className="h-5 w-5" />
  }

  const handlePayment = async () => {
    setProcessing(true)
    setError('')

    try {
      const paymentRequest: PaymentRequest = {
        amount,
        currency: 'INR',
        orderId,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        billingAddress: customerInfo.address,
        returnUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/order-confirmation`,
        cancelUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/checkout`
      }

      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentRequest,
          paymentMethod: selectedMethod,
          paymentDetails: getPaymentDetails()
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (data.paymentUrl) {
          // Redirect to payment gateway
          if (typeof window !== 'undefined') {
            window.location.href = data.paymentUrl
          }
        } else {
          onPaymentSuccess(data)
        }
      } else {
        setError(data.error || 'Payment processing failed')
        onPaymentError(data.error || 'Payment processing failed')
      }
    } catch (error) {
      setError('An error occurred while processing payment')
      onPaymentError('An error occurred while processing payment')
    } finally {
      setProcessing(false)
    }
  }

  const getPaymentDetails = () => {
    switch (selectedMethod) {
      case 'credit_card':
      case 'debit_card':
        return cardDetails
      case 'upi':
        return upiDetails
      case 'wallet':
        return walletDetails
      default:
        return {}
    }
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'credit_card':
      case 'debit_card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Name on Card *</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
        )

      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID *</Label>
              <Input
                id="upiId"
                placeholder="yourname@upi"
                value={upiDetails.id}
                onChange={(e) => setUpiDetails(prev => ({ ...prev, id: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="upiProvider">UPI Provider</Label>
              <Select value={upiDetails.provider} onValueChange={(value) => setUpiDetails(prev => ({ ...prev, provider: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select UPI app" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="googlepay">Google Pay</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                  <SelectItem value="paytm">Paytm</SelectItem>
                  <SelectItem value="bhim">BHIM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'wallet':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="walletProvider">Wallet Provider *</Label>
              <Select value={walletDetails.provider} onValueChange={(value) => setWalletDetails(prev => ({ ...prev, provider: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paytm">Paytm</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                  <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                  <SelectItem value="mobikwik">MobiKwik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="walletNumber">Mobile Number *</Label>
              <Input
                id="walletNumber"
                placeholder="9876543210"
                value={walletDetails.number}
                onChange={(e) => setWalletDetails(prev => ({ ...prev, number: e.target.value }))}
                maxLength={10}
              />
            </div>
          </div>
        )

      case 'cod':
        return (
          <Alert className="border-blue-200 bg-blue-50">
            <Truck className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Cash on Delivery:</strong> Pay when you receive your order. Available for orders up to ₹10,000.
            </AlertDescription>
          </Alert>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-yellow-600" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Order Amount</span>
            <span className="font-semibold">{formatAmount(amount)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-lg">{formatAmount(amount)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Select Payment Method</Label>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
            {PAYMENT_METHODS.filter(method => method.enabled).map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50">
                  {getPaymentMethodIcon(method)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.name}</span>
                      {method.type === 'COD' && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {method.type === 'CARD' && 'Secure card payment'}
                      {method.type === 'UPI' && 'Instant UPI payment'}
                      {method.type === 'WALLET' && 'Pay with digital wallet'}
                      {method.type === 'NET_BANKING' && 'Direct bank transfer'}
                      {method.type === 'EMI' && 'Pay in easy installments'}
                      {method.type === 'COD' && 'Pay when you receive'}
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          {renderPaymentForm()}
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {onPaymentCancel && (
            <Button variant="outline" onClick={onPaymentCancel} disabled={processing}>
              Cancel
            </Button>
          )}
          <Button 
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Pay {formatAmount(amount)}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}