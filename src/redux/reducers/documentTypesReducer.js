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

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",

  newDocument: null,
  isLoadingNewDocument: false,
  errorNewDocument: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      isLoadingList: false,
      errorList: null,
      list: null
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      isLoadingList: false,
      errorList: "",
    };
  case GET_LIST_LOADING:
    return {
      ...state,
      list: null,
      isLoadingList: true,
      errorList: "",
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      isLoadingList: false,
      errorList: action.payload,
    };
  case RESET_STATE_POST_DOCUMENT:
    return {
      ...state,
      newDocument: null,
      isLoadingNewDocument: false,
      errorNewDocument: null,
    };
  case POST_DOCUMENT_LOADING:
    return {
      ...state,
      isLoadingNewDocument: true,
      newDocument: null,
      errorNewDocument: null,
    };
  case POST_DOCUMENT:
    return {
      ...state,
      isLoadingNewDocument: false,
      newDocument: action.payload,
      errorNewDocument: null,
    };
  case POST_DOCUMENT_ERROR:
    return {
      ...state,
      isLoadingNewDocument: false,
      errorNewDocument: action.payload,
    };
  default:
    return state;
  }
};
