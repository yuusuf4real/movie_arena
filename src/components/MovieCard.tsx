import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Movie } from "@/api/movies"
import { addToFavorites, removeFromFavorites } from "@/api/user"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/useToast"
import { Heart, Star, Calendar, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  movie: Movie | {
    _id: string
    title: string
    poster_path: string
    vote_average: number
    release_date: string
  }
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const handleCardClick = () => {
    console.log("Navigating to movie detail:", movie._id)
    navigate(`/movie/${movie._id}`)
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()

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

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-movie.jpg'
          }}
        />

        {/* Overlay with actions */}
        <div className={cn(
          "absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-black"
          >
            <Play className="h-4 w-4 mr-1" />
            Watch
          </Button>
          <Button
            size="sm"
            variant={isFavorite ? "default" : "secondary"}
            className={cn(
              isFavorite 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-white/90 hover:bg-white text-black"
            )}
            onClick={handleToggleFavorite}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-black/70 text-white border-0">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {new Date(movie.release_date).getFullYear()}
        </div>
      </CardContent>
    </Card>
  )
}