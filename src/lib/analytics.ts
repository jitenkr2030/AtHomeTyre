// Advanced Analytics System

// Google Analytics types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
  userId?: string
  sessionId?: string
}

export interface UserProperties {
  userId: string
  email?: string
  name?: string
  role?: string
  registrationDate?: string
  lastLoginDate?: string
  totalOrders?: number
  totalSpent?: number
  favoriteCategories?: string[]
  location?: {
    city?: string
    state?: string
    country?: string
  }
}

export interface EcommerceEvent {
  event: 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'begin_checkout' | 'purchase' | 'refund'
  ecommerce: {
    currency: string
    value: number
    items: AnalyticsItem[]
  }
}

export interface AnalyticsItem {
  item_id: string
  item_name: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price: number
  quantity: number
}

export interface CustomReport {
  id: string
  name: string
  description: string
  type: 'users' | 'orders' | 'products' | 'revenue' | 'services'
  dateRange: {
    start: string
    end: string
  }
  metrics: string[]
  dimensions: string[]
  filters?: Record<string, any>
}

// Analytics Service Class
export class AnalyticsService {
  private initialized: boolean = false
  private sessionId: string = this.generateSessionId()
  private userId: string | null = null
  private events: AnalyticsEvent[] = []
  private userProperties: UserProperties | null = null

  constructor() {
    this.initialize()
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  async initialize() {
    try {
      // Initialize Google Analytics if measurement ID is available
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        await this.loadGoogleAnalytics()
      }

      // Initialize custom analytics
      this.setupEventListeners()
      
      this.initialized = true
      console.log('Analytics service initialized')
    } catch (error) {
      console.error('Failed to initialize analytics:', error)
    }
  }

  private async loadGoogleAnalytics() {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    // Configure Google Analytics
    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  }

  private setupEventListeners() {
    // Track page views
    if (typeof window !== 'undefined') {
      this.trackPageView(window.location.pathname)
      
      // Track navigation changes
      const originalPushState = history.pushState
      history.pushState = (...args) => {
        originalPushState.apply(history, args)
        this.trackPageView(window.location.pathname)
      }

      // Track user interactions
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.closest('[data-analytics-event]')) {
          const element = target.closest('[data-analytics-event]') as HTMLElement
          const eventName = element.getAttribute('data-analytics-event')
          const eventProperties = JSON.parse(element.getAttribute('data-analytics-properties') || '{}')
          if (eventName) {
            this.trackEvent(eventName, eventProperties)
          }
        }
      })
    }
  }

  // User identification
  identifyUser(userId: string, properties: Partial<UserProperties> = {}) {
    this.userId = userId
    this.userProperties = { ...properties, userId }

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        user_id: userId
      })
    }
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    const event: AnalyticsEvent = {
      name: 'page_view',
      properties: {
        path,
        title: title || document.title,
        referrer: document.referrer,
        timestamp: Date.now()
      },
      userId: this.userId || undefined,
      sessionId: this.sessionId
    }

    this.trackEvent('page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    })

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title
      })
    }
  }

  // Track custom events
  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: Date.now()
      },
      userId: this.userId || undefined,
      sessionId: this.sessionId
    }

    this.events.push(event)

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties)
    }

    // Send to custom analytics endpoint
    this.sendToAnalyticsAPI(event)
  }

  // Track ecommerce events
  trackEcommerceEvent(ecommerceEvent: EcommerceEvent) {
    this.trackEvent(ecommerceEvent.event, ecommerceEvent)

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', ecommerceEvent.event, ecommerceEvent)
    }
  }

  // Track user interactions
  trackUserInteraction(action: string, element: string, properties: Record<string, any> = {}) {
    this.trackEvent('user_interaction', {
      action,
      element,
      ...properties
    })
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean, properties: Record<string, any> = {}) {
    this.trackEvent('form_submission', {
      form_name: formName,
      success,
      ...properties
    })
  }

  // Track search queries
  trackSearch(query: string, results: number, filters: Record<string, any> = {}) {
    this.trackEvent('search', {
      query,
      results_count: results,
      filters: Object.keys(filters)
    })
  }

  // Track service bookings
  trackServiceBooking(serviceType: string, success: boolean, properties: Record<string, any> = {}) {
    this.trackEvent('service_booking', {
      service_type: serviceType,
      success,
      ...properties
    })
  }

  // Track errors
  trackError(errorType: string, errorMessage: string, properties: Record<string, any> = {}) {
    this.trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      ...properties
    })
  }

  // Track performance metrics
  trackPerformance(metricName: string, value: number, properties: Record<string, any> = {}) {
    this.trackEvent('performance', {
      metric_name: metricName,
      value,
      ...properties
    })
  }

  // Send events to analytics API
  private async sendToAnalyticsAPI(event: AnalyticsEvent) {
    try {
      const response = await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })

      if (!response.ok) {
        console.error('Failed to send analytics event:', await response.text())
      }
    } catch (error) {
      console.error('Error sending analytics event:', error)
    }
  }

  // Get custom reports
  async getCustomReport(report: CustomReport) {
    try {
      const response = await fetch('/api/analytics/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Failed to fetch custom report')
      }
    } catch (error) {
      console.error('Error fetching custom report:', error)
      throw error
    }
  }

  // Get dashboard analytics
  async getDashboardAnalytics(dateRange: { start: string; end: string }) {
    try {
      const response = await fetch(`/api/analytics/dashboard?start=${dateRange.start}&end=${dateRange.end}`)
      
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Failed to fetch dashboard analytics')
      }
    } catch (error) {
      console.error('Error fetching dashboard analytics:', error)
      throw error
    }
  }

  // Get real-time analytics
  async getRealtimeAnalytics() {
    try {
      const response = await fetch('/api/analytics/realtime')
      
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Failed to fetch real-time analytics')
      }
    } catch (error) {
      console.error('Error fetching real-time analytics:', error)
      throw error
    }
  }

  // Export analytics data
  async exportAnalyticsData(reportType: string, dateRange: { start: string; end: string }, format: 'csv' | 'json' | 'xlsx' = 'csv') {
    try {
      const response = await fetch(`/api/analytics/export/${reportType}?start=${dateRange.start}&end=${dateRange.end}&format=${format}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${reportType}_analytics_${dateRange.start}_to_${dateRange.end}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        return true
      } else {
        throw new Error('Failed to export analytics data')
      }
    } catch (error) {
      console.error('Error exporting analytics data:', error)
      throw error
    }
  }
}

// Create analytics service instance
export const analyticsService = new AnalyticsService()

// Utility functions for common analytics events
export const AnalyticsUtils = {
  // Track product views
  trackProductView: (product: any) => {
    analyticsService.trackEcommerceEvent({
      event: 'view_item',
      ecommerce: {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      }
    })
  },

  // Track add to cart
  trackAddToCart: (product: any, quantity: number = 1) => {
    analyticsService.trackEcommerceEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'INR',
        value: product.price * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand.name,
          item_category: product.category,
          price: product.price,
          quantity
        }]
      }
    })
  },

  // Track purchase
  trackPurchase: (order: any) => {
    analyticsService.trackEcommerceEvent({
      event: 'purchase',
      ecommerce: {
        currency: 'INR',
        value: order.totalAmount,
        items: order.orderItems.map((item: any) => ({
          item_id: item.tyre.id,
          item_name: item.tyre.name,
          item_brand: item.tyre.brand.name,
          item_category: item.tyre.category,
          price: item.tyre.price,
          quantity: item.quantity
        }))
      }
    })
  },

  // Track service booking
  trackServiceBooking: (booking: any) => {
    analyticsService.trackServiceBooking(
      booking.serviceType,
      true,
      {
        booking_id: booking.id,
        service_amount: booking.estimatedCost
      }
    )
  },

  // Track user registration
  trackUserRegistration: (user: any) => {
    analyticsService.trackEvent('user_registration', {
      user_id: user.id,
      user_role: user.role,
      registration_method: 'email'
    })
  },

  // Track user login
  trackUserLogin: (user: any) => {
    analyticsService.trackEvent('user_login', {
      user_id: user.id,
      user_role: user.role
    })
  }
}