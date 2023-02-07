import { uniqBy } from "lodash";
import randomColor from "randomcolor";
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_FAVORITE
} from "../actionTypes";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE: {
      const backgroundColor = randomColor({ luminosity: 'dark' })
      state.splice(0, 0, { ...action.payload, backgroundColor });
      return uniqBy(state, 'id');
    }
    case REMOVE_FAVORITE: {
      state = state.filter((s) => s.id != action.payload.id);
      return uniqBy(state, 'id');
    }
    case SET_FAVORITE: {
      return action.payload;
    }
    default:
      return state;
  }
}