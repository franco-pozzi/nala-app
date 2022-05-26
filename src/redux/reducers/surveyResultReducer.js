import {
  RESET_STATE_SURVEY_RESULTS,
  GET_LIST_SURVEY_RESULTS,
  GET_LIST_LOADING_SURVEY_RESULTS,
  GET_LIST_ERROR_SURVEY_RESULTS,
} from "../actionTypes/surveyProcesses";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE_SURVEY_RESULTS:
    return {
      ...state,
      isLoadingList: false,
      errorList: "",
      list: null,
    };
  case GET_LIST_SURVEY_RESULTS:
    return {
      ...state,
      list: action.payload,
      isLoadingList: false,
      errorList: "",
    };
  case GET_LIST_LOADING_SURVEY_RESULTS:
    return {
      ...state,
      list: null,
      isLoadingList: true,
      errorList: "",
    };
  case GET_LIST_ERROR_SURVEY_RESULTS:
    return {
      ...state,
      isLoadingList: false,
      errorList: action.payload,
    };
  default:
    return state;
  }
};
