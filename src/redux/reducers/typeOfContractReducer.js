import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_CONTRACT_TYPE,
} from "../actionTypes/typeOfContract";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",

  successProcess: null,
  isLoadingProcess: false,
  errorProcess: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      list: null,
      isLoadingList: false,
      errorList: "",
    };
  case RESET_STATE_CONTRACT_TYPE:
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
