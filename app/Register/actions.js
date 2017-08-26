import Authorization from "../common/Authorization";
import * as types from "../private/constants";
import * as config from "../common/config";

function registerSuccess(list) {
  return {
    type: types.ENTER_REGISTER_SUCCESS,
    ...items
  };
}

function registerDestroy(list) {
  return {
    type: types.ENTER_REGISTER_DESTROY,
    ...items
  };
}

function registerFailure(bool) {
  return {
    type: types.ENTER_REGISTER_FAILURE,
    errorMenu: bool
  };
}

export function register(email, password) {
  let authorization = JSON.parse(config.Authorization.generate("POST"));
  let user = {
    email: email,
    password: password
  };

  let formBody = [];
  for (let property in user) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(user[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return (dispatch, getState) => {
    return fetch(types.REQUEST_REGISTER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken
      },
      body: formBody
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(items =>
        dispatch(
          registerSuccess({
            isFetching: false,
            items: items
          })
        )
      )
      .catch(() => dispatch(registerFailure({ isFetching: true })));
  };
}

export function destroy() {
  return (dispatch, getState) => {
    dispatch(
      registerDestroy({
        items: null
      })
    );
  };
}
