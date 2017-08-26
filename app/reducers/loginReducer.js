import { ENTER_LOGIN_SUCCESS, ENTER_LOGIN_FAILURE } from "../private/constants";

const initialState = {
  payload: {},
  isFetching: true,
  errorLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: true,
        payload: {
          userInfo: action.items
        }
      };

    case ENTER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorLogin: true
      };
    default:
      return state;
  }
};
