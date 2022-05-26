import {
  RESET_STATE,
  GET_LIST,
  GET_FOLLOW_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_ONE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
  RESET_STATE_PROCESS_SURVEY_PROCESSES,
  PROCESS_SURVEY_PROCESSES,
  PROCESS_SURVEY_PROCESSES_LOADING,
  PROCESS_SURVEY_PROCESSES_ERROR,
  RESET_STATE_PERFORMANCE_EVOLUTION,
  GET_LIST_PERFORMANCE_EVOLUTION,
  GET_LIST_PERFORMANCE_EVOLUTION_LOADING,
  GET_LIST_PERFORMANCE_EVOLUTION_ERROR,
  RESET_STATE_COLLABORATOR_PERFORMANCE_EVOLUTION,
  GET_COLLABORATOR_PERFORMANCE_EVOLUTION,
  GET_COLLABORATOR_PERFORMANCE_EVOLUTION_LOADING,
  GET_COLLABORATOR_PERFORMANCE_EVOLUTION_ERROR,
  RESET_STATE_GOOD_LEADER_EVOLUTION,
  GET_LIST_GOOD_LEADER_EVOLUTION,
  GET_LIST_GOOD_LEADER_EVOLUTION_LOADING,
  GET_LIST_GOOD_LEADER_EVOLUTION_ERROR,
  RESET_STATE_EVALUATION,
  GET_LIST_LOADING_EVALUATION,
  GET_LIST_EVALUATION,
  GET_LIST_ERROR_EVALUATION,
  RESET_STATE_ONE_EVALUATION,
  GET_ONE_LOADING_EVALUATION,
  GET_ONE_EVALUATION,
  GET_ONE_ERROR_EVALUATION,
} from "../actionTypes/surveyProcesses";

const INITIAL_STATE = {
  list: null,
  followList: null,
  loadingList: false,
  errorlist: null,

  one: null,
  loadingOne: false,
  errorOne: null,

  successProcess: null,
  loadingProcess: false,
  errorProcess: null,

  performanceEvolution: null,
  loadingPerformanceEvolution: false,
  errorPerformanceEvolution: null,

  collaboratorPerformanceEvolution: null,
  loadingCollaboratorPerformanceEvolution: false,
  errorCollaboratorPerformanceEvolution: null,

  goodLeaderEvolution: null,
  isLoadingGoodLeaderEvolution: false,
  errorGoodLeaderEvolution: null,

  evaluations: null,
  isLoadingEvaluations: false,
  errorEvaluations: null,

  evaluation: null,
  isLoadingEvaluation: false,
  errorEvaluation: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE:
    return {
      ...state,
      loadingList: false,
      errorList: null,
      list: null,
      followList: null,
    };
  case GET_LIST:
    return {
      ...state,
      list: action.payload,
      loadingList: false,
      errorList: "",
    };
  case GET_LIST_LOADING:
    return {
      ...state,
      list: null,
      followList: null,
      loadingList: true,
      errorList: "",
    };
  case GET_LIST_ERROR:
    return {
      ...state,
      loadingList: false,
      errorList: action.payload,
    };
  case GET_FOLLOW_LIST:
    return {
      ...state,
      followList: action.payload,
      loadingList: false,
      errorList: "",
    };
  case RESET_STATE_ONE:
    return {
      ...state,
      loadingOne: false,
      errorOne: null,
      one: null,
    };
  case GET_ONE:
    return {
      ...state,
      one: action.payload,
      loadingOne: false,
      errorOne: "",
    };
  case GET_ONE_LOADING:
    return {
      ...state,
      one: null,
      loadingOne: true,
      errorOne: "",
    };
  case GET_ONE_ERROR:
    return {
      ...state,
      loadingOne: false,
      errorOne: action.payload,
    };
  case RESET_STATE_PROCESS_SURVEY_PROCESSES:
    return {
      ...state,
      loadingProcess: false,
      errorProcess: null,
      successProcess: null,
    };
  case PROCESS_SURVEY_PROCESSES:
    return {
      ...state,
      successProcess: action.payload,
      loadingProcess: false,
      errorProcess: "",
    };
  case PROCESS_SURVEY_PROCESSES_LOADING:
    return {
      ...state,
      successProcess: null,
      loadingProcess: true,
      errorProcess: "",
    };
  case PROCESS_SURVEY_PROCESSES_ERROR:
    return {
      ...state,
      loadingProcess: false,
      errorProcess: action.payload,
    };
  case RESET_STATE_PERFORMANCE_EVOLUTION:
    return {
      ...state,
      loadingPerformanceEvolution: false,
      errorPerformanceEvolution: null,
      performanceEvolution: null,
    };
  case GET_LIST_PERFORMANCE_EVOLUTION:
    return {
      ...state,
      performanceEvolution: action.payload,
      loadingPerformanceEvolution: false,
      errorPerformanceEvolution: "",
    };
  case GET_LIST_PERFORMANCE_EVOLUTION_LOADING:
    return {
      ...state,
      performanceEvolution: null,
      loadingPerformanceEvolution: true,
      errorPerformanceEvolution: "",
    };
  case GET_LIST_PERFORMANCE_EVOLUTION_ERROR:
    return {
      ...state,
      loadingPerformanceEvolution: false,
      errorPerformanceEvolution: action.payload,
    };
  case RESET_STATE_COLLABORATOR_PERFORMANCE_EVOLUTION:
    return {
      ...state,
      loadingCollaboratorPerformanceEvolution: false,
      errorCollaboratorPerformanceEvolution: null,
      collaboratorPerformanceEvolution: null,
    };
  case GET_COLLABORATOR_PERFORMANCE_EVOLUTION:
    return {
      ...state,
      collaboratorPerformanceEvolution: action.payload,
      loadingCollaboratorPerformanceEvolution: false,
      errorCollaboratorPerformanceEvolution: "",
    };
  case GET_COLLABORATOR_PERFORMANCE_EVOLUTION_LOADING:
    return {
      ...state,
      collaboratorPerformanceEvolution: null,
      loadingCollaboratorPerformanceEvolution: true,
      errorCollaboratorPerformanceEvolution: "",
    };
  case GET_COLLABORATOR_PERFORMANCE_EVOLUTION_ERROR:
    return {
      ...state,
      loadingCollaboratorPerformanceEvolution: false,
      errorCollaboratorPerformanceEvolution: action.payload,
    };
  case RESET_STATE_GOOD_LEADER_EVOLUTION:
    return {
      ...state,
      isLoadingGoodLeaderEvolution: false,
      errorGoodLeaderEvolution: null,
      goodLeaderEvolution: null,
    };
  case GET_LIST_GOOD_LEADER_EVOLUTION:
    return {
      ...state,
      goodLeaderEvolution: action.payload,
      isLoadingGoodLeaderEvolution: false,
      errorGoodLeaderEvolution: "",
    };
  case GET_LIST_GOOD_LEADER_EVOLUTION_LOADING:
    return {
      ...state,
      goodLeaderEvolution: null,
      isLoadingGoodLeaderEvolution: true,
      errorGoodLeaderEvolution: "",
    };
  case GET_LIST_GOOD_LEADER_EVOLUTION_ERROR:
    return {
      ...state,
      isLoadingGoodLeaderEvolution: false,
      errorGoodLeaderEvolution: action.payload,
    };
  case RESET_STATE_EVALUATION:
    return {
      ...state,
      isLoadingEvaluations: false,
      errorEvaluations: null,
      evaluations: null,
    };
  case GET_LIST_EVALUATION:
    return {
      ...state,
      evaluations: action.payload,
      isLoadingEvaluations: false,
      errorEvaluations: "",
    };
  case GET_LIST_LOADING_EVALUATION:
    return {
      ...state,
      evaluations: null,
      isLoadingEvaluations: true,
      errorEvaluations: "",
    };
  case GET_LIST_ERROR_EVALUATION:
    return {
      ...state,
      isLoadingEvaluations: false,
      errorEvaluations: action.payload,
    };
  case RESET_STATE_ONE_EVALUATION:
    return {
      ...state,
      isLoadingEvaluation: false,
      errorEvaluation: null,
      evaluation: null,
    };
  case GET_ONE_EVALUATION:
    return {
      ...state,
      evaluation: action.payload,
      isLoadingEvaluation: false,
      errorEvaluation: "",
    };
  case GET_ONE_LOADING_EVALUATION:
    return {
      ...state,
      evaluation: null,
      isLoadingEvaluation: true,
      errorEvaluation: "",
    };
  case GET_ONE_ERROR_EVALUATION:
    return {
      ...state,
      isLoadingEvaluation: false,
      errorEvaluation: action.payload,
    };
  default:
    return state;
  }
};
