import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_POST_DOCUMENT,
  POST_DOCUMENT_LOADING,
  POST_DOCUMENT,
  POST_DOCUMENT_ERROR,
} from "../actionTypes/documentTypes";

const URL = {
  main: "/document_types",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_POST_DOCUMENT,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().documentTypesReducer;

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.document_types,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const create = (document) => async (dispatch, getState) => {
  const { newDocument } = getState().documentTypesReducer;

  if (!newDocument) {
    dispatch({
      type: POST_DOCUMENT_LOADING,
    });
    try {
      const response = await configAxios.post(URL.main, document);
      dispatch({
        type: POST_DOCUMENT,
        payload: response.data,
      });
      return response.data.document_type;
    } catch (error) {
      errorHandler(error, dispatch, POST_DOCUMENT_ERROR);
    }
  }
};
