import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_HIERARCHY_LEVEL,
  PROCESS_HIERARCHY_LEVEL,
  PROCESS_HIERARCHY_LEVEL_LOADING,
  PROCESS_HIERARCHY_LEVEL_ERROR,
} from "../../actionTypes/common/hierarchyLevel";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorlist: "",

  successProcessHierarchyLevel: null,
  isLoadingProcessHierarchyLevel: false,
  errorProcessHierarchyLevel: null,
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
  case RESET_PROCESS_HIERARCHY_LEVEL:
    return {
      ...state,
      isLoadingProcessHierarchyLevel: false,
      successProcessHierarchyLevel: null,
      errorProcessHierarchyLevel: null,
    };
  case PROCESS_HIERARCHY_LEVEL:
    return {
      ...state,
      isLoadingProcessHierarchyLevel: false,
      errorProcessHierarchyLevel: null,
      successProcessHierarchyLevel: action.payload,
    };
  case PROCESS_HIERARCHY_LEVEL_LOADING:
    return {
      ...state,
      isLoadingProcessHierarchyLevel: true,
      errorProcessHierarchyLevel: null,
      successProcessHierarchyLevel: null,
    };
  case PROCESS_HIERARCHY_LEVEL_ERROR:
    return {
      ...state,
      errorProcessHierarchyLevel: action.payload,
      isLoadingProcessHierarchyLevel: false,
    };
  default:
    return state;
  }
};
