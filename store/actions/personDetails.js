// actions type
import * as actions from "./actions";

// services
import { getPersonDetails, getPersonMovieCredits } from "../../services";

/**
 * fetch person details start
 */
export const fetchPersonDetailsStart = () => ({
  type: actions.FETCH_PERSON_DETAILS_START
});

/**
 * fetch person details fail
 * @param {*} errorMessage
 */
export const fetchPersonDetailsFail = errorMessage => ({
  type: actions.FETCH_PERSON_DETAILS_FAIL,
  errorMessage
});

/**
 * fetch person details success
 * @param {*} personDetails
 */
export const fetchPersonDetailsSuccess = personDetails => ({
  type: actions.FETCH_PERSON_DETAILS_SUCCESS,
  personDetails
});

/**
 * done fetching person details
 */
export const fetchPersonDetailsDone = () => ({
  type: actions.FETCH_PERSON_DETAILS_DONE
});

/**
 * fetch person details
 * @param {*} payload
 */
export const fetchPersonDetails = payload => dispatch => {
  dispatch(fetchPersonDetailsStart());

  getPersonDetails(payload)
    .then(res => {
      dispatch(fetchPersonDetailsSuccess(res));
    })
    .then(() => {
      getPersonMovieCredits(payload)
        .then(res => {
          dispatch(fetchPersonDetailsSuccess(res));
        })
        .catch(err => dispatch(fetchPersonDetailsFail(err.message)));
    })
    .catch(err => dispatch(fetchPersonDetailsFail(err.message)))
    .finally(() => dispatch(fetchPersonDetailsDone()));
};
