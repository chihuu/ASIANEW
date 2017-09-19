import {
  FETCHING_DATA_AUDIO,
  FETCHING_DATA_AUDIO_SUCCESS,
  FETCHING_DATA_AUDIO_FAILURE,
  FETCHING_FULL_SCREEN,
  CHANGE_PLAYER_STATUS,
  CHANGE_PLAYER_REPEAT_NUMBER,
  CHANGE_CURRENT_ITEM_PLAY,
  CHANGE_RANDOM_STATUS,
  CHANGE_CURRENT_TIME,
  CHANGE_PLAYING_SONG
} from "../private/constants";

const initialState = {
  payload: {},
  player: {},
  dataFetched: false,
  isFetching: true,
  userInfo: null,
  isFullscreen: false,
  error: false,
  paused: false,
  repeatNumber: 0,
  isRandom: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_AUDIO:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FETCHING_DATA_AUDIO_SUCCESS:
      return {
        ...state,
        ...action,
        userInfo: state.userInfo,
        isFetching: action.isFetching,
        player: {
          isRandom: action.isRandom,
          paused: action.paused,
          currentItemPlay: action.currentItemPlay,
          repeatNumber: action.repeatNumber
        },
        payload: {
          listAudio: action.items
        }
      };
    case FETCHING_DATA_AUDIO_FAILURE:
      return {
        ...state,
        ...action,
        isFetching: action.isFetching,
        error: true
      };
    case FETCHING_FULL_SCREEN:
      return {
        ...state,
        ...action,
        isFetching: action.isFetching,
        isFullscreen: action.isFullscreen
      };
    case CHANGE_PLAYER_STATUS:
      return {
        ...state,
        ...action,
        player: {
          paused: action.paused,
          currentItemPlay: action.currentItemPlay,
          repeatNumber: action.repeatNumber,
          isRandom: action.isRandom
        }
      };
    case CHANGE_PLAYER_REPEAT_NUMBER:
      return {
        ...state,
        ...action,
        player: {
          paused: action.paused,
          currentItemPlay: action.currentItemPlay,
          repeatNumber: action.repeatNumber,
          isRandom: action.isRandom
        }
      };
    case CHANGE_CURRENT_ITEM_PLAY:
      return {
        ...state,
        ...action,
        player: {
          currentItemPlay: action.currentItemPlay,
          paused: action.paused,
          repeatNumber: action.repeatNumber,
          isRandom: action.isRandom
        }
      };
    case CHANGE_RANDOM_STATUS:
      return {
        ...state,
        ...action,
        player: {
          paused: action.paused,
          currentItemPlay: action.currentItemPlay,
          repeatNumber: action.repeatNumber,
          isRandom: action.isRandom
        }
      };
    case CHANGE_CURRENT_TIME:
      return {
        ...state,
        ...action,
        player: {
          currentTime: action.currentTime
        }
      };

    default:
      return state;
  }
};
