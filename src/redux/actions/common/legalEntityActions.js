import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_LEGAL_ENTITY,
  PROCESS_LEGAL_ENTITY,
  PROCESS_LEGAL_ENTITY_LOADING,
  PROCESS_LEGAL_ENTITY_ERROR,
} from "../../actionTypes/common/legalEntity";

const URL = {
  main: "/legal_entities",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_LEGAL_ENTITY,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().legalEntityReducer;

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.legal_entities,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({ type: PROCESS_LEGAL_ENTITY_LOADING });
  try {
    const response = await configAxios.post(URL.main, data);
    dispatch({
      type: PROCESS_LEGAL_ENTITY,
      payload: response.data.legal_entity,
    });
    return response.data.legal_entity;
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_LEGAL_ENTITY_ERROR);
  }
};
