import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_POST_INFO,
  POST_INFO_LOADING,
  POST_INFO,
  POST_INFO_ERROR,
} from "../actionTypes/infoTypes";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",

  newInfo: null,
  isLoadingNewInfo: false,
  errorNewInfo: null,
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
  case RESET_STATE_POST_INFO:
    return {
      ...state,
      newInfo: null,
      isLoadingNewInfo: false,
      errorNewInfo: null,
    };
  case POST_INFO_LOADING:
    return {
      ...state,
      isLoadingNewInfo: true,
      newInfo: null,
      errorNewInfo: null,
    };
  case POST_INFO:
    return {
      ...state,
      isLoadingNewInfo: false,
      newInfo: action.payload,
      errorNewInfo: null,
    };
  case POST_INFO_ERROR:
    return {
      ...state,
      isLoadingNewInfo: false,
      errorNewInfo: action.payload,
    };
  default:
    return state;
  }
};
