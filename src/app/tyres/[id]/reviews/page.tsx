'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, 
  MessageSquare, 
  ArrowLeft,
  TrendingUp,
  Users,
  Award
} from 'lucide-react'

interface Tyre {
  id: string
  name: string
  brand: {
    name: string
  }
  avgRating: number
  reviewCount: number
}

export default function TyreReviewsPage() {
  const params = useParams()
  const tyreId = params.id as string
  const [tyre, setTyre] = useState<Tyre | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTyreDetails()
  }, [tyreId])

  const fetchTyreDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tyres/${tyreId}`)
      if (response.ok) {
        const data = await response.json()
        setTyre(data.tyre)
      }
    } catch (error) {
      console.error('Error fetching tyre details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewAdded = () => {
    // Refresh tyre details to update rating
    fetchTyreDetails()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading tyre reviews...</p>
        </div>
      </div>
    )
  }

  if (!tyre) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tyre not found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find the tyre you're looking for
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tyre.brand.name} {tyre.name}
              </h1>
              <p className="text-gray-600">Customer Reviews and Ratings</p>
            </div>
            
            {/* Rating Summary */}
            <Card className="w-64">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.floor(tyre.avgRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {tyre.avgRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {tyre.reviewCount} review{tyre.reviewCount !== 1 ? 's' : ''}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="write" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Write Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{tyre.avgRating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{tyre.reviewCount}</div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((tyre.reviewCount / (tyre.reviewCount + 10)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Recommendation</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4.2</div>
                  <div className="text-sm text-gray-600">Quality Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <ReviewList tyreId={tyreId} onReviewAdded={handleReviewAdded} />
          </TabsContent>

          <TabsContent value="write">
            <ReviewForm 
              tyreId={tyreId} 
              tyreName={`${tyre.brand.name} ${tyre.name}`}
              onReviewSubmitted={handleReviewAdded}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}