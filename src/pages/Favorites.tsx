import { useEffect, useState } from "react"
import { getUserFavorites, removeFromFavorites } from "@/api/user"
import { MovieCard } from "@/components/MovieCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/useToast"
import { Heart, Trash2 } from "lucide-react"

interface FavoriteMovie {
  _id: string
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

export function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log("Fetching user favorites")
        setLoading(true)
        const response = await getUserFavorites()
        setFavorites((response as any).favorites)
      } catch (error: any) {
        console.error("Error fetching favorites:", error)
        toast({
          title: "Error",
          description: "Failed to load favorites. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [toast])

  const handleRemoveFavorite = async (movieId: string, movieTitle: string) => {
    try {
      console.log("Removing favorite:", movieId)
      setRemoving(movieId)
      await removeFromFavorites(movieId)
      setFavorites(favorites.filter(movie => movie._id !== movieId))
      toast({
        title: "Removed from favorites",
        description: `${movieTitle} has been removed from your favorites.`,
      })
    } catch (error: any) {
      console.error("Error removing favorite:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites.",
        variant: "destructive",
      })
    } finally {
      setRemoving(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            My Favorites
          </h1>
          <p className="text-muted-foreground mt-2">
            {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your favorites
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie._id} className="relative group">
              <MovieCard movie={movie} />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                onClick={() => handleRemoveFavorite(movie._id, movie.title)}
                disabled={removing === movie._id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start adding movies to your favorites to see them here
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Discover Movies
          </Button>
        </div>
      )}
    </div>
  )
}