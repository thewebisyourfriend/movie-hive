import { wrapper } from "../../../store";
import TMDBConstants from "../../../shared/routes/tmdbApi";
import Hero from "../../../components/Hero";
import styles from "../../../styles/Item.module.scss";
import { prepareDataForShows } from "../../../helpers/prepareData";
import Grid from "../../../components/Grid";

const { GET } = TMDBConstants;

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


