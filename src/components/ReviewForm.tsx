'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Star, 
  Send, 
  AlertCircle,
  CheckCircle,
  Car,
  Droplets,
  Fuel,
  Volume2
} from 'lucide-react'

interface ReviewFormProps {
  tyreId: string
  tyreName: string
  onReviewSubmitted?: () => void
}

export default function ReviewForm({ tyreId, tyreName, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [durability, setDurability] = useState([5])
  const [grip, setGrip] = useState([5])
  const [mileage, setMileage] = useState([5])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!session) {
      setError('Please sign in to write a review')
      return
    }

    if (!title.trim() || !comment.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tyreId,
          rating,
          title: title.trim(),
          comment: comment.trim(),
          durability: durability[0],
          grip: grip[0],
          mileage: mileage[0]
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Thank you! Your review has been submitted successfully.')
        // Reset form
        setTitle('')
        setComment('')
        setRating(5)
        setDurability([5])
        setGrip([5])
        setMileage([5])
        
        if (onReviewSubmitted) {
          onReviewSubmitted()
        }
      } else {
        setError(data.error || 'Failed to submit review')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (currentRating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              star <= currentRating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
            onClick={() => onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sign In to Review</h3>
          <p className="text-gray-600 mb-4">
            Please sign in to share your experience with this tyre
          </p>
          <Button onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin'
            }
          }}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Write a Review for {tyreName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Overall Rating */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Overall Rating *</Label>
            <div className="flex items-center gap-4">
              {renderStars(rating, setRating)}
              <span className="text-lg font-semibold text-gray-700">{rating}/5</span>
            </div>
          </div>

          {/* Performance Ratings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Performance Ratings</Label>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <Car className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Durability</span>
                </div>
                <div className="flex-1">
                  <Slider
                    value={durability}
                    onValueChange={setDurability}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-700">{durability[0]}/5</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Wet Grip</span>
                </div>
                <div className="flex-1">
                  <Slider
                    value={grip}
                    onValueChange={setGrip}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-700">{grip[0]}/5</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <Fuel className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Mileage</span>
                </div>
                <div className="flex-1">
                  <Slider
                    value={mileage}
                    onValueChange={setMileage}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-700">{mileage[0]}/5</span>
              </div>
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">Review Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-base font-medium">Review Comment *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your detailed experience with this tyre. How does it perform in different conditions? What do you like or dislike about it?"
              rows={5}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 text-right">
              {comment.length}/1000 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Review...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}