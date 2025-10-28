// Email Notification System

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
}

export interface EmailData {
  to: string
  subject: string
  body: string
  from?: string
  replyTo?: string
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType: string
}

export interface EmailContext {
  user: {
    name: string
    email: string
    phone?: string
  }
  order?: {
    id: string
    orderNumber: string
    totalAmount: number
    status: string
    paymentStatus: string
    shippingAddress: any
    orderItems: any[]
  }
  serviceBooking?: {
    id: string
    serviceType: string
    bookingDate: string
    status: string
    vehicleDetails: any
    location: any
  }
  store: {
    name: string
    website: string
    phone: string
    email: string
    address: string
  }
}

// Email Templates
export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  ORDER_CONFIRMATION: {
    id: 'ORDER_CONFIRMATION',
    name: 'Order Confirmation',
    subject: 'Order Confirmation - {{order.orderNumber}}',
    body: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin: 0;">At Home Tyre</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Premium Tyres for Every Journey</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0;">Order Confirmed!</h2>
              <p style="margin: 0 0 10px 0;">Thank you for your order, {{user.name}}!</p>
              <p style="margin: 0;">Your order <strong>{{order.orderNumber}}</strong> has been confirmed and is being processed.</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Order Details</h3>
              <p style="margin: 0 0 5px 0;"><strong>Order Number:</strong> {{order.orderNumber}}</p>
              <p style="margin: 0 0 5px 0;"><strong>Total Amount:</strong> {{formatCurrency order.totalAmount}}</p>
              <p style="margin: 0 0 5px 0;"><strong>Payment Status:</strong> {{order.paymentStatus}}</p>
              <p style="margin: 0;"><strong>Order Status:</strong> {{order.status}}</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Shipping Address</h3>
              <p style="margin: 0;">{{order.shippingAddress.fullName}}</p>
              <p style="margin: 0;">{{order.shippingAddress.addressLine1}}</p>
              {{#if order.shippingAddress.addressLine2}}
              <p style="margin: 0;">{{order.shippingAddress.addressLine2}}</p>
              {{/if}}
              <p style="margin: 0;">{{order.shippingAddress.city}}, {{order.shippingAddress.state}} {{order.shippingAddress.postalCode}}</p>
              <p style="margin: 0;">{{order.shippingAddress.phone}}</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Order Items</h3>
              {{#each order.orderItems}}
              <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0; margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0;"><strong>{{this.tyre.brand.name}} {{this.tyre.name}}</strong></p>
                <p style="margin: 0 0 5px 0; color: #666;">Size: {{this.tyre.width}}/{{this.tyre.aspectRatio}}R{{this.tyre.rimDiameter}}</p>
                <p style="margin: 0; color: #666;">Qty: {{this.quantity}} × {{formatCurrency this.tyre.price}} = {{formatCurrency (multiply this.quantity this.tyre.price)}}</p>
              </div>
              {{/each}}
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; margin: 0;">You can track your order status by logging into your account.</p>
              <a href="{{store.website}}/account" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; font-weight: bold;">
                Track Your Order
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0 0 5px 0;">&copy; 2024 At Home Tyre. All rights reserved.</p>
              <p style="margin: 0;">{{store.address}} | {{store.phone}} | {{store.email}}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['user.name', 'order.orderNumber', 'order.totalAmount', 'order.status', 'order.paymentStatus', 'order.shippingAddress', 'order.orderItems']
  },

  ORDER_SHIPPED: {
    id: 'ORDER_SHIPPED',
    name: 'Order Shipped',
    subject: 'Your Order {{order.orderNumber}} Has Been Shipped!',
    body: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin: 0;">At Home Tyre</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Premium Tyres for Every Journey</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #86efac;">
              <h2 style="color: #166534; margin: 0 0 15px 0;">Your Order Has Been Shipped! 🚚</h2>
              <p style="margin: 0 0 10px 0;">Great news, {{user.name}}!</p>
              <p style="margin: 0;">Your order <strong>{{order.orderNumber}}</strong> has been shipped and is on its way to you.</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Shipping Information</h3>
              <p style="margin: 0 0 5px 0;"><strong>Tracking Number:</strong> {{order.trackingNumber}}</p>
              <p style="margin: 0 0 5px 0;"><strong>Estimated Delivery:</strong> {{order.estimatedDelivery}}</p>
              <p style="margin: 0;"><strong>Shipping Provider:</strong> {{order.shippingProvider}}</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="{{order.trackingUrl}}" style="display: inline-block; background: #10b981; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
                Track Package
              </a>
              <a href="{{store.website}}/account" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View Order Details
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0 0 5px 0;">&copy; 2024 At Home Tyre. All rights reserved.</p>
              <p style="margin: 0;">{{store.address}} | {{store.phone}} | {{store.email}}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['user.name', 'order.orderNumber', 'order.trackingNumber', 'order.estimatedDelivery', 'order.shippingProvider', 'order.trackingUrl']
  },

  SERVICE_BOOKING_CONFIRMED: {
    id: 'SERVICE_BOOKING_CONFIRMED',
    name: 'Service Booking Confirmed',
    subject: 'Service Booking Confirmed - {{serviceBooking.id}}',
    body: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin: 0;">At Home Tyre</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Premium Tyres for Every Journey</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcd34d;">
              <h2 style="color: #92400e; margin: 0 0 15px 0;">Service Booking Confirmed! 🔧</h2>
              <p style="margin: 0 0 10px 0;">Thank you, {{user.name}}!</p>
              <p style="margin: 0;">Your service booking <strong>{{serviceBooking.id}}</strong> has been confirmed.</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Service Details</h3>
              <p style="margin: 0 0 5px 0;"><strong>Service Type:</strong> {{serviceBooking.serviceType}}</p>
              <p style="margin: 0 0 5px 0;"><strong>Date & Time:</strong> {{formatDate serviceBooking.bookingDate}}</p>
              <p style="margin: 0 0 5px 0;"><strong>Status:</strong> {{serviceBooking.status}}</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Vehicle Information</h3>
              <p style="margin: 0 0 5px 0;"><strong>Vehicle:</strong> {{serviceBooking.vehicleDetails.year}} {{serviceBooking.vehicleDetails.make}} {{serviceBooking.vehicleDetails.model}}</p>
              {{#if serviceBooking.vehicleDetails.variant}}
              <p style="margin: 0 0 5px 0;"><strong>Variant:</strong> {{serviceBooking.vehicleDetails.variant}}</p>
              {{/if}}
              {{#if serviceBooking.vehicleDetails.licensePlate}}
              <p style="margin: 0;"><strong>License Plate:</strong> {{serviceBooking.vehicleDetails.licensePlate}}</p>
              {{/if}}
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">Service Location</h3>
              <p style="margin: 0;">{{serviceBooking.location.address}}</p>
              <p style="margin: 0;">{{serviceBooking.location.city}}, {{serviceBooking.location.state}} {{serviceBooking.location.pincode}}</p>
              {{#if serviceBooking.location.landmark}}
              <p style="margin: 0;">(Near: {{serviceBooking.location.landmark}})</p>
              {{/if}}
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; margin: 0;">You can manage your service bookings by logging into your account.</p>
              <a href="{{store.website}}/service-booking" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; font-weight: bold;">
                View Service Bookings
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0 0 5px 0;">&copy; 2024 At Home Tyre. All rights reserved.</p>
              <p style="margin: 0;">{{store.address}} | {{store.phone}} | {{store.email}}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['user.name', 'serviceBooking.id', 'serviceBooking.serviceType', 'serviceBooking.bookingDate', 'serviceBooking.status', 'serviceBooking.vehicleDetails', 'serviceBooking.location']
  },

  WELCOME_EMAIL: {
    id: 'WELCOME_EMAIL',
    name: 'Welcome Email',
    subject: 'Welcome to At Home Tyre! 🎉',
    body: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin: 0;">At Home Tyre</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Premium Tyres for Every Journey</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcd34d;">
              <h2 style="color: #92400e; margin: 0 0 15px 0;">Welcome to At Home Tyre, {{user.name}}! 🎉</h2>
              <p style="margin: 0 0 10px 0;">We're excited to have you join our community of tyre enthusiasts!</p>
              <p style="margin: 0;">Get ready to explore our wide range of premium tyres and enjoy exceptional service.</p>
            </div>

            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0;">What You Can Do:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Browse our extensive collection of premium tyres</li>
                <li style="margin-bottom: 8px;">Use our Tyre Finder to get personalized recommendations</li>
                <li style="margin-bottom: 8px;">Book professional tyre services at your convenience</li>
                <li style="margin-bottom: 8px;">Track your orders and service bookings</li>
                <li style="margin-bottom: 8px;">Enjoy exclusive deals and offers for registered users</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="{{store.website}}/tyres" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px; font-weight: bold;">
                Start Shopping
              </a>
              <a href="{{store.website}}/service-booking" style="display: inline-block; background: #10b981; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Book Service
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0 0 5px 0;">&copy; 2024 At Home Tyre. All rights reserved.</p>
              <p style="margin: 0;">{{store.address}} | {{store.phone}} | {{store.email}}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['user.name']
  }
}

// Email Service Class
export class EmailService {
  private from: string
  private replyTo: string

  constructor(from: string, replyTo: string) {
    this.from = from
    this.replyTo = replyTo
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In a real implementation, you would use a service like:
      // - SendGrid
      // - AWS SES
      // - Mailgun
      // - Nodemailer with SMTP
      
      console.log('Sending email:', {
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body.substring(0, 100) + '...'
      })

      // Simulate email sending for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async sendTemplate(
    templateId: string,
    to: string,
    context: EmailContext
  ): Promise<boolean> {
    try {
      const template = EMAIL_TEMPLATES[templateId]
      if (!template) {
        throw new Error(`Template ${templateId} not found`)
      }

      const processedSubject = this.processTemplate(template.subject, context)
      const processedBody = this.processTemplate(template.body, context)

      const emailData: EmailData = {
        to,
        subject: processedSubject,
        body: processedBody,
        from: this.from,
        replyTo: this.replyTo
      }

      return await this.sendEmail(emailData)
    } catch (error) {
      console.error('Error sending template email:', error)
      return false
    }
  }

  private processTemplate(template: string, context: EmailContext): string {
    let processed = template

    // Simple template processing - in production, use a proper template engine like Handlebars
    processed = processed.replace(/{{user\.name}}/g, context.user.name)
    processed = processed.replace(/{{user\.email}}/g, context.user.email)
    processed = processed.replace(/{{store\.name}}/g, context.store.name)
    processed = processed.replace(/{{store\.website}}/g, context.store.website)
    processed = processed.replace(/{{store\.phone}}/g, context.store.phone)
    processed = processed.replace(/{{store\.email}}/g, context.store.email)
    processed = processed.replace(/{{store\.address}}/g, context.store.address)

    // Process order variables
    if (context.order) {
      processed = processed.replace(/{{order\.orderNumber}}/g, context.order.orderNumber)
      processed = processed.replace(/{{order\.totalAmount}}/g, context.order.totalAmount.toString())
      processed = processed.replace(/{{order\.status}}/g, context.order.status)
      processed = processed.replace(/{{order\.paymentStatus}}/g, context.order.paymentStatus)
      
      // Format currency
      processed = processed.replace(/{{formatCurrency ([^}]+)}}/g, (match, amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(parseFloat(amount))
      })
    }

    // Process service booking variables
    if (context.serviceBooking) {
      processed = processed.replace(/{{serviceBooking\.id}}/g, context.serviceBooking.id)
      processed = processed.replace(/{{serviceBooking\.serviceType}}/g, context.serviceBooking.serviceType)
      processed = processed.replace(/{{serviceBooking\.status}}/g, context.serviceBooking.status)
      
      // Format date
      if (context.serviceBooking.bookingDate) {
        const date = new Date(context.serviceBooking.bookingDate)
        processed = processed.replace(/{{formatDate serviceBooking\.bookingDate}}/g, 
          date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        )
      }
    }

    return processed
  }
}

// Create email service instance
export const emailService = new EmailService(
  process.env.EMAIL_FROM || 'noreply@jagannathtyre.com',
  process.env.EMAIL_REPLY_TO || 'support@jagannathtyre.com'
)