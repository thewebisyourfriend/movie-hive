import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import TMDBConstants from "../../shared/routes/tmdbApi";

const { TRENDING } = TMDBConstants;

export const fetchTrendingMovies = createAsyncThunk("trending/fetchTrendingMovies", async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(`${TRENDING.MOVIES}&page=${page}`);
    const json = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: json.status_message,
      };
    }
    return json;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchTrendingShows = createAsyncThunk("trending/fetchTrendingShows", async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(`${TRENDING.SHOWS}&page=${page}`);
    const json = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: json.status_message,
      };
    }
    return json;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const initialState = {
  topItem: {},
  movies: [],
  moviesLastRecievedPage: 0,
  moviesTotalPages: 0,
  moviesTotalResults: 0,
  shows: [],
  showsLastRecievedPage: 0,
  showsTotalPages: 0,
  showsTotalResults: 0,
  moviesHasError: false,
  moviesErrorObject: {},
  moviesIsLoading: false,
  showsHasError: false,
  showsErrorObject: {},
  showsIsLoading: false,
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    setTopItem: (state, action) => {
      const allItems = [...state.movies, ...state.shows];
      const top = allItems[Math.floor(Math.random() * allItems.length)];
      state.topItem = top;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.trending,
      };
    },
    [fetchTrendingMovies.pending]: (state, action) => {
      state.moviesIsLoading = true;
    },
    [fetchTrendingMovies.fulfilled]: (state, action) => {
      state.movies = [...state.movies, ...action.payload.results];
      state.moviesLastRecievedPage = action.payload.page;
      state.moviesTotalPages = action.payload.total_pages;
      state.moviesTotalResults = action.payload.total_results;
      state.moviesHasError = false;
      state.moviesIsLoading = false;
    },
    [fetchTrendingMovies.rejected]: (state, action) => {
      state.moviesHasError = true;
      state.moviesErrorObject = action.payload;
      state.moviesIsLoading = false;
    },
    [fetchTrendingShows.pending]: (state, action) => {
      state.showsIsLoading = true;
    },
    [fetchTrendingShows.fulfilled]: (state, action) => {
      state.shows = [...state.shows, ...action.payload.results];
      state.showsLastRecievedPage = action.payload.page;
      state.showsTotalPages = action.payload.total_pages;
      state.showsTotalResults = action.payload.total_results;
      state.showsHasError = false;
      state.showsIsLoading = false;
    },
    [fetchTrendingShows.rejected]: (state, action) => {
      state.showsHasError = true;
      state.showsErrorObject = action.payload;
      state.showsIsLoading = false;
    },
  },
});

export const trendingSelector = (state) => {
  return state.trending;
};

export const { setTopItem } = trendingSlice.actions;

export default trendingSlice.reducer;
