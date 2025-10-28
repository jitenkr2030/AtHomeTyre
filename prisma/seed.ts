import { PrismaClient, TyreCategory, TyreSeason, OrderStatus, PaymentStatus, PaymentMethod, ServiceType, ServiceStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 12)

  // Customer user
  const customerUser = await prisma.user.upsert({
    where: { email: 'demo@customer.com' },
    update: {},
    create: {
      email: 'demo@customer.com',
      password: hashedPassword,
      name: 'John Customer',
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
      status: 'ACTIVE'
    }
  })

  // Create customer profile
  await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      loyaltyPoints: 100
    }
  })

  // Dealer user
  const dealerUser = await prisma.user.upsert({
    where: { email: 'demo@dealer.com' },
    update: {},
    create: {
      email: 'demo@dealer.com',
      password: hashedPassword,
      name: 'Mike Dealer',
      phone: '+91 98765 43211',
      role: 'DEALER',
      status: 'ACTIVE'
    }
  })

  // Create dealer profile
  await prisma.dealer.upsert({
    where: { userId: dealerUser.id },
    update: {},
    create: {
      userId: dealerUser.id,
      companyName: 'Mike Motors Pvt Ltd',
      gstNumber: '29ABCDE1234F1Z5',
      businessAddress: '123 Business Park, Mumbai, Maharashtra',
      isVerified: true,
      tier: 2,
      creditLimit: 100000
    }
  })

  // Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@athometyre.com' },
    update: {},
    create: {
      email: 'admin@athometyre.com',
      password: hashedPassword,
      name: 'Admin User',
      phone: '+91 98765 43212',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  })

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { name: 'MRF' },
      update: {},
      create: {
        name: 'MRF',
        description: 'MRF is one of India\'s leading tyre manufacturers',
        logo: '/brands/mrf.png'
      }
    }),
    prisma.brand.upsert({
      where: { name: 'Apollo' },
      update: {},
      create: {
        name: 'Apollo',
        description: 'Apollo Tyres - A leading global tyre manufacturer',
        logo: '/brands/apollo.png'
      }
    }),
    prisma.brand.upsert({
      where: { name: 'JK Tyre' },
      update: {},
      create: {
        name: 'JK Tyre',
        description: 'JK Tyre - Pioneering excellence in tyre manufacturing',
        logo: '/brands/jk.png'
      }
    }),
    prisma.brand.upsert({
      where: { name: 'CEAT' },
      update: {},
      create: {
        name: 'CEAT',
        description: 'CEAT - India\'s most trusted tyre brand',
        logo: '/brands/ceat.png'
      }
    })
  ])

  // Create tyres
  const tyres = [
    {
      name: 'ZLX',
      description: 'Premium performance tyre for cars',
      brandId: brands[0].id, // MRF
      category: TyreCategory.CAR,
      width: 205,
      aspectRatio: 55,
      rimDiameter: 16,
      price: 6500,
      b2bPrice: 5800,
      stock: 50,
      fuelEfficiency: 8,
      wetGrip: 7,
      noiseLevel: 6,
      warranty: 60,
      speedRating: 'V',
      loadIndex: 91,
      images: JSON.stringify(['/tyres/mrf-zlx-1.jpg', '/tyres/mrf-zlx-2.jpg']),
      features: JSON.stringify(['Enhanced grip', 'Low rolling resistance', 'Long tread life'])
    },
    {
      name: 'Amazer 3G',
      description: 'Comfort and fuel efficiency for city driving',
      brandId: brands[1].id, // Apollo
      category: TyreCategory.CAR,
      width: 185,
      aspectRatio: 65,
      rimDiameter: 14,
      price: 4200,
      b2bPrice: 3800,
      stock: 75,
      fuelEfficiency: 9,
      wetGrip: 8,
      noiseLevel: 7,
      warranty: 48,
      speedRating: 'H',
      loadIndex: 86,
      images: JSON.stringify(['/tyres/apollo-amazer-1.jpg', '/tyres/apollo-amazer-2.jpg']),
      features: JSON.stringify(['Fuel efficient', 'Comfortable ride', 'All season performance'])
    },
    {
      name: 'Smart UX',
      description: 'Smart tyre for modern vehicles',
      brandId: brands[2].id, // JK Tyre
      category: TyreCategory.CAR,
      width: 195,
      aspectRatio: 60,
      rimDiameter: 15,
      price: 5100,
      b2bPrice: 4600,
      stock: 30,
      fuelEfficiency: 8,
      wetGrip: 8,
      noiseLevel: 6,
      warranty: 54,
      speedRating: 'H',
      loadIndex: 88,
      images: JSON.stringify(['/tyres/jk-smart-1.jpg', '/tyres/jk-smart-2.jpg']),
      features: JSON.stringify(['Smart technology', 'Improved safety', 'Better handling'])
    },
    {
      name: 'Milaze',
      description: 'Durable tyre for rough conditions',
      brandId: brands[3].id, // CEAT
      category: TyreCategory.CAR,
      width: 175,
      aspectRatio: 70,
      rimDiameter: 13,
      price: 3500,
      b2bPrice: 3200,
      stock: 100,
      fuelEfficiency: 7,
      wetGrip: 7,
      noiseLevel: 8,
      warranty: 36,
      speedRating: 'T',
      loadIndex: 82,
      images: JSON.stringify(['/tyres/ceat-milaze-1.jpg', '/tyres/ceat-milaze-2.jpg']),
      features: JSON.stringify(['Long lasting', 'Puncture resistant', 'Value for money'])
    },
    {
      name: 'Nylogrip Zapper',
      description: 'High performance bike tyre',
      brandId: brands[0].id, // MRF
      category: TyreCategory.BIKE,
      width: 100,
      aspectRatio: 90,
      rimDiameter: 18,
      price: 2800,
      b2bPrice: 2500,
      stock: 60,
      fuelEfficiency: 8,
      wetGrip: 9,
      noiseLevel: 5,
      warranty: 24,
      speedRating: 'P',
      loadIndex: 56,
      images: JSON.stringify(['/tyres/mrf-zapper-1.jpg', '/tyres/mrf-zapper-2.jpg']),
      features: JSON.stringify(['Superior grip', 'Excellent cornering', 'Wet weather performance'])
    },
    {
      name: 'Actizip R3',
      description: 'Sporty bike tyre for performance enthusiasts',
      brandId: brands[1].id, // Apollo
      category: TyreCategory.BIKE,
      width: 120,
      aspectRatio: 80,
      rimDiameter: 17,
      price: 3200,
      b2bPrice: 2900,
      stock: 45,
      fuelEfficiency: 7,
      wetGrip: 8,
      noiseLevel: 6,
      warranty: 30,
      speedRating: 'S',
      loadIndex: 61,
      images: JSON.stringify(['/tyres/apollo-actizip-1.jpg', '/tyres/apollo-actizip-2.jpg']),
      features: JSON.stringify(['Sporty design', 'High speed stability', 'Enhanced safety'])
    },
    {
      name: 'Truck Super Lugs',
      description: 'Heavy duty truck tyre',
      brandId: brands[2].id, // JK Tyre
      category: TyreCategory.TRUCK,
      width: 295,
      aspectRatio: 90,
      rimDiameter: 22.5,
      price: 18500,
      b2bPrice: 16500,
      stock: 20,
      fuelEfficiency: 6,
      wetGrip: 7,
      noiseLevel: 9,
      warranty: 48,
      speedRating: 'K',
      loadIndex: 148,
      images: JSON.stringify(['/tyres/jk-truck-1.jpg', '/tyres/jk-truck-2.jpg']),
      features: JSON.stringify(['Heavy duty', 'Long mileage', 'All terrain'])
    },
    {
      name: 'Fuel Smarrt',
      description: 'Fuel efficient bus tyre',
      brandId: brands[3].id, // CEAT
      category: TyreCategory.BUS,
      width: 245,
      aspectRatio: 70,
      rimDiameter: 19.5,
      price: 12500,
      b2bPrice: 11200,
      stock: 35,
      fuelEfficiency: 9,
      wetGrip: 7,
      noiseLevel: 7,
      warranty: 60,
      speedRating: 'M',
      loadIndex: 135,
      images: JSON.stringify(['/tyres/ceat-bus-1.jpg', '/tyres/ceat-bus-2.jpg']),
      features: JSON.stringify(['Fuel efficient', 'Comfortable ride', 'Durable construction'])
    }
  ]

  const createdTyres: any[] = []

  for (const tyreData of tyres) {
    const createdTyre = await prisma.tyre.upsert({
      where: { 
        brandId_name: {
          brandId: tyreData.brandId,
          name: tyreData.name
        }
      },
      update: {},
      create: tyreData
    })
    // Store the created tyre with its ID
    createdTyres.push({ ...tyreData, id: createdTyre.id })
  }

  // Create compatible vehicles
  const compatibleVehicles = [
    { make: 'Toyota', model: 'Innova', year: 2020, tyreIndex: 0 },
    { make: 'Honda', model: 'City', year: 2019, tyreIndex: 1 },
    { make: 'Maruti', model: 'Swift', year: 2021, tyreIndex: 2 },
    { make: 'Hyundai', model: 'i20', year: 2020, tyreIndex: 3 },
    { make: 'Royal Enfield', model: 'Classic 350', year: 2022, tyreIndex: 4 },
    { make: 'Bajaj', model: 'Pulsar', year: 2021, tyreIndex: 5 },
    { make: 'Tata', model: 'Ace', year: 2020, tyreIndex: 6 },
    { make: 'Ashok Leyland', model: 'Vikram', year: 2019, tyreIndex: 7 }
  ]

  for (const vehicle of compatibleVehicles) {
    const tyre = await prisma.tyre.findFirst({
      where: { name: createdTyres[vehicle.tyreIndex].name }
    })
    
    if (tyre) {
      await prisma.compatibleVehicle.upsert({
        where: { 
          tyreId_make_model_year: {
            tyreId: tyre.id,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year
          }
        },
        update: {},
        create: {
          tyreId: tyre.id,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year
        }
      })
    }
  }

  // Create demo reviews
  const reviews = [
    {
      userId: customerUser.id,
      tyreId: createdTyres[0].id, // MRF ZLX
      rating: 5,
      title: 'Excellent performance',
      comment: 'These tyres provide amazing grip and handling. Very satisfied with the purchase.',
      durability: 5,
      grip: 5,
      mileage: 4
    },
    {
      userId: customerUser.id,
      tyreId: createdTyres[1].id, // Apollo Amazer 3G
      rating: 4,
      title: 'Good value for money',
      comment: 'Comfortable ride and fuel efficient. Perfect for city driving.',
      durability: 4,
      grip: 4,
      mileage: 5
    },
    {
      userId: customerUser.id,
      tyreId: createdTyres[4].id, // MRF Nylogrip Zapper
      rating: 5,
      title: 'Best bike tyres',
      comment: 'Superb grip on wet roads. Cornering is excellent.',
      durability: 4,
      grip: 5,
      mileage: 4
    }
  ]

  for (const reviewData of reviews) {
    await prisma.review.upsert({
      where: { 
        userId_tyreId: {
          userId: reviewData.userId,
          tyreId: reviewData.tyreId
        }
      },
      update: {},
      create: {
        ...reviewData,
        isVerified: true
      }
    })
  }

  // Create demo orders
  const orders = [
    {
      userId: customerUser.id,
      orderNumber: 'AHT' + Date.now().toString().slice(-8) + '001',
      totalAmount: 13000,
      discountAmount: 0,
      shippingAmount: 0,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      shippingAddress: JSON.stringify({
        name: 'John Customer',
        address: '123 Main Street, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 98765 43210'
      }),
      notes: 'Deliver to office address',
      orderItems: [
        {
          tyreId: createdTyres[0].id, // MRF ZLX
          quantity: 2,
          unitPrice: 6500,
          totalPrice: 13000
        }
      ]
    },
    {
      userId: customerUser.id,
      orderNumber: 'AHT' + (Date.now() + 1).toString().slice(-8) + '002',
      totalAmount: 8400,
      discountAmount: 0,
      shippingAmount: 500,
      status: OrderStatus.SHIPPED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.UPI,
      shippingAddress: JSON.stringify({
        name: 'John Customer',
        address: '456 Park Avenue, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        phone: '+91 98765 43210'
      }),
      notes: 'Gift wrapping required',
      orderItems: [
        {
          tyreId: createdTyres[1].id, // Apollo Amazer 3G
          quantity: 2,
          unitPrice: 4200,
          totalPrice: 8400
        }
      ]
    }
  ]

  for (const orderData of orders) {
    const order = await prisma.order.upsert({
      where: { orderNumber: orderData.orderNumber },
      update: {},
      create: {
        userId: orderData.userId,
        orderNumber: orderData.orderNumber,
        totalAmount: orderData.totalAmount,
        discountAmount: orderData.discountAmount,
        shippingAmount: orderData.shippingAmount,
        status: orderData.status,
        paymentStatus: orderData.paymentStatus,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        notes: orderData.notes
      }
    })

    // Create order items
    for (const itemData of orderData.orderItems) {
      await prisma.orderItem.upsert({
        where: { 
          id: order.id + '_' + itemData.tyreId
        },
        update: {},
        create: {
          orderId: order.id,
          tyreId: itemData.tyreId,
          quantity: itemData.quantity,
          unitPrice: itemData.unitPrice,
          totalPrice: itemData.totalPrice
        }
      })
    }

    // Create payment records
    await prisma.payment.upsert({
      where: { 
        id: 'payment_' + order.id
      },
      update: {},
      create: {
        orderId: order.id,
        amount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod,
        transactionId: 'TXN' + Date.now().toString().slice(-8),
        status: 'PAID',
        paymentDate: new Date(),
        gatewayResponse: JSON.stringify({ success: true, transaction_id: 'TXN' + Date.now().toString().slice(-8) })
      }
    })
  }

  // Create demo service bookings
  const serviceBookings = [
    {
      userId: customerUser.id,
      serviceType: ServiceType.INSTALLATION,
      bookingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      status: ServiceStatus.CONFIRMED,
      vehicleDetails: JSON.stringify({
        make: 'Toyota',
        model: 'Innova',
        year: 2020,
        licensePlate: 'MH01AB1234'
      }),
      location: JSON.stringify({
        address: '123 Main Street, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      }),
      notes: 'Please call before arriving',
      estimatedCost: 1000
    },
    {
      userId: customerUser.id,
      serviceType: ServiceType.WHEEL_ALIGNMENT,
      bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      status: ServiceStatus.PENDING,
      vehicleDetails: JSON.stringify({
        make: 'Honda',
        model: 'City',
        year: 2019,
        licensePlate: 'MH02CD5678'
      }),
      location: JSON.stringify({
        address: '456 Park Avenue, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      }),
      notes: 'Preferred time: 10 AM - 12 PM',
      estimatedCost: 500
    }
  ]

  for (const serviceData of serviceBookings) {
    await prisma.serviceBooking.upsert({
      where: { 
        id: 'service_' + customerUser.id + '_' + serviceData.serviceType
      },
      update: {},
      create: serviceData
    })
  }

  // Create demo wishlist items
  const wishlistItems = [
    {
      userId: customerUser.id,
      tyreId: createdTyres[2].id // JK Smart UX
    },
    {
      userId: customerUser.id,
      tyreId: createdTyres[4].id // MRF Nylogrip Zapper
    }
  ]

  for (const wishlistData of wishlistItems) {
    await prisma.wishlistItem.upsert({
      where: { 
        userId_tyreId: {
          userId: wishlistData.userId,
          tyreId: wishlistData.tyreId
        }
      },
      update: {},
      create: wishlistData
    })
  }

  // Create demo cart items
  const cartItems = [
    {
      userId: customerUser.id,
      tyreId: createdTyres[3].id, // CEAT Milaze
      quantity: 1
    },
    {
      userId: customerUser.id,
      tyreId: createdTyres[5].id, // Apollo Actizip R3
      quantity: 2
    }
  ]

  for (const cartData of cartItems) {
    await prisma.cartItem.upsert({
      where: { 
        userId_tyreId: {
          userId: cartData.userId,
          tyreId: cartData.tyreId
        }
      },
      update: {},
      create: cartData
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('Demo credentials:')
  console.log('Customer: demo@customer.com / demo123')
  console.log('Dealer: demo@dealer.com / demo123')
  console.log('Admin: admin@jagannathtyre.com / demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })