import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import TMDBConstants from "../../shared/routes/tmdbApi";

const { GENRES } = TMDBConstants;

export const fetchMovieGenres = createAsyncThunk("genres/fetchMovieGenres", async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(GENRES.MOVIES);
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

export const fetchShowGenres = createAsyncThunk("genres/fetchShowGenres", async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(GENRES.SHOWS);
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
  movieGenres: [],
  showGenres: [],
  moviesHasError: false,
  moviesErrorObject: {},
  moviesIsLoading: false,
  showsHasError: false,
  showsErrorObject: {},
  showsIsLoading: false,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.genres,
      };
    },
    [fetchMovieGenres.pending]: (state, action) => {
      state.moviesIsLoading = true;
    },
    [fetchMovieGenres.fulfilled]: (state, action) => {
      state.movieGenres = [...state.movieGenres, ...action.payload.genres];
      state.moviesHasError = false;
      state.moviesIsLoading = false;
    },
    [fetchMovieGenres.rejected]: (state, action) => {
      state.moviesHasError = true;
      state.moviesErrorObject = action.payload;
      state.moviesIsLoading = false;
    },
    [fetchShowGenres.pending]: (state, action) => {
      state.showsIsLoading = true;
    },
    [fetchShowGenres.fulfilled]: (state, action) => {
      state.showGenres = [...state.showGenres, ...action.payload.genres];
      state.showsHasError = false;
      state.showsIsLoading = false;
    },
    [fetchShowGenres.rejected]: (state, action) => {
      state.showsHasError = true;
      state.showsErrorObject = action.payload;
      state.showsIsLoading = false;
    },
  },
});

export const genresSelector = (state) => {
  return state.genres;
};

export default genresSlice.reducer;
