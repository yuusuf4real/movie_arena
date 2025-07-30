import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieById, Movie } from "@/api/movies"
import { addToFavorites, removeFromFavorites, addToWatchlist, rateMovie, getUserWatchlists, Watchlist } from "@/api/user"
import { MovieCard } from "@/components/MovieCard"
import { RatingModal } from "@/components/RatingModal"
import { WatchlistModal } from "@/components/WatchlistModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/useToast"
import { Heart, Bookmark, Star, Clock, Calendar, ArrowLeft, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showWatchlistModal, setShowWatchlistModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        console.log("Fetching movie details for ID:", id)
        setLoading(true)
        
        const [movieResponse, watchlistsResponse] = await Promise.all([
          getMovieById(id),
          getUserWatchlists()
        ])

        setMovie((movieResponse as any).movie)
        setWatchlists((watchlistsResponse as any).watchlists)
      } catch (error: any) {
        console.error("Error fetching movie details:", error)
        toast({
          title: "Error",
          description: "Failed to load movie details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, toast])

  const handleToggleFavorite = async () => {
    if (!movie) return

    try {
      if (isFavorite) {
        await removeFromFavorites(movie._id)
        setIsFavorite(false)
        toast({
          title: "Removed from favorites",
          description: `${movie.title} has been removed from your favorites.`,
        })
      } else {
        await addToFavorites(movie._id)
        setIsFavorite(true)
        toast({
          title: "Added to favorites",
          description: `${movie.title} has been added to your favorites.`,
        })
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update favorites.",
        variant: "destructive",
      })
    }
  }

  const handleAddToWatchlist = async (watchlistId: string) => {
    if (!movie) return

    try {
      await addToWatchlist(watchlistId, movie._id)
      toast({
        title: "Added to watchlist",
        description: `${movie.title} has been added to your watchlist.`,
      })
      setShowWatchlistModal(false)
    } catch (error: any) {
      console.error("Error adding to watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add to watchlist.",
        variant: "destructive",
      })
    }
  }

  const handleRateMovie = async (rating: number, review?: string) => {
    if (!movie) return

    try {
      await rateMovie({ movieId: movie._id, rating, review })
      toast({
        title: "Movie rated",
        description: `You rated ${movie.title} ${rating} star${rating !== 1 ? 's' : ''}.`,
      })
      setShowRatingModal(false)
    } catch (error: any) {
      console.error("Error rating movie:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to rate movie.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div
        className="relative h-96 rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 flex items-end p-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(movie.release_date).getFullYear()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {movie.runtime} min
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          <div className="space-y-3">
            <Button
              onClick={handleToggleFavorite}
              variant={isFavorite ? "default" : "outline"}
              className={cn(
                "w-full",
                isFavorite && "bg-red-500 hover:bg-red-600 text-white"
              )}
            >
              <Heart className={cn("mr-2 h-4 w-4", isFavorite && "fill-current")} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>

            <Button
              onClick={() => setShowWatchlistModal(true)}
              variant="outline"
              className="w-full"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Add to Watchlist
            </Button>

            <Button
              onClick={() => setShowRatingModal(true)}
              variant="outline"
              className="w-full"
            >
              <Star className="mr-2 h-4 w-4" />
              Rate This Movie
            </Button>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Play className="mr-2 h-4 w-4" />
              Watch Trailer
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Cast</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-avatar.jpg'
                      }}
                    />
                    <p className="font-medium text-sm">{actor.name}</p>
                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {movie.similar && movie.similar.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Similar Movies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movie.similar.slice(0, 4).map((similarMovie) => (
                  <MovieCard key={similarMovie._id} movie={similarMovie} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRateMovie}
        movieTitle={movie.title}
      />

      <WatchlistModal
        isOpen={showWatchlistModal}
        onClose={() => setShowWatchlistModal(false)}
        onAddToWatchlist={handleAddToWatchlist}
        watchlists={watchlists}
      />
    </div>
  )
}