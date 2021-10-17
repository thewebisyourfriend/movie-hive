import { combineReducers } from "redux";
import trendingReducer from "./trending";
import genresReducer from "./genres";

const rootReducer = combineReducers({
  trending: trendingReducer,
  genres: genresReducer,
});

export default rootReducer;
