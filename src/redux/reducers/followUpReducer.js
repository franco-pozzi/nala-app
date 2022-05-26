import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../actionTypes/followUp";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorlist: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      isLoadingList: false,
      errorList: null,
      list: null,
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
  default:
    return state;
  }
};
