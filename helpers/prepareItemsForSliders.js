import TMDBConstants from "../shared/routes/tmdbApi";

const { BASE_IMAGE_POSTER } = TMDBConstants;

export function prepareMovieItems(movies) {
  return movies.map((movie) => {
    return {
      imageUrl: `${BASE_IMAGE_POSTER}${movie.poster_path}`,
      title: movie.original_title,
      id: movie.id,
      link: `/get/movie/${movie.id}`,
    };
  });
}

export function prepareShowItems(shows) {
  return shows.map((show) => {
    return {
      imageUrl: `${BASE_IMAGE_POSTER}${show.poster_path}`,
      title: show.name,
      id: show.id,
      link: `/get/show/${show.id}`,
    };
  });
}
