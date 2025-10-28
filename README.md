# At Home Tyre - Premium Tyre Retail Platform

A comprehensive Next.js 15 e-commerce platform for tyre sales, featuring dealer management, service booking, and customer support systems.

## 🚀 Features

### Core E-commerce
- **Product Catalog**: Extensive tyre collection with advanced filtering and search
- **Tyre Finder**: Intelligent recommendation system based on vehicle specifications
- **Shopping Cart**: Persistent cart with real-time inventory management
- **Checkout**: Secure payment processing with multiple payment options
- **Order Tracking**: Real-time order status updates and tracking

### Customer Experience
- **User Authentication**: Secure login/registration with role-based access
- **Service Booking**: Schedule tyre fitting and maintenance services
- **Wishlist Management**: Save favourite tyres for later purchase
- **Product Reviews**: Customer ratings and detailed reviews
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Dealer Management
- **Dealer Portal**: Exclusive dashboard for authorized dealers
- **Bulk Ordering**: Special pricing and volume discounts
- **Inventory Management**: Real-time stock levels and reorder alerts
- **Performance Analytics**: Sales reports and business insights
- **Marketing Materials**: Access to promotional content and assets

### Admin Panel
- **Dashboard**: Comprehensive overview of business metrics
- **Order Management**: Process and track customer orders
- **User Management**: Manage customers and dealer accounts
- **Product Management**: Add/edit tyre products and specifications
- **Analytics**: Detailed reporting and business intelligence

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: Zustand + TanStack Query
- **Authentication**: NextAuth.js v4

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Caching**: Local memory caching
- **Real-time**: Socket.io for live updates
- **Email**: Custom email service with templates

### Development
- **Package Manager**: npm
- **Linting**: ESLint with Next.js rules
- **Code Quality**: TypeScript strict mode
- **Development Server**: Hot reload with nodemon

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SQLite (included)

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── business/          # Business/dealer pages
│   ├── customer-service/  # Customer service pages
│   ├── legal/             # Legal pages
│   ├── about/             # About pages
│   ├── dealer-login/      # Dealer login page
│   ├── admin/             # Admin dashboard
│   ├── dealer/            # Dealer dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Custom components
├── lib/                  # Utility libraries
│   ├── email.ts          # Email service
│   ├── socket.ts         # Socket.io setup
│   └── db.ts             # Database connection
├── hooks/                # Custom React hooks
└── types/                # TypeScript definitions
```

## 🎯 Key Pages

### Customer Pages
- **Home**: Landing page with featured products and services
- **Tyres**: Product catalog with filtering and search
- **Tyre Finder**: Vehicle-based tyre recommendations
- **Service Booking**: Schedule tyre fitting services
- **Cart/Checkout**: Purchase flow and payment processing
- **Account**: User profile and order history

### Business Pages
- **Become a Dealer**: Partnership application
- **Bulk Ordering**: Volume purchase system
- **Fleet Solutions**: Corporate tyre management
- **API Integration**: Developer resources
- **Partner Garages**: Service center locator

### Admin Pages
- **Dashboard**: Business overview and metrics
- **Order Management**: Process and track orders
- **User Management**: Customer and dealer accounts
- **Product Management**: Tyre catalog administration
- **Analytics**: Business intelligence reports

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email Configuration
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-email@athometyre.com"
SMTP_PASS="your-email-password"

# AI SDK (if using)
ZAI_API_KEY="your-z-ai-api-key"
```

### Database Schema
The application uses Prisma with SQLite. The schema includes:

- **Users**: Customer and dealer accounts
- **Tyres**: Product catalog with specifications
- **Orders**: Purchase orders and tracking
- **ServiceBookings**: Appointment management
- **Reviews**: Customer feedback and ratings
- **Dealers**: Dealer information and verification

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Database Migrations
```bash
npm run db:push    # Push schema to database
npm run db:studio  # Open Prisma Studio
```

### Linting
```bash
npm run lint      # Check code quality
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with enhanced navigation
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Streamlined interface with mobile-first design

## 🔐 Security Features

- **Authentication**: Secure login with NextAuth.js
- **Role-Based Access**: Customer, Dealer, and Admin roles
- **Data Protection**: Encrypted sensitive information
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security headers configuration
- **Input Validation**: Server and client-side validation

## 📊 Analytics & Monitoring

- **User Analytics**: Track customer behavior and preferences
- **Sales Metrics**: Monitor revenue and order trends
- **Performance Monitoring**: Application speed and uptime
- **Error Tracking**: Comprehensive error logging
- **Business Intelligence**: Data-driven insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use existing shadcn/ui components
- Maintain mobile-first responsive design
- Write clean, documented code
- Test thoroughly before committing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@athometyre.com
- **Dealer Support**: dealers@athometyre.com
- **Privacy**: privacy@athometyre.com
- **Phone**: 1800-123-4567

## 🌟 Brand Guidelines

### Colors
- **Primary**: Yellow (#f59e0b)
- **Secondary**: Gray variants
- **Accent**: Blue for interactive elements

### Logo
- **Text**: "At Home Tyre"
- **Initials**: "AH"
- **Style**: Clean, modern typography

### Voice
- Professional yet approachable
- Customer-focused and helpful
- Clear and concise communication

---

Built with ❤️ by the At Home Tyre team

*"Premium Tyres for Every Journey"*