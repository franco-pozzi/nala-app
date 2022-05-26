import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_FEEDBACK,
  PROCESS_FEEDBACK,
  PROCESS_FEEDBACK_LOADING,
  PROCESS_FEEDBACK_ERROR,
} from "../actionTypes/acknowledgementTypes";

const INITIAL_STATE = {
  list: [],
  isLoadingList: false,
  errorList: "",
  isLoadingProcessFeedback: false,
  successProcessFeedback: null,
  errorProcessFeedback: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      isLoadingList: false,
      errorList: null,
      list: [],
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
      list: [],
      isLoadingList: true,
      errorList: "",
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      isLoadingList: false,
      errorList: action.payload,
    };
  case RESET_STATE_FEEDBACK:
    return {
      ...state,
      isLoadingProcessFeedback: false,
      errorProcessFeedback: null,
      successProcessFeedback: null,
    };
  case PROCESS_FEEDBACK:
    return {
      ...state,
      isLoadingProcessFeedback: false,
      errorProcessFeedback: null,
      successProcessFeedback: action.payload,
    };
  case PROCESS_FEEDBACK_LOADING:
    return {
      ...state,
      isLoadingProcessFeedback: true,
      errorProcessFeedback: null,
      successProcessFeedback: null,
    };
  case PROCESS_FEEDBACK_ERROR:
    return {
      ...state,
      errorProcessFeedback: action.payload,
      isLoadingProcessFeedback: false,
    };
  default:
    return state;
  }
};
