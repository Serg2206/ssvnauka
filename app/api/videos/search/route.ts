import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// GET - Поиск видео
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Построить условия поиска
    const where: any = {}

    // Поиск по тексту (в заголовке или описании)
    if (q) {
      where.OR = [
        { titleRu: { contains: q, mode: 'insensitive' } },
        { titleEn: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { channel: { contains: q, mode: 'insensitive' } }
      ]
    }

    // Фильтр по категории
    if (category && category !== 'all') {
      where.categoryId = category
    }

    // Выполнить поиск
    const videos = await prisma.video.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            titleRu: true,
            emoji: true
          }
        },
        _count: {
          select: {
            ratings: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Подсчитать общее количество результатов
    const total = await prisma.video.count({ where })

    // Для каждого видео получить средний рейтинг
    const videosWithRatings = await Promise.all(
      videos.map(async (video) => {
        const ratings = await prisma.rating.findMany({
          where: { videoId: video.id },
          select: { rating: true }
        })

        const averageRating = ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0

        return {
          ...video,
          averageRating: Math.round(averageRating * 10) / 10,
          ratingsCount: ratings.length
        }
      })
    )

    return NextResponse.json({
      videos: videosWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      query: {
        q,
        category
      }
    })
  } catch (error) {
    console.error('Error searching videos:', error)
    return NextResponse.json(
      { error: 'Failed to search videos' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
