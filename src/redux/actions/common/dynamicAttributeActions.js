import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_DYNAMIC_ATTRIBUTE,
  PROCESS_DYNAMIC_ATTRIBUTE,
  PROCESS_DYNAMIC_ATTRIBUTE_LOADING,
  PROCESS_DYNAMIC_ATTRIBUTE_ERROR,
} from "../../actionTypes/common/dynamicAttribute";

const URL = {
  main: "/dynamic_attributes",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_DYNAMIC_ATTRIBUTE,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().dynamicAttributeReducer;

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.dynamic_attributes,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({ type: PROCESS_DYNAMIC_ATTRIBUTE_LOADING });
  try {
    const response = await configAxios.post(URL.main, data);
    dispatch({
      type: PROCESS_DYNAMIC_ATTRIBUTE,
      payload: response.data.dynamic_attribute,
    });
    return response.data.dynamic_attribute;
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DYNAMIC_ATTRIBUTE_ERROR);
  }
};

export const update = (id, data) => async (dispatch) => {
  dispatch({ type: PROCESS_DYNAMIC_ATTRIBUTE_LOADING });
  try {
    const response = await configAxios.put(`${URL.main}/${id}`, data);
    dispatch({
      type: PROCESS_DYNAMIC_ATTRIBUTE,
      payload: response.data.dynamic_attribute,
    });
    return response.data.dynamic_attribute;
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DYNAMIC_ATTRIBUTE_ERROR);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  dispatch({ type: PROCESS_DYNAMIC_ATTRIBUTE_LOADING });
  try {
    const response = await configAxios.delete(`${URL.main}/${id}`);
    dispatch({
      type: PROCESS_DYNAMIC_ATTRIBUTE,
      payload: response.data.dynamic_attribute,
    });
    return response.data.dynamic_attribute;
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DYNAMIC_ATTRIBUTE_ERROR);
  }
};
