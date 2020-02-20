// redux
import { combineReducers } from "redux";

// reducers
import popularMovieReducer from "./popularMovie";
import trendingMovieReducer from "./trendingMovie";
import movieDetailsReducer from "./movieDetails";

export const rootReducer = combineReducers({
  popularMovie: popularMovieReducer,
  trendingMovie: trendingMovieReducer,
  movieDetails: movieDetailsReducer
});
