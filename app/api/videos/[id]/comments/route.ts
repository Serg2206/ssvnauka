import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// GET - Получить комментарии к видео
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Получить только родительские комментарии (без parentId)
    const comments = await prisma.comment.findMany({
      where: {
        videoId,
        parentId: null,
        status: 'published'
      },
      include: {
        replies: {
          where: { status: 'published' },
          orderBy: { createdAt: 'asc' },
          take: 10 // Первые 10 ответов
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    const total = await prisma.comment.count({
      where: {
        videoId,
        parentId: null,
        status: 'published'
      }
    })

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST - Добавить комментарий
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id
    const body = await request.json()
    const { text, userName, userEmail, userId, parentId } = body

    // Валидация
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment text is required' },
        { status: 400 }
      )
    }

    if (!userName || userName.trim().length === 0) {
      return NextResponse.json(
        { error: 'User name is required' },
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

    // Если это ответ, проверить существование родительского комментария
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      })

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        )
      }
    }

    // Создать комментарий
    const comment = await prisma.comment.create({
      data: {
        videoId,
        text: text.trim(),
        userName: userName.trim(),
        userEmail,
        userId,
        parentId
      },
      include: {
        replies: true
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
