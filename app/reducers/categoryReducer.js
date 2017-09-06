import {
  FETCHING_DATA_CATEGORY,
  FETCHING_DATA_CATEGORY_SUCCESS,
  FETCHING_DATA_CATEGORY_FAILURE,
  FETCHING_FULL_SCREEN
} from "../private/constants";

const initialState = {
  payload: {},
  dataFetched: false,
  isFetching: true,
  userInfo: null,
  isFullscreen: false,
  error: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_CATEGORY:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FETCHING_DATA_CATEGORY_SUCCESS:
      return {
        ...state,
        ...action,
        userInfo: state.userInfo,
        isFetching: action.isFetching,
        payload: {
          listCategory: action.items
        }
      };
    case FETCHING_DATA_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        error: true
      };
    case FETCHING_FULL_SCREEN:
      return {
        ...state,
        isFetching: action.isFetching,
        isFullscreen: action.isFullscreen
      };

    default:
      return state;
  }
};
