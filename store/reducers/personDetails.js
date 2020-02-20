// actions type
import * as actionsType from "../actions/actions";

const initialState = {
  loading: false,
  personDetails: {},
  errorMessage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.FETCH_PERSON_DETAILS_START:
      return { ...state, loading: true };

    case actionsType.FETCH_PERSON_DETAILS_FAIL:
      const { errorMessage } = action;
      return { ...state, errorMessage };

    case actionsType.FETCH_PERSON_DETAILS_SUCCESS:
      const { personDetails } = action;
      return {
        ...state,
        personDetails: { ...state.personDetails, ...personDetails }
      };

    case actionsType.FETCH_PERSON_DETAILS_DONE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default reducer;
