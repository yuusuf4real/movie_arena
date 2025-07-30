import { useState } from "react"
import { Genre, MovieFilters } from "@/api/movies"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Badge } from "./ui/badge"
import { X, Filter } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

interface SearchFiltersProps {
  genres: Genre[]
  onFiltersChange: (filters: MovieFilters) => void
  initialFilters: MovieFilters
}

export function SearchFilters({ genres, onFiltersChange, initialFilters }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [yearRange, setYearRange] = useState<number[]>([1990, 2024])
  const [minRating, setMinRating] = useState<number[]>([0])

  const currentYear = new Date().getFullYear()

  const handleGenreToggle = (genreName: string) => {
    const updatedGenres = selectedGenres.includes(genreName)
      ? selectedGenres.filter(g => g !== genreName)
      : [...selectedGenres, genreName]

    setSelectedGenres(updatedGenres)
    applyFilters({ genre: updatedGenres.join(',') })
  }

  const handleYearChange = (values: number[]) => {
    setYearRange(values)
    applyFilters({ year: values[1] })
  }

  const handleRatingChange = (values: number[]) => {
    setMinRating(values)
    applyFilters({ rating: values[0] })
  }

  const applyFilters = (newFilters: Partial<MovieFilters>) => {
    const filters: MovieFilters = {
      ...initialFilters,
      ...newFilters
    }
    console.log("Applying filters:", filters)
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setYearRange([1990, currentYear])
    setMinRating([0])
    onFiltersChange({})
  }

  const hasActiveFilters = selectedGenres.length > 0 || yearRange[0] !== 1990 || yearRange[1] !== currentYear || minRating[0] > 0

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Active
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <CollapsibleContent className="mt-4">
        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Filter Movies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Genres */}
            <div>
              <h4 className="font-medium mb-3">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.name)
                  return (
                    <Button
                      key={genre.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGenreToggle(genre.name)}
                      className={isSelected ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""}
                    >
                      {genre.name}
                      {isSelected && <X className="ml-2 h-3 w-3" />}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Release Year */}
            <div>
              <h4 className="font-medium mb-3">Release Year</h4>
              <div className="px-3">
                <Slider
                  value={yearRange}
                  onValueChange={handleYearChange}
                  min={1990}
                  max={currentYear}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{yearRange[0]}</span>
                  <span>{yearRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <h4 className="font-medium mb-3">Minimum Rating</h4>
              <div className="px-3">
                <Slider
                  value={minRating}
                  onValueChange={handleRatingChange}
                  min={0}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0</span>
                  <span className="font-medium">{minRating[0]}+</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div>
                <h4 className="font-medium mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {genre}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => handleGenreToggle(genre)}
                      />
                    </Badge>
                  ))}
                  {(yearRange[0] !== 1990 || yearRange[1] !== currentYear) && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {yearRange[0]} - {yearRange[1]}
                    </Badge>
                  )}
                  {minRating[0] > 0 && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {minRating[0]}+ rating
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}