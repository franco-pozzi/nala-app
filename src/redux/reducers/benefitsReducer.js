import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
  RESET_STATE_ONE,
} from "../actionTypes/benefits";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",
  one: null,
  isLoadingOne: false,
  errorOne: "",
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
  case RESET_STATE_ONE:
    return {
      ...state,
      isLoadingOne: false,
      errorOne: null,
      one: null,
    };
  case GET_ONE:
    return {
      ...state,
      one: action.payload,
      isLoadingOne: false,
      errorOne: "",
    };
  case GET_ONE_LOADING:
    return {
      ...state,
      one: null,
      isLoadingOne: true,
      errorOne: "",
    };
  case GET_ONE_ERROR:
    return {
      ...state,
      isLoadingOne: false,
      errorOne: action.payload,
    };
  default:
    return state;
  }
};
