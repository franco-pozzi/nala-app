import qs from "qs";
import { LOCAL_STORAGE_NAMES, OBJECT_KEYS, PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import { getItemFromLocalStorage, getUserId } from "common/utils";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE_TOP,
  RESET_STATE_BOTTOM,
  GET_TOP_RANKING,
  GET_TOP_RANKING_LOADING,
  GET_TOP_RANKING_ERROR,
  GET_BOTTOM_RANKING,
  GET_BOTTOM_RANKING_LOADING,
  GET_BOTTOM_RANKING_ERROR,
} from "../../actionTypes/performance/ranking";

const URL = {
  main: "/survey_processes",
  top: "top_results",
  bottom: "bottom_results",
};

export const resetStateTop = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_TOP,
  });
};

export const resetStateBottom = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_BOTTOM,
  });
};

export const getTopList = (processId, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  dispatch({
    type: GET_TOP_RANKING_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.main}/${processId}/${URL.top}`, {
      params: { ...query, [OBJECT_KEYS.userId]: userId },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_TOP_RANKING,
      payload: response.data.survey_results,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_TOP_RANKING_ERROR);
  }
};

export const getBottomList = (processId, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  dispatch({
    type: GET_BOTTOM_RANKING_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.main}/${processId}/${URL.bottom}`, {
      params: { ...query, [OBJECT_KEYS.userId]: userId },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_BOTTOM_RANKING,
      payload: response.data.survey_results,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_BOTTOM_RANKING_ERROR);
  }
};
