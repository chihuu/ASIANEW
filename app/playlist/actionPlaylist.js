import * as types from "../private/constants";

import * as config from "../common/config";

function itemsFetchDataSuccess(items) {
  return {
    type: types.ENTER_PLAYLIST_SUCCESS,
    ...items
  };
}

function itemsHasErrored(bool) {
  return {
    type: types.ENTER_PLAYLIST_FAILURE,
    errorMenu: bool
  };
}

function destroyPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_PLAYLIST_DESTROY,
    list
  };
}
export function receivePlaylistApi(accessToken, mode) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );
  let url = types.REQUEST_URL_PLAYLIST;
  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error == 0) {
          dispatch(
            receivePlaylistApiSuccess({
              listPlaylist: data
            })
          );
        } else {
          dispatch(
            receivePlaylistApiFailure({
              error: 1,
              listPlaylist: null,
              message: "failed"
            })
          );
        }
      })
      .catch(e => {
        dispatch(
          receivePlaylistApiFailure({
            error: 1,
            listPlaylist: null,
            message: "fetch failed"
          })
        );
      })
      .done();
  };
}

export function destroyPlaylistApi() {
  return (dispatch, getState) => {
    dispatch(destroyPlaylistApiSuccess({ listPlaylist: null }));
  };
}

/****  Show Content Playlist ****/

function receiveContentPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_CONTENT_PLAYLIST_SUCCESS,
    list
  };
}
function receiveContentPlaylistApiFailure(msg) {
  return {
    type: types.ENTER_CONTENT_PLAYLIST_FAILURE,
    msg
  };
}
function destroyContentPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_CONTENT_PLAYLIST_DESTROY,
    list
  };
}
export function receiveContentPlaylistApi(accessToken, playlistId) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );
  let url =
    types.REQUEST_URL_CONTENT_PLAYLIST + "?mode=0&playlist_id=" + playlistId;

  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(
            receiveContentPlaylistApiSuccess({
              listContentPlaylist: data
            })
          );
        } else {
          dispatch(receiveContentPlaylistApiFailure("failed"));
        }
      })
      .catch(e => {
        dispatch(receiveContentPlaylistApiFailure("fetch failed"));
      })
      .done();
  };
}
/****  Show Content Playlist ****/

/****  Destroy Content Playlist ****/

function receiveDestroyContentPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_DESTROY_CONTENT_PLAYLIST_SUCCESS,
    list
  };
}

export function receiveDestroyContentPlaylistApi() {
  return (dispatch, getState) => {
    dispatch(
      receiveDestroyContentPlaylistApiSuccess({ listContentPlaylist: null })
    );
  };
}
/****  Destroy Content Playlist ****/

/****  Add Playlist   ****/

function receiveAddPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_ADD_PLAYLIST_SUCCESS,
    list
  };
}
function receiveAddPlaylistApiFailure(msg) {
  return {
    type: types.ENTER_ADD_PLAYLIST_FAILURE,
    msg
  };
}

export function receiveAddPlaylistApi(accessToken, contentId, name, mode) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );
  let url = "";

  if (contentId && parseInt(contentId) > 0) {
    url =
      types.REQUEST_URL_PLAYLIST_ADD_CONTENT +
      "?content_playlist=0_" +
      contentId +
      "&name=" +
      name +
      "&mode=" +
      mode;
  } else {
    url =
      types.REQUEST_URL_ADD_EDIT_PLAYLIST + "?name=" + name + "&mode=" + mode;
  }

  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(
            receiveAddPlaylistApiSuccess({
              addPlaylist: data
            })
          );
        } else {
          dispatch(receiveAddPlaylistApiFailure("failed"));
        }
      })
      .catch(e => {
        dispatch(receiveAddPlaylistApiFailure("fetch failed"));
      })
      .done();
  };
}
/****  End Add Playlist   ****/

/****  Destroy Playlist   ****/

function receiveDestroyAddPlaylistApiSuccess(list) {
  return {
    type: types.ENTER_DESTROY_ADD_PLAYLIST_SUCCESS,
    list
  };
}

export function receiveDestroyAddPlaylistApi() {
  return (dispatch, getState) => {
    dispatch(receiveDestroyAddPlaylistApiSuccess({ addPlaylist: null }));
  };
}
/****  End Destroy Playlist   ****/

/****  Delete Playlist   ****/

function receiveDeletePlaylistApiSuccess(list) {
  return {
    type: types.ENTER_DELETE_PLAYLIST_SUCCESS,
    list
  };
}
function receiveDeletePlaylistApiFailure(msg) {
  return {
    type: types.ENTER_DELETE_PLAYLIST_FAILURE,
    msg
  };
}

export function receiveDeletePlaylistApi(accessToken, playlistId) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );

  let url = types.REQUEST_URL_DELETE_PLAYLIST + "?playlist_id=" + playlistId;

  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(
            receiveDeletePlaylistApiSuccess({
              deletePlaylist: data
            })
          );
        } else {
          dispatch(receiveDeletePlaylistApiFailure("failed"));
        }
      })
      .catch(e => {
        dispatch(receiveDeletePlaylistApiFailure("fetch failed"));
      })
      .done();
  };
}

function destroyPlaylistDelteApiSuccess(list) {
  return {
    type: types.ENTER_DESTROY_DELETE_PLAYLIST,
    list
  };
}

export function destroyDeletePlaylistApi() {
  return (dispatch, getState) => {
    dispatch(
      destroyPlaylistDelteApiSuccess({
        deletePlaylist: null
      })
    );
  };
}
/****  End Delete Playlist   ****/

/****  Update Playlist   ****/

function receiveUpdatePlaylistApiSuccess(list) {
  return {
    type: types.ENTER_UPDATE_PLAYLIST_SUCCESS,
    list
  };
}
function receiveUpdatePlaylistApiFailure(msg) {
  return {
    type: types.ENTER_UPDATE_PLAYLIST_FAILURE,
    msg
  };
}

export function receiveUpdatePlaylistApi(accessToken, playlistId, name, mode) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );
  mode = 0; // default after will remove line
  let url =
    types.REQUEST_URL_ADD_EDIT_PLAYLIST +
    "?playlist_id=" +
    playlistId +
    "&name=" +
    name +
    "&mode=" +
    mode;
  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(
            receiveUpdatePlaylistApiSuccess({
              updatePlaylist: data
            })
          );
        } else {
          dispatch(receiveUpdatePlaylistApiFailure("failed"));
        }
      })
      .catch(e => {
        dispatch(receiveUpdatePlaylistApiFailure("fetch failed"));
      })
      .done();
  };
}
/****  End Update Playlist   ****/

/****  Add Playlist Content  ****/
function receivePlaylistAddContentApiSuccess(list) {
  return {
    type: types.ENTER_PLAYLIST_ADD_CONTENT_SUCCESS,
    list
  };
}
function receivePlaylistAddContentApiFailure(msg) {
  return {
    type: types.ENTER_PLAYLIST_ADD_CONTENT_FAILURE,
    msg
  };
}

export function receivePlaylistAddContentApi(
  accessToken,
  playlistId,
  contentId
) {
  let authorization = JSON.parse(
    config.Authorization.generate("POST", accessToken)
  );

  let url =
    types.REQUEST_URL_PLAYLIST_ADD_CONTENT +
    "?content_playlist=" +
    playlistId +
    "_" +
    contentId;
  return (dispatch, getState) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        DateTime: authorization.DateTime,
        RequestToken: authorization.RequestToken,
        Authorization: authorization.Authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(
            receivePlaylistAddContentApiSuccess({
              addContentPlaylist: data
            })
          );
        } else {
          dispatch(receivePlaylistAddContentApiFailure("failed"));
        }
      })
      .catch(e => {
        dispatch(receivePlaylistAddContentApiFailure("fetch failed"));
      })
      .done();
  };
}
/****  End Add Playlist Content  ****/
