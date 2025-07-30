import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Watchlist } from "@/api/user"
import { createWatchlist } from "@/api/user"
import { useToast } from "@/hooks/useToast"
import { Bookmark, Plus } from "lucide-react"

interface WatchlistModalProps {
  isOpen: boolean
  onClose: () => void
  onAddToWatchlist: (watchlistId: string) => void
  watchlists: Watchlist[]
}

export function WatchlistModal({ isOpen, onClose, onAddToWatchlist, watchlists }: WatchlistModalProps) {
  const [selectedWatchlistId, setSelectedWatchlistId] = useState("")
  const [newWatchlistName, setNewWatchlistName] = useState("")
  const [newWatchlistDescription, setNewWatchlistDescription] = useState("")
  const [activeTab, setActiveTab] = useState("existing")
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddToExisting = async () => {
    if (!selectedWatchlistId) return

    try {
      setSubmitting(true)
      await onAddToWatchlist(selectedWatchlistId)
      handleClose()
    } catch (error) {
      console.error("Error adding to watchlist:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateAndAdd = async () => {
    if (!newWatchlistName.trim()) return

    try {
      setSubmitting(true)
      const response = await createWatchlist({
        name: newWatchlistName.trim(),
        description: newWatchlistDescription.trim() || undefined
      })
      
      const newWatchlistId = (response as any).watchlist._id
      await onAddToWatchlist(newWatchlistId)
      
      toast({
        title: "Watchlist created",
        description: `"${newWatchlistName}" has been created and the movie has been added.`,
      })
      
      handleClose()
    } catch (error: any) {
      console.error("Error creating watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create watchlist.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedWatchlistId("")
    setNewWatchlistName("")
    setNewWatchlistDescription("")
    setActiveTab("existing")
    setSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Add to Watchlist
          </DialogTitle>
          <DialogDescription>
            Choose an existing watchlist or create a new one
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing" disabled={watchlists.length === 0}>
              Existing ({watchlists.length})
            </TabsTrigger>
            <TabsTrigger value="new">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            {watchlists.length > 0 ? (
              <>
                <RadioGroup value={selectedWatchlistId} onValueChange={setSelectedWatchlistId}>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {watchlists.map((watchlist) => (
                      <div key={watchlist._id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value={watchlist._id} id={watchlist._id} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={watchlist._id} className="font-medium cursor-pointer">
                            {watchlist.name}
                          </Label>
                          {watchlist.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {watchlist.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {watchlist.movies.length} movie{watchlist.movies.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={handleClose} disabled={submitting}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddToExisting}
                    disabled={!selectedWatchlistId || submitting}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {submitting ? "Adding..." : "Add to Watchlist"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No watchlists yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first watchlist to get started
                </p>
                <Button
                  onClick={() => setActiveTab("new")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Watchlist
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Watchlist Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Must Watch, Action Movies"
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your watchlist..."
                  value={newWatchlistDescription}
                  onChange={(e) => setNewWatchlistDescription(e.target.value)}
                  rows={3}
                  className="mt-1 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={handleClose} disabled={submitting}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateAndAdd}
                disabled={!newWatchlistName.trim() || submitting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {submitting ? "Creating..." : "Create & Add"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}