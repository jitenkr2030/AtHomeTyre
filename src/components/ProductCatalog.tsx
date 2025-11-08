'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import TyreCard from './TyreCard'
import { 
  Filter, 
  Search, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Car,
  Bike,
  Truck,
  Bus,
  Tractor,
  Mountain
} from 'lucide-react'

interface Tyre {
  id: string
  name: string
  description?: string
  category: string
  price: number
  b2bPrice?: number
  stock: number
  images?: string
  features?: string
  fuelEfficiency?: number
  wetGrip?: number
  noiseLevel?: number
  warranty?: number
  width: number
  aspectRatio: number
  rimDiameter: number
  speedRating?: string
  brand: {
    id: string
    name: string
    logo?: string
  }
  avgRating: number
  reviewCount: number
}

interface Filters {
  category: string[]
  brand: string[]
  minPrice: number
  maxPrice: number
  fuelEfficiency: number[]
  wetGrip: number[]
  noiseLevel: number[]
  inStock: boolean
}

const categories = [
  { value: 'CAR', label: 'Car Tyres', icon: <Car className="h-4 w-4" /> },
  { value: 'BIKE', label: 'Bike Tyres', icon: <Bike className="h-4 w-4" /> },
  { value: 'TRUCK', label: 'Truck Tyres', icon: <Truck className="h-4 w-4" /> },
  { value: 'BUS', label: 'Bus Tyres', icon: <Bus className="h-4 w-4" /> },
  { value: 'TRACTOR', label: 'Tractor Tyres', icon: <Tractor className="h-4 w-4" /> },
  { value: 'OFF_ROAD', label: 'Off-Road', icon: <Mountain className="h-4 w-4" /> }
]

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'createdAt-desc', label: 'Newest First' }
]

export default function ProductCatalog() {
  const [tyres, setTyres] = useState<Tyre[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt-desc')
  const [filters, setFilters] = useState<Filters>({
    category: [],
    brand: [],
    minPrice: 0,
    maxPrice: 50000,
    fuelEfficiency: [],
    wetGrip: [],
    noiseLevel: [],
    inStock: false
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchTyres()
  }, [searchTerm, sortBy, filters])

  const fetchTyres = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '24',
        search: searchTerm
      })

      // Add sort parameters
      const [sortField, sortOrder] = sortBy.split('-')
      params.append('sortBy', sortField)
      params.append('sortOrder', sortOrder)

      // Add filter parameters
      if (filters.category.length > 0) {
        params.append('category', filters.category.join(','))
      }
      if (filters.brand.length > 0) {
        params.append('brand', filters.brand.join(','))
      }
      if (filters.minPrice > 0) {
        params.append('minPrice', filters.minPrice.toString())
      }
      if (filters.maxPrice < 50000) {
        params.append('maxPrice', filters.maxPrice.toString())
      }

      const response = await fetch(`/api/tyres?${params}`)
      const data = await response.json()
      setTyres(data.tyres || [])
    } catch (error) {
      console.error('Error fetching tyres:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompare = (tyreId: string) => {
    // Get existing comparison tyres from localStorage
    const existingTyres = JSON.parse(localStorage.getItem('comparisonTyres') || '[]')
    
    // Check if tyre is already in comparison
    if (existingTyres.some((t: any) => t.id === tyreId)) {
      alert('This tyre is already in your comparison list')
      return
    }
    
    // Add the tyre to comparison
    const tyreToAdd = tyres.find(t => t.id === tyreId)
    if (tyreToAdd) {
      existingTyres.push(tyreToAdd)
      localStorage.setItem('comparisonTyres', JSON.stringify(existingTyres))
      
      // Navigate to comparison page
      window.location.href = '/compare'
    }
  }

  const handleAddToCart = async (tyreId: string) => {
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId')
      if (!userId) {
        // Create a new user ID if not exists
        const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('userId', newUserId)
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('userId') || ''
        },
        body: JSON.stringify({
          tyreId,
          quantity: 1
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Show success message or redirect to cart
        window.location.href = '/cart'
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add item to cart')
    }
  }

  const handleAddToWishlist = async (tyreId: string) => {
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId')
      if (!userId) {
        // Create a new user ID if not exists
        const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('userId', newUserId)
      }

      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('userId') || ''
        },
        body: JSON.stringify({
          tyreId
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert('Item added to wishlist successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add item to wishlist')
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      alert('Failed to add item to wishlist')
    }
  }

  const handleViewDetails = (tyreId: string) => {
    console.log('View details:', tyreId)
    // TODO: Navigate to tyre details page
  }

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      minPrice: 0,
      maxPrice: 50000,
      fuelEfficiency: [],
      wetGrip: [],
      noiseLevel: [],
      inStock: false
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Tyres</h1>
        <p className="text-gray-600">Find the perfect tyres for your vehicle from our extensive collection</p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tyres by name, brand, or size..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort and View Controls */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.value}
                        checked={filters.category.includes(category.value)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...filters.category, category.value]
                            : filters.category.filter(c => c !== category.value)
                          updateFilter('category', updated)
                        }}
                      />
                      <label htmlFor={category.value} className="text-sm flex items-center gap-2">
                        {category.icon}
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-4">
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => {
                      updateFilter('minPrice', min)
                      updateFilter('maxPrice', max)
                    }}
                    max={50000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{filters.minPrice.toLocaleString()}</span>
                    <span>₹{filters.maxPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => updateFilter('inStock', checked)}
                  />
                  <label htmlFor="inStock" className="text-sm">In Stock Only</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tyres.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tyres found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {tyres.map(tyre => (
                <TyreCard
                  key={tyre.id}
                  tyre={tyre}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onViewDetails={handleViewDetails}
                  onCompare={handleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}