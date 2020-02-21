// actions type
import * as actions from "./actions";

// services
import { searchMovies } from "../../services";

/**
 * search all movies start
 */
export const searchAllMoviesStart = () => ({
  type: actions.SEARCH_ALL_MOVIES_START
});

/**
 * search all movies fail
 * @param {*} error
 */
export const searchAllMoviesFail = errorMessage => ({
  type: actions.SEARCH_ALL_MOVIES_FAIL,
  errorMessage
});

/**
 * search all movies success
 * @param {*} popularMovieList
 */
export const searchAllMoviesSuccess = searchMoviesInfo => ({
  type: actions.SEARCH_ALL_MOVIES_SUCCESS,
  searchMoviesInfo
});

/**
 * done search all movies
 */
export const searchAllMoviesDone = () => ({
  type: actions.SEARCH_ALL_MOVIES_DONE
});

/**
 * search all movies
 * @param {*} payload
 */
export const searchAllMovies = payload => dispatch => {
  dispatch(searchAllMoviesStart());

  searchMovies(payload)
    .then(res => {
      const { page, total_results, total_pages, results } = res;

      dispatch(
        searchAllMoviesSuccess({
          page,
          totalPages: total_pages,
          totalResults: total_results,
          searchMoviesList: results
        })
      );
    })
    .catch(err => {
      dispatch(searchAllMoviesFail(err));
    })
    .finally(() => dispatch(searchAllMoviesDone()));
};

/**
 * reset all movies list
 */
export const resetAllMoviesList = () => ({
  type: actions.RESET_ALL_MOVIES_LIST
});
