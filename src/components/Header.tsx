'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ShoppingCart, 
  Menu, 
  Search, 
  User, 
  Phone, 
  Star,
  LogOut,
  Settings,
  Truck,
  Building,
  Wrench
} from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { data: session, status } = useSession()

  useEffect(() => {
    // Fetch cart count - only run on client side
    const fetchCartCount = async () => {
      try {
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
        if (userId) {
          const response = await fetch(`/api/cart`, {
            headers: {
              'x-user-id': userId
            }
          })
          if (response.ok) {
            const data = await response.json()
            setCartCount(data.summary?.totalItems || 0)
          }
        }
      } catch (error) {
        console.error('Error fetching cart count:', error)
      }
    }

    fetchCartCount()
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tyres', href: '/tyres' },
    { name: 'Tyre Finder', href: '/tyre-finder' },
    { name: 'Service Booking', href: '/service-booking' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about/jagannath-tyre' },
    { name: 'Contact Us', href: '/customer-service/contact-us' },
  ]

  const categories = [
    { name: 'Car Tyres', href: '/tyres/car' },
    { name: 'Bike Tyres', href: '/tyres/bike' },
    { name: 'Truck Tyres', href: '/tyres/truck' },
    { name: 'Bus Tyres', href: '/tyres/bus' },
    { name: 'Tractor Tyres', href: '/tyres/tractor' },
    { name: 'Off-Road', href: '/tyres/off-road' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>1800-123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>Free Shipping on Orders Above ₹5000</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                {session.user.role === 'DEALER' && (
                  <Link href="/dealer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    Dealer Dashboard
                  </Link>
                )}
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                {session.user.role === 'CUSTOMER' && (
                  <Link href="/customer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Customer Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/dealer-login" className="hover:text-yellow-400 transition-colors">
                  Dealer Login
                </Link>
                <Link href="/admin" className="hover:text-yellow-400 transition-colors">
                  Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">AH</span>
              </div>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">At Home Tyre</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount > 99 ? '99+' : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            {session ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.profileImage || undefined} />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user.role === 'DEALER' ? 'Dealer' : 
                     session.user.role === 'ADMIN' ? 'Admin' : 'Customer'}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => signIn()}
                className="bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-semibold text-gray-900 hover:text-yellow-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Categories</h3>
                    <div className="pl-4 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block text-gray-600 hover:text-yellow-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {navigation.slice(1).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="pt-4 border-t">
                    <Link
                      href="/dealer-login"
                      className="block text-gray-700 hover:text-yellow-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Dealer Login
                    </Link>
                    <Link
                      href="/admin"
                      className="block text-gray-700 hover:text-yellow-600 transition-colors font-medium mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-50 border-t hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}