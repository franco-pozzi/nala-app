import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,

  RESET_STATE_ONE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
} from "../../actionTypes/performance/surveyResults";

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
      loadingList: false,
      errorList: action.payload,
    };
  case RESET_STATE_ONE:
    return {
      ...state,
      isLoadingOne: false,
      errorOne: null,
      oneResult: null,
    };
  case GET_ONE:
    return {
      ...state,
      oneResult: action.payload,
      isLoadingOne: false,
      errorOne: "",
    };
  case GET_ONE_LOADING:
    return {
      ...state,
      oneResult: null,
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
