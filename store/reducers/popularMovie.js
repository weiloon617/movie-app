// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  popularMovieList: [],
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.FETCH_POPULAR_MOVIE_LIST_START:
      return { ...state, loading: true };

    case actionsType.FETCH_POPULAR_MOVIE_LIST_FAIL:
      const { errorMessage } = action;
      return { ...state, loading: false, errorMessage };

    case actionsType.FETCH_POPULAR_MOVIE_LIST_SUCCESS:
      const { popularMovieListInfo } = action;
      return { ...state, loading: false, ...popularMovieListInfo };

    default:
      return { ...state };
  }
};

export default reducer;
