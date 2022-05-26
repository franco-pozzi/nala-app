import {
  RESET_STATE,
  GET_LIST,
  GET_MAIN_LIST,
  GET_MANAGERS_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_SEARCH,
  GET_LIST_SEARCH,
  GET_LIST_SEARCH_LOADING,
  GET_LIST_SEARCH_ERROR,
  RESET_STATE_COLLABORATOR,
  RESET_CHILDRENS_STATE,
  GET_CHILDRENS_LIST,
  GET_CHILDRENS_LIST_LOADING,
  GET_CHILDRENS_LIST_ERROR,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
  RESET_STATE_ORG_CHART,
  GET_LIST_ORG_CHART,
  GET_LIST_ORG_CHART_LOADING,
  GET_LIST_ORG_CHART_ERROR,
  PROCCESS_COLLABORATOR,
  PROCCESS_COLLABORATOR_LOADING,
  PROCCESS_COLLABORATOR_ERROR,
  RESET_STATE_COLLABORATOR_PROCCESS,
  RESET_STATE_COLLABORATORS_TO_DOWNLOAD,
  GET_LIST_COLLABORATORS_TO_DOWNLOAD,
  GET_LIST_COLLABORATORS_TO_DOWNLOAD_LOADING,
  GET_LIST_COLLABORATORS_TO_DOWNLOAD_ERROR,
} from "../actionTypes/collaborator";

const INITIAL_STATE = {
  mainList: null,
  managersList: null,

  list: null,
  listTotal: 0,
  isLoadinglist: false,
  errorlist: "",

  searchList: null,
  isLoadingSearchList: false,
  errorSearchList: "",

  childrenList: null,
  isLoadingChildrenList: false,
  errorChildrenList: "",

  one: null,
  isLoadingOne: false,
  errorOne: "",
  orgChartList: [],
  isLoadingOrgChartList: false,
  errorOrgChartList: "",

  isLoadingProcess: false,
  successProcess: null,
  errorProcess: null,

  downloadList: null,
  isLoadingDownloadList: false,
  errorDownloadList: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      isLoadingList: false,
      errorList: null,
      list: null,
      listTotal: 0,
      mainList: null,
      managersList: null,
      isLoadingProcess: false,
      successProcess: null,
      errorProcess: null,
    };
  case RESET_STATE_COLLABORATOR:
    return {
      ...state,
      isLoadingOne: false,
      errorOne: null,
      one: null,
    };
  case RESET_STATE_ORG_CHART:
    return {
      ...state,
      isLoadingOrgChartList: false,
      errorOrgChartList: null,
      orgChartList: [],
    };
  case RESET_STATE_COLLABORATOR_PROCCESS:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: null,
      successProcess: null,
    };
  case RESET_STATE_COLLABORATORS_TO_DOWNLOAD:
    return {
      ...state,
      downloadList: null,
      isLoadingDownloadList: false,
      errorDownloadList: "",
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      listTotal: action.total,
      isLoadingList: false,
      errorList: "",
    };
  case GET_MAIN_LIST:
    return {
      ...state,
      mainList: action.payload,
      isLoadingList: false,
      errorList: "",
    };
  case GET_MANAGERS_LIST:
    return {
      ...state,
      managersList: action.payload,
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
  case RESET_STATE_SEARCH:
    return {
      ...state,
      isLoadingSearchList: false,
      errorSearchList: null,
      searchList: null,
    };
  case GET_LIST_SEARCH:
    return {
      ...state,
      searchList: action.payload,
      isLoadingSearchList: false,
      errorSearchList: "",
    };
  case GET_LIST_SEARCH_LOADING:
    return {
      ...state,
      searchList: null,
      isLoadingSearchList: true,
      errorSearchList: "",
    };
  case GET_LIST_SEARCH_ERROR:
    return {
      ...state,
      isLoadingSearchList: false,
      errorSearchList: action.payload,
    };
  case RESET_CHILDRENS_STATE:
    return {
      ...state,
      childrenList: null,
      isLoadingChildrenList: false,
      errorChildrenList: null,
    };
  case GET_CHILDRENS_LIST:
    return {
      ...state,
      childrenList: action.payload,
      isLoadingChildrenList: false,
      errorChildrenList: "",
    };
  case GET_CHILDRENS_LIST_LOADING:
    return {
      ...state,
      isLoadingChildrenList: true,
      errorChildrenList: "",
    };
  case GET_CHILDRENS_LIST_ERROR:
    return {
      ...state,
      isLoadingChildrenList: false,
      errorChildrenList: action.payload,
    };
  case GET_ONE:
    return {
      ...state,
      one: action.payload,
      isLoadingOne: false,
      errorOne: "",
    };
  case GET_ONE_LOADING:
    return {
      ...state,
      one: null,
      isLoadingOne: true,
      errorOne: "",
    };
  case GET_ONE_ERROR:
    return {
      ...state,
      isLoadingOne: false,
      errorOne: action.payload,
    };
  case GET_LIST_ORG_CHART:
    return {
      ...state,
      orgChartList: action.payload,
      isLoadingOrgChartList: false,
      errorOrgChartList: "",
    };
  case GET_LIST_ORG_CHART_LOADING:
    return {
      ...state,
      orgChartList: [],
      isLoadingOrgChartList: true,
      errorOrgChartList: "",
    };
  case GET_LIST_ORG_CHART_ERROR:
    return {
      ...state,
      isLoadingOrgChartList: false,
      errorOrgChartList: action.payload,
    };
  case PROCCESS_COLLABORATOR_LOADING:
    return {
      ...state,
      isLoadingProcess: true,
    };
  case PROCCESS_COLLABORATOR:
    return {
      ...state,
      isLoadingProcess: false,
      successProcess: action.payload,
    };
  case PROCCESS_COLLABORATOR_ERROR:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: action.payload,
    };
  case GET_LIST_COLLABORATORS_TO_DOWNLOAD_LOADING:
    return {
      ...state,
      isLoadingDownloadList: true,
    };
  case GET_LIST_COLLABORATORS_TO_DOWNLOAD:
    return {
      ...state,
      isLoadingDownloadList: false,
      downloadList: action.payload,
    };
  case GET_LIST_COLLABORATORS_TO_DOWNLOAD_ERROR:
    return {
      ...state,
      isLoadingDownloadList: false,
      errorDownloadList: action.payload,
    };
  default:
    return state;
  }
};
