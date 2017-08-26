import { combineReducers } from "redux";
import menu from "./menuReducer";
import home from "./homeReducer";
import login from "./loginReducer";
import register from "./registerReducer";

export default combineReducers({
  home,
  menu,
  login
});

export const getMenu = ({ menu }) => menu;
export const getHome = ({ home }) => home;
export const getLogin = ({ login }) => login;
export const getRegister = ({ register }) => register;
