import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { Clock, Eye, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VideoRating } from '@/components/video/video-rating'
import { CommentsSection } from '@/components/video/comments-section'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    id: string
  }
}

async function getVideo(id: string) {
  try {
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        category: true,
        _count: {
          select: {
            ratings: true,
            comments: true
          }
        }
      }
    })

    return video
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

async function getRelatedVideos(categoryId: string, currentVideoId: string) {
  try {
    const videos = await prisma.video.findMany({
      where: {
        categoryId,
        id: { not: currentVideoId }
      },
      include: {
        category: {
          select: {
            titleRu: true,
            emoji: true
          }
        }
      },
      take: 4,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return videos
  } catch (error) {
    console.error('Error fetching related videos:', error)
    return []
  } finally {
    await prisma.$disconnect()
  }
}

export default async function VideoPage({ params }: PageProps) {
  const video = await getVideo(params.id)

  if (!video) {
    notFound()
  }

  const relatedVideos = await getRelatedVideos(video.categoryId, video.id)

  // Извлечь YouTube video ID из URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeVideoId(video.youtubeUrl)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться на главную
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-8">
            {/* Видео плеер */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={video.titleRu}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center space-y-4">
                      <p>Видео недоступно для встраивания</p>
                      <Button asChild variant="secondary">
                        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Открыть на YouTube
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Информация о видео */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="text-base px-3 py-1">
                  {video.category.emoji} {video.category.titleRu}
                </Badge>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {video.duration}
                </Badge>
                {video.viewCount && (
                  <Badge variant="outline" className="text-base px-3 py-1">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.viewCount}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {video.titleRu}
              </h1>

              <div className="flex items-center justify-between py-4 border-y">
                <div>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {video.channel}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {video._count.comments} комментариев • {video._count.ratings} оценок
                  </p>
                </div>

                <Button asChild size="lg">
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Смотреть на YouTube
                  </a>
                </Button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3>Описание</h3>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Комментарии */}
            <CommentsSection videoId={video.id} />
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Рейтинг */}
            <VideoRating videoId={video.id} showDistribution />

            {/* Похожие видео */}
            {relatedVideos.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Похожие видео</h3>
                  <div className="space-y-4">
                    {relatedVideos.map((relatedVideo: any) => (
                      <Link
                        key={relatedVideo.id}
                        href={`/videos/${relatedVideo.id}`}
                        className="block group"
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-75 transition-opacity">
                              <ExternalLink className="w-8 h-8" />
                            </div>
                            <div className="absolute bottom-2 right-2">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {relatedVideo.duration}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {relatedVideo.titleRu}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {relatedVideo.channel}
                            </p>
                            <Badge variant="outline" className="text-xs mt-2">
                              {relatedVideo.category.emoji} {relatedVideo.category.titleRu}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
