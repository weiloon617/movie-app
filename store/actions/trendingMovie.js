// actions type
import * as actions from "./actions";

// services
import { getTrendingMovieList } from "../../services";

/**
 * fetch trending movie list start
 */
export const fetchTrendingMovieListStart = () => ({
  type: actions.FETCH_TRENDING_MOVIE_LIST_START
});

/**
 * fetch trending movie list fail
 * @param {*} error
 */
export const fetchTrendingMovieListFail = errorMessage => ({
  type: actions.FETCH_TRENDING_MOVIE_LIST_FAIL,
  errorMessage
});

/**
 * fetch trending movie list success
 * @param {*} trendingMovieList
 */
export const fetchTrendingMovieListSuccess = trendingMovieList => ({
  type: actions.FETCH_TRENDING_MOVIE_LIST_SUCCESS,
  trendingMovieList
});

/**
 * fetch trending movie list
 * @param {*} payload
 */
export const fetchTrendingMovieList = payload => dispatch => {
  dispatch(fetchTrendingMovieListStart());

  getTrendingMovieList(payload)
    .then(res => {
      dispatch(fetchTrendingMovieListSuccess(res));
    })
    .catch(err => {
      dispatch(fetchTrendingMovieListFail(err.message));
    });
};
