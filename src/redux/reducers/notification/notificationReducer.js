import { ADD_NOTIFICATION } from "redux/actionTypes/notifications";
import { INDEX } from "common/constants";

const initialState = {
  notifications: [],
  index: INDEX.zero,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NOTIFICATION:
    return {
      ...state,
      notifications: [...state.notifications, action.notification],
      index: action.index,
    };
  default:
    return state;
  }
};

export default notificationReducer;
