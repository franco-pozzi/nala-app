import qs from "qs";
import { LOCAL_STORAGE_NAMES, PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import {
  getUserId, getItemFromLocalStorage, getAxiosDeleteConfig,
} from "common/utils";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,

  RESET_STATE_TREE,
  GET_LIST_TREE,
  GET_LIST_TREE_LOADING,
  GET_LIST_TREE_ERROR,

  RESET_STATE_PROCESS,
  // PROCESS_ORG_UNITS,
  // PROCESS_ORG_UNITS_ERROR,
  PROCESS_ORG_UNITS_LOADING,

} from "../../actionTypes/organizationUnits";

const URL = {
  main: "/organization_units",
  useId: "user_id=",
  tree: "tree=true",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateTree = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_TREE,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_PROCESS,
  });
};

export const getList = (isTree) => async (dispatch) => {
  const ORG_UNIT_PATH = isTree ? `?${URL.tree}` : "";
  dispatch({
    type: isTree ? GET_LIST_TREE_LOADING : GET_LIST_LOADING,
  });
  const query = {
    q: {
      active_in: [true],
    },
  };
  try {
    const response = await configAxios.get(URL.main + ORG_UNIT_PATH, {
      params: query,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: isTree ? GET_LIST_TREE : GET_LIST,
      payload: isTree ? response.data : response.data.organization_units,
    });
    if (!isTree) {
      return response.data.organization_units;
    }
  } catch (error) {
    errorHandler(error, dispatch, isTree ? GET_LIST_TREE_ERROR : GET_LIST_ERROR);
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({
    type: PROCESS_ORG_UNITS_LOADING,
  });
  try {
    const response = await configAxios.post(URL.main, data);
    return response.data.organization_unit;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const update = (id, data) => async (dispatch) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  dispatch({
    type: PROCESS_ORG_UNITS_LOADING,
  });
  try {
    const response = await configAxios.put(`${URL.main}/${id}?${URL.useId}${userId}`, data);
    return response.data.organization_unit;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteItem = async (id, data) => {
  try {
    const dataToMove = {
      organization_unit: {
        movements: data,
      },
    };
    const response = await configAxios(getAxiosDeleteConfig(URL.main, id, data ? dataToMove : ""));
    return response.data.organization_unit;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.detail || error?.response?.data?.message,
    };
  }
};
