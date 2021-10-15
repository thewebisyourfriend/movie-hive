import { combineReducers } from "redux";

import trendingReducer from "./trending";

const rootReducer = combineReducers({
  trending: trendingReducer,
});

export default rootReducer;
