import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MovieCard } from "@/components/MovieCard"
import { SearchFilters } from "@/components/SearchFilters"
import { searchMovies, getGenres, Movie, Genre, MovieFilters } from "@/api/movies"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/useToast"
import { Search as SearchIcon } from "lucide-react"

export function Search() {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState<MovieFilters>({})
  const { toast } = useToast()

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres()
        setGenres((response as any).genres)
      } catch (error: any) {
        console.error("Error fetching genres:", error)
      }
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    const performSearch = async () => {
      try {
        console.log("Performing search with query:", query, "category:", category, "filters:", filters)
        setLoading(true)
        
        const searchFilters = { ...filters }
        if (category) {
          searchFilters.category = category
        }

        const response = await searchMovies(query, searchFilters)
        setMovies((response as any).movies)
        setTotalResults((response as any).totalResults || (response as any).movies.length)
      } catch (error: any) {
        console.error("Error searching movies:", error)
        toast({
          title: "Error",
          description: "Failed to search movies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query, category, filters, toast])

  const handleFiltersChange = (newFilters: MovieFilters) => {
    console.log("Filters changed:", newFilters)
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {query ? `Search Results for "${query}"` : category ? `${category.replace('-', ' ')} Movies` : 'Discover Movies'}
          </h1>
          {totalResults > 0 && (
            <p className="text-muted-foreground mt-2">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <SearchFilters
        genres={genres}
        onFiltersChange={handleFiltersChange}
        initialFilters={filters}
      />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No movies found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  )
}