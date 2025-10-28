# JaganNath Tyre Mobile App

A React Native mobile application for JaganNath Tyre e-commerce platform, built with Expo and React Native.

## Features

- **🛒 E-commerce Functionality**: Browse and purchase tyres
- **🔍 Tyre Finder**: Find compatible tyres for your vehicle
- **🛠️ Service Booking**: Book tyre services at your convenience
- **👤 User Authentication**: Secure login and registration
- **🛒 Shopping Cart**: Manage your tyre selections
- **💳 Payment Integration**: Secure payment processing
- **📱 Push Notifications**: Stay updated on orders and services
- **🎨 Modern UI**: Beautiful, responsive design

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development and build platform
- **React Navigation**: Navigation and routing
- **Redux Toolkit**: State management
- **Axios**: HTTP client for API calls
- **React Native Elements**: UI components
- **Expo Notifications**: Push notifications

## Project Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TyreCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── TyresScreen.tsx
│   │   ├── TyreDetailScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── ServiceBookingScreen.tsx
│   │   └── ...
│   ├── navigation/          # Navigation setup
│   │   ├── TabNavigator.tsx
│   │   └── ...
│   ├── store/              # Redux store
│   │   ├── store.ts
│   │   ├── slices/
│   │   └── ...
│   ├── services/           # API services
│   │   ├── api.ts
│   │   └── ...
│   ├── theme/              # Theme and styling
│   │   ├── ThemeContext.tsx
│   │   └── ...
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── utils/              # Utility functions
│       └── ...
├── App.tsx                 # Main app component
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS/Android development environment (for native builds)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on a device/emulator:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web
```

## API Integration

The mobile app connects to the JaganNath Tyre backend API:

- **Base URL**: `http://localhost:3000/api` (development)
- **Authentication**: JWT tokens via NextAuth.js
- **Key Endpoints**:
  - `/tyres` - Browse and search tyres
  - `/cart` - Shopping cart management
  - `/checkout` - Order processing
  - `/service-booking` - Service booking
  - `/auth/*` - Authentication

## Key Components

### TyreCard
Displays tyre information with image, price, and quick actions.

### ServiceCard
Shows available services with booking options.

### SearchBar
Global search functionality for tyres and services.

### PaymentGateway
Integrated payment processing with multiple payment methods.

## State Management

The app uses Redux Toolkit for state management:

- **Cart State**: Shopping cart items and totals
- **User State**: Authentication and user profile
- **Products State**: Tyre catalog and search results
- **Orders State**: Order history and tracking
- **Services State**: Service bookings and availability

## Navigation

- **Tab Navigation**: Bottom tab bar for main sections
- **Stack Navigation**: Screen-to-screen navigation
- **Deep Linking**: Support for direct navigation to specific screens

## Theming

- **Color Scheme**: JaganNath Tyre brand colors (yellow/black)
- **Typography**: Consistent font sizes and weights
- **Spacing**: Uniform padding and margins
- **Components**: Reusable styled components

## Push Notifications

- **Order Updates**: Status changes and shipping notifications
- **Service Reminders**: Booking confirmations and reminders
- **Promotional**: Special offers and deals

## Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

### Web
```bash
npm run build:web
```

## Testing

```bash
npm test
```

## Deployment

The mobile app can be deployed to:

- **App Store** (iOS)
- **Google Play Store** (Android)
- **Expo Application Services** (over-the-air updates)

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new components
3. Write tests for new features
4. Update documentation as needed

## Support

For support and questions:
- Email: support@jagannathtyre.com
- Phone: 1800-123-4567

## License

This project is licensed under the MIT License.