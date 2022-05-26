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

const INITIAL_STATE = {
  list: null,
  loadingList: false,
  errorList: "",
  isLoadingProcess: false,
  successProcess: null,
  errorProcess: null,
  collaboratorSelected: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      loadingList: false,
      errorList: null,
      list: null,
      collaboratorSelected: null,
    };
  case RESET_STATE_PROCESS_DOCUMENT:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: null,
      successProcess: null,
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      loadingList: false,
      errorList: "",
      collaboratorSelected: action.collaboratorSelected,
    };
  case GET_LIST_LOADING:
    return {
      ...state,
      list: null,
      loadingList: true,
      errorList: "",
      collaboratorSelected: null,
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      loadingList: false,
      errorList: action.payload,
    };
  case PROCESS_DOCUMENT:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: null,
      successProcess: action.payload,
    };
  case PROCESS_DOCUMENT_LOADING:
    return {
      ...state,
      isLoadingProcess: true,
      errorProcess: null,
      successProcess: null,
    };
  case PROCESS_DOCUMENT_ERROR:
    return {
      ...state,
      errorProcess: action.payload,
      isLoadingProcess: false,
    };
  default:
    return state;
  }
};
