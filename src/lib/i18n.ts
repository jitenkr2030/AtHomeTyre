// Internationalization (i18n) System

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'gu' | 'bn' | 'kn' | 'ml' | 'pa'

export interface TranslationKeys {
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
    save: string
    edit: string
    delete: string
    search: string
    filter: string
    sort: string
    view: string
    back: string
    next: string
    previous: string
    close: string
    open: string
    home: string
    about: string
    contact: string
    help: string
  }

  // Navigation
  navigation: {
    home: string
    tyres: string
    tyreFinder: string
    serviceBooking: string
    services: string
    about: string
    contact: string
    cart: string
    profile: string
    login: string
    register: string
    logout: string
  }

  // Products
  products: {
    allTyres: string
    carTyres: string
    bikeTyres: string
    truckTyres: string
    busTyres: string
    tractorTyres: string
    offRoadTyres: string
    featured: string
    new: string
    popular: string
    price: string
    brand: string
    category: string
    size: string
    inStock: string
    outOfStock: string
    addToCart: string
    buyNow: string
    viewDetails: string
    compare: string
    wishlist: string
  }

  // Tyre Specifications
  specs: {
    width: string
    aspectRatio: string
    rimDiameter: string
    loadIndex: string
    speedRating: string
    fuelEfficiency: string
    wetGrip: string
    noiseLevel: string
    warranty: string
  }

  // Services
  services: {
    installation: string
    wheelAlignment: string
    wheelBalancing: string
    nitrogenFill: string
    punctureRepair: string
    emergencyAssistance: string
    bookService: string
    serviceDate: string
    serviceTime: string
    vehicleDetails: string
    location: string
    notes: string
  }

  // Shopping Cart
  cart: {
    title: string
    empty: string
    subtotal: string
    shipping: string
    tax: string
    total: string
    checkout: string
    continueShopping: string
    quantity: string
    remove: string
    update: string
  }

  // Checkout
  checkout: {
    title: string
    shippingAddress: string
    billingAddress: string
    paymentMethod: string
    orderSummary: string
    placeOrder: string
    creditCard: string
    debitCard: string
    upi: string
    wallet: string
    cod: string
  }

  // Payment
  payment: {
    title: string
    processing: string
    success: string
    failed: string
    cancelled: string
    transactionId: string
    amount: string
    currency: string
  }

  // Orders
  orders: {
    title: string
    orderNumber: string
    status: string
    paymentStatus: string
    shippingAddress: string
    billingAddress: string
    orderItems: string
    totalAmount: string
    orderDate: string
    trackingNumber: string
    estimatedDelivery: string
  }

  // User Account
  account: {
    profile: string
    orders: string
    serviceBookings: string
    wishlist: string
    settings: string
    personalInfo: string
    contactInfo: string
    password: string
    notifications: string
    addresses: string
    paymentMethods: string
  }

  // Authentication
  auth: {
    login: string
    register: string
    email: string
    password: string
    confirmPassword: string
    forgotPassword: string
    rememberMe: string
    signIn: string
    signUp: string
    signOut: string
    welcome: string
    invalidCredentials: string
    accountCreated: string
  }

  // Reviews
  reviews: {
    title: string
    writeReview: string
    rating: string
    comment: string
    durability: string
    wetGrip: string
    mileage: string
    verifiedPurchase: string
    helpful: string
    report: string
  }

  // Search
  search: {
    placeholder: string
    results: string
    noResults: string
    filters: string
    sortBy: string
    relevance: string
    priceLowToHigh: string
    priceHighToLow: string
    newest: string
    popular: string
  }

  // Error Messages
  errors: {
    pageNotFound: string
    serverError: string
    networkError: string
    validationError: string
    authenticationError: string
    authorizationError: string
    paymentError: string
    cartError: string
    orderError: string
  }

  // Success Messages
  success: {
    orderPlaced: string
    paymentReceived: string
    serviceBooked: string
    profileUpdated: string
    passwordChanged: string
    itemAdded: string
    itemRemoved: string
  }

  // Dates and Times
  datetime: {
    today: string
    yesterday: string
    tomorrow: string
    thisWeek: string
    thisMonth: string
    lastWeek: string
    lastMonth: string
    format: string
  }

  // Numbers and Currency
  numbers: {
    currency: string
    percentage: string
    decimal: string
    thousands: string
  }
}

