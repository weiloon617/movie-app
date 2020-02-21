// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  searchMoviesList: [],
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SEARCH_ALL_MOVIES_START:
      return { ...state, loading: true };

    case actionsType.SEARCH_ALL_MOVIES_FAIL:
      const { errorMessage } = action;
      return { ...state, errorMessage };

    case actionsType.SEARCH_ALL_MOVIES_SUCCESS:
      const { searchMoviesInfo } = action;
      return { ...state, ...searchMoviesInfo };

    case actionsType.SEARCH_ALL_MOVIES_DONE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default reducer;