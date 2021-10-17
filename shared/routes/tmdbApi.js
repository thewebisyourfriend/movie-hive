const API_BASE = "https://api.themoviedb.org/3";
const API_SECRET = process.env.NEXT_PUBLIC_TMDB_SECRET;

export default Object.freeze({
  BASE_IMAGE_HERO: "https://image.tmdb.org/t/p/original",
  BASE_IMAGE_POSTER: "https://image.tmdb.org/t/p/w300",
  BASE_IMAGE_LOGO: "https://image.tmdb.org/t/p/w185",
  BASE_IMAGE_PROFILE: "https://image.tmdb.org/t/p/w185",
  GENRES: {
    MOVIES: `${API_BASE}/genre/movie/list?api_key=${API_SECRET}`,
    SHOWS: `${API_BASE}/genre/tv/list?api_key=${API_SECRET}`,
  },
  TRENDING: {
    MOVIES: `${API_BASE}/trending/movie/week?api_key=${API_SECRET}`,
    SHOWS: `${API_BASE}/trending/tv/week?api_key=${API_SECRET}`,
  },
  DISCOVER: {
    MOVIES: `${API_BASE}/discover/movie?api_key=${API_SECRET}`,
    SHOWS: `${API_BASE}/discover/tv?api_key=${API_SECRET}`,
  },
  GET: {
    movie: (id) => {
      return `${API_BASE}/movie/${id}?api_key=${API_SECRET}&append_to_response=release_dates,recommendations,credits`;
    },
    show: (id) => {
      return `${API_BASE}/tv/${id}?api_key=${API_SECRET}&append_to_response=content_ratings,recommendations,credits`;
    },
  },
});
