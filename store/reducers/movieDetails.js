// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  movieDetails: {},
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.FETCH_MOVIE_DETAILS_START:
      return { ...state, loading: true };

    case actionsType.FETCH_MOVIE_DETAILS_FAIL:
      const { errorMessage } = action;
      return { ...state, errorMessage };

    case actionsType.FETCH_MOVIE_DETAILS_SUCCESS:
      const { movieDetails } = action;
      return {
        ...state,
        movieDetails: { ...state.movieDetails, ...movieDetails }
      };

    case actionsType.FETCH_MOVIE_DETAILS_DONE:
      return { ...state, loading: false };

    case actionsType.CLEAR_MOVIE_DETRAILS:
      return { ...state, movieDetails: {} };

    default:
      return { ...state };
  }
};

export default reducer;
