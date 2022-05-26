import { ADD_NOTIFICATION } from "redux/actionTypes/notifications";
import { INDEX } from "common/constants";

export const addNotification = (mainNotification) => (dispatch, getState) => {
  const state = getState();
  const id = state?.notification?.index;
  const notification = { id, ...mainNotification };

  dispatch({ type: ADD_NOTIFICATION, notification, index: id + INDEX.one });
};
