import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,

  RESET_PROCESS_CITY,
  PROCESS_CITY,
  PROCESS_CITY_LOADING,
  PROCESS_CITY_ERROR,
} from "../../actionTypes/common/city";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorlist: "",

  successProcess: null,
  isLoadingProcess: false,
  errorProcess: null,
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
  case RESET_PROCESS_CITY:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: null,
      successProcess: null,
    };
  case PROCESS_CITY:
    return {
      ...state,
      successProcess: action.payload,
      isLoadingProcess: false,
      errorProcess: "",
    };
  case PROCESS_CITY_LOADING:
    return {
      ...state,
      successProcess: null,
      isLoadingProcess: true,
      errorProcess: "",
    };
  case PROCESS_CITY_ERROR:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: action.payload,
    };
  default:
    return state;
  }
};
