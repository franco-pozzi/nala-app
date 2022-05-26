import { STATUS } from "common/constants/gender";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/common/gender";

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().genderReducer;

  if (!list?.length) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = {
        data: [
          {
            id: STATUS.female,
            value: STATUS.female,
          },
          {
            id: STATUS.male,
            value: STATUS.male,
          },
          {
            id: STATUS.nonBinary,
            value: STATUS.nonBinary,
          },
          {
            id: STATUS.preferNotToSay,
            value: STATUS.preferNotToSay,
          },
          {
            id: STATUS.other,
            value: STATUS.other,
          },
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
