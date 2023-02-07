import { combineReducers } from "redux";
import config from "./config";
import setting from "./setting";
import favorites from "./favorites";

export default combineReducers({ config, setting, favorites });