import { wrapper } from "../../../store";
import TMDBConstants from "../../../shared/routes/tmdbApi";
import Hero from "../../../components/Hero";
import styles from "../../../styles/Item.module.scss";
import { prepareDataForShow, prepareDataForMovie } from "../../../helpers/prepareData";
import Grid from "../../../components/Grid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CustomImage from "../../../components/CustomImage";

const { GET } = TMDBConstants;

export default function Item({ item, type }) {
  const vote = Math.round((item.vote / 10) * 100);
  return (
    <>
      <Hero title={`${item.title} (${item.releaseYear})`} type={type} id={item.id} imgPath={item.imgPath} overview={item.overview} isItemPage={true} />
      <div className={styles.colWrapper}>
        <section className={styles.infoCol}>
          <div className={styles.voteWrapper}>
            <CircularProgressbar
              className={styles.voteItem}
              value={vote}
              text={`${vote}%`}
              strokeWidth={4}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "1.25rem",
                pathColor: "#C4A80A",
                textColor: "#ffffff",
              })}
            />
            <div className={styles.voteItem}>
              <h2>User Score</h2>
            </div>
          </div>
          <h2>Certification</h2>
          <p>{item.certificate}</p>
          {item.genres && item.genres.length > 0 && (
            <>
              <h2>Genres</h2>
              <p>
                {item.genres.map((genre, i, arr) => (
                  <span key={genre.id}>{arr.length - 1 === i ? genre.name : `${genre.name}, `}</span>
                ))}
              </p>
            </>
          )}
          <h2>Release Date</h2>
          <p>{item.releaseDate}</p>
          {item.number_of_episodes && (
            <>
              <h2>Number of Episodes</h2>
              <p>{item.number_of_episodes}</p>
            </>
          )}
          {item.number_of_seasons && (
            <>
              <h2>Number of Seasons</h2>
              <p>{item.number_of_seasons}</p>
            </>
          )}
          {item.episode_run_time && (
            <>
              <h2>Average Episode Runtime</h2>
              <p>{item.episode_run_time} minutes</p>
            </>
          )}
          {item.run_time && (
            <>
              <h2>Runtime</h2>
              <p>{item.run_time} minutes</p>
            </>
          )}
          {item.status && (
            <>
              <h2>Status</h2>
              <p>{item.status}</p>
            </>
          )}
          {item.budget && (
            <>
              <h2>Budget</h2>
              <p>{item.budget} (USD)</p>
            </>
          )}
          {item.revenue && (
            <>
              <h2>Revenue</h2>
              <p>{item.revenue} (USD)</p>
            </>
          )}
          {item.networks && item.networks.length > 0 && (
            <>
              <h2>Networks</h2>

              {item.networks.map((network) => (
                <div key={network.id} className={styles.logoRow}>
                  {network.logo_path !== null && (
                    <div className={styles.logo}>
                      <CustomImage alt={network.name} src={network.logo_path} height={22} width={110} />
                    </div>
                  )}
                  <h3>{network.name}</h3>
                </div>
              ))}
            </>
          )}
          {item.production_companies && item.production_companies.length > 0 && (
            <>
              <h2>Production Companies</h2>

              {item.production_companies.map((comp) => (
                <div key={comp.id} className={styles.logoRow}>
                  {comp.logo_path !== null && (
                    <div className={styles.logo}>
                      <CustomImage alt={comp.name} src={comp.logo_path} layout="fill" />
                    </div>
                  )}
                  <h3>{comp.name}</h3>
                </div>
              ))}
            </>
          )}
        </section>
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
      item: type === "show" ? prepareDataForShow(itemJson) : prepareDataForMovie(itemJson),
    },
  };
});
