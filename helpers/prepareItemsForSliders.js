import TMDBConstants from "../shared/routes/tmdbApi";
import cardIamge from "../public/cardPlaceholder.png";

const { BASE_IMAGE_POSTER, BASE_IMAGE_PROFILE } = TMDBConstants;

export function prepareMovieItems(movies) {
  return movies.map((movie) => {
    return {
      imageUrl: movie.poster_path ? `${BASE_IMAGE_POSTER}${movie.poster_path}` : cardIamge,
      title: movie.original_title,
      id: movie.id,
      link: `/get/movie/${movie.id}`,
    };
  });
}

export function prepareShowItems(shows) {
  return shows.map((show) => {
    return {
      imageUrl: shows.poster_path ? `${BASE_IMAGE_POSTER}${show.poster_path}` : cardIamge,
      title: show.name,
      id: show.id,
      link: `/get/show/${show.id}`,
    };
  });
}

export function prepareRecommendationItems(items) {
  if (!items.length) return [];
  return items.map((item) => {
    const type = item.media_type === "tv" ? "show" : "movie";
    return {
      imageUrl: item.poster_path ? `${BASE_IMAGE_POSTER}${item.poster_path}` : cardIamge,
      title: type === "show" ? item.name : item.original_title,
      id: item.id,
      link: `/get/${type}/${item.id}`,
    };
  });
}

export function prepareCastItems(items) {
  if (!items.length) return [];
  return items.map((item) => {
    return {
      imageUrl: item.profile_path ? `${BASE_IMAGE_PROFILE}${item.profile_path}` : cardIamge,
      title: `Name: ${item.name}`,
      additional: [{ id: 1, text: `Character: ${item.character}` }],
      id: item.id,
    };
  });
}
