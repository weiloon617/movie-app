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
export const fetchTrendingMovieListSuccess = trendingMovieListInfo => ({
  type: actions.FETCH_TRENDING_MOVIE_LIST_SUCCESS,
  trendingMovieListInfo
});

/**
 * done fetching trending movie list
 */
export const fetchTrendingMovieListDone = () => ({
  type: actions.FETCH_TRENDING_MOVIE_LIST_DONE
});

/**
 * fetch trending movie list
 * @param {*} payload
 */
export const fetchTrendingMovieList = payload => dispatch => {
  dispatch(fetchTrendingMovieListStart());

  getTrendingMovieList(payload)
    .then(res => {
      const { page, total_results, total_pages, results } = res;
      dispatch(
        fetchTrendingMovieListSuccess({
          page,
          totalPages: total_pages,
          totalResults: total_results,
          trendingMovieList: results
        })
      );
    })
    .catch(err => {
      dispatch(fetchTrendingMovieListFail(err.message));
    })
    .finally(() => dispatch(fetchTrendingMovieListDone()));
};
