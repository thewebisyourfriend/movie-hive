import { wrapper } from "../../../store";
import TMDBConstants from "../../../shared/routes/tmdbApi";
import Hero from "../../../components/Hero";
import styles from "../../../styles/Item.module.scss";
import { prepareRecommendationItems, prepareCastItems } from "../../../helpers/prepareItemsForSliders";
import Grid from "../../../components/Grid";
import heroImage from "../../../public/heroPlaceholder.png";

const { GET } = TMDBConstants;
const { BASE_IMAGE_HERO, BASE_IMAGE_LOGO } = TMDBConstants;

export default function Item({ item, type }) {
  return (
    <>
      <Hero title={`${item.title} (${item.releaseYear})`} type={type} id={item.id} imgPath={item.imgPath} overview={item.overview} isItemPage={true} />
      <div className={styles.colWrapper}>
        <section className={styles.infoCol}>fbfg</section>
        <section className={styles.mainCol}>
          {item.cast.length > 0 && (
            <div className={styles.row}>
              <h2 className={styles.heading}>Cast</h2>
              <Grid items={item.cast} />
            </div>
          )}
          {item.recommendations.results.length > 0 && (
            <div className={styles.row}>
              <h2 className={styles.heading}>Recommendations</h2>
              <Grid items={item.recommendations.results} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { type, id } = params;
  const URL = GET[type](id);
  if (type.toString() != "movie" && type.toString() != "show") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const itemResponse = await fetch(URL);
  const itemJson = await itemResponse.json();
  //original_title - movie
  //genres  [id,name]
  //overview
  //release_date - 2021-09-17 - movie
  //first_air_date - 2021-10-14 - tv

  let error = false;
  if (!itemResponse.ok) {
    error = {
      statusCode: itemResponse.status,
      message: itemJson.status_message,
    };
  }

  return {
    props: {
      error,
      type,
      item: type === "show" ? prepareDataForShows(itemJson) : {},
    },
  };
});

//certifiacate = look for "iso_3166_1": "GB" or "iso_3166_1": "US",
//&append_to_response=release_dates - movie look for "iso_3166_1": "GB" or "iso_3166_1": "US",
//content_ratings - tv
//vote_average

function prepareDataForShows(data) {
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
