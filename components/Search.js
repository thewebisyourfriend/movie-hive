import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Grid from "./Grid";
import styles from "../styles/Search.module.scss";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Search({ initialData, initialUrl, url, shapeData }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.total_pages);
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(initialData.results);
  const [searchUrl, setSearchUrl] = useState(initialUrl);

  const { data, error } = useSWR(`${url}&page=${pageIndex}`, fetcher, {
    fallbackData: searchUrl === initialUrl ? initialData : null,
  });

  function changePage(num) {
    setLoading(true);
    setPageIndex(num);
  }

  useEffect(() => {
    if (searchUrl !== url) {
      setLoading(true);
      setPageIndex(1);
      setSearchUrl(url);
    }
  }, [searchUrl, url]);

  useEffect(() => {
    if (data !== null) {
      setTotalPages(data.total_pages);
      setGridData(shapeData(data).results);
    } else {
      setGridData([]);
    }
  }, [data]);

  useEffect(() => {
    setLoading(false);
  }, [gridData]);

  if (error) return "An error has occurred.";
  if (!gridData || loading) return "Loading...";

  return (
    <div>
      <Grid items={gridData} />
      <div className={styles.controls}>
        <button className={`${styles.btn}`} onClick={() => changePage(pageIndex - 1)} disabled={pageIndex === 1}>
          Previous
        </button>
        <button className={`${styles.btn} ${styles.end}`} onClick={() => changePage(pageIndex + 1)} disabled={pageIndex === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Search;
