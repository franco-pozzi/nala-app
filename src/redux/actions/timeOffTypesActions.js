import configAxios from "../configAxios";
import errorHandler from "../errorHandler";

import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../actionTypes/timeOffTypes";

const URL = {
  main: "/time_off_types",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch) => {
  dispatch({ type: GET_LIST_LOADING });
  try {
    const response = await configAxios.get(URL.main);
    dispatch({
      type: GET_LIST,
      payload: response.data.time_off_types || response.data,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};
