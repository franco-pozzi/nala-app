import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
  RESET_STATE_ONE,
} from "../actionTypes/benefits";

const URL = {
  main: "/benefits",
  collaborators: "/collaborators",
  payrollItems: "/payroll_items_salaries",
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};

export const getList = () => async (dispatch) => {
  dispatch({ type: GET_LIST_LOADING });
  try {
    const response = await configAxios.get(URL.main);
    dispatch({
      type: GET_LIST,
      payload: response.data.benefits,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const resetStateOne = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_ONE,
  });
};

export const getOne = (collaboratorId) => async (dispatch) => {
  dispatch({
    type: GET_ONE_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.collaborators}/${collaboratorId}${URL.payrollItems}`);
    dispatch({
      type: GET_ONE,
      payload: response.data.payroll_items_salaries,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_ONE_ERROR);
  }
};

export const create = async (data) => {
  try {
    const response = await configAxios.post(URL.main, data);
    return response.data.benefit;
  } catch (error) {
    return error;
  }
};
