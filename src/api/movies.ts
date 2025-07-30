import api from './api';

export interface Movie {
  _id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: Genre[];
  runtime: number;
  cast: CastMember[];
  crew: CrewMember[];
  similar: Movie[];
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

export interface MovieFilters {
  genre?: string;
  year?: number;
  rating?: number;
  category?: string;
}

// Description: Get trending movies for the home page
// Endpoint: GET /api/movies/trending
// Request: {}
// Response: { movies: Movie[] }
export const getTrendingMovies = () => {
  console.log("Fetching trending movies")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movies: [
          {
            _id: "1",
            title: "Avatar: The Way of Water",
            overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
            poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
            release_date: "2022-12-14",
            vote_average: 7.6,
            vote_count: 8234,
            genre_ids: [878, 12, 28],
            genres: [
              { id: 878, name: "Science Fiction" },
              { id: 12, name: "Adventure" },
              { id: 28, name: "Action" }
            ],
            runtime: 192,
            cast: [],
            crew: [],
            similar: [],
            popularity: 2547.123
          },
          {
            _id: "2",
            title: "Black Panther: Wakanda Forever",
            overview: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
            poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
            release_date: "2022-11-09",
            vote_average: 7.3,
            vote_count: 5678,
            genre_ids: [28, 12, 18],
            genres: [
              { id: 28, name: "Action" },
              { id: 12, name: "Adventure" },
              { id: 18, name: "Drama" }
            ],
            runtime: 161,
            cast: [],
            crew: [],
            similar: [],
            popularity: 2234.567
          },
          {
            _id: "3",
            title: "Top Gun: Maverick",
            overview: "After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete 'Maverick' Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
            poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            backdrop_path: "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
            release_date: "2022-05-24",
            vote_average: 8.3,
            vote_count: 9876,
            genre_ids: [28, 18],
            genres: [
              { id: 28, name: "Action" },
              { id: 18, name: "Drama" }
            ],
            runtime: 130,
            cast: [],
            crew: [],
            similar: [],
            popularity: 3456.789
          }
        ]
      });
    }, 800);
  });
};

// Description: Get recommended movies for user
// Endpoint: GET /api/movies/recommended
// Request: {}
// Response: { movies: Movie[] }
export const getRecommendedMovies = () => {
  console.log("Fetching recommended movies")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movies: [
          {
            _id: "4",
            title: "The Batman",
            overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
            poster_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
            backdrop_path: "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
            release_date: "2022-03-01",
            vote_average: 7.8,
            vote_count: 7543,
            genre_ids: [80, 18, 53],
            genres: [
              { id: 80, name: "Crime" },
              { id: 18, name: "Drama" },
              { id: 53, name: "Thriller" }
            ],
            runtime: 176,
            cast: [],
            crew: [],
            similar: [],
            popularity: 1987.654
          },
          {
            _id: "5",
            title: "Spider-Man: No Way Home",
            overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
            poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
            release_date: "2021-12-15",
            vote_average: 8.1,
            vote_count: 12345,
            genre_ids: [28, 12, 878],
            genres: [
              { id: 28, name: "Action" },
              { id: 12, name: "Adventure" },
              { id: 878, name: "Science Fiction" }
            ],
            runtime: 148,
            cast: [],
            crew: [],
            similar: [],
            popularity: 4567.890
          }
        ]
      });
    }, 600);
  });
};

// Description: Get new release movies
// Endpoint: GET /api/movies/new-releases
// Request: {}
// Response: { movies: Movie[] }
export const getNewReleases = () => {
  console.log("Fetching new releases")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movies: [
          {
            _id: "6",
            title: "Scream",
            overview: "Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town's deadly past.",
            poster_path: "/1m3W6cpgwuIyjtg5nSnPx7yFkXW.jpg",
            backdrop_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
            release_date: "2022-01-12",
            vote_average: 6.8,
            vote_count: 3456,
            genre_ids: [27, 9648, 53],
            genres: [
              { id: 27, name: "Horror" },
              { id: 9648, name: "Mystery" },
              { id: 53, name: "Thriller" }
            ],
            runtime: 114,
            cast: [],
            crew: [],
            similar: [],
            popularity: 1234.567
          }
        ]
      });
    }, 700);
  });
};

