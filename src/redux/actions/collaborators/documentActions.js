import isEmpty from "lodash/isEmpty";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_PROCESS_DOCUMENT,
  PROCESS_DOCUMENT_LOADING,
  PROCESS_DOCUMENT,
  PROCESS_DOCUMENT_ERROR,
} from "../../actionTypes/collaborator/document";

const URL = {
  main: "/collaborators",
  requestedDocuments: "requested_documents",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = (collaboratorId) => async (dispatch, getState) => {
  const { list, collaboratorSelected } = getState().collaboratorDocumentReducer;

  if (!list || collaboratorSelected !== collaboratorId) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(`${URL.main}/${collaboratorId}/${URL.requestedDocuments}`);
      dispatch({
        type: GET_LIST,
        payload: response.data.requested_documents,
        collaboratorSelected: collaboratorId,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_PROCESS_DOCUMENT,
  });
};

export const create = (data, documentTypeId, collaboratorId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("requested_document[file]", data);
  formData.append("requested_document[document_type_id]", documentTypeId);
  dispatch({
    type: PROCESS_DOCUMENT_LOADING,
  });
  try {
    const response = await configAxios.post(`${URL.main}/${collaboratorId}/${URL.requestedDocuments}`, formData);
    dispatch({
      type: PROCESS_DOCUMENT,
      payload: response.data.requested_document,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DOCUMENT_ERROR);
  }
};

export const update = (data, documentId) => async (dispatch) => {
  dispatch({
    type: PROCESS_DOCUMENT_LOADING,
  });
  try {
    const response = await configAxios.put(`/${URL.requestedDocuments}/${documentId}`, data);
    dispatch({
      type: PROCESS_DOCUMENT,
      payload: response.data.requested_document,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DOCUMENT_ERROR);
  }
};

export const deleteItem = (documentId) => async (dispatch) => {
  dispatch({
    type: PROCESS_DOCUMENT_LOADING,
  });
  try {
    const response = await configAxios.delete(`/${URL.requestedDocuments}/${documentId}`);
    dispatch({
      type: PROCESS_DOCUMENT,
      payload: isEmpty(response.data),
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_DOCUMENT_ERROR);
  }
};
