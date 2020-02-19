// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  trendingMovieList: [],
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.FETCH_TRENDING_MOVIE_LIST_START:
      return { ...state, loading: true };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_FAIL:
      const { errorMessage } = action;
      return { ...state, loading: false, errorMessage };

    case actionsType.FETCH_TRENDING_MOVIE_LIST_SUCCESS:
      const { trendingMovieList } = action;
      return { ...state, loading: false, trendingMovieList };

    default:
      return { ...state };
  }
};

export default reducer;