// Description: Get top rated movies
// Endpoint: GET /api/movies/top-rated
// Request: {}
// Response: { movies: Movie[] }
export const getTopRatedMovies = () => {
  console.log("Fetching top rated movies")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movies: [
          {
            _id: "7",
            title: "The Shawshank Redemption",
            overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
            release_date: "1994-09-23",
            vote_average: 9.3,
            vote_count: 23456,
            genre_ids: [18, 80],
            genres: [
              { id: 18, name: "Drama" },
              { id: 80, name: "Crime" }
            ],
            runtime: 142,
            cast: [],
            crew: [],
            similar: [],
            popularity: 987.654
          }
        ]
      });
    }, 500);
  });
};

// Description: Search movies by query and filters
// Endpoint: GET /api/movies/search
// Request: { query?: string, filters?: MovieFilters }
// Response: { movies: Movie[], totalResults: number }
export const searchMovies = (query?: string, filters?: MovieFilters) => {
  console.log("Searching movies with query:", query, "and filters:", filters)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movies: [
          {
            _id: "8",
            title: "Dune",
            overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
            poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
            backdrop_path: "/iopYFB1b6Bh7FWZh3onQhph1sih.jpg",
            release_date: "2021-09-15",
            vote_average: 8.0,
            vote_count: 8765,
            genre_ids: [878, 12],
            genres: [
              { id: 878, name: "Science Fiction" },
              { id: 12, name: "Adventure" }
            ],
            runtime: 155,
            cast: [],
            crew: [],
            similar: [],
            popularity: 2345.678
          }
        ],
        totalResults: 1
      });
    }, 900);
  });
};

// Description: Get movie details by ID
// Endpoint: GET /api/movies/:id
// Request: {}
// Response: { movie: Movie }
export const getMovieById = (id: string) => {
  console.log("Fetching movie details for ID:", id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        movie: {
          _id: id,
          title: "Avatar: The Way of Water",
          overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
          poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
          backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
          release_date: "2022-12-14",
          vote_average: 7.6,
          vote_count: 8234,
          genre_ids: [878, 12, 28],
          genres: [
            { id: 878, name: "Science Fiction" },
            { id: 12, name: "Adventure" },
            { id: 28, name: "Action" }
          ],
          runtime: 192,
          cast: [
            {
              id: 1,
              name: "Sam Worthington",
              character: "Jake Sully",
              profile_path: "/yX1XFdpQQWbgn4VcqPOcLGpkJv6.jpg"
            },
            {
              id: 2,
              name: "Zoe Saldana",
              character: "Neytiri",
              profile_path: "/ofNrWiA2KDdqiNxFTLp51HcXUlp.jpg"
            }
          ],
          crew: [
            {
              id: 3,
              name: "James Cameron",
              job: "Director",
              profile_path: "/5tXGNp7SLz9salp5WwgrP0gVdt5.jpg"
            }
          ],
          similar: [
            {
              _id: "9",
              title: "Avatar",
              overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
              poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
              backdrop_path: "/Yc9q6QuWrMp9nuDm5R8ExNqbEWU.jpg",
              release_date: "2009-12-10",
              vote_average: 7.6,
              vote_count: 27847,
              genre_ids: [28, 12, 14, 878],
              genres: [],
              runtime: 162,
              cast: [],
              crew: [],
              similar: [],
              popularity: 1234.567
            }
          ],
          popularity: 2547.123
        }
      });
    }, 1000);
  });
};

// Description: Get movie genres
// Endpoint: GET /api/movies/genres
// Request: {}
// Response: { genres: Genre[] }
export const getGenres = () => {
  console.log("Fetching movie genres")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        genres: [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
          { id: 16, name: "Animation" },
          { id: 35, name: "Comedy" },
          { id: 80, name: "Crime" },
          { id: 99, name: "Documentary" },
          { id: 18, name: "Drama" },
          { id: 10751, name: "Family" },
          { id: 14, name: "Fantasy" },
          { id: 36, name: "History" },
          { id: 27, name: "Horror" },
          { id: 10402, name: "Music" },
          { id: 9648, name: "Mystery" },
          { id: 10749, name: "Romance" },
          { id: 878, name: "Science Fiction" },
          { id: 10770, name: "TV Movie" },
          { id: 53, name: "Thriller" },
          { id: 10752, name: "War" },
          { id: 37, name: "Western" }
        ]
      });
    }, 300);
  });
};