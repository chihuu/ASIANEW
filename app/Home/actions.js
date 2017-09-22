import { getHome } from "../reducers";
import { Actions } from "react-native-router-flux";
import Authorization from "../common/Authorization";
import * as types from "../private/constants";
import * as config from "../common/config";
//import fetch from 'isomorphic-fetch';

function itemsHasErrored(items) {
  return {
    type: types.FETCHING_DATA_HOME_FAILURE,
    ...items
  };
}
function itemsIsLoading(items) {
  return {
    type: types.FETCHING_DATA_HOME,
    ...items
  };
}
function itemsFetchDataSuccess(items) {
  return {
    type: types.FETCHING_DATA_HOME_SUCCESS,
    ...items
  };
}

function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(itemsHasErrored(true));
    }, 5000);
  };
}

export function itemsFetchDataHome(url) {
  let authorization = JSON.parse(Authorization.generate());

  return dispatch => {
    dispatch(itemsIsLoading({ isFetching: true }));

    return fetch(types.REQUEST_HOME_URL, {
      method: "GET",
      headers: {
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(items =>
        dispatch(itemsFetchDataSuccess({ items: items, isFetching: false }))
      )
      .catch(() => dispatch(itemsHasErrored({ isFetching: true })));
  };
}
