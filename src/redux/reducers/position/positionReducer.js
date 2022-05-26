import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  PROCESS_POSITION,
  PROCESS_POSITION_LOADING,
  PROCESS_POSITION_ERROR,
} from "../../actionTypes/position";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",
  isLoadingProcessPosition: false,
  successProcessPosition: null,
  errorProcessPosition: null,
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
      isLoadingList: true,
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      isLoadingList: false,
      errorList: action.payload,
    };
  case PROCESS_POSITION:
    return {
      ...state,
      isLoadingProcessPosition: false,
      errorProcessPosition: null,
      successProcessPosition: action.payload,
    };
  case PROCESS_POSITION_LOADING:
    return {
      ...state,
      isLoadingProcessPosition: true,
      errorProcessPosition: null,
      successProcessPosition: null,
    };
  case PROCESS_POSITION_ERROR:
    return {
      ...state,
      errorProcessPosition: action.payload,
      isLoadingProcessPosition: false,
    };
  default:
    return state;
  }
};