// Translation files
const translations: Record<Language, TranslationKeys> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      view: 'View',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      open: 'Open',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      help: 'Help'
    },
    navigation: {
      home: 'Home',
      tyres: 'Tyres',
      tyreFinder: 'Tyre Finder',
      serviceBooking: 'Service Booking',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
      cart: 'Cart',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },
    products: {
      allTyres: 'All Tyres',
      carTyres: 'Car Tyres',
      bikeTyres: 'Bike Tyres',
      truckTyres: 'Truck Tyres',
      busTyres: 'Bus Tyres',
      tractorTyres: 'Tractor Tyres',
      offRoadTyres: 'Off-Road Tyres',
      featured: 'Featured',
      new: 'New',
      popular: 'Popular',
      price: 'Price',
      brand: 'Brand',
      category: 'Category',
      size: 'Size',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      viewDetails: 'View Details',
      compare: 'Compare',
      wishlist: 'Wishlist'
    },
    specs: {
      width: 'Width',
      aspectRatio: 'Aspect Ratio',
      rimDiameter: 'Rim Diameter',
      loadIndex: 'Load Index',
      speedRating: 'Speed Rating',
      fuelEfficiency: 'Fuel Efficiency',
      wetGrip: 'Wet Grip',
      noiseLevel: 'Noise Level',
      warranty: 'Warranty'
    },
    services: {
      installation: 'Tyre Installation',
      wheelAlignment: 'Wheel Alignment',
      wheelBalancing: 'Wheel Balancing',
      nitrogenFill: 'Nitrogen Fill',
      punctureRepair: 'Puncture Repair',
      emergencyAssistance: 'Emergency Assistance',
      bookService: 'Book Service',
      serviceDate: 'Service Date',
      serviceTime: 'Service Time',
      vehicleDetails: 'Vehicle Details',
      location: 'Location',
      notes: 'Notes'
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      total: 'Total',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      quantity: 'Quantity',
      remove: 'Remove',
      update: 'Update'
    },
    checkout: {
      title: 'Checkout',
      shippingAddress: 'Shipping Address',
      billingAddress: 'Billing Address',
      paymentMethod: 'Payment Method',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      creditCard: 'Credit Card',
      debitCard: 'Debit Card',
      upi: 'UPI',
      wallet: 'Digital Wallet',
      cod: 'Cash on Delivery'
    },
    payment: {
      title: 'Payment',
      processing: 'Processing...',
      success: 'Payment Successful',
      failed: 'Payment Failed',
      cancelled: 'Payment Cancelled',
      transactionId: 'Transaction ID',
      amount: 'Amount',
      currency: 'Currency'
    },
    orders: {
      title: 'Orders',
      orderNumber: 'Order Number',
      status: 'Status',
      paymentStatus: 'Payment Status',
      shippingAddress: 'Shipping Address',
      billingAddress: 'Billing Address',
      orderItems: 'Order Items',
      totalAmount: 'Total Amount',
      orderDate: 'Order Date',
      trackingNumber: 'Tracking Number',
      estimatedDelivery: 'Estimated Delivery'
    },
    account: {
      profile: 'Profile',
      orders: 'Orders',
      serviceBookings: 'Service Bookings',
      wishlist: 'Wishlist',
      settings: 'Settings',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      password: 'Password',
      notifications: 'Notifications',
      addresses: 'Addresses',
      paymentMethods: 'Payment Methods'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      welcome: 'Welcome',
      invalidCredentials: 'Invalid email or password',
      accountCreated: 'Account created successfully'
    },
    reviews: {
      title: 'Reviews',
      writeReview: 'Write a Review',
      rating: 'Rating',
      comment: 'Comment',
      durability: 'Durability',
      wetGrip: 'Wet Grip',
      mileage: 'Mileage',
      verifiedPurchase: 'Verified Purchase',
      helpful: 'Helpful',
      report: 'Report'
    },
    search: {
      placeholder: 'Search for tyres...',
      results: 'Search Results',
      noResults: 'No results found',
      filters: 'Filters',
      sortBy: 'Sort By',
      relevance: 'Relevance',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      newest: 'Newest',
      popular: 'Popular'
    },
    errors: {
      pageNotFound: 'Page Not Found',
      serverError: 'Server Error',
      networkError: 'Network Error',
      validationError: 'Validation Error',
      authenticationError: 'Authentication Error',
      authorizationError: 'Authorization Error',
      paymentError: 'Payment Error',
      cartError: 'Cart Error',
      orderError: 'Order Error'
    },
    success: {
      orderPlaced: 'Order placed successfully',
      paymentReceived: 'Payment received',
      serviceBooked: 'Service booked successfully',
      profileUpdated: 'Profile updated successfully',
      passwordChanged: 'Password changed successfully',
      itemAdded: 'Item added to cart',
      itemRemoved: 'Item removed from cart'
    },
    datetime: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      lastWeek: 'Last Week',
      lastMonth: 'Last Month',
      format: 'Format'
    },
    numbers: {
      currency: '₹',
      percentage: '%',
      decimal: '.',
      thousands: ','
    }
  },

  // Hindi translations
  hi: {
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'छांटें',
      view: 'देखें',
      back: 'पीछे',
      next: 'अगला',
      previous: 'पिछला',
      close: 'बंद करें',
      open: 'खोलें',
      home: 'होम',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
      help: 'मदद'
    },
    navigation: {
      home: 'होम',
      tyres: 'टायर',
      tyreFinder: 'टायर खोजक',
      serviceBooking: 'सेवा बुकिंग',
      services: 'सेवाएं',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
      cart: 'कार्ट',
      profile: 'प्रोफ़ाइल',
      login: 'लॉग इन',
      register: 'रजिस्टर करें',
      logout: 'लॉग आउट'
    },
    products: {
      allTyres: 'सभी टायर',
      carTyres: 'कार टायर',
      bikeTyres: 'बाइक टायर',
      truckTyres: 'ट्रक टायर',
      busTyres: 'बस टायर',
      tractorTyres: 'ट्रैक्टर टायर',
      offRoadTyres: 'ऑफ-रोड टायर',
      featured: 'फ़ीचर्ड',
      new: 'नया',
      popular: 'लोकप्रिय',
      price: 'कीमत',
      brand: 'ब्रांड',
      category: 'श्रेणी',
      size: 'साइज',
      inStock: 'स्टॉक में',
      outOfStock: 'स्टॉक खत्म',
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      viewDetails: 'विवरण देखें',
      compare: 'तुलना करें',
      wishlist: 'इच्छा सूची'
    },
    specs: {
      width: 'चौड़ाई',
      aspectRatio: 'पहलू अनुपात',
      rimDiameter: 'रिम व्यास',
      loadIndex: 'लोड इंडेक्स',
      speedRating: 'स्पीड रेटिंग',
      fuelEfficiency: 'ईंधन दक्षता',
      wetGrip: 'गीली पकड़',
      noiseLevel: 'शोर स्तर',
      warranty: 'वारंटी'
    },
    services: {
      installation: 'टायर इंस्टॉलेशन',
      wheelAlignment: 'पहिया संरेखण',
      wheelBalancing: 'पहिया संतुलन',
      nitrogenFill: 'नाइट्रोजन भरण',
      punctureRepair: 'पंचर मरम्मत',
      emergencyAssistance: 'आपातकालीन सहायता',
      bookService: 'सेवा बुक करें',
      serviceDate: 'सेवा तिथि',
      serviceTime: 'सेवा समय',
      vehicleDetails: 'वाहन विवरण',
      location: 'स्थान',
      notes: 'टिप्पणी'
    },
    cart: {
      title: 'शॉपिंग कार्ट',
      empty: 'आपकी कार्ट खाली है',
      subtotal: 'उप-कुल',
      shipping: 'शिपिंग',
      tax: 'कर',
      total: 'कुल',
      checkout: 'चेकआउट',
      continueShopping: 'खरीदारी जारी रखें',
      quantity: 'मात्रा',
      remove: 'हटाएं',
      update: 'अपडेट करें'
    },
    checkout: {
      title: 'चेकआउट',
      shippingAddress: 'शिपिंग पता',
      billingAddress: 'बिलिंग पता',
      paymentMethod: 'भुगतान विधि',
      orderSummary: 'ऑर्डर सारांश',
      placeOrder: 'ऑर्डर दें',
      creditCard: 'क्रेडिट कार्ड',
      debitCard: 'डेबिट कार्ड',
      upi: 'यूपीआई',
      wallet: 'डिजिटल वॉलेट',
      cod: 'कैश ऑन डिलीवरी'
    },
    payment: {
      title: 'भुगतान',
      processing: 'प्रसंस्करण...',
      success: 'भुगतान सफल',
      failed: 'भुगतान असफल',
      cancelled: 'भुगतान रद्द',
      transactionId: 'लेन-देन आईडी',
      amount: 'राशि',
      currency: 'मुद्रा'
    },
    orders: {
      title: 'ऑर्डर',
      orderNumber: 'ऑर्डर नंबर',
      status: 'स्थिति',
      paymentStatus: 'भुगतान स्थिति',
      shippingAddress: 'शिपिंग पता',
      billingAddress: 'बिलिंग पता',
      orderItems: 'ऑर्डर आइटम',
      totalAmount: 'कुल राशि',
      orderDate: 'ऑर्डर तिथि',
      trackingNumber: 'ट्रैकिंग नंबर',
      estimatedDelivery: 'अनुमानित डिलीवरी'
    },
    account: {
      profile: 'प्रोफ़ाइल',
      orders: 'ऑर्डर',
      serviceBookings: 'सेवा बुकिंग',
      wishlist: 'इच्छा सूची',
      settings: 'सेटिंग्स',
      personalInfo: 'व्यक्तिगत जानकारी',
      contactInfo: 'संपर्क जानकारी',
      password: 'पासवर्ड',
      notifications: 'सूचनाएं',
      addresses: 'पते',
      paymentMethods: 'भुगतान विधियां'
    },
    auth: {
      login: 'लॉग इन',
      register: 'रजिस्टर करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signOut: 'साइन आउट',
      welcome: 'स्वागत',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
      accountCreated: 'खाता सफलतापूर्वक बनाया गया'
    },
    reviews: {
      title: 'समीक्षा',
      writeReview: 'समीक्षा लिखें',
      rating: 'रेटिंग',
      comment: 'टिप्पणी',
      durability: 'टिकाऊपन',
      wetGrip: 'गीली पकड़',
      mileage: 'माइलेज',
      verifiedPurchase: 'सत्यापित खरीदारी',
      helpful: 'मददगार',
      report: 'रिपोर्ट'
    },
    search: {
      placeholder: 'टायर खोजें...',
      results: 'खोज परिणाम',
      noResults: 'कोई परिणाम नहीं मिला',
      filters: 'फ़िल्टर',
      sortBy: 'इसके अनुसार छांटें',
      relevance: 'प्रासंगिकता',
      priceLowToHigh: 'कीमत: कम से अधिक',
      priceHighToLow: 'कीमत: अधिक से कम',
      newest: 'नवीनतम',
      popular: 'लोकप्रिय'
    },
    errors: {
      pageNotFound: 'पृष्ठ नहीं मिली',
      serverError: 'सर्वर त्रुटि',
      networkError: 'नेटवर्क त्रुटि',
      validationError: 'सत्यापन त्रुटि',
      authenticationError: 'प्रमाणीकरण त्रुटि',
      authorizationError: 'अधिकार त्रुटि',
      paymentError: 'भुगतान त्रुटि',
      cartError: 'कार्ट त्रुटि',
      orderError: 'ऑर्डर त्रुटि'
    },
    success: {
      orderPlaced: 'ऑर्डर सफलतापूर्वक दिया गया',
      paymentReceived: 'भुगतान प्राप्त हुआ',
      serviceBooked: 'सेवा सफलतापूर्वक बुक की गई',
      profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट किया गया',
      passwordChanged: 'पासवर्ड सफलतापूर्वक बदला गया',
      itemAdded: 'आइटम कार्ट में जोड़ा गया',
      itemRemoved: 'आइटम कार्ट से हटा दिया गया'
    },
    datetime: {
      today: 'आज',
      yesterday: 'कल',
      tomorrow: 'कल',
      thisWeek: 'इस सप्ताह',
      thisMonth: 'इस महीने',
      lastWeek: 'पिछले सप्ताह',
      lastMonth: 'पिछले महीने',
      format: 'प्रारूप'
    },
    numbers: {
      currency: '₹',
      percentage: '%',
      decimal: '.',
      thousands: ','
    }
  },

  // Add more languages as needed
  ta: { /* Tamil translations */ } as any,
  te: { /* Telugu translations */ } as any,
  mr: { /* Marathi translations */ } as any,
  gu: { /* Gujarati translations */ } as any,
  bn: { /* Bengali translations */ } as any,
  kn: { /* Kannada translations */ } as any,
  ml: { /* Malayalam translations */ } as any,
  pa: { /* Punjabi translations */ } as any
}

// Internationalization Service
export class I18nService {
  private currentLanguage: Language = 'en'
  private translations: TranslationKeys = translations.en

  constructor() {
    // Load language from localStorage or browser preferences
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && translations[savedLanguage]) {
        this.currentLanguage = savedLanguage
        this.translations = translations[savedLanguage]
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0] as Language
        if (translations[browserLang]) {
          this.currentLanguage = browserLang
          this.translations = translations[browserLang]
        }
      }
    }
  }

  setLanguage(language: Language) {
    if (translations[language]) {
      this.currentLanguage = language
      this.translations = translations[language]
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language)
        document.documentElement.lang = language
      }
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage
  }

  getAvailableLanguages(): { code: Language; name: string; nativeName: string }[] {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
      { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
      { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
      { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
    ]
  }

  t(key: string): string {
    const keys = key.split('.')
    let value: any = this.translations
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  // Helper methods for common translations
  formatCurrency(amount: number): string {
    return `${this.t('numbers.currency')}${amount.toLocaleString('en-IN')}`
  }

  formatPercentage(value: number): string {
    return `${value}${this.t('numbers.percentage')}`
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(this.currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString(this.currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// Create i18n service instance
export const i18n = new I18nService()