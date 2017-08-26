import { Actions } from "react-native-router-flux";
import Authorization from "../common/Authorization";
import * as types from "../private/constants";

export function loginSuccess(list) {
  return {
    type: types.ENTER_LOGIN_SUCCESS,
    list
  };
}

export function loginFailure(error) {
  return {
    type: types.ENTER_LOGIN_FAILURE,
    error
  };
}

export function login(email, password) {
  let authorization = JSON.parse(Authorization.generate());
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
    return fetch(types.REQUEST_LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken
      },
      body: formBody
    })
      .then(response => response.json())
      .then(data => {
        dispatch(
          loginSuccess({
            userInfo: data
          })
        );
      })
      .catch(e => {
        dispatch(loginFailure("fetch failed"));
      })
      .done();
  };
}

export function fblogin(fbToken, fbId, email, name) {
  let authorization = JSON.parse(Authorization.generate("POST"));

  let user = {
    facebookToken: fbToken,
    facebookID: fbId,
    emailAddress: email,
    fullName: name
  };
  let formBody = [];
  for (let property in user) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(user[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return (dispatch, getState) => {
    return fetch(types.REQUEST_FB_LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken
      },
      body: formBody
    })
      .then(response => response.json())
      .then(data => {
        dispatch(
          loginSuccess({
            userInfo: data
          })
        );
      })
      .catch(e => {
        dispatch(loginFailure("fetch failed"));
      })
      .done();
  };
}
