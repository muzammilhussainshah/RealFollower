import {
  SET_SETTING
} from "../actionTypes";

const initialState = {
  remove_album_after_import: false,
  remove_contact_after_import: false,
  auto_backup_contact: true,
  use_passcode: false,
  passcode_unlocked: false,
  passcode: null,
  onboarding: true,
  onboarding_home: true,
  widget_battery_theme: 'blue',
  widget_storage_theme: 'blue',
  rescan: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SETTING: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}