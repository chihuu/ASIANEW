import { FETCHING_DATA_MENU, FETCHING_DATA_MENU_SUCCESS, FETCHING_DATA_MENU_FAILURE } from '../private/constants'

const initialState = {
  payload: {},
  dataFetched: false,
  isFetchingMenu: true,
  errorMenu: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_MENU:
      return {
        ...state,
        payload: {},
        isFetchingMenu: true
      }
    case FETCHING_DATA_MENU_SUCCESS:
      return {
        ...state,
        isFetchingMenu: false,
        payload: {
          menu: action.items
        }
      }
    case FETCHING_DATA_MENU_FAILURE:
      return {
        ...state,
        isFetchingMenu: false,
        errorMenu: true
      }
    default:
      return state
  }
}
