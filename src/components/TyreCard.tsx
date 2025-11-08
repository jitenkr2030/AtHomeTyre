'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart, Heart, Eye, Fuel, Droplets, Volume2, Shield, BarChart3 } from 'lucide-react'
import Image from 'next/image'

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
  width?: number
  aspectRatio?: number
  rimDiameter?: number
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

interface TyreCardProps {
  tyre: Tyre
  onAddToCart?: (tyreId: string) => void
  onAddToWishlist?: (tyreId: string) => void
  onViewDetails?: (tyreId: string) => void
  onCompare?: (tyreId: string) => void
}

export default function TyreCard({ 
  tyre, 
  onAddToCart, 
  onAddToWishlist, 
  onViewDetails,
  onCompare
}: TyreCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          ({tyre.reviewCount})
        </span>
      </div>
    )
  }

  const getStockBadge = () => {
    if (tyre.stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (tyre.stock < 5) {
      return <Badge variant="secondary">Only {tyre.stock} left</Badge>
    } else {
      return <Badge variant="default" className="bg-green-500">In Stock</Badge>
    }
  }

  const parseImages = (imagesString?: string): string[] => {
    if (!imagesString) return []
    try {
      return JSON.parse(imagesString)
    } catch {
      return []
    }
  }

  const images = parseImages(tyre.images)
  const mainImage = images[0] || '/placeholder-tyre.jpg'

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={tyre.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Stock Badge */}
          <div className="absolute top-2 left-2">
            {getStockBadge()}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => onAddToWishlist?.(tyre.id)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Brand Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90">
            {tyre.brand.name}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {tyre.name}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          {renderRatingStars(tyre.avgRating)}
        </div>

        {/* Specs */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Size:</span>
            <span>{tyre.width}/{tyre.aspectRatio}R{tyre.rimDiameter}</span>
          </div>
          {tyre.speedRating && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Speed:</span>
              <span>{tyre.speedRating}</span>
            </div>
          )}
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {tyre.fuelEfficiency && (
            <div className="text-center p-2 bg-gray-50 rounded">
              <Fuel className="h-4 w-4 mx-auto mb-1 text-green-600" />
              <div className="text-xs font-medium">{tyre.fuelEfficiency}/10</div>
              <div className="text-xs text-gray-500">Fuel</div>
            </div>
          )}
          {tyre.wetGrip && (
            <div className="text-center p-2 bg-gray-50 rounded">
              <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-600" />
              <div className="text-xs font-medium">{tyre.wetGrip}/10</div>
              <div className="text-xs text-gray-500">Grip</div>
            </div>
          )}
          {tyre.noiseLevel && (
            <div className="text-center p-2 bg-gray-50 rounded">
              <Volume2 className="h-4 w-4 mx-auto mb-1 text-purple-600" />
              <div className="text-xs font-medium">{tyre.noiseLevel}/10</div>
              <div className="text-xs text-gray-500">Noise</div>
            </div>
          )}
        </div>

        {/* Warranty */}
        {tyre.warranty && (
          <div className="text-xs text-gray-500 mb-3">
            <Shield className="inline h-3 w-3 mr-1" />
            {tyre.warranty} months warranty
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xl font-bold text-gray-900">
                {formatPrice(tyre.price)}
              </div>
              {tyre.b2bPrice && (
                <div className="text-sm text-gray-500">
                  Dealer: {formatPrice(tyre.b2bPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(tyre.id)}
              className="text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCompare?.(tyre.id)}
              className="text-xs"
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Compare
            </Button>
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs"
              onClick={() => onAddToCart?.(tyre.id)}
              disabled={tyre.stock === 0}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}