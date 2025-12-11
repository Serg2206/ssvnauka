import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// GET - Получить рейтинг видео
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id

    // Получить все рейтинги
    const ratings = await prisma.rating.findMany({
      where: { videoId },
      select: { rating: true }
    })

    if (ratings.length === 0) {
      return NextResponse.json({
        average: 0,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      })
    }

    // Вычислить средний рейтинг
    const sum = ratings.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0)
    const average = sum / ratings.length

    // Вычислить распределение
    const distribution = ratings.reduce((acc: { 5: number; 4: number; 3: number; 2: number; 1: number }, r: { rating: number }) => {
      acc[r.rating as keyof typeof acc]++
      return acc
    }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })

    return NextResponse.json({
      average: Math.round(average * 10) / 10,
      count: ratings.length,
      distribution
    })
  } catch (error) {
    console.error('Error fetching video rating:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rating' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST - Добавить/обновить рейтинг
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id
    const body = await request.json()
    const { rating, userId, sessionId } = body

    // Валидация
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    if (!userId && !sessionId) {
      return NextResponse.json(
        { error: 'userId or sessionId is required' },
        { status: 400 }
      )
    }

    // Проверить существование видео
    const video = await prisma.video.findUnique({
      where: { id: videoId }
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Создать или обновить рейтинг
    const videoRating = await prisma.rating.upsert({
      where: userId
        ? { videoId_userId: { videoId, userId } }
        : { videoId_sessionId: { videoId, sessionId } },
      update: { rating },
      create: {
        videoId,
        userId,
        sessionId,
        rating
      }
    })

    return NextResponse.json(videoRating)
  } catch (error) {
    console.error('Error saving video rating:', error)
    return NextResponse.json(
      { error: 'Failed to save rating' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
