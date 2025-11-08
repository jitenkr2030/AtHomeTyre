// Payment Gateway Configuration and Utilities

export interface PaymentGateway {
  name: string
  key: string
  enabled: boolean
  config: Record<string, any>
}

export interface PaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerEmail: string
  customerName: string
  customerPhone?: string
  billingAddress?: {
    address: string
    city: string
    state: string
    pincode: string
    country?: string
  }
  returnUrl?: string
  cancelUrl?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  paymentId?: string
  orderId?: string
  amount?: number
  currency?: string
  status?: string
  message?: string
  error?: string
  gatewayResponse?: any
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'CARD' | 'UPI' | 'WALLET' | 'NET_BANKING' | 'COD' | 'EMI'
  icon: string
  enabled: boolean
  config?: Record<string, any>
}

// Payment Gateway Configuration
export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    name: 'Razorpay',
    key: 'razorpay',
    enabled: process.env.RAZORPAY_KEY_ID ? true : false,
    config: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || '',
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
    }
  },
  {
    name: 'Stripe',
    key: 'stripe',
    enabled: process.env.STRIPE_PUBLISHABLE_KEY ? true : false,
    config: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    }
  },
  {
    name: 'PayPal',
    key: 'paypal',
    enabled: process.env.PAYPAL_CLIENT_ID ? true : false,
    config: {
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
      webhookSecret: process.env.PAYPAL_WEBHOOK_SECRET || '',
    }
  }
]

// Available Payment Methods
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    type: 'CARD',
    icon: 'credit-card',
    enabled: true
  },
  {
    id: 'debit_card',
    name: 'Debit Card',
    type: 'CARD',
    icon: 'credit-card',
    enabled: true
  },
  {
    id: 'upi',
    name: 'UPI',
    type: 'UPI',
    icon: 'smartphone',
    enabled: true
  },
  {
    id: 'net_banking',
    name: 'Net Banking',
    type: 'NET_BANKING',
    icon: 'building-2',
    enabled: true
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    type: 'WALLET',
    icon: 'wallet',
    enabled: true
  },
  {
    id: 'emi',
    name: 'EMI',
    type: 'EMI',
    icon: 'calendar',
    enabled: true
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    type: 'COD',
    icon: 'truck',
    enabled: true
  }
]

// Get enabled payment gateways
export function getEnabledPaymentGateways(): PaymentGateway[] {
  return PAYMENT_GATEWAYS.filter(gateway => gateway.enabled)
}

// Get enabled payment methods
export function getEnabledPaymentMethods(): PaymentMethod[] {
  return PAYMENT_METHODS.filter(method => method.enabled)
}

// Format amount for payment gateway (in paise/cents)
export function formatPaymentAmount(amount: number): number {
  return Math.round(amount * 100)
}

// Format amount back to rupees/dollars
export function parsePaymentAmount(amount: number): number {
  return amount / 100
}

// Generate unique order ID
export function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 5)
  return `JN${timestamp}${random}`.toUpperCase()
}

// Validate payment response
export function validatePaymentResponse(response: PaymentResponse): boolean {
  return response.success && !!response.transactionId && !!response.orderId
}

// Get payment gateway by key
export function getPaymentGatewayByKey(key: string): PaymentGateway | undefined {
  return PAYMENT_GATEWAYS.find(gateway => gateway.key === key)
}

// Get payment method by ID
export function getPaymentMethodById(id: string): PaymentMethod | undefined {
  return PAYMENT_METHODS.find(method => method.id === id)
}