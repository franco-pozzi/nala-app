import qs from "qs";
import isEmpty from "lodash/isEmpty";
import {
  LOCAL_STORAGE_NAMES,
  OBJECT_KEYS,
  SURVEY_PROCESS_TYPE,
  PARAMS_SERIALIZER_OPTIONS,
  METHODS,
  INDEX,
} from "common/constants";
import {
  getItemFromLocalStorage, getUserId, getEmployeeId, isAdmin as isAdminFunction,
} from "common/utils";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
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
  GET_LIST_PERFORMANCE_EVOLUTION_LOADING,
  GET_LIST_PERFORMANCE_EVOLUTION,
  GET_LIST_PERFORMANCE_EVOLUTION_ERROR,

  RESET_STATE_GOOD_LEADER_EVOLUTION,
  GET_LIST_GOOD_LEADER_EVOLUTION_LOADING,
  GET_LIST_GOOD_LEADER_EVOLUTION,
  GET_LIST_GOOD_LEADER_EVOLUTION_ERROR,

  RESET_STATE_SURVEY_RESULTS,
  GET_LIST_SURVEY_RESULTS,
  GET_LIST_LOADING_SURVEY_RESULTS,
  GET_LIST_ERROR_SURVEY_RESULTS,

  RESET_STATE_EVALUATION,
  GET_LIST_LOADING_EVALUATION,
  GET_LIST_EVALUATION,
  GET_LIST_ERROR_EVALUATION,

  RESET_STATE_ONE_EVALUATION,
  GET_ONE_LOADING_EVALUATION,
  GET_ONE_EVALUATION,
  GET_ONE_ERROR_EVALUATION,
} from "../actionTypes/surveyProcesses";

const URL = {
  main: "/survey_processes",
  evolution: "evolution",
  surveyResults: "survey_results",
  userIdParam: "user_id=",
  sendProcess: "send_process",
  sendProcessReminder: "send_process_reminder",
  evaluations: "evaluations",
  evaluationResults: "evaluation_results",
  evaluationAnswers: "save_evaluation_answers",
  resultsByEvaluationType: "results_by_evaluation_type",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_PROCESS_SURVEY_PROCESSES,
  });
};

export const resetStateOne = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_ONE,
  });
};

export const resetStateEvaluations = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_EVALUATION,
  });
};

export const resetStateEvaluation = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_ONE_EVALUATION,
  });
};

export const getList = (followUpFilter = "") => async (dispatch, getState) => {
  const { list } = getState().surveysReducer;
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const isAdmin = isAdminFunction(user.userCookies);

  const employeeIdParam = !isAdmin ? { [OBJECT_KEYS.employeeId]: getEmployeeId(user) } : {};

  const query = {
    q: {
      follow_up_process_id_not_null: followUpFilter,
    },
  };

  if (!list?.length) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main, {
        params: {
          ...employeeIdParam,
          ...query,
        },
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });
      dispatch({
        type: !followUpFilter ? GET_LIST : GET_FOLLOW_LIST,
        payload: response.data.survey_processes,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const getSurveyProcessByUser = (employeeId, followUpFilter) => async () => {
  const query = {
    q: {
      follow_up_process_id_not_null: followUpFilter,
    },
  };

  try {
    const response = await configAxios.get(URL.main, {
      params: {
        [OBJECT_KEYS.employeeId]: employeeId,
        ...query,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return response.data.survey_processes.filter((item) => item.process_detail);
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getEvaluationResultBySurveyProcessId = (surveyProcessId) => async () => {
  try {
    const EVALUATION_RESULT_URL = `${URL.main}/${surveyProcessId}/${URL.evaluationResults}`;
    const response = await configAxios.get(EVALUATION_RESULT_URL);
    return response.data.evaluation_results;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getOne = (processType, processId) => async (dispatch, getState) => {
  const { one } = getState().surveysReducer;
  const SURVEY_PROCESS_URL = `${processType}/${processId}`;

  if (!one?.length) {
    dispatch({
      type: GET_ONE_LOADING,
    });
    try {
      const response = await configAxios.get(SURVEY_PROCESS_URL);
      dispatch({
        type: GET_ONE,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_ONE_ERROR);
    }
  }
};

export const createOrUpdate = (
  data,
  processType,
  processId,
) => async (dispatch, getState) => {
  const { successProcess } = getState().surveysReducer;
  const SURVEY_PROCESS_URL = `${processType}/${processId || ""}`;
  const configAxiosMethod = configAxios[processId ? METHODS.put : METHODS.post];

  if (!successProcess) {
    dispatch({
      type: PROCESS_SURVEY_PROCESSES_LOADING,
    });

    try {
      const response = await configAxiosMethod(SURVEY_PROCESS_URL, data);
      dispatch({
        type: PROCESS_SURVEY_PROCESSES,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
    }
  }
};

export const deleteItem = (
  processType,
  processId,
) => async (dispatch, getState) => {
  const { successProcess } = getState().surveysReducer;
  const SURVEY_PROCESS_URL = `${processType}/${processId}`;

  if (!successProcess) {
    dispatch({
      type: PROCESS_SURVEY_PROCESSES_LOADING,
    });

    try {
      const response = await configAxios.delete(SURVEY_PROCESS_URL);
      dispatch({
        type: PROCESS_SURVEY_PROCESSES,
        payload: isEmpty(response.data),
      });
    } catch (error) {
      errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
    }
  }
};

export const sendSurveyProcess = (processId, isReminder = false) => async (dispatch, getState) => {
  const { successProcess } = getState().surveysReducer;
  const SURVEY_PROCESS_URL = `${URL.main}/${processId}/${isReminder ? URL.sendProcessReminder : URL.sendProcess}`;

  if (!successProcess) {
    dispatch({
      type: PROCESS_SURVEY_PROCESSES_LOADING,
    });

    try {
      const response = await configAxios.post(SURVEY_PROCESS_URL);
      dispatch({
        type: PROCESS_SURVEY_PROCESSES,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
    }
  }
};

// performance evolution

export const resetStatePerformanceEvolution = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_PERFORMANCE_EVOLUTION,
  });
};

export const getPerformanceEvolution = (query) => async (dispatch) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));

  dispatch({
    type: GET_LIST_PERFORMANCE_EVOLUTION_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.main}/${URL.evolution}`, {
      params: {
        ...query,
        [OBJECT_KEYS.userId]: userId,
        [OBJECT_KEYS.type]: SURVEY_PROCESS_TYPE.performance.key,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });

    dispatch({
      type: GET_LIST_PERFORMANCE_EVOLUTION,
      payload: response.data.performance_processes,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_PERFORMANCE_EVOLUTION_ERROR);
  }
};

export const getCollaboratorPerformanceEvolution = (collaboratorId) => async (dispatch) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));

  const query = {
    q: {
      employee_id_eq: collaboratorId,
    },
  };

  dispatch({
    type: GET_LIST_PERFORMANCE_EVOLUTION_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.main}/${URL.evolution}`, {
      params: {
        ...query,
        [OBJECT_KEYS.userId]: userId,
        [OBJECT_KEYS.type]: SURVEY_PROCESS_TYPE.performance.key,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST_PERFORMANCE_EVOLUTION,
      payload: response.data.performance_processes,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_PERFORMANCE_EVOLUTION_ERROR);
  }
};

// survey results

export const resetStateSurveyResults = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_SURVEY_RESULTS,
  });
};

export const getSurveyResults = (processId, isEmptyFilter, query) => async (dispatch) => {
  let object = null;
  let dispatchRequest = true;
  if (isEmptyFilter) {
    object = query.q;
    dispatchRequest = Object.values(object).map((item) => !isEmpty(item));
  }

  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const SURVEY_RESULTS_URL = `${URL.main}/${processId}/${URL.surveyResults}`;
  dispatch({
    type: GET_LIST_LOADING_SURVEY_RESULTS,
  });
  try {
    let responseList = [];
    if (!isEmptyFilter || (isEmptyFilter && dispatchRequest.find((item) => item === true))) {
      const response = await configAxios.get(SURVEY_RESULTS_URL, {
        params: { ...query, [OBJECT_KEYS.userId]: userId },
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });

      responseList = response.data.survey_results;
    }

    dispatch({
      type: GET_LIST_SURVEY_RESULTS,
      payload: responseList,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR_SURVEY_RESULTS);
  }
};

// goodleader evolution

export const resetStateGoodLeaderEvolution = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_GOOD_LEADER_EVOLUTION,
  });
};

export const getGoodLeaderEvolution = () => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const { goodLeaderEvolution } = getState().surveysReducer;
  if (!goodLeaderEvolution) {
    dispatch({
      type: GET_LIST_GOOD_LEADER_EVOLUTION_LOADING,
    });
    try {
      const response = await configAxios.get(`${URL.main}/${URL.evolution}`, {
        params: {
          [OBJECT_KEYS.userId]: userId,
          [OBJECT_KEYS.type]: SURVEY_PROCESS_TYPE.goodLeader.key,
        },
      });

      dispatch({
        type: GET_LIST_GOOD_LEADER_EVOLUTION,
        payload: response.data.good_leader_processes,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_GOOD_LEADER_EVOLUTION_ERROR);
    }
  }
};

// evaluations
export const getEvaluationsByProcess = (processId) => async (dispatch) => {
  const SURVEY_PROCESS_EVALUATIONS_URL = `${URL.main}/${processId}/${URL.evaluations}`;

  dispatch({
    type: GET_LIST_LOADING_EVALUATION,
  });

  try {
    const response = await configAxios.get(SURVEY_PROCESS_EVALUATIONS_URL);

    const responseList = response.data.evaluations;

    dispatch({
      type: GET_LIST_EVALUATION,
      payload: responseList,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR_EVALUATION);
  }
};

export const getEvaluationById = (evaluationId) => async (dispatch) => {

  dispatch({
    type: GET_ONE_LOADING_EVALUATION,
  });

  try {
    const response = await configAxios.get(`${URL.evaluations}/${evaluationId}`);

    dispatch({
      type: GET_ONE_EVALUATION,
      payload: response.data.evaluation,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_ONE_ERROR_EVALUATION);
  }
};

export const saveEvaluationAnswers = (
  data,
  processId,
) => async (dispatch, getState) => {
  const { successProcess } = getState().surveysReducer;

  if (!successProcess) {
    dispatch({
      type: PROCESS_SURVEY_PROCESSES_LOADING,
    });

    try {
      const response = await configAxios.post(`${URL.main}/${processId}/${URL.evaluationAnswers}`, data);
      dispatch({
        type: PROCESS_SURVEY_PROCESSES,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
    }
  }
};

export const saveEvaluationResultBySurveyProcessId = (
  data,
  processId,
) => async (dispatch, getState) => {
  const { successProcess } = getState().surveysReducer;

  if (!successProcess) {
    dispatch({
      type: PROCESS_SURVEY_PROCESSES_LOADING,
    });
    const EVALUATION_RESULT_URL = `${URL.main}/${processId}/${URL.evaluationResults}`;

    try {
      const response = await configAxios.post(EVALUATION_RESULT_URL, data);
      dispatch({
        type: PROCESS_SURVEY_PROCESSES,
        payload: response.data,
      });
    } catch (error) {
      errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
    }
  }
};

export const getDataToDownload = (processId) => async (dispatch) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const isAdmin = isAdminFunction(user.userCookies);

  const employeeIdParam = isAdmin ? {} : { [OBJECT_KEYS.employeeId]: getEmployeeId(user) };
  const SURVEY_PROCESS_URL = `${URL.main}/${processId}/${URL.resultsByEvaluationType}`;
  const EVALUATION_RESULT_URL = `${URL.main}/${processId}/${URL.evaluationResults}`;

  try {
    const response = await configAxios.get(SURVEY_PROCESS_URL, {
      params: {
        ...employeeIdParam,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    const evaluationResults = await configAxios.get(EVALUATION_RESULT_URL, {
      params: {
        ...employeeIdParam,
        page: { size: INDEX.one },
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    const total = evaluationResults.headers["x-total"];
    const pagination = { size: total, number: INDEX.one };

    const evaluationResultsResponse = await configAxios.get(EVALUATION_RESULT_URL, {
      params: {
        ...employeeIdParam,
        page: pagination,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });

    const data = {
      employees: response.data?.employees,
      results: evaluationResultsResponse.data?.evaluation_results,
    };
    return data || {};
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_SURVEY_PROCESSES_ERROR);
  }
};
