import {
  SET_CONFIG
} from "../actionTypes";

const initialState = {
  config: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG: {
      return {
        ...state,
        config: action.payload,
      };
    }
    default:
      return state;
  }
}