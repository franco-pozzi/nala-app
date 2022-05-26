import { getAxiosDeleteConfig } from "common/utils";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_POSITION,
  // PROCESS_POSITION,
  // PROCESS_POSITION_LOADING,
  // PROCESS_POSITION_ERROR,
} from "../../actionTypes/position";

const URL = {
  main: "/positions",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(URL.main);
    dispatch({
      type: GET_LIST,
      payload: response.data.positions,
    });
    return response.data.positions;
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_POSITION,
  });
};

export const create = (data) => async () => {
  try {
    const response = await configAxios.post(URL.main, data);
    return response.data.position;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const update = (id, data) => async () => {
  try {
    const response = await configAxios.put(`${URL.main}/${id}`, data);
    return response.data.position;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteItem = async (id, data) => {
  try {
    const dataToMove = {
      position: {
        movements: data,
      },
    };
    const response = await configAxios(getAxiosDeleteConfig(URL.main, id, data ? dataToMove : ""));
    return response.data.positions;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.detail || error?.response?.data?.message,
    };
  }
};
