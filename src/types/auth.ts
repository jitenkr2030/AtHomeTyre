import { UserRole, UserStatus } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: UserRole
      status: UserStatus
      phone?: string | null
      profileImage?: string | null
      customerProfile?: any
      dealerProfile?: any
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    role: UserRole
    status: UserStatus
    phone?: string | null
    profileImage?: string | null
    customerProfile?: any
    dealerProfile?: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    status: UserStatus
    phone?: string | null
    profileImage?: string | null
    customerProfile?: any
    dealerProfile?: any
  }
}