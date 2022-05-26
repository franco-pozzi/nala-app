import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_POST_INFO,
  POST_INFO_LOADING,
  POST_INFO,
  POST_INFO_ERROR,
} from "../actionTypes/infoTypes";

const URL = {
  main: "/info_types",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_POST_INFO,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().infoTypesReducer;

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.info_types,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const create = (info) => async (dispatch, getState) => {
  const { newInfo } = getState().infoTypesReducer;

  if (!newInfo) {
    dispatch({
      type: POST_INFO_LOADING,
    });
    try {
      const response = await configAxios.post(URL.main, info);
      dispatch({
        type: POST_INFO,
        payload: response.data,
      });
      return response.data.info_type;
    } catch (error) {
      errorHandler(error, dispatch, POST_INFO_ERROR);
    }
  }
};
