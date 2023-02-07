import {
  SET_CONFIG,
  SET_SETTING,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_FAVORITE
} from "./actionTypes";

export const setSetting = (content) => ({
  type: SET_SETTING,
  payload: content,
});
export const setConfig = (content) => ({
  type: SET_CONFIG,
  payload: content,
});
export const addFavorite = (content) => ({
  type: ADD_FAVORITE,
  payload: content,
});
export const removeFavorite = (content) => ({
  type: REMOVE_FAVORITE,
  payload: content,
});
export const setFavorite = (content) => ({
  type: SET_FAVORITE,
  payload: content,
});