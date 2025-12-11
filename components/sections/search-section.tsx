'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/search/search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Eye, ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Video {
  id: string
  slug: string
  titleRu: string
  description: string
  duration: string
  channel: string
  youtubeUrl: string
  viewCount?: string
  category: {
    id: string
    titleRu: string
    emoji: string
  }
  averageRating?: number
  ratingsCount?: number
  _count: {
    comments: number
    ratings: number
  }
}

interface SearchSectionProps {
  categories: Array<{ id: string; titleRu: string; emoji: string }>
}

export function SearchSection({ categories }: SearchSectionProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (query: string, category?: string) => {
    setSearched(true)
    setLoading(true)

    try {
      const params = new URLSearchParams()
      if (query) params.append('q', query)
      if (category) params.append('category', category)

      const response = await fetch(`/api/videos/search?${params.toString()}`)
      const data = await response.json()
      setVideos(data.videos || [])
    } catch (error) {
      console.error('Error searching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Заголовок секции */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Поиск видео
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Найдите нужное обучающее видео по хирургии среди нашей коллекции
            </p>
          </div>

          {/* Строка поиска */}
          <SearchBar onSearch={handleSearch} categories={categories} />

          {/* Результаты поиска */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="animate-pulse">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && searched && videos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Ничего не найдено. Попробуйте изменить критерии поиска.
              </p>
            </div>
          )}

          {!loading && videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-sm text-muted-foreground">
                Найдено видео: {videos.length}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-75 transition-opacity">
                        <ExternalLink className="w-12 h-12" />
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-black/50 text-white border-0">
                          {video.category.emoji} {video.category.titleRu}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {video.duration}
                        </Badge>
                      </div>

                      {/* Рейтинг */}
                      {video.averageRating && video.averageRating > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/70 text-white border-0">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {video.averageRating.toFixed(1)} ({video.ratingsCount})
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {video.titleRu}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                          {video.channel}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {video.description}
                      </p>

                      {/* Метаинформация */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2 border-t">
                        {video.viewCount && (
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {video.viewCount}
                          </div>
                        )}
                        <div className="flex items-center">
                          💬 {video._count.comments}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button asChild size="sm">
                          <Link href={`/videos/${video.id}`}>
                            Подробнее
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
