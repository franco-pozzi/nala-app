import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,

  RESET_STATE_TOP,
  GET_TOP_LIST,
  GET_TOP_LIST_LOADING,
  GET_TOP_LIST_ERROR,

  RESET_STATE_BOTTOM,
  GET_BOTTOM_LIST,
  GET_BOTTOM_LIST_LOADING,
  GET_BOTTOM_LIST_ERROR,

  RESET_STATE_SURVEY_RESULTS,
  GET_SURVEY_RESULTS_LIST,
  GET_SURVEY_RESULTS_LIST_LOADING,
  GET_SURVEY_RESULTS_LIST_ERROR,
} from "../../actionTypes/performance/goodLeader";

const INITIAL_STATE = {
  list: null,
  isLoadinglist: false,
  errorlist: "",

  topList: null,
  isLoadingTopList: false,
  errorTopList: "",

  bottomList: null,
  isLoadingBottomList: false,
  errorBottomList: "",

  surveyResults: null,
  loadingSurveyResults: false,
  errorSurveyResults: "",
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
  case RESET_STATE_TOP:
    return {
      ...state,
      isLoadingTopList: false,
      errorTopList: null,
      topList: null,
    };
  case RESET_STATE_BOTTOM:
    return {
      ...state,
      isLoadingBottomList: false,
      errorBottomList: null,
      bottomList: null,
    };
  case RESET_STATE_SURVEY_RESULTS:
    return {
      ...state,
      loadingSurveyResults: false,
      errorSurveyResults: null,
      surveyResults: null,
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
  case GET_TOP_LIST:
    return {
      ...state,
      topList: action.payload,
      isLoadingTopList: false,
      errorTopList: "",
    };
  case GET_TOP_LIST_LOADING:
    return {
      ...state,
      topList: null,
      isLoadingTopList: true,
      errorTopList: "",
    };
  case GET_TOP_LIST_ERROR:
    return {
      ...state,
      isLoadingTopList: false,
      errorTopList: action.payload,
    };
  case GET_BOTTOM_LIST:
    return {
      ...state,
      bottomList: action.payload,
      isLoadingBottomList: false,
      errorBottomList: "",
    };
  case GET_BOTTOM_LIST_LOADING:
    return {
      ...state,
      bottomList: null,
      isLoadingBottomList: true,
      errorBottomList: "",
    };
  case GET_BOTTOM_LIST_ERROR:
    return {
      ...state,
      isLoadingBottomList: false,
      errorBottomList: action.payload,
    };
  case GET_SURVEY_RESULTS_LIST:
    return {
      ...state,
      surveyResults: action.payload,
      loadingSurveyResults: false,
      errorsurveyResults: "",
    };
  case GET_SURVEY_RESULTS_LIST_LOADING:
    return {
      ...state,
      surveyResults: null,
      loadingSurveyResults: true,
      errorsurveyResults: "",
    };
  case GET_SURVEY_RESULTS_LIST_ERROR:
    return {
      ...state,
      loadingSurveyResults: false,
      errorSurveyResults: action.payload,
    };
  default:
    return state;
  }
};
