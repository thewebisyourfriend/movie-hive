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

export default function Type({ type, discoverServerItems, initialUrl }) {
  const [url, setUrl] = useState(initialUrl);
  const [searchItems, setSearchItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [currentGenreItems, setCurrentGenreItems] = useState({});
  const [discoverItems, setDiscoverItems] = useState(discoverServerItems);
  const { movieGenres, showGenres, moviesHasError, moviesErrorObject, showsHasError, showsErrorObject } = useSelector(genresSelector);

  const genres = type === "movies" ? movieGenres : showGenres;
  const genresHasError = type === "movies" ? moviesHasError : showsHasError;
  const genresHasErrorObject = type === "movies" ? moviesErrorObject : showsErrorObject;

  function newURL() {
    const searchType = type === "shows" ? "tv" : "movie";
    if (searchQuery.length) return SEARCH(searchType, searchQuery);

    const urlParams = {};
    if (Object.keys(selectedGenre).length > 0) urlParams.with_genres = selectedGenre.id;
    if (selectedYear.length) urlParams.primary_release_year = seleselectedYearctedGenre;

    return queryString(DISCOVER[type.toUpperCase()], urlParams);
  }

  function selectGenre(id) {
    const genreObj = genres.find((x) => x.id === id);
    setSearchQuery("");
    setSelectedGenre(genreObj);
  }

  function formatData(data) {
    return shapeData(data, type);
  }

  useEffect(() => {
    setUrl(newURL());
  }, [selectedGenre, selectedYear, searchQuery]);

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <h1>
          {type} {Object.keys(selectedGenre).length > 0 && <span>({selectedGenre.name})</span>}
        </h1>
        <input type="text" /> <button>Search</button>
      </div>
      {Object.keys(searchItems).length > 0 && (
        <section>
          <a>Back</a>
          {/* <Grid /> */}
        </section>
      )}
      {Object.keys(searchItems).length === 0 && (
        <div className={styles.colWrapper}>
          <section className={styles.genreCol}>
            {genresHasError && (
              <p>
                {genresHasErrorObject.status} - {genresHasErrorObject.statusText}
              </p>
            )}
            {genres.length > 0 && (
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id} onClick={() => selectGenre(genre.id)}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className={styles.mainCol}>
            <h2 className={styles.heading}>Discover the latest {type}</h2>
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

  return {
    props: {
      error,
      type,
      discoverServerItems: discover,
      initialUrl: URL,
    },
  };
});

//if search items show search grid with back back button,
//back button clicked get rid of query and saerch items
//if no search items, show 2 col for categories and year
//store categories lists in redux, store
