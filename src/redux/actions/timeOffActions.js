import qs from "qs";
import { LOCAL_STORAGE_NAMES, OBJECT_KEYS, PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import { getItemFromLocalStorage, getUserId, getEmployeeId, isAdmin } from "common/utils";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_TIME_OFF,
  GET_LIST_TIME_OFF,
  GET_LIST_TIME_OFF_ERROR,
  GET_LIST_TIME_OFF_LOADING,
  RESET_TEAM,
  GET_TEAM_LIST,
  GET_TEAM_LIST_ERROR,
  GET_TEAM_LIST_LOADING,
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

const URL = {
  main: "/collaborators",
  time_offs: "/time_offs",
  team: "team_on_vacation",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = (name, start, end, query) => async (dispatch, getState) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const employeeId = getEmployeeId(user);
  const { list } = getState().timeOffReducer;

  if (!isAdmin(user?.userCookies)) {
    query.q.manager_id_eq = employeeId;
  }

  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
  }
  try {
    const response = await configAxios.get(URL.main, {
      params: {
        ...query,
        "q[person_full_name_cont]": name,
        "q[state_in]": "",
        "q[time_offs_starting_date_gteq]": start,
        "q[time_offs_ending_date_lteq]": end,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST,
      payload: response.data.collaborators?.filter((item) => item.is_active),
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const resetTimeOffList = () => (dispatch) => {
  dispatch({
    type: RESET_TIME_OFF,
  });
};

export const getTimeOffList = (name, start, end, page, query) => async (dispatch, getState) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const userId = getUserId(user);
  const employeeId = getEmployeeId(user);
  const { timeOffList } = getState().timeOffReducer;

  if (!timeOffList) {
    dispatch({
      type: GET_LIST_TIME_OFF_LOADING,
    });
  }
  try {
    const response = await configAxios.get(URL.time_offs, {
      params: {
        ...query,
        "q[employee_person_full_name_cont]": name,
        "q[employee_id_not_eq]": employeeId,
        page,
        "q[starting_date_gteq]": start,
        "q[ending_date_lteq]": end,
        "q[s]": "custom_state asc",
        [OBJECT_KEYS.userId]: userId,
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST_TIME_OFF,
      payload: response.data.time_offs,
      total: response.headers["x-total"],
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_TIME_OFF_ERROR);
  }
};

export const resetStateTeam = () => (dispatch) => {
  dispatch({
    type: RESET_TEAM,
  });
};

export const getTeamList = () => async (dispatch, getState) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const employeeId = getEmployeeId(user);
  dispatch({
    type: GET_TEAM_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(`${URL.main}/${employeeId}/${URL.team}`);
    dispatch({
      type: GET_TEAM_LIST,
      payload: response.data.time_offs,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_TEAM_LIST_ERROR);
  }
};

export const getOne = (query) => async (dispatch, getState) => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  const userId = getUserId(user);
  const employeeId = getEmployeeId(user);

  dispatch({
    type: GET_ONE_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(URL.time_offs, {
      params: {
        ...query,
        user_id: userId,
        "q[employee_id_eq]": employeeId,
        "q[s]": "starting_date desc",
      },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_ONE_LIST,
      payload: response.data.time_offs,
      total: response.headers["x-total"],
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_ONE_LIST_ERROR);
  }
};

export const deleteTimeOff = (id) => async (dispatch) => {
  dispatch({
    type: PROCESS_TIME_OFF_LOADING,
  });
  try {
    await configAxios.delete(`${URL.time_offs}/${id}`);
    dispatch({
      type: PROCESS_TIME_OFF,
      payload: "deleted",
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_TIME_OFF_ERROR);
  }
};

export const resetProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_TIME_OFF,
  });
};

export const resetExcelState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_EXCEL,
  });
};

export const getExcelList = (name, start, end, query) => async (dispatch, getState) => {
  const userId = getUserId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const { excelList } = getState().timeOffReducer;

  if (!excelList) {
    dispatch({
      type: GET_LIST_EXCEL_LOADING,
    });
  }
  try {
    const response = await configAxios.get(URL.time_offs, {
      params: {
        ...query,
        "q[employee_person_full_name_cont]": name,
        "q[starting_date_gteq]": start,
        "q[ending_date_lteq]": end,
        "q[s]": "custom_state asc",
        [OBJECT_KEYS.userId]: userId,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST_EXCEL,
      payload: response.data.time_offs,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_EXCEL_ERROR);
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({
    type: PROCESS_TIME_OFF_LOADING,
  });
  try {
    const response = await configAxios.post(URL.time_offs, data);
    dispatch({
      type: PROCESS_TIME_OFF,
      payload: response.data,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_TIME_OFF_ERROR);
  }
};

export const update = (id, data, isEdit = false) => async (dispatch) => {
  dispatch({
    type: PROCESS_TIME_OFF_LOADING,
  });
  try {
    const param = data.rejection_reason ? {
      time_off: { state_transition: data.state, rejection_reason: data.rejection_reason },
    } : {
      time_off: { state_transition: data.state },
    };

    const response = await configAxios.put(`${URL.time_offs}/${id}`, isEdit ? data : param);
    dispatch({
      type: PROCESS_TIME_OFF,
      payload: response.data,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_TIME_OFF_ERROR);
  }
};
