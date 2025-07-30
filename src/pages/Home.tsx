import { useEffect, useState } from "react"
import { MovieCard } from "@/components/MovieCard"
import { MovieCarousel } from "@/components/MovieCarousel"
import { getTrendingMovies, getRecommendedMovies, getNewReleases, getTopRatedMovies, Movie } from "@/api/movies"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/useToast"

export function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([])
  const [newReleases, setNewReleases] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Loading home page data")
        setLoading(true)
        
        const [trending, recommended, releases, rated] = await Promise.all([
          getTrendingMovies(),
          getRecommendedMovies(),
          getNewReleases(),
          getTopRatedMovies()
        ])

        setTrendingMovies((trending as any).movies)
        setRecommendedMovies((recommended as any).movies)
        setNewReleases((releases as any).movies)
        setTopRated((rated as any).movies)
      } catch (error: any) {
        console.error("Error fetching home data:", error)
        toast({
          title: "Error",
          description: "Failed to load movies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-56 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-56 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to MovieHub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your next favorite movie with personalized recommendations and trending content
        </p>
      </div>

      <MovieCarousel
        title="Recommended for You"
        movies={recommendedMovies}
        subtitle="Based on your viewing history and preferences"
      />

      <MovieCarousel
        title="Trending Now"
        movies={trendingMovies}
        subtitle="What everyone is watching right now"
      />

      <MovieCarousel
        title="New Releases"
        movies={newReleases}
        subtitle="Fresh content just added"
      />

      <MovieCarousel
        title="Top Rated"
        movies={topRated}
        subtitle="Highest rated movies of all time"
      />
    </div>
  )
}