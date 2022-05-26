import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_DYNAMIC_ATTRIBUTE,
  PROCESS_DYNAMIC_ATTRIBUTE,
  PROCESS_DYNAMIC_ATTRIBUTE_LOADING,
  PROCESS_DYNAMIC_ATTRIBUTE_ERROR,
} from "../../actionTypes/common/dynamicAttribute";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorlist: "",

  successProcessDynamicAttribute: null,
  isLoadingProcessDynamicAttribute: false,
  errorProcessDynamicAttribute: null,
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
  case RESET_PROCESS_DYNAMIC_ATTRIBUTE:
    return {
      ...state,
      isLoadingProcessDynamicAttribute: false,
      successProcessDynamicAttribute: null,
      errorProcessDynamicAttribute: null,
    };
  case PROCESS_DYNAMIC_ATTRIBUTE:
    return {
      ...state,
      isLoadingProcessDynamicAttribute: false,
      errorProcessDynamicAttribute: null,
      successProcessDynamicAttribute: action.payload,
    };
  case PROCESS_DYNAMIC_ATTRIBUTE_LOADING:
    return {
      ...state,
      isLoadingProcessDynamicAttribute: true,
      errorProcessDynamicAttribute: null,
      successProcessDynamicAttribute: null,
    };
  case PROCESS_DYNAMIC_ATTRIBUTE_ERROR:
    return {
      ...state,
      errorProcessDynamicAttribute: action.payload,
      isLoadingProcessDynamicAttribute: false,
    };
  default:
    return state;
  }
};
