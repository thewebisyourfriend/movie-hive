import styles from "../styles/Home.module.scss";
import { wrapper } from "../store";
import { fetchTrendingMovies, fetchTrendingShows, trendingSelector, setTopItem } from "../store/slices/trending";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import { prepareMovieItems, prepareShowItems } from "../helpers/prepareData";
import TMDBConstants from "../shared/routes/tmdbApi";
import heroImage from "../public/heroPlaceholder.png";
import CustomHead from "../components/CustomHead";

export default function Home({ prepedMovieItems, prepedShowItems }) {
  const [movieItems, setMovieItems] = useState(prepedMovieItems);
  const [showItems, setShowItems] = useState(prepedShowItems);
  const dispatch = useDispatch();

  const { BASE_IMAGE_HERO } = TMDBConstants;
  const {
    movies,
    moviesHasError,
    moviesErrorObject,
    moviesIsLoading,
    moviesLastRecievedPage,
    moviesTotalPages,
    moviesTotalResults,
    shows,
    showsHasError,
    showsErrorObject,
    showsIsLoading,
    showsLastRecievedPage,
    showsTotalPages,
    showsTotalResults,
    topItem,
  } = useSelector(trendingSelector);

  const carouselConfig = {
    spacing: 10,
    slidesPerView: 2,
    centered: false,
    loop: false,
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slidesPerView: 4,
        mode: "free-snap",
      },
      "(min-width: 1200px)": {
        slidesPerView: 9,
        mode: "free-snap",
      },
    },
  };

  function addMovies() {
    if (moviesLastRecievedPage < moviesTotalPages) {
      dispatch(fetchTrendingMovies(parseInt(moviesLastRecievedPage, 10) + 1)).then(() => {
        setMovieItems(prepareMovieItems(movies));
      });
    }
  }

  function addShows() {
    if (showsLastRecievedPage < showsTotalPages) {
      dispatch(fetchTrendingShows(parseInt(showsLastRecievedPage, 10) + 1)).then(() => {
        setShowItems(prepareShowItems(shows));
      });
    }
  }

  return (
    <>
      <CustomHead title="Movie Hive" description="Movie and Show search powered by TMDB." />
      <Hero
        title={topItem.media_type === "tv" ? topItem.name : topItem.original_title}
        type={topItem.media_type === "tv" ? "show" : "movie"}
        id={topItem.id}
        imgPath={topItem.backdrop_path ? `${BASE_IMAGE_HERO}${topItem.backdrop_path}` : heroImage}
        overview={topItem.overview}
        isItemPage={false}
      />
      <section className={styles.section}>
        <h2 className={styles.heading}>Trending Movies</h2>
        {moviesHasError && (
          <p>
            {moviesErrorObject.status} - {moviesErrorObject.statusText}
          </p>
        )}
        {movieItems.length > 0 && <Carousel config={carouselConfig} items={movieItems} totalItems={moviesTotalResults} add={addMovies} pending={moviesIsLoading} error={moviesHasError} />}
      </section>
      <section className={styles.section}>
        <h2 className={styles.heading}>Trending Shows</h2>
        {showsHasError && (
          <p>
            {showsErrorObject.status} - {showsErrorObject.statusText}
          </p>
        )}
        {showItems.length > 0 && <Carousel config={carouselConfig} items={showItems} totalItems={showsTotalResults} add={addShows} pending={showsIsLoading} error={showsHasError} />}
      </section>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  await store.dispatch(fetchTrendingMovies(1));
  await store.dispatch(fetchTrendingShows(1));
  store.dispatch(setTopItem());
  const {
    trending: { movies, shows },
  } = store.getState();

  return {
    props: {
      prepedMovieItems: prepareMovieItems(movies),
      prepedShowItems: prepareShowItems(shows),
    },
  };
});
