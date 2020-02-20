// actions type
import * as actions from "./actions";

// services
import { getPopularMovieList } from "../../services";
import { Toast } from "@ant-design/react-native";

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
 * fetch popular movie list
 * @param {*} payload
 */
export const fetchPopularMovieList = payload => dispatch => {
  dispatch(fetchPopularMovieListStart());

  Toast.loading("loading...", 3000);

  getPopularMovieList(payload)
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
      dispatch(fetchPopularMovieListFail(err.message));
    });
};
