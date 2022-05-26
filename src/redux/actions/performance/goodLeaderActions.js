import qs from "qs";
import { isEmpty } from "common/helpers";
import { LOCAL_STORAGE_NAMES, OBJECT_KEYS, PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import { getItemFromLocalStorage, getUserId } from "common/utils";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
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

const URL = {
  main: "/good_leader_processes",
  surveyProcesses: "survey_processes",
  surveyResults: "survey_results",
  topResults: "top_results",
  bottomResults: "bottom_results",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateGoodLeaderTop = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_TOP,
  });
};

export const resetStateGoodLeaderBottom = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_BOTTOM,
  });
};

export const resetStateGoodLeaderSurveyResults = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_SURVEY_RESULTS,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().performanceGoodLeaderReducer;
  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.good_leader_processes,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const getGoodLeaderTopRanking = (goodLeaderProcessId, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const RANKING_URL = `${URL.surveyProcesses}/${goodLeaderProcessId}/${URL.topResults}`;
  
  dispatch({
    type: GET_TOP_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(RANKING_URL, {
      params: { ...query, [OBJECT_KEYS.userId]: userId },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_TOP_LIST,
      payload: response.data.survey_results,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_TOP_LIST_ERROR);
  }
  
};

export const getGoodLeaderBottomRanking = (goodLeaderProcessId, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const RANKING_URL = `${URL.surveyProcesses}/${goodLeaderProcessId}/${URL.bottomResults}`;

  dispatch({
    type: GET_BOTTOM_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(RANKING_URL, {
      params: { ...query, [OBJECT_KEYS.userId]: userId },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_BOTTOM_LIST,
      payload: response.data.survey_results,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_BOTTOM_LIST_ERROR);
  }
};

export const getGoodLeaderResults = (processId, isEmptyFilter, query) => async (dispatch, getState) => {
  let object = null;
  let dispatchRequest = true;
  if (isEmptyFilter) {
    object = query.q;
    dispatchRequest = Object.values(object).map((item) => !isEmpty(item));
  }
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const SURVEY_RESULTS_URL = `${URL.surveyProcesses}/${processId}/${URL.surveyResults}`;

  dispatch({
    type: GET_SURVEY_RESULTS_LIST_LOADING,
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
      type: GET_SURVEY_RESULTS_LIST,
      payload: responseList,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_SURVEY_RESULTS_LIST_ERROR);
  }
};
