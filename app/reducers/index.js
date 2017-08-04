import {combineReducers} from 'redux'
import menu from './menuReducer'
import home from './homeReducer'

export default combineReducers({
  home,
  menu,
})

export const getMenu = ({menu}) => menu
export const getHome = ({home}) => home
