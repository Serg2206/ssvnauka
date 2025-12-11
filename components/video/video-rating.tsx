'use client'

import { useState, useEffect } from 'react'
import { Rating, RatingDistribution } from '@/components/ui/rating'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface VideoRatingProps {
  videoId: string
  showDistribution?: boolean
}

interface RatingData {
  average: number
  count: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export function VideoRating({ videoId, showDistribution = true }: VideoRatingProps) {
  const [ratingData, setRatingData] = useState<RatingData | null>(null)
  const [userRating, setUserRating] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchRating()
  }, [videoId])

  const fetchRating = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}/ratings`)
      const data = await response.json()
      setRatingData(data)
    } catch (error) {
      console.error('Error fetching rating:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRateVideo = async (rating: number) => {
    setSubmitting(true)

    try {
      // Получить или создать session ID
      let sessionId = localStorage.getItem('sessionId')
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
        localStorage.setItem('sessionId', sessionId)
      }

      const response = await fetch(`/api/videos/${videoId}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, sessionId })
      })

      if (response.ok) {
        setUserRating(rating)
        fetchRating() // Обновить данные рейтинга
        toast({
          title: 'Спасибо за оценку!',
          description: `Вы поставили ${rating} ${rating === 1 ? 'звезду' : rating < 5 ? 'звезды' : 'звезд'}`,
        })
      } else {
        throw new Error('Failed to submit rating')
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить оценку. Попробуйте позже.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Оценка видео</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Текущий рейтинг */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {ratingData?.average.toFixed(1) || '0.0'}
              </div>
              <div className="text-sm text-muted-foreground">
                {ratingData?.count || 0} {ratingData?.count === 1 ? 'оценка' : 'оценок'}
              </div>
            </div>
            <Rating 
              value={ratingData?.average || 0} 
              size="lg" 
              readonly 
            />
          </div>
        </div>

        {/* Форма оценки */}
        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-medium">Оцените это видео:</p>
          <Rating
            value={userRating}
            size="lg"
            onChange={handleRateVideo}
            className="justify-center"
          />
          {submitting && (
            <p className="text-xs text-muted-foreground text-center">
              Отправка оценки...
            </p>
          )}
        </div>

        {/* Распределение рейтингов */}
        {showDistribution && ratingData && ratingData.count > 0 && (
          <div className="space-y-2 border-t pt-4">
            <p className="text-sm font-medium mb-3">Распределение оценок:</p>
            <RatingDistribution
              distribution={ratingData.distribution}
              total={ratingData.count}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
