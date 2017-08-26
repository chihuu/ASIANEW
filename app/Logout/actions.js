import * as types from "../private/constants";
import * as config from "../common/config";

export function logoutSuccess(list) {
  return {
    type: types.ENTER_LOGOUT_SUCCESS,
    list
  };
}

export function logout(email, password) {
  return (dispatch, getState) => {
    dispatch(
      logoutSuccess({
        userInfo: null
      })
    );
  };
}
