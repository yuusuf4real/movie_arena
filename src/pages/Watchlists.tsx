import { useEffect, useState } from "react"
import { getUserWatchlists, createWatchlist, removeFromWatchlist, Watchlist } from "@/api/user"
import { MovieCard } from "@/components/MovieCard"
import { CreateWatchlistModal } from "@/components/CreateWatchlistModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/useToast"
import { Bookmark, Plus, Trash2, Calendar } from "lucide-react"

export function Watchlists() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [removing, setRemoving] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        console.log("Fetching user watchlists")
        setLoading(true)
        const response = await getUserWatchlists()
        setWatchlists((response as any).watchlists)
      } catch (error: any) {
        console.error("Error fetching watchlists:", error)
        toast({
          title: "Error",
          description: "Failed to load watchlists. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlists()
  }, [toast])

  const handleCreateWatchlist = async (data: { name: string; description?: string }) => {
    try {
      console.log("Creating new watchlist:", data)
      const response = await createWatchlist(data)
      setWatchlists([...watchlists, (response as any).watchlist])
      setShowCreateModal(false)
      toast({
        title: "Watchlist created",
        description: `"${data.name}" has been created successfully.`,
      })
    } catch (error: any) {
      console.error("Error creating watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create watchlist.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromWatchlist = async (watchlistId: string, movieId: string, movieTitle: string) => {
    try {
      console.log("Removing movie from watchlist:", { watchlistId, movieId })
      setRemoving(`${watchlistId}-${movieId}`)
      await removeFromWatchlist(watchlistId, movieId)
      
      // Update the watchlist locally
      setWatchlists(watchlists.map(watchlist => 
        watchlist._id === watchlistId
          ? {
              ...watchlist,
              movies: watchlist.movies.filter(id => id !== movieId),
              movieDetails: watchlist.movieDetails.filter(movie => movie._id !== movieId)
            }
          : watchlist
      ))

      toast({
        title: "Removed from watchlist",
        description: `${movieTitle} has been removed from the watchlist.`,
      })
    } catch (error: any) {
      console.error("Error removing from watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to remove from watchlist.",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
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
            <Bookmark className="h-8 w-8 text-blue-500" />
            My Watchlists
          </h1>
          <p className="text-muted-foreground mt-2">
            {watchlists.length} watchlist{watchlists.length !== 1 ? 's' : ''} created
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Watchlist
        </Button>
      </div>

      {watchlists.length > 0 ? (
        <div className="space-y-8">
          {watchlists.map((watchlist) => (
            <Card key={watchlist._id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {watchlist.name}
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {watchlist.movies.length} movie{watchlist.movies.length !== 1 ? 's' : ''}
                      </Badge>
                    </CardTitle>
                    {watchlist.description && (
                      <CardDescription className="mt-2">{watchlist.description}</CardDescription>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4" />
                      Created {new Date(watchlist.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {watchlist.movieDetails.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {watchlist.movieDetails.map((movie) => (
                      <div key={movie._id} className="relative group">
                        <MovieCard movie={movie} />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                          onClick={() => handleRemoveFromWatchlist(watchlist._id, movie._id, movie.title)}
                          disabled={removing === `${watchlist._id}-${movie._id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Empty watchlist</h3>
                    <p className="text-muted-foreground">
                      Add movies to this watchlist to see them here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            No watchlists yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create your first watchlist to organize your movies
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Watchlist
          </Button>
        </div>
      )}

      <CreateWatchlistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateWatchlist}
      />
    </div>
  )
}