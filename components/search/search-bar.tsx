'use client'

import { useState, useEffect } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchBarProps {
  onSearch: (query: string, category?: string) => void
  categories?: Array<{ id: string; titleRu: string; emoji: string }>
}

export function SearchBar({ onSearch, categories = [] }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery !== null) {
      setIsSearching(true)
      onSearch(debouncedQuery, category !== 'all' ? category : undefined)
      setIsSearching(false)
    }
  }, [debouncedQuery, category])

  const handleClear = () => {
    setQuery('')
    setCategory('all')
    onSearch('', undefined)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Поле поиска */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Поиск видео по названию, описанию или каналу..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 animate-spin" />
          )}
          {query && !isSearching && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Фильтр по категориям */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Все категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.emoji} {cat.titleRu}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Кнопка очистки */}
        {(query || category !== 'all') && (
          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full md:w-auto"
          >
            <X className="w-4 h-4 mr-2" />
            Очистить
          </Button>
        )}
      </div>

      {/* Индикатор активного поиска */}
      {(query || category !== 'all') && (
        <div className="text-sm text-muted-foreground">
          {query && (
            <span>
              Поиск: <span className="font-semibold">&quot;{query}&quot;</span>
            </span>
          )}
          {query && category !== 'all' && <span className="mx-2">•</span>}
          {category !== 'all' && (
            <span>
              Категория:{' '}
              <span className="font-semibold">
                {categories.find((c) => c.id === category)?.titleRu}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
