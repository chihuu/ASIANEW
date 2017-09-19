import * as types from "../private/constants";
import * as config from "../common/config";
import Authorization from "../common/Authorization";

function itemsFetchDataSuccess(items) {
  return {
    type: types.FETCHING_DATA_AUDIO_SUCCESS,
    ...items
  };
}
function itemsIsLoading(items) {
  return {
    type: types.FETCHING_DATA_AUDIO,
    ...items
  };
}
function itemsHasErrored(items) {
  return {
    type: types.FETCHING_DATA_AUDIO_FAILURE,
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
export function itemsFetchDataPlayerAudio(id) {
  let authorization = JSON.parse(Authorization.generate());

  return dispatch => {
    dispatch(
      itemsIsLoading({ isFetching: true, currentItemPlay: 0, currentTime: 0 })
    );

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
        dispatch(
          itemsFetchDataSuccess({
            items: items,
            isFetching: false,
            paused: false,
            currentItemPlay: 0,
            repeatNumber: 0,
            currentTime: 0,
            isRandom: false
          })
        );
      })
      .catch(() => dispatch(itemsHasErrored({ isFetching: true })));
  };
}
export function presentFullscreenVideoPlayer(fullscreen) {
  return dispatch => {
    dispatch(itemsIsFullscreen(fullscreen));
  };
}

export function changeCurrentTime(currentTime) {
  return {
    type: types.CHANGE_CURRENT_TIME,
    currentTime
  };
}

export function changeSelectedPlaylists(playlists, playlist) {
  const index = playlists.indexOf(playlist);
  if (index > -1) {
    playlists.splice(index, 1);
  }
  playlists.push(playlist);

  return {
    type: types.CHANGE_SELECTED_PLAYLISTS,
    playlists
  };
}

export function changePlayerStatus(paused) {
  return {
    type: types.CHANGE_PLAYER_STATUS,
    ...paused
  };
}

export function changePlayOrPause(
  paused,
  currentItemPlay,
  repeatNumber,
  isRandom
) {
  return (dispatch, getState) => {
    dispatch(
      changePlayerStatus({
        paused: !paused,
        currentItemPlay: currentItemPlay,
        repeatNumber: repeatNumber,
        isRandom: isRandom
      })
    );
  };
}

/*
  Process repeat in player
  0: no repeat,
  1: repeat one,
  2: repeat all
*/
export function changePlayerRepeatNumber(repeatNumber) {
  return {
    type: types.CHANGE_PLAYER_REPEAT_NUMBER,
    ...repeatNumber
  };
}

export function changeRepeatNumber(
  repeatNumber,
  currentItemPlay,
  paused,
  isRandom
) {
  return (dispatch, getState) => {
    dispatch(
      changePlayerRepeatNumber({
        repeatNumber: repeatNumber,
        currentItemPlay: currentItemPlay,
        paused: paused,
        isRandom: isRandom
      })
    );
  };
}

/*
  Process forward in player
*/
export function onForward(currentItemPlay) {
  return {
    type: types.CHANGE_CURRENT_ITEM_PLAY,
    ...currentItemPlay
  };
}

export function changeCurrentItemPlay(
  currentItemPlay,
  paused,
  repeatNumber,
  isRandom
) {
  return (dispatch, getState) => {
    dispatch(
      onForward({
        currentItemPlay: currentItemPlay,
        paused: paused,
        repeatNumber: repeatNumber,
        isRandom: isRandom
      })
    );
  };
}

export function onRandom(isRandom) {
  return {
    type: types.CHANGE_RANDOM_STATUS,
    ...isRandom
  };
}

export function changeIsRanDom(
  isRandom,
  repeatNumber,
  currentItemPlay,
  paused
) {
  return (dispatch, getState) => {
    dispatch(
      onRandom({
        isRandom: !isRandom,
        repeatNumber: 0,
        currentItemPlay: currentItemPlay,
        paused: paused
      })
    );
  };
}
