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
      return { ...state, errorMessage };

    case actionsType.FETCH_POPULAR_MOVIE_LIST_SUCCESS:
      const { popularMovieListInfo } = action;
      const { popularMovieList, ...res } = popularMovieListInfo;
      return {
        ...state,
        ...res,
        popularMovieList: [...state.popularMovieList, ...popularMovieList]
      };

    case actionsType.FETCH_POPULAR_MOVIE_LIST_DONE:
      return { ...state, loading: false };

    case actionsType.CLEAR_POPULAR_MOVIE_LIST:
      return { ...state, popularMovieList: [] };

    default:
      return { ...state };
  }
};

export default reducer;
