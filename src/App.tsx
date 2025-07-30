import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { MovieDetail } from "./pages/MovieDetail"
import { Profile } from "./pages/Profile"
import { Favorites } from "./pages/Favorites"
import { Watchlists } from "./pages/Watchlists"

function App() {
  return (
  <AuthProvider>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="watchlists" element={<Watchlists />} />
          </Route>
          <Route path="*" element={<BlankPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  </AuthProvider>
  )
}

export default App