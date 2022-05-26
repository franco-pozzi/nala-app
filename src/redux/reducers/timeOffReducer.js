import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  GET_LIST_TIME_OFF,
  GET_LIST_TIME_OFF_ERROR,
  GET_LIST_TIME_OFF_LOADING,
  RESET_TIME_OFF,
  RESET_TEAM,
  GET_TEAM_LIST,
  GET_TEAM_LIST_ERROR,
  GET_TEAM_LIST_LOADING,
  RESET_ONE,
  GET_ONE_LIST,
  GET_ONE_LIST_ERROR,
  GET_ONE_LIST_LOADING,
  RESET_STATE_EXCEL,
  GET_LIST_EXCEL,
  GET_LIST_EXCEL_LOADING,
  GET_LIST_EXCEL_ERROR,
  RESET_PROCESS_TIME_OFF,
  PROCESS_TIME_OFF,
  PROCESS_TIME_OFF_ERROR,
  PROCESS_TIME_OFF_LOADING,
} from "../actionTypes/timeOff";

const INITIAL_STATE = {
  timeOffList: null,
  timeOffListTotal: 0,
  timeOffLoadingList: false,
  timeOffErrorList: "",
  list: null,
  isLoadingList: false,
  errorList: "",
  teamList: null,
  isLoadingTeamList: false,
  errorTeamList: "",
  oneList: null,
  oneListTotal: 0,
  isLoadingOneList: false,
  errorOneList: "",
  excelList: null,
  isLoadingExcelList: false,
  errorExcelList: "",
  isLoadingProcess: false,
  sucessProcess: null,
  errorProcess: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_TIME_OFF:
    return {
      ...state,
      timeOffLoadingList: false,
      timeOffErrorList: null,
      timeOffList: null,
    };
  case GET_LIST_TIME_OFF:
    return {
      ...state,
      timeOffList: action.payload,
      timeOffListTotal: action.total,
      timeOffLoadingList: false,
      timeOffErrorList: "",
    };
  case GET_LIST_TIME_OFF_LOADING:
    return {
      ...state,
      timeOffList: null,
      timeOffLoadingList: true,
      timeOffErrorList: "",
    };
  case GET_LIST_TIME_OFF_ERROR:
    return {
      ...state,
      timeOffLoadingList: false,
      timeOffErrorList: action.payload,
    };
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
  case RESET_TEAM:
    return {
      ...state,
      isLoadingTeamList: false,
      errorTeamList: null,
      teamList: null,
    };
  case GET_TEAM_LIST:
    return {
      ...state,
      teamList: action.payload,
      isLoadingTeamList: false,
      errorList: "",
    };
  case GET_TEAM_LIST_LOADING:
    return {
      ...state,
      teamList: null,
      isLoadingTeamList: true,
      errorTeamList: "",
    };
  case GET_TEAM_LIST_ERROR:
    return {
      ...state,
      isLoadingTeamList: false,
      errorTeamList: action.payload,
    };
  case RESET_ONE:
    return {
      ...state,
      isLoadingOneList: false,
      errorOneList: null,
      oneList: null,
    };
  case GET_ONE_LIST:
    return {
      ...state,
      oneList: action.payload,
      oneListTotal: action.total,
      isLoadingOneList: false,
      errorOneList: "",
    };
  case GET_ONE_LIST_LOADING:
    return {
      ...state,
      oneList: null,
      isLoadingOneList: true,
      errorOneList: "",
    };
  case GET_ONE_LIST_ERROR:
    return {
      ...state,
      isLoadingOneList: false,
      errorOneList: action.payload,
    };
  case RESET_STATE_EXCEL:
    return {
      ...state,
      isLoadingExcelList: false,
      errorExcelList: null,
      excelList: null,
    };
  case GET_LIST_EXCEL:
    return {
      ...state,
      excelList: action.payload,
      isLoadingExcelList: false,
      errorExcelList: "",
    };
  case GET_LIST_EXCEL_LOADING:
    return {
      ...state,
      excelList: null,
      isLoadingExcelList: true,
      errorExcelList: "",
    };
  case GET_LIST_EXCEL_ERROR:
    return {
      ...state,
      isLoadingExcelList: false,
      errorExcelList: action.payload,
    };
  case RESET_PROCESS_TIME_OFF:
    return {
      ...state,
      isLoadingProcess: false,
      sucessProcess: null,
      errorProcess: null,
    };
  case PROCESS_TIME_OFF_LOADING:
    return {
      ...state,
      isLoadingProcess: true,
      sucessProcess: null,
      errorProcess: null,
    };
  case PROCESS_TIME_OFF:
    return {
      ...state,
      isLoadingProcess: false,
      sucessProcess: action.payload,
    };
  case PROCESS_TIME_OFF_ERROR:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: action.payload,
    };
  default:
    return state;
  }
};
