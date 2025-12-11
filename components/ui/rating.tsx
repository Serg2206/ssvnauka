'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value?: number
  count?: number
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  onChange?: (rating: number) => void
  className?: string
}

export function Rating({
  value = 0,
  count,
  size = 'md',
  readonly = false,
  onChange,
  className
}: RatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(value)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (rating: number) => {
    if (readonly) return
    setCurrentRating(rating)
    onChange?.(rating)
  }

  const displayRating = hoverRating || currentRating

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={cn(
              'transition-all duration-200',
              !readonly && 'cursor-pointer hover:scale-110',
              readonly && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
              )}
            />
          </button>
        ))}
      </div>
      
      {(value > 0 || count) && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-1">
          {value > 0 && (
            <span className="font-semibold text-foreground">
              {value.toFixed(1)}
            </span>
          )}
          {count !== undefined && (
            <span>({count.toLocaleString()})</span>
          )}
        </div>
      )}
    </div>
  )
}

// Компонент распределения рейтингов
interface RatingDistributionProps {
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  total: number
}

export function RatingDistribution({ distribution, total }: RatingDistributionProps) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = distribution[stars as keyof typeof distribution]
        const percentage = total > 0 ? (count / total) * 100 : 0

        return (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm font-medium">{stars}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            </div>
            
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <span className="text-sm text-muted-foreground w-12 text-right">
              {count}
            </span>
          </div>
        )
      })}
    </div>
  )
}
