import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              customerProfile: true,
              dealerProfile: true
            }
          })

          if (!user) {
            return null
          }

          // Check if user is active
          if (user.status !== 'ACTIVE') {
            throw new Error('Your account is not active. Please contact support.')
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            phone: user.phone,
            profileImage: user.profileImage,
            customerProfile: user.customerProfile,
            dealerProfile: user.dealerProfile
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
        token.customerProfile = user.customerProfile
        token.dealerProfile = user.dealerProfile
        token.phone = user.phone
        token.profileImage = user.profileImage
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as any
        session.user.status = token.status as any
        session.user.customerProfile = token.customerProfile as any
        session.user.dealerProfile = token.dealerProfile as any
        session.user.phone = token.phone as string
        session.user.profileImage = token.profileImage as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  debug: process.env.NODE_ENV === 'development'
}