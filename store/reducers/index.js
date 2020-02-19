// redux
import { combineReducers } from "redux";

// reducers
import popularMovieReducer from "./popularMovie";
import trendingMovieReducer from "./trendingMovie";

export const rootReducer = combineReducers({
  popularMovie: popularMovieReducer,
  trendingMovie: trendingMovieReducer
});
