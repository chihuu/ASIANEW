import {
  ENTER_REGISTER_SUCCESS,
  ENTER_REGISTER_DESTROY,
  ENTER_REGISTER_FAILURE
} from "../private/constants";

const initialState = {
  payload: {},
  dataFetched: false,
  isFetching: true,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTER_REGISTER_SUCCESS:
    case ENTER_REGISTER_DESTROY:
      return {
        ...state,
        ...action,
        status: true,
        registerInfo: action.items
      };
    case ENTER_REGISTER_FAILURE:
      return {
        ...state,
        ...action,
        status: true,
        registerInfo: action.items
      };
    default:
      return state;
  }
};
