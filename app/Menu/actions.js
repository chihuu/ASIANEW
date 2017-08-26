import { Actions } from "react-native-router-flux";
import Authorization from "../common/Authorization";
import * as types from "../private/constants";

function itemsHasErrored(bool) {
  return {
    type: types.FETCHING_DATA_MENU_FAILURE,
    errorMenu: bool
  };
}
function itemsIsLoading(items) {
  return {
    type: types.FETCHING_DATA_MENU,
    ...items
  };
}

function itemsFetchDataSuccess(items) {
  return {
    type: types.FETCHING_DATA_MENU_SUCCESS,
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

export function itemsFetchDataMenu(url) {
  let authorization = JSON.parse(Authorization.generate());

  return dispatch => {
    dispatch(itemsIsLoading({ isFetching: true }));

    return fetch(types.REQUEST_MENU_URL, {
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
        dispatch(
          itemsFetchDataSuccess({
            isFetching: false,
            items: items
          })
        )
      )
      .catch(() => dispatch(itemsHasErrored({ isFetching: true })));
  };
}
