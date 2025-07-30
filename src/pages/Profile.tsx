import { useEffect, useState } from "react"
import { getUserProfile, updateUserProfile, getUserRatings, UserProfile, UserRating } from "@/api/user"
import { getGenres, Genre } from "@/api/movies"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/useToast"
import { User, Mail, Calendar, Star, Edit2, Save, X } from "lucide-react"
import { useForm } from "react-hook-form"

export function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [ratings, setRatings] = useState<UserRating[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<UserProfile>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching profile data")
        setLoading(true)

        const [profileResponse, ratingsResponse, genresResponse] = await Promise.all([
          getUserProfile(),
          getUserRatings(),
          getGenres()
        ])

        const userProfile = (profileResponse as any).user
        setProfile(userProfile)
        setRatings((ratingsResponse as any).ratings)
        setGenres((genresResponse as any).genres)

        // Set form default values
        reset(userProfile)
      } catch (error: any) {
        console.error("Error fetching profile data:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast, reset])

  const onSubmit = async (data: Partial<UserProfile>) => {
    try {
      console.log("Updating profile with data:", data)
      setUpdating(true)

      const response = await updateUserProfile(data)
      setProfile((response as any).user)
      setEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleGenreToggle = (genreName: string) => {
    const currentGenres = watch('favoriteGenres') || []
    const updatedGenres = currentGenres.includes(genreName)
      ? currentGenres.filter(g => g !== genreName)
      : [...currentGenres, genreName]
    
    setValue('favoriteGenres', updatedGenres)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
        <p className="text-muted-foreground">Unable to load your profile information.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        {!editing && (
          <Button onClick={() => setEditing(true)} className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={profile.avatar} alt={profile.username} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {editing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      {...register('username', { required: true })}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { required: true })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={updating}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updating ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditing(false)
                        reset(profile)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{profile.username}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="preferences" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="ratings">My Ratings</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences">
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Favorite Genres</CardTitle>
                  <CardDescription>
                    Select your favorite movie genres to get better recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editing ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {genres.map((genre) => {
                        const isSelected = watch('favoriteGenres')?.includes(genre.name) || false
                        return (
                          <Button
                            key={genre.id}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleGenreToggle(genre.name)}
                            className={isSelected ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""}
                          >
                            {genre.name}
                          </Button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.favoriteGenres.map((genre) => (
                        <Badge
                          key={genre}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ratings">
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>My Movie Ratings</CardTitle>
                  <CardDescription>
                    Movies you've rated and reviewed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ratings.length > 0 ? (
                    <div className="space-y-4">
                      {ratings.map((rating) => (
                        <div
                          key={rating._id}
                          className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w92${rating.moviePoster}`}
                            alt={rating.movieTitle}
                            className="w-16 h-24 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{rating.movieTitle}</h4>
                            <div className="flex items-center gap-1 my-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < rating.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">
                                {rating.rating}/5
                              </span>
                            </div>
                            {rating.review && (
                              <p className="text-sm text-muted-foreground">{rating.review}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No ratings yet</h3>
                      <p className="text-muted-foreground">
                        Start rating movies to see them here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}