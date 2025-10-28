'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TyreCard from './TyreCard'
import { 
  Search, 
  Car, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Shield,
  Star,
  Zap
} from 'lucide-react'

interface Vehicle {
  make: string
  model: string
  year: string
}

interface TyreRecommendation {
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

interface CompatibilityInfo {
  make: string
  model: string
  year: number
  variant?: string
}

export default function TyreFinder() {
  const [makes, setMakes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [years, setYears] = useState<number[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({
    make: '',
    model: '',
    year: ''
  })
  const [recommendations, setRecommendations] = useState<{
    tyre: TyreRecommendation
    compatibility: CompatibilityInfo
  }[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    fetchMakes()
  }, [])

  useEffect(() => {
    if (selectedVehicle.make) {
      fetchModels()
    }
  }, [selectedVehicle.make])

  useEffect(() => {
    if (selectedVehicle.make && selectedVehicle.model) {
      fetchYears()
    }
  }, [selectedVehicle.make, selectedVehicle.model])

  const fetchMakes = async () => {
    try {
      const response = await fetch('/api/tyre-finder')
      const data = await response.json()
      setMakes(data.makes || [])
    } catch (error) {
      console.error('Error fetching makes:', error)
    }
  }

  const fetchModels = async () => {
    try {
      const response = await fetch(`/api/tyre-finder?make=${selectedVehicle.make}`)
      const data = await response.json()
      // Extract unique models from compatible vehicles
      const uniqueModels = [...new Set((data.tyres as any[])?.map((t: any) => t.compatibility?.model) || [])]
      setModels(uniqueModels.filter(Boolean) as string[])
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const fetchYears = async () => {
    try {
      const response = await fetch(`/api/tyre-finder?make=${selectedVehicle.make}&model=${selectedVehicle.model}`)
      const data = await response.json()
      // Extract unique years from compatible vehicles
      const uniqueYears = [...new Set((data.tyres as any[])?.map((t: any) => t.compatibility?.year) || [])]
      setYears((uniqueYears as number[]).sort((a: number, b: number) => b - a)) // Sort descending
    } catch (error) {
      console.error('Error fetching years:', error)
    }
  }

  const handleSearch = async () => {
    if (!selectedVehicle.make || !selectedVehicle.model || !selectedVehicle.year) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/tyre-finder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedVehicle)
      })

      const data = await response.json()
      setRecommendations(data.recommendations || [])
      setSearched(true)
    } catch (error) {
      console.error('Error searching for tyres:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (tyreId: string) => {
    console.log('Add to cart:', tyreId)
    // TODO: Implement add to cart functionality
  }

  const handleAddToWishlist = (tyreId: string) => {
    console.log('Add to wishlist:', tyreId)
    // TODO: Implement add to wishlist functionality
  }

  const handleViewDetails = (tyreId: string) => {
    console.log('View details:', tyreId)
    // TODO: Navigate to tyre details page
  }

  const getRecommendationBadge = (index: number) => {
    if (index === 0) return { text: 'Best Match', variant: 'default' as const, icon: <Sparkles className="h-4 w-4" /> }
    if (index === 1) return { text: 'Great Value', variant: 'secondary' as const, icon: <Star className="h-4 w-4" /> }
    if (index === 2) return { text: 'Premium Choice', variant: 'outline' as const, icon: <Shield className="h-4 w-4" /> }
    return { text: 'Good Option', variant: 'outline' as const, icon: <Zap className="h-4 w-4" /> }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect Tyres
          </h1>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Enter your vehicle details and get personalized tyre recommendations from our extensive collection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-6 w-6 text-yellow-600" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <Select
                  value={selectedVehicle.make}
                  onValueChange={(value) => setSelectedVehicle(prev => ({ ...prev, make: value, model: '', year: '' }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map(make => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <Select
                  value={selectedVehicle.model}
                  onValueChange={(value) => setSelectedVehicle(prev => ({ ...prev, model: value, year: '' }))}
                  disabled={!selectedVehicle.make}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <Select
                  value={selectedVehicle.year}
                  onValueChange={(value) => setSelectedVehicle(prev => ({ ...prev, year: value }))}
                  disabled={!selectedVehicle.model}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={!selectedVehicle.make || !selectedVehicle.model || !selectedVehicle.year || loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  Finding Tyres...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Compatible Tyres
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div>
            {recommendations.length > 0 ? (
              <div>
                {/* Success Message */}
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Found {recommendations.length} compatible tyre{recommendations.length !== 1 ? 's' : ''} for your {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </AlertDescription>
                </Alert>

                {/* Recommendations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((rec, index) => {
                    const badge = getRecommendationBadge(index)
                    return (
                      <div key={rec.tyre.id} className="relative">
                        {/* Recommendation Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <Badge variant={badge.variant} className="flex items-center gap-1">
                            {badge.icon}
                            {badge.text}
                          </Badge>
                        </div>
                        
                        <TyreCard
                          tyre={rec.tyre}
                          onAddToCart={handleAddToCart}
                          onAddToWishlist={handleAddToWishlist}
                          onViewDetails={handleViewDetails}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Additional Information */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Why These Tyres?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Perfect Fit</h4>
                        <p className="text-sm text-gray-600">
                          These tyres are specifically designed to fit your vehicle's specifications
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Star className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Top Rated</h4>
                        <p className="text-sm text-gray-600">
                          Highly rated by customers for performance, durability, and safety
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Warranty Protected</h4>
                        <p className="text-sm text-gray-600">
                          All tyres come with manufacturer warranty for peace of mind
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  No compatible tyres found for your {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}. 
                  Please check the vehicle details or try searching with different specifications.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Popular Categories */}
        {!searched && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Car Tyres', icon: <Car className="h-8 w-8" />, count: '500+ Options' },
                { name: 'Bike Tyres', icon: <Car className="h-8 w-8" />, count: '300+ Options' },
                { name: 'Truck Tyres', icon: <Car className="h-8 w-8" />, count: '200+ Options' }
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-yellow-600">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.count}</p>
                    <Button variant="outline" className="w-full">
                      Browse {category.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}