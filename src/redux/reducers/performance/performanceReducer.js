import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/performance";

const INITIAL_STATE = {
  list: null,
  loadingList: false,
  errorList: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      loadingList: false,
      errorList: null,
      list: null,
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      loadingList: false,
      errorList: "",
    };
  case GET_LIST_LOADING:
    return {
      ...state,
      list: null,
      loadingList: true,
      errorList: "",
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      loadingList: false,
      errorList: action.payload,
    };
  default:
    return state;
  }
};
