import { Movie } from "@/api/movies"
import { MovieCard } from "./MovieCard"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

interface MovieCarouselProps {
  title: string
  subtitle?: string
  movies: Movie[]
}

export function MovieCarousel({ title, subtitle, movies }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Width of card + gap
      const currentScroll = scrollRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount * 3
        : currentScroll + scrollAmount * 3

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="h-8 w-8 p-0 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="h-8 w-8 p-0 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <div key={movie._id} className="flex-shrink-0 w-56">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}