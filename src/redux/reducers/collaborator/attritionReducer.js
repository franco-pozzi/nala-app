import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/collaborator/attrition";

const INITIAL_STATE = {
  list: null,
  loadingList: false,
  errorList: "",
  collaboratorSelected: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      loadingList: false,
      errorList: null,
      list: null,
      collaboratorSelected: null,
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      loadingList: false,
      errorList: "",
      collaboratorSelected: action.collaboratorSelected,
    };
  case GET_LIST_LOADING:
    return {
      ...state,
      list: null,
      loadingList: true,
      errorList: "",
      collaboratorSelected: null,
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
