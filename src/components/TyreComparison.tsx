'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Star, 
  Shield, 
  Fuel, 
  Droplets, 
  Volume2,
  Car,
  CheckCircle,
  AlertCircle
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
  loadIndex?: number
  brand: {
    id: string
    name: string
    logo?: string
  }
  avgRating: number
  reviewCount: number
}

interface ComparisonProps {
  tyres: Tyre[]
  onRemoveTyre: (tyreId: string) => void
  onAddMore: () => void
}

function ComparisonTable({ tyres, onRemoveTyre }: { tyres: Tyre[], onRemoveTyre: (tyreId: string) => void }) {
  const comparisonCategories = [
    {
      title: "Basic Information",
      items: [
        { label: "Brand", getValue: (tyre: Tyre) => tyre.brand.name },
        { label: "Model", getValue: (tyre: Tyre) => tyre.name },
        { label: "Category", getValue: (tyre: Tyre) => tyre.category.replace('_', ' ') },
        { label: "Price", getValue: (tyre: Tyre) => `₹${tyre.price.toLocaleString()}`, highlight: true }
      ]
    },
    {
      title: "Specifications",
      items: [
        { label: "Size", getValue: (tyre: Tyre) => `${tyre.width}/${tyre.aspectRatio}R${tyre.rimDiameter}` },
        { label: "Speed Rating", getValue: (tyre: Tyre) => tyre.speedRating || 'N/A' },
        { label: "Load Index", getValue: (tyre: Tyre) => tyre.loadIndex?.toString() || 'N/A' },
        { label: "Warranty", getValue: (tyre: Tyre) => tyre.warranty ? `${tyre.warranty} months` : 'N/A' }
      ]
    },
    {
      title: "Performance Ratings",
      items: [
        { 
          label: "Fuel Efficiency", 
          getValue: (tyre: Tyre) => tyre.fuelEfficiency ? `${tyre.fuelEfficiency}/10` : 'N/A',
          icon: <Fuel className="h-4 w-4" />
        },
        { 
          label: "Wet Grip", 
          getValue: (tyre: Tyre) => tyre.wetGrip ? `${tyre.wetGrip}/10` : 'N/A',
          icon: <Droplets className="h-4 w-4" />
        },
        { 
          label: "Noise Level", 
          getValue: (tyre: Tyre) => tyre.noiseLevel ? `${tyre.noiseLevel}/10` : 'N/A',
          icon: <Volume2 className="h-4 w-4" />
        },
        { 
          label: "Customer Rating", 
          getValue: (tyre: Tyre) => (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= Math.floor(tyre.avgRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs">({tyre.reviewCount})</span>
            </div>
          ),
          icon: <Star className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Availability",
      items: [
        { 
          label: "Stock Status", 
          getValue: (tyre: Tyre) => (
            <div className="flex items-center gap-1">
              {tyre.stock > 0 ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">In Stock ({tyre.stock})</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">Out of Stock</span>
                </>
              )}
            </div>
          )
        },
        { label: "B2B Price", getValue: (tyre: Tyre) => tyre.b2bPrice ? `₹${tyre.b2bPrice.toLocaleString()}` : 'N/A' }
      ]
    }
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 bg-gray-50 font-medium text-gray-700 min-w-[150px]">Feature</th>
            {tyres.map((tyre, index) => (
              <th key={tyre.id} className="p-3 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{tyre.brand.name}</div>
                    <div className="text-xs text-gray-600">{tyre.name}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveTyre(tyre.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonCategories.map((category) => (
            <>
              <tr key={category.title} className="border-b bg-gray-50">
                <td colSpan={tyres.length + 1} className="p-3 font-medium text-gray-900">
                  {category.title}
                </td>
              </tr>
              {category.items.map((item, itemIndex) => (
                <tr key={itemIndex} className="border-b">
                  <td className="p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      {item.icon && <span className="text-gray-500">{item.icon}</span>}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </td>
                  {tyres.map((tyre) => (
                    <td key={tyre.id} className={`p-3 ${item.highlight ? 'font-medium' : ''}`}>
                      {item.getValue(tyre)}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TyreComparison() {
  const [tyres, setTyres] = useState<Tyre[]>([])
  const [loading, setLoading] = useState(false)

  // Load tyres from localStorage on component mount
  useEffect(() => {
    const savedTyres = localStorage.getItem('comparisonTyres')
    if (savedTyres) {
      try {
        setTyres(JSON.parse(savedTyres))
      } catch (error) {
        console.error('Error loading comparison tyres:', error)
      }
    }
  }, [])

  // Save tyres to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('comparisonTyres', JSON.stringify(tyres))
  }, [tyres])

  const removeTyre = (tyreId: string) => {
    setTyres(prev => prev.filter(tyre => tyre.id !== tyreId))
  }

  const addMoreTyres = () => {
    // Navigate to product catalog
    window.location.href = '/tyres'
  }

  const clearComparison = () => {
    setTyres([])
    localStorage.removeItem('comparisonTyres')
  }

  if (tyres.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Tyres to Compare</h3>
            <p className="text-gray-600 mb-6">
              Add tyres from the product catalog to compare them side by side
            </p>
            <Button onClick={addMoreTyres} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Browse Tyres
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tyre Comparison</h1>
                <p className="text-sm text-gray-600">Compare {tyres.length} tyre{tyres.length !== 1 ? 's' : ''} side by side</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearComparison}>
                Clear All
              </Button>
              <Button onClick={addMoreTyres}>
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            You can compare up to 4 tyres at once. Use the comparison table below to see detailed specifications and make an informed decision.
          </AlertDescription>
        </Alert>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tyres.map((tyre) => (
            <Card key={tyre.id} className="relative">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTyre(tyre.id)}
                  className="bg-white/80 hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="font-semibold text-lg">{tyre.brand.name}</div>
                  <div className="text-sm text-gray-600">{tyre.name}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Size:</span>
                    <span className="text-sm font-medium">{tyre.width}/{tyre.aspectRatio}R{tyre.rimDiameter}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-sm font-bold text-green-600">₹{tyre.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.floor(tyre.avgRating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs">({tyre.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <Badge variant={tyre.stock > 0 ? "default" : "destructive"} className="text-xs">
                      {tyre.stock > 0 ? `In Stock (${tyre.stock})` : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonTable tyres={tyres} onRemoveTyre={removeTyre} />
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Our Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold mb-2">Best Overall</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Based on ratings, price, and performance
                </p>
                <div className="text-sm font-medium">
                  {tyres.reduce((best, current) => 
                    current.avgRating > best.avgRating ? current : best
                  ).brand.name} {tyres.reduce((best, current) => 
                    current.avgRating > best.avgRating ? current : best
                  ).name}
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Fuel className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Best Value</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Great performance at an affordable price
                </p>
                <div className="text-sm font-medium">
                  {tyres.reduce((best, current) => 
                    (current.avgRating / current.price) > (best.avgRating / best.price) ? current : best
                  ).brand.name} {tyres.reduce((best, current) => 
                    (current.avgRating / current.price) > (best.avgRating / best.price) ? current : best
                  ).name}
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Most Durable</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Longest warranty and best build quality
                </p>
                <div className="text-sm font-medium">
                  {tyres.reduce((best, current) => 
                    (current.warranty || 0) > (best.warranty || 0) ? current : best
                  ).brand.name} {tyres.reduce((best, current) => 
                    (current.warranty || 0) > (best.warranty || 0) ? current : best
                  ).name}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}