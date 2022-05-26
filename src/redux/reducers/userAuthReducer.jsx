import {
  RESET_STATE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
} from "../actionTypes/signIn";

const INITIAL_STATE = {
  one: null,
  isLoading: false,
  errorlist: null,
  headers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      isLoading: false,
      errorList: null,
      one: null,
      headers: [],
    };
  case GET_ONE:
    return {
      ...state,
      one: action.payload,
      headers: action.headers,
      isLoading: false,
      errorList: null,
    };
  case GET_ONE_LOADING:
    return {
      ...state,
      one: null,
      isLoading: true,
      errorList: null,
    };
  case GET_ONE_ERROR:
    return {
      ...state,
      isLoading: false,
      errorList: action.payload,
    };
  default:
    return state;
  }
};
