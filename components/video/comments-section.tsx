'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, ThumbsUp, Reply, Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Comment {
  id: string
  text: string
  userName: string
  createdAt: string
  likes: number
  replies?: Comment[]
}

interface CommentsSectionProps {
  videoId: string
}

export function CommentsSection({ videoId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [userName, setUserName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
    // Загрузить сохраненное имя пользователя
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [videoId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}/comments`)
      const data = await response.json()
      setComments(data.comments || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault()
    
    if (!newComment.trim() || !userName.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)

    try {
      // Сохранить имя пользователя
      localStorage.setItem('userName', userName)

      const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newComment,
          userName: userName,
          parentId
        })
      })

      if (response.ok) {
        setNewComment('')
        fetchComments() // Обновить список комментариев
        toast({
          title: 'Успешно!',
          description: 'Ваш комментарий опубликован',
        })
      } else {
        throw new Error('Failed to submit comment')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить комментарий. Попробуйте позже.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'только что'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} дн назад`
    
    return date.toLocaleDateString('ru-RU')
  }

  if (loading) {
    return (
      <section className="py-8 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 border-t-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h3 className="text-2xl font-bold">
          Обсуждение ({comments.length})
        </h3>
      </div>

      {/* Форма добавления комментария */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled={submitting}
            />
            <Textarea
              placeholder="Поделитесь своим мнением о видео..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              required
              disabled={submitting}
              className="resize-none"
            />
            <Button type="submit" disabled={submitting}>
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Отправка...' : 'Отправить комментарий'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Список комментариев */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} videoId={videoId} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Пока нет комментариев</p>
          <p className="text-sm">Будьте первым, кто поделится своим мнением!</p>
        </div>
      )}
    </section>
  )
}

function CommentCard({ comment, videoId }: { comment: Comment; videoId: string }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replyUserName, setReplyUserName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setReplyUserName(savedName)
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'только что'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} дн назад`
    
    return date.toLocaleDateString('ru-RU')
  }

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyText.trim() || !replyUserName.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)

    try {
      localStorage.setItem('userName', replyUserName)

      const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: replyText,
          userName: replyUserName,
          parentId: comment.id
        })
      })

      if (response.ok) {
        setReplyText('')
        setShowReplyForm(false)
        toast({
          title: 'Успешно!',
          description: 'Ваш ответ опубликован',
        })
        // Обновить страницу для загрузки нового ответа
        window.location.reload()
      } else {
        throw new Error('Failed to submit reply')
      }
    } catch (error) {
      console.error('Error submitting reply:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить ответ. Попробуйте позже.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-lg">{comment.userName}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed mb-4 whitespace-pre-wrap">{comment.text}</p>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="w-4 h-4 mr-2" />
            {comment.likes > 0 ? `Нравится (${comment.likes})` : 'Нравится'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <Reply className="w-4 h-4 mr-2" />
            Ответить
          </Button>
        </div>

        {/* Форма ответа */}
        {showReplyForm && (
          <Card className="mt-4 bg-muted/50">
            <CardContent className="p-4">
              <form onSubmit={handleReplySubmit} className="space-y-3">
                <Input
                  placeholder="Ваше имя"
                  value={replyUserName}
                  onChange={(e) => setReplyUserName(e.target.value)}
                  required
                  disabled={submitting}
                  className="h-9"
                />
                <Textarea
                  placeholder="Напишите ответ..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  required
                  disabled={submitting}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm" disabled={submitting}>
                    <Send className="w-3 h-3 mr-2" />
                    {submitting ? 'Отправка...' : 'Ответить'}
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Вложенные комментарии (ответы) */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-6 pl-8 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{reply.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(reply.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{reply.text}</p>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-3 h-3 mr-2" />
                  {reply.likes > 0 ? `${reply.likes}` : 'Нравится'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
