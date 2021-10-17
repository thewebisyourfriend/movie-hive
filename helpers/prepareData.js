import TMDBConstants from "../shared/routes/tmdbApi";
import cardIamge from "../public/cardPlaceholder.png";
import heroIamge from "../public/heroPlaceholder.png";

const { BASE_IMAGE_HERO, BASE_IMAGE_POSTER, BASE_IMAGE_PROFILE } = TMDBConstants;

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

export function prepareDataForShows(data) {
  return {
    title: data.name,
    type: "show",
    id: data.id,
    imgPath: data.backdrop_path ? `${BASE_IMAGE_HERO}${data.backdrop_path}` : heroImage,
    overview: data.overview,
    vote: data.vote_average,
    releaseDate: new Date(data.first_air_date).toDateString(),
    releaseYear: new Date(data.first_air_date).getFullYear(),
    certificate: getShowCertificate(data.content_ratings.results),
    production_companies: getProductionOrNetwork(data.production_companies),
    networks: getProductionOrNetwork(data.networks),
    number_of_episodes: data.number_of_episodes,
    number_of_seasons: data.number_of_seasons,
    genres: data.genres,
    episode_run_time: averageShowRuntime(data.episode_run_time),
    cast: prepareCastItems(data.credits.cast),
    recommendations: {
      page: data.recommendations.page,
      total_pages: data.recommendations.total_pages,
      total_results: data.recommendations.total_results,
      results: prepareRecommendationItems(data.recommendations.results),
    },
  };
}

function getShowCertificate(results) {
  const ratingObj =
    results.find((el) => {
      return el.iso_3166_1 === "US" || el.iso_3166_1 === "GB";
    }) || {};
  return Object.keys(ratingObj).length === 0 ? "No Certification Found" : ratingObj.rating;
}

function getProductionOrNetwork(items) {
  if (!items.length) return [];
  return items.map((item) => {
    return {
      ...item,
      logo_path: `${BASE_IMAGE_LOGO}${item.logo_path}`,
    };
  });
}

function averageShowRuntime(numsArr) {
  if (!numsArr.length) return 0;
  return numsArr.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)) / numsArr.length;
}

function prepareRecommendationItems(items) {
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

function prepareCastItems(items) {
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
