// actions type
import * as actions from "./actions";

// services
import { getMovieDetails, getMovieCredits } from "../../services";

/**
 * fetch movie details start
 */
export const fetchMovieDetailsStart = () => ({
  type: actions.FETCH_MOVIE_DETAILS_START
});

/**
 * fetch movie details fail
 * @param {*} errorMessage
 */
export const fetchMovieDetailsFail = errorMessage => ({
  type: actions.FETCH_MOVIE_DETAILS_FAIL,
  errorMessage
});

/**
 * fetch movie details success
 * @param {*} movieDetails
 */
export const fetchMovieDetailsSuccess = movieDetails => ({
  type: actions.FETCH_MOVIE_DETAILS_SUCCESS,
  movieDetails
});

/**
 * done fetching movie details
 */
export const fetchMovieDetailsDone = () => ({
  type: actions.FETCH_MOVIE_DETAILS_DONE
});

/**
 * fetch movie details
 * @param {*} payload
 */
export const fetchMovieDetails = payload => dispatch => {
  dispatch(fetchMovieDetailsStart());

  getMovieDetails(payload)
    .then(res => {
      dispatch(fetchMovieDetailsSuccess(res));
    })
    .then(() => {
      getMovieCredits(payload)
        .then(res => {
          dispatch(fetchMovieDetailsSuccess(res));
        })
        .catch(err => dispatch(fetchMovieDetailsFail(err.message)));
    })
    .catch(err => dispatch(fetchMovieDetailsFail(err.message)))
    .finally(() => dispatch(fetchMovieDetailsDone()));
};
