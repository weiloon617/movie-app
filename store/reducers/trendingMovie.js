// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  trendingMovieList: [],
  errorMessage: "",
  mediaType: "movie",
  timeWindow: "day"
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
      const { trendingMovieList, ...res } = trendingMovieListInfo;
      return {
        ...state,
        ...res,
        trendingMovieList: [...state.trendingMovieList, ...trendingMovieList]
      };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_DONE:
      return { ...state, loading: false };

    case actionsType.UPDATE_FILTER_STATE:
      const { updatedState } = action;
      return { ...state, ...updatedState };

    case actionsType.RESET_FILTER_STATE:
      return { ...state, mediaType: "movie", timeWindow: "day" };

    case actionsType.CLEAR_TRENDING_MOVIE_LIST:
      return { ...state, trendingMovieList: [] };

    default:
      return { ...state };
  }
};

export default reducer;
