import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/common/manager";

const INITIAL_STATE = {
  list: [],
  loadinglist: false,
  errorlist: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      loadingList: false,
      errorList: null,
      list: [],
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
      list: [],
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
