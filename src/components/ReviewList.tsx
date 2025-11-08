'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  Car,
  Droplets,
  Fuel,
  Volume2,
  Calendar,
  CheckCircle
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  title?: string
  comment?: string
  durability?: number
  grip?: number
  mileage?: number
  isVerified: boolean
  createdAt: string
  user: {
    id: string
    name?: string
    email?: string
    profileImage?: string
  }
}

interface ReviewListProps {
  tyreId: string
  onReviewAdded?: () => void
}

export default function ReviewList({ tyreId, onReviewAdded }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest')

  useEffect(() => {
    fetchReviews()
  }, [tyreId, sortBy])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reviews?tyreId=${tyreId}&sortBy=${sortBy}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
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
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case 'highest': return 'Highest Rated'
      case 'lowest': return 'Lowest Rated'
      default: return 'Most Recent'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your experience with this tyre
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <p className="text-gray-600">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.user.profileImage || undefined} />
                      <AvatarFallback>
                        {review.user.name?.charAt(0) || review.user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {review.user.name || 'Anonymous User'}
                        </span>
                        {review.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Review Title */}
                {review.title && (
                  <h4 className="font-semibold text-gray-900">{review.title}</h4>
                )}

                {/* Review Comment */}
                {review.comment && (
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                )}

                {/* Performance Ratings */}
                {(review.durability || review.grip || review.mileage) && (
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                    {review.durability && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Car className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Durability</span>
                        </div>
                        <div className="flex items-center justify-center">
                          {renderStars(review.durability)}
                        </div>
                      </div>
                    )}
                    {review.grip && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Wet Grip</span>
                        </div>
                        <div className="flex items-center justify-center">
                          {renderStars(review.grip)}
                        </div>
                      </div>
                    )}
                    {review.mileage && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Fuel className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Mileage</span>
                        </div>
                        <div className="flex items-center justify-center">
                          {renderStars(review.mileage)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}