import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_PROCESS_LEGAL_ENTITY,
  PROCESS_LEGAL_ENTITY,
  PROCESS_LEGAL_ENTITY_LOADING,
  PROCESS_LEGAL_ENTITY_ERROR,
} from "../../actionTypes/common/legalEntity";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorlist: "",

  successProcessLegalEntity: null,
  isLoadingProcessLegalEntity: false,
  errorProcessLegalEntity: null,
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
  case RESET_PROCESS_LEGAL_ENTITY:
    return {
      ...state,
      isLoadingProcessLegalEntity: false,
      successProcessLegalEntity: null,
      errorProcessLegalEntity: null,
    };
  case PROCESS_LEGAL_ENTITY:
    return {
      ...state,
      isLoadingProcessLegalEntity: false,
      errorProcessLegalEntity: null,
      successProcessLegalEntity: action.payload,
    };
  case PROCESS_LEGAL_ENTITY_LOADING:
    return {
      ...state,
      isLoadingProcessLegalEntity: true,
      errorProcessLegalEntity: null,
      successProcessLegalEntity: null,
    };
  case PROCESS_LEGAL_ENTITY_ERROR:
    return {
      ...state,
      errorProcessLegalEntity: action.payload,
      isLoadingProcessLegalEntity: false,
    };
  default:
    return state;
  }
};
