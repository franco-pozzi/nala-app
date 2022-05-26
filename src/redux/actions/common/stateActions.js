import { STATES } from "common/constants/timeOff";
import errorHandler from "../../errorHandler";
import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,
} from "../../actionTypes/common/state";

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => (dispatch, getState) => {
  const { list } = getState().stateReducer;
  if (!list.length) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = {
        data: [
          { id: STATES.pending, value: STATES.pending, label: "Pending" },
          { id: STATES.approved_by_leader, value: STATES.approved_by_leader, label: "Approved By Leader" },
          { id: STATES.approved, value: STATES.approved, label: "Approved" },
          { id: STATES.rejected, value: STATES.rejected, label: "Rejected" },
        ],
      };
      dispatch({
        type: GET_LIST,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};
