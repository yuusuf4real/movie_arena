import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, review?: string) => void
  movieTitle: string
}

export function RatingModal({ isOpen, onClose, onSubmit, movieTitle }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    try {
      setSubmitting(true)
      await onSubmit(rating, review.trim() || undefined)
      handleClose()
    } catch (error) {
      console.error("Error submitting rating:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setRating(0)
    setHoveredRating(0)
    setReview("")
    setSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Rate Movie</DialogTitle>
          <DialogDescription>
            How would you rate "{movieTitle}"?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1
                const isActive = starValue <= (hoveredRating || rating)
                
                return (
                  <button
                    key={i}
                    type="button"
                    className="p-1 transition-transform hover:scale-110"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        isActive
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      )}
                    />
                  </button>
                )
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
            </p>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <Label htmlFor="review">Review (Optional)</Label>
            <Textarea
              id="review"
              placeholder="Share your thoughts about this movie..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || submitting}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}