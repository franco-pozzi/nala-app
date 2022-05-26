import { INDEX } from "common/constants";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";

import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_CONTRACT_TYPE,
} from "../actionTypes/typeOfContract";

const URL = {
  main: "/type_of_contracts",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_CONTRACT_TYPE,
  });
};

export const getList = () => async (dispatch) => {
  dispatch({ type: GET_LIST_LOADING });
  try {
    const response = await configAxios.get(URL.main);
    dispatch({
      type: GET_LIST,
      payload: response.data.type_of_contracts,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const deleteItem = (id) => async () => {
  try {
    const response = await configAxios.delete(`${URL.main}/${id}`);
    return response.data.type_of_contract;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message || error?.response?.data?.errors.base[INDEX.zero],
    };
  }
};

export const create = (data) => async () => {
  try {
    const response = await configAxios.post(URL.main, data);
    return response.data.type_of_contract;
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
    return response.data.type_of_contract;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
