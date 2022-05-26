import qs from "qs";
import isEmpty from "lodash/isEmpty";
import { ORG_UNITS, LOCAL_STORAGE_NAMES, OBJECT_KEYS, PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import { getItemFromLocalStorage, getUserId } from "common/utils";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/performance/heatMap";

const URL = {
  main: "/survey_processes",
  heatMap: "heat_map",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = (processId, filter, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));

  const filterSeach = filter !== ORG_UNITS.division ? filter.toLowerCase() : "";
  const HEAT_MAP_URL = `${URL.main}/${processId}/${URL.heatMap}`;

  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const params = { ...query, [OBJECT_KEYS.userId]: userId };
    if (!isEmpty(filterSeach)) {
      params.by = filterSeach;
    }
    const response = await configAxios.get(HEAT_MAP_URL, {
      params,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST,
      payload: response.data,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }

};
