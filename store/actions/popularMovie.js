// actions type
import * as actions from "./actions";

// services
import { getPopularMovieList } from "../../services";

/**
 * fetch popular movie list start
 */
export const fetchPopularMovieListStart = () => ({
  type: actions.FETCH_POPULAR_MOVIE_LIST_START
});

/**
 * fetch popular movie list fail
 * @param {*} error
 */
export const fetchPopularMovieListFail = errorMessage => ({
  type: actions.FETCH_POPULAR_MOVIE_LIST_FAIL,
  errorMessage
});

/**
 * fetch popular movie list success
 * @param {*} popularMovieList
 */
export const fetchPopularMovieListSuccess = popularMovieListInfo => ({
  type: actions.FETCH_POPULAR_MOVIE_LIST_SUCCESS,
  popularMovieListInfo
});

/**
 * done fetching popular movie list
 */
export const fetchPopularMovieListDone = () => ({
  type: actions.FETCH_POPULAR_MOVIE_LIST_DONE
});

/**
 * fetch popular movie list
 * @param {*} payload
 */
export const fetchPopularMovieList = payload => dispatch => {
  dispatch(fetchPopularMovieListStart());

  return getPopularMovieList(payload)
    .then(res => {
      const { page, total_results, total_pages, results } = res;

      dispatch(
        fetchPopularMovieListSuccess({
          page,
          totalPages: total_pages,
          totalResults: total_results,
          popularMovieList: results
        })
      );
    })
    .catch(err => {
      dispatch(fetchPopularMovieListFail(err));
    })
    .finally(() => dispatch(fetchPopularMovieListDone()));
};

/**
 * clear popular movie list
 */
export const clearPopularMovieList = () => ({
  type: actions.CLEAR_POPULAR_MOVIE_LIST
});
