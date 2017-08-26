import {
  FETCHING_DATA_HOME,
  FETCHING_DATA_HOME_SUCCESS,
  FETCHING_DATA_HOME_FAILURE
} from "../private/constants";

const initialState = {
  payload: {},
  dataFetched: false,
  isFetching: true,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_HOME:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FETCHING_DATA_HOME_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        payload: {
          dataHome: action.items
        }
      };
    case FETCHING_DATA_HOME_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        error: true
      };
    default:
      return state;
  }
};
