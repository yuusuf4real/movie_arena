import { Home, Search, Heart, Bookmark, User, TrendingUp, Star, Calendar } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Watchlists', href: '/watchlists', icon: Bookmark },
  { name: 'Profile', href: '/profile', icon: User },
]

const categories = [
  { name: 'Trending', icon: TrendingUp },
  { name: 'Top Rated', icon: Star },
  { name: 'New Releases', icon: Calendar },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 text-left font-medium transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl" 
                    : "hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105"
                )}
                onClick={() => {
                  console.log(`Navigating to ${item.name}`)
                  navigate(item.href)
                }}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            )
          })}
        </nav>

        <div className="mt-8">
          <h3 className="px-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="w-full justify-start gap-3 h-10 text-left hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-200"
                onClick={() => {
                  console.log(`Filtering by ${category.name}`)
                  navigate(`/search?category=${category.name.toLowerCase().replace(' ', '-')}`)
                }}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}