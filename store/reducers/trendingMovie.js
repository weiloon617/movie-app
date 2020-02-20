// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  trendingMovieList: [],
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.FETCH_TRENDING_MOVIE_LIST_START:
      return { ...state, loading: true };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_FAIL:
      const { errorMessage } = action;
      return { ...state, errorMessage };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_SUCCESS:
      const { trendingMovieListInfo } = action;
      return { ...state, ...trendingMovieListInfo };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_DONE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default reducer;
