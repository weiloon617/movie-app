// redux
import { combineReducers } from "redux";

// reducers
import popularMovieReducer from "./popularMovie";
import trendingMovieReducer from "./trendingMovie";
import movieDetailsReducer from "./movieDetails";
import personDetailsReducer from "./personDetails";
import searchMoviesReducer from "./searchMovies";

export const rootReducer = combineReducers({
  popularMovie: popularMovieReducer,
  trendingMovie: trendingMovieReducer,
  movieDetails: movieDetailsReducer,
  personDetails: personDetailsReducer,
  searchMovies: searchMoviesReducer
});
