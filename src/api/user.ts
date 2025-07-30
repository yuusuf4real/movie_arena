import api from './api';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  favoriteGenres: string[];
  createdAt: string;
}

export interface UserRating {
  _id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  rating: number;
  review?: string;
  createdAt: string;
}

export interface Watchlist {
  _id: string;
  name: string;
  description?: string;
  movies: string[];
  movieDetails: Array<{
    _id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Description: Get user profile
// Endpoint: GET /api/user/profile
// Request: {}
// Response: { user: UserProfile }
export const getUserProfile = () => {
  console.log("Fetching user profile")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          _id: "user123",
          username: "moviefan2024",
          email: "user@example.com",
          avatar: "/placeholder-avatar.jpg",
          favoriteGenres: ["Action", "Science Fiction", "Adventure"],
          createdAt: "2024-01-15T10:30:00Z"
        }
      });
    }, 500);
  });
};

// Description: Update user profile
// Endpoint: PUT /api/user/profile
// Request: { username?: string, email?: string, avatar?: string, favoriteGenres?: string[] }
// Response: { success: boolean, message: string, user: UserProfile }
export const updateUserProfile = (data: Partial<UserProfile>) => {
  console.log("Updating user profile with data:", data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Profile updated successfully",
        user: {
          _id: "user123",
          username: data.username || "moviefan2024",
          email: data.email || "user@example.com",
          avatar: data.avatar || "/placeholder-avatar.jpg",
          favoriteGenres: data.favoriteGenres || ["Action", "Science Fiction", "Adventure"],
          createdAt: "2024-01-15T10:30:00Z"
        }
      });
    }, 800);
  });
};

// Description: Get user's favorite movies
// Endpoint: GET /api/user/favorites
// Request: {}
// Response: { favorites: Array<{ _id: string, title: string, poster_path: string, vote_average: number, release_date: string }> }
export const getUserFavorites = () => {
  console.log("Fetching user favorites")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        favorites: [
          {
            _id: "1",
            title: "Avatar: The Way of Water",
            poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            vote_average: 7.6,
            release_date: "2022-12-14"
          },
          {
            _id: "2",
            title: "Top Gun: Maverick",
            poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            vote_average: 8.3,
            release_date: "2022-05-24"
          }
        ]
      });
    }, 600);
  });
};

// Description: Add movie to favorites
// Endpoint: POST /api/user/favorites
// Request: { movieId: string }
// Response: { success: boolean, message: string }
export const addToFavorites = (movieId: string) => {
  console.log("Adding movie to favorites:", movieId)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Movie added to favorites"
      });
    }, 400);
  });
};

// Description: Remove movie from favorites
// Endpoint: DELETE /api/user/favorites/:movieId
// Request: {}
// Response: { success: boolean, message: string }
export const removeFromFavorites = (movieId: string) => {
  console.log("Removing movie from favorites:", movieId)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Movie removed from favorites"
      });
    }, 400);
  });
};

// Description: Get user's watchlists
// Endpoint: GET /api/user/watchlists
// Request: {}
// Response: { watchlists: Watchlist[] }
export const getUserWatchlists = () => {
  console.log("Fetching user watchlists")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        watchlists: [
          {
            _id: "watchlist1",
            name: "Must Watch",
            description: "Movies I absolutely need to watch",
            movies: ["1", "3"],
            movieDetails: [
              {
                _id: "1",
                title: "Avatar: The Way of Water",
                poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                vote_average: 7.6,
                release_date: "2022-12-14"
              },
              {
                _id: "3",
                title: "Top Gun: Maverick",
                poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
                vote_average: 8.3,
                release_date: "2022-05-24"
              }
            ],
            createdAt: "2024-01-20T14:30:00Z",
            updatedAt: "2024-01-22T16:45:00Z"
          },
          {
            _id: "watchlist2",
            name: "Action Movies",
            description: "High-octane action films",
            movies: ["2"],
            movieDetails: [
              {
                _id: "2",
                title: "Black Panther: Wakanda Forever",
                poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
                vote_average: 7.3,
                release_date: "2022-11-09"
              }
            ],
            createdAt: "2024-01-18T10:15:00Z",
            updatedAt: "2024-01-21T12:30:00Z"
          }
        ]
      });
    }, 700);
  });
};

// Description: Create new watchlist
// Endpoint: POST /api/user/watchlists
// Request: { name: string, description?: string }
// Response: { success: boolean, message: string, watchlist: Watchlist }
export const createWatchlist = (data: { name: string; description?: string }) => {
  console.log("Creating new watchlist:", data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Watchlist created successfully",
        watchlist: {
          _id: "new_watchlist_id",
          name: data.name,
          description: data.description || "",
          movies: [],
          movieDetails: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });
    }, 600);
  });
};

// Description: Add movie to watchlist
// Endpoint: POST /api/user/watchlists/:watchlistId/movies
// Request: { movieId: string }
// Response: { success: boolean, message: string }
export const addToWatchlist = (watchlistId: string, movieId: string) => {
  console.log("Adding movie to watchlist:", { watchlistId, movieId })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Movie added to watchlist"
      });
    }, 500);
  });
};

// Description: Remove movie from watchlist
// Endpoint: DELETE /api/user/watchlists/:watchlistId/movies/:movieId
// Request: {}
// Response: { success: boolean, message: string }
export const removeFromWatchlist = (watchlistId: string, movieId: string) => {
  console.log("Removing movie from watchlist:", { watchlistId, movieId })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Movie removed from watchlist"
      });
    }, 400);
  });
};

// Description: Rate a movie
// Endpoint: POST /api/user/ratings
// Request: { movieId: string, rating: number, review?: string }
// Response: { success: boolean, message: string }
export const rateMovie = (data: { movieId: string; rating: number; review?: string }) => {
  console.log("Rating movie:", data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Movie rated successfully"
      });
    }, 500);
  });
};

// Description: Get user's movie ratings
// Endpoint: GET /api/user/ratings
// Request: {}
// Response: { ratings: UserRating[] }
export const getUserRatings = () => {
  console.log("Fetching user ratings")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ratings: [
          {
            _id: "rating1",
            movieId: "1",
            movieTitle: "Avatar: The Way of Water",
            moviePoster: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            rating: 4,
            review: "Amazing visuals and storytelling!",
            createdAt: "2024-01-20T15:30:00Z"
          },
          {
            _id: "rating2",
            movieId: "3",
            movieTitle: "Top Gun: Maverick",
            moviePoster: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            rating: 5,
            review: "Perfect sequel, exceeded all expectations!",
            createdAt: "2024-01-18T20:45:00Z"
          }
        ]
      });
    }, 600);
  });
};