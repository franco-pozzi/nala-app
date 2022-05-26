import qs from "qs";
import { PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  RESET_STATE_ONE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/performance/surveyResults";

const URL = {
  main: "/collaborators",
  survey_results: "survey_results",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateOne = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_ONE,
  });
};

export const getList = (userId) => async (dispatch, getState) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const mainUrl = `${URL.main}/${userId}/${URL.survey_results}`;
    const response = await configAxios.get(mainUrl);
    dispatch({
      type: GET_LIST,
      payload: response.data.survey_results,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const getResultsByCollaborator = (userId) => async () => {
  try {
    const response = await configAxios.get(`${URL.main}/${userId}/${URL.survey_results}`, {
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return response.data.survey_results.filter((item) => item.survey_process.follow_up_process_id !== null);
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
