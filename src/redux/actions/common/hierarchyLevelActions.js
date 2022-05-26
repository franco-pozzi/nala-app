import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_HIERARCHY_LEVEL,
  PROCESS_HIERARCHY_LEVEL,
  PROCESS_HIERARCHY_LEVEL_LOADING,
  PROCESS_HIERARCHY_LEVEL_ERROR,
} from "../../actionTypes/common/hierarchyLevel";

const URL = {
  main: "/hierarchy_levels",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_HIERARCHY_LEVEL,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().hierarchyLevelReducer;

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.hierarchy_levels,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({ type: PROCESS_HIERARCHY_LEVEL_LOADING });
  try {
    const response = await configAxios.post(URL.main, data);
    dispatch({
      type: PROCESS_HIERARCHY_LEVEL,
      payload: response.data.hierarchy_level,
    });
    return response.data.hierarchy_level;
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_HIERARCHY_LEVEL_ERROR);
  }
};
