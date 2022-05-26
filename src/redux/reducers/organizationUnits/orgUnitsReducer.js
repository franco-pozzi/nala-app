import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,

  RESET_STATE_TREE,
  GET_LIST_TREE,
  GET_LIST_TREE_LOADING,
  GET_LIST_TREE_ERROR,
  
  PROCESS_ORG_UNITS,
  PROCESS_ORG_UNITS_LOADING,
  PROCESS_ORG_UNITS_ERROR,
} from "../../actionTypes/organizationUnits";

const INITIAL_STATE = {
  // main list
  list: null,
  isLoadingList: false,
  errorList: "",

  // org unit list all tree
  listTree: null,
  isLoadingListTree: false,
  errorListTree: "",

  // process
  isLoadingProcess: false,
  sucessProcess: null,
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
  case RESET_STATE_TREE:
    return {
      ...state,
      isLoadingListTree: false,
      errorListTree: null,
      listTree: null,
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
  case GET_LIST_TREE:
    return {
      ...state,
      listTree: action.payload,
      isLoadingListTree: false,
      errorListTree: "",
    };
  case GET_LIST_TREE_LOADING:
    return {
      ...state,
      lisTreet: null,
      isLoadingListTree: true,
      errorListTree: "",
    };
  case GET_LIST_TREE_ERROR:
    return {
      ...state,
      isLoadingListTree: false,
      errorListTree: action.payload,
    };
  case PROCESS_ORG_UNITS:
    return {
      ...state,
      sucessProcess: action.payload,
      isLoadingProcess: false,
      errorProcess: "",
    };
  case PROCESS_ORG_UNITS_LOADING:
    return {
      ...state,
      sucessProcess: null,
      isLoadingProcess: true,
      errorProcess: "",
    };
  case PROCESS_ORG_UNITS_ERROR:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: action.payload,
    };
  default:
    return state;
  }
};
