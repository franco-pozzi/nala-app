import qs from "qs";
import { PARAMS_SERIALIZER_OPTIONS, LOCAL_STORAGE_NAMES } from "common/constants";
import { getItemFromLocalStorage, getEmployeeId, isAdmin } from "common/utils";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../actionTypes/attrition";

const URL = {
  main: "/attrition_charts",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = (query) => async (dispatch) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const employeeId = getEmployeeId(user);
  if (!isAdmin(user?.userCookies)
  && (query.q.manager_id_special_in === null || query.q.manager_id_special_in.length === 0)) {
    query.q.manager_id_eq = employeeId;
  }

  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    let responseList = [];
    const response = await configAxios.get(URL.main, {
      params: query,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    responseList = response.data.attrition_charts;

    dispatch({
      type: GET_LIST,
      payload: { responseList, averages: response.data.meta.averages },
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};
