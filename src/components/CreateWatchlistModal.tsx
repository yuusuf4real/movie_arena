import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Plus } from "lucide-react"

interface CreateWatchlistModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description?: string }) => void
}

export function CreateWatchlistModal({ isOpen, onClose, onSubmit }: CreateWatchlistModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) return

    try {
      setSubmitting(true)
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined
      })
      handleClose()
    } catch (error) {
      console.error("Error creating watchlist:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setName("")
    setDescription("")
    setSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Watchlist
          </DialogTitle>
          <DialogDescription>
            Create a new watchlist to organize your movies
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Watchlist Name</Label>
            <Input
              id="name"
              placeholder="e.g., Must Watch, Action Movies, Date Night"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              maxLength={50}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this watchlist is for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 resize-none"
              maxLength={200}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || submitting}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {submitting ? "Creating..." : "Create Watchlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}