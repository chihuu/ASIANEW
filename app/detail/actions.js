import * as types from "../private/constants";
import * as config from "../common/config";
import Authorization from "../common/Authorization";

function itemsFetchDataSuccess(items) {
  return {
    type: types.FETCHING_DATA_DETAIL_SUCCESS,
    ...items
  };
}
function itemsIsLoading(items) {
  return {
    type: types.FETCHING_DATA_DETAIL,
    ...items
  };
}
function itemsHasErrored(items) {
  return {
    type: types.FETCHING_DATA_DETAIL_FAILURE,
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
function itemsIsFullscreen(items) {
  return {
    type: types.FETCHING_FULL_SCREEN,
    ...items
  };
}
export function itemsFetchDataDetail(id) {
  let authorization = JSON.parse(Authorization.generate());

  return dispatch => {
    dispatch(itemsIsLoading({ isFetching: true }));

    return fetch(types.REQUEST_DETAIL_URL + "/" + id, {
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
      .then(items => {
        dispatch(itemsFetchDataSuccess({ items: items, isFetching: false }));
      })
      .catch(() => dispatch(itemsHasErrored({ isFetching: true })));
  };
}
export function presentFullscreenVideoPlayer(fullscreen) {
  return dispatch => {
    dispatch(itemsIsFullscreen(fullscreen));
  };
}
