import { wrapper } from "../../store";
import styles from "../../styles/Type.module.scss";
import { fetchMovieGenres, fetchShowGenres, genresSelector } from "../../store/slices/genres";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { prepareSearchItems } from "../../helpers/prepareData";
import TMDBConstants from "../../shared/routes/tmdbApi";
import Search from "../../components/Search";
import queryString from "../../helpers/addQueryString";

function shapeData(data, type) {
  const formattedResults = prepareSearchItems(data.results, type);
  return {
    ...data,
    results: formattedResults,
  };
}

const { DISCOVER, SEARCH } = TMDBConstants;

export default function Type({ type, discoverServerItems, initialUrl, years }) {
  const [url, setUrl] = useState(initialUrl);
  const [searchUrl, setSearchUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [discoverItems, setDiscoverItems] = useState(discoverServerItems);
  const { movieGenres, showGenres, moviesHasError, moviesErrorObject, showsHasError, showsErrorObject } = useSelector(genresSelector);

  const genres = type === "movies" ? movieGenres : showGenres;
  const genresHasError = type === "movies" ? moviesHasError : showsHasError;
  const genresHasErrorObject = type === "movies" ? moviesErrorObject : showsErrorObject;

  function newURL() {
    const searchType = type === "shows" ? "tv" : "movie";
    if (searchQuery.length) setSearchUrl(SEARCH(searchType, searchQuery));

    const urlParams = {};
    if (Object.keys(selectedGenre).length > 0) urlParams.with_genres = selectedGenre.id;
    if (selectedYear.length) urlParams.primary_release_year = selectedYear;

    return queryString(DISCOVER[type.toUpperCase()], urlParams);
  }

  function selectGenre(id) {
    setSearchQuery("");
    if (id) {
      const genreObj = genres.find((x) => x.id === id);
      setSelectedGenre(genreObj);
    } else {
      setSelectedGenre({});
    }
  }

  function formatData(data) {
    return shapeData(data, type);
  }

  useEffect(() => {
    setUrl(newURL());
  }, [selectedGenre, selectedYear]);

  return (
    <>
      <div>
        <div className={styles.header}>
          <div className={styles.searchBar}>
            <input type="text" placeholder={`Search ${type}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={(e) => newURL()} disabled={!searchQuery.length}>
              Search {type}
            </button>
          </div>
        </div>
      </div>
      {searchUrl.length > 0 && (
        <section className={styles.searchResults}>
          <Search url={searchUrl} shapeData={formatData} />
        </section>
      )}
      {!searchUrl.length && (
        <div className={styles.colWrapper}>
          <section className={styles.genreCol}>
            <h2 className={styles.sideHeading}>Year</h2>
            <select className={styles.yearSelect} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">Select a year...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {genresHasError && (
              <p>
                {genresHasErrorObject.status} - {genresHasErrorObject.statusText}
              </p>
            )}
            {genres.length > 0 && (
              <div className={styles.genres}>
                <h2 className={styles.sideHeading}>Genres</h2>
                <ul>
                  <li className={Object.keys(selectedGenre).length === 0 ? `${styles.genreItem} ${styles.selected}` : styles.genreItem} onClick={() => selectGenre()}>
                    All
                  </li>
                  {genres.map((genre) => {
                    const itemClass = genre.id === selectedGenre.id ? `${styles.genreItem} ${styles.selected}` : styles.genreItem;
                    return (
                      <li className={itemClass} key={genre.id} onClick={() => selectGenre(genre.id)}>
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
          <section className={styles.mainCol}>
            {Object.keys(selectedGenre).length === 0 && <h1 className={styles.heading}>Discover the latest {type}</h1>}
            {Object.keys(selectedGenre).length > 0 && <h1 className={styles.heading}>{selectedGenre.name}</h1>}
            <Search initialData={discoverItems} initialUrl={initialUrl} url={url} shapeData={formatData} />
          </section>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { type } = params;
  const URL = DISCOVER[type.toUpperCase()];
  if (type.toString() != "movies" && type.toString() != "shows") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (type === "movies") {
    await store.dispatch(fetchMovieGenres());
  }

  if (type === "shows") {
    await store.dispatch(fetchShowGenres());
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

  const discover = shapeData(itemJson, type);

  //hacky way of getting years as I am having difficulties getting a calendar plugin to work with css modules
  const firstYear = new Date("1920").getFullYear();
  const today = new Date().getFullYear();
  const arr = [];

  for (let i = firstYear; i <= today; i++) {
    arr.push(i);
  }

  return {
    props: {
      error,
      type,
      discoverServerItems: discover,
      initialUrl: URL,
      years: arr.reverse(),
    },
  };
});
