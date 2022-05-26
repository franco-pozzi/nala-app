import qs from "qs";
import isEmpty from "lodash/isEmpty";
import {
  PARAMS_SERIALIZER_OPTIONS, OBJECT_KEYS, LOCAL_STORAGE_NAMES,
} from "common/constants";
import { getItemFromLocalStorage, getEmployeeId, isAdmin } from "common/utils";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_MAIN_LIST,
  GET_MANAGERS_LIST,
  GET_LIST,
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

const URL = {
  main: "/collaborators",
  employees: "/employees",
  download: "?download=true",
  managerId: "?manager_id=",
  turnovers: "turnovers",
  companyId: "?company_id=",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const resetStateOne = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_COLLABORATOR,
  });
};

export const resetStateOrgChart = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_ORG_CHART,
  });
};

export const resetStateSearch = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_SEARCH,
  });
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_COLLABORATOR_PROCCESS,
  });
};

export const resetCollaboratorsToDownload = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_COLLABORATORS_TO_DOWNLOAD,
  });
};

export const getListSearch = (isEmptyFilter, query) => async (dispatch) => {
  const employeeId = getEmployeeId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));

  let object = null;
  let dispatchRequest = true;
  if (isEmptyFilter) {
    object = query.q;
    dispatchRequest = Object.values(object).map((item) => !isEmpty(item));
  }

  dispatch({
    type: GET_LIST_LOADING,
  });

  try {
    let responseList = [];
    if (!isEmptyFilter || (isEmptyFilter && dispatchRequest.find((item) => item === true))) {
      const response = await configAxios.get(URL.main, {
        params: { ...query, [OBJECT_KEYS.employeeId]: employeeId },
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });
      responseList = response.data.collaborators;
    }
    dispatch({
      type: GET_LIST,
      payload: responseList,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const getOne = (collaboratorId) => async (dispatch, getState) => {
  const { one } = getState().collaboratorReducer;
  if (!one) {
    dispatch({
      type: GET_ONE_LOADING,
    });
    try {
      const response = await configAxios.get(`${URL.main}/${collaboratorId}`);
      dispatch({
        type: GET_ONE,
        payload: response.data.collaborator,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_ONE_ERROR);
    }
  }
};

export const getMainList = (query) => async (dispatch, getState) => {
  const { mainList } = getState().collaboratorReducer;
  if (!mainList) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      const responseManagers = await configAxios.get(URL.main, {
        params: query,
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });
      dispatch({
        type: GET_MAIN_LIST,
        payload: response.data.collaborators,
      });
      dispatch({
        type: GET_MANAGERS_LIST,
        payload: responseManagers.data.collaborators,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const getOrchartList = (isEmptyFilter, query) => async (dispatch) => {
  let object = null;
  let dispatchRequest = true;
  if (isEmptyFilter) {
    object = query.q;
    dispatchRequest = Object.values(object).map((item) => !isEmpty(item));
  }

  dispatch({
    type: GET_LIST_ORG_CHART_LOADING,
  });

  try {
    let responseList = [];
    if (!isEmptyFilter || (isEmptyFilter && dispatchRequest.find((item) => item === true))) {
      const response = await configAxios.get(URL.main, {
        params: { ...query, tree: true },
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });
      responseList = response.data.collaborators;
    }

    dispatch({
      type: GET_LIST_ORG_CHART,
      payload: responseList,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ORG_CHART_ERROR);
  }
};

export const create = (data) => async (dispatch) => {
  dispatch({
    type: PROCCESS_COLLABORATOR_LOADING,
  });
  try {
    const response = await configAxios.post(URL.main, data);
    dispatch({
      type: PROCCESS_COLLABORATOR,
      payload: response.data.collaborator,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCCESS_COLLABORATOR_ERROR);
  }
};

export const update = (data, collaboratorId, dataImage = null) => async (dispatch) => {
  dispatch({
    type: PROCCESS_COLLABORATOR_LOADING,
  });
  try {
    const UPDATE_COLLABORATOR_URL = `${URL.main}/${collaboratorId}`;
    if (dataImage) {
      await configAxios.put(UPDATE_COLLABORATOR_URL, dataImage);
    }
    const response = await configAxios.put(UPDATE_COLLABORATOR_URL, data);
    dispatch({
      type: PROCCESS_COLLABORATOR,
      payload: response.data.collaborator,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCCESS_COLLABORATOR_ERROR);
  }
};

export const getTeamByManager = (managerId = null) => async (dispatch) => {
  const employeeId = managerId || getEmployeeId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  const query = {
    q: {
      managers_ids_special_in: [employeeId],
    },
  };

  dispatch({
    type: PROCCESS_COLLABORATOR_LOADING,
  });
  try {
    const response = await configAxios.get(URL.main, {
      params: { ...query, [OBJECT_KEYS.employeeId]: employeeId },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return response.data.collaborators;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

// get list collaborators with pagination (create this new function in order to not affect the other filters who use the previous function)
// We should clean this up later!
export const getListPaginated = (page, query) => async (dispatch) => {
  const employeeId = getEmployeeId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  dispatch({
    type: GET_LIST_LOADING,
  });
  // size: 10
  // temporal technical implementention:  page size will be 10 always (for now) untill we implement the row handling component for tables
  const pagination = { size: 10, number: page };
  try {
    const response = await configAxios.get(URL.main, {
      params: { ...query, [OBJECT_KEYS.employeeId]: employeeId, page: pagination },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });

    dispatch({
      type: GET_LIST,
      payload: response.data.collaborators,
      total: response.headers["x-total"],
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const getListSearchPaginated = (query) => async (dispatch) => {
  const employeeId = getEmployeeId(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user));
  dispatch({
    type: GET_LIST_SEARCH_LOADING,
  });
  // size: 10
  // temporal technical implementention:  page size will be 10 always (for now) untill we implement the row handling component for tables
  const pagination = { size: 10 };
  try {
    const response = await configAxios.get(URL.main, {
      params: { ...query, [OBJECT_KEYS.employeeId]: employeeId, page: pagination },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });

    dispatch({
      type: GET_LIST_SEARCH,
      payload: response.data.collaborators,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_SEARCH_ERROR);
  }
};

export const getCollaboratorByEmails = async (emails) => {
  const query = {
    q: {
      email_in: emails,
    },
  };
  try {
    const resp = await configAxios.get(URL.main, {
      params: query,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return resp.data.collaborators;
  } catch (err) {
    return err;
  }
};

export const getCollaboratorsToDownload = (query) => async (dispatch) => {
  const ORGANIZATION_CHART_URL = `${URL.main}${URL.download}`;
  dispatch({
    type: GET_LIST_COLLABORATORS_TO_DOWNLOAD_LOADING,
  });

  try {
    const response = await configAxios.get(ORGANIZATION_CHART_URL, {
      params: query,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST_COLLABORATORS_TO_DOWNLOAD,
      payload: response.data.collaborators,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_COLLABORATORS_TO_DOWNLOAD_ERROR);
  }
};

// This fn is not handle it with redux (no need it)
export const getCollaboratorChildrens = async (query) => {
  query.q.active_in = [true];
  try {
    const resp = await configAxios.get(URL.main, {
      params: query,
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return resp.data.collaborators;
  } catch (err) {
    return err;
  }
};

export const resetChildrenState = () => (dispatch) => {
  dispatch({
    type: RESET_CHILDRENS_STATE,
  });
};

export const getChildrensByEmployeeId = (employeeId) => async (dispatch, getState) => {
  const { childrenList } = getState().collaboratorReducer;
  if (!childrenList) {
    // TODO: apply validation when paginated
    const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
    const query = {
      q: {
        employee_id: employeeId,
      },
    };
    if (!isAdmin(user?.userCookies)) {
      query.q = { manager_id_special_in: [employeeId] };
    }
    query.q.active_in = true;
    dispatch({
      type: GET_CHILDRENS_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main, {
        params: query,
        paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
      });
      dispatch({
        type: GET_CHILDRENS_LIST,
        payload: response.data.collaborators,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_CHILDRENS_LIST_ERROR);
    }
  }
};

export const setChildrensList = (collaborators) => async (dispatch) => {
  dispatch({
    type: GET_CHILDRENS_LIST,
    payload: collaborators,
  });
};

export const terminateEmployment = (id, data) => async (dispatch) => {
  dispatch({
    type: PROCCESS_COLLABORATOR_LOADING,
  });
  try {
    const response = await configAxios.post(`${URL.employees}/${id}/${URL.turnovers}`, data);
    dispatch({
      type: PROCCESS_COLLABORATOR,
      payload: response.data.turnover,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCCESS_COLLABORATOR_ERROR);
  }
};

export const getAsyncCollaboratorChildrens = (findById, type) => async (dispatch) => {
  const query = {
    q: {
      [type]: findById,
    },
  };
  dispatch({
    type: PROCCESS_COLLABORATOR_LOADING,
  });
  try {
    const response = await configAxios.get(URL.employees, {
      params: { ...query },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    return response.data.employees;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getAsyncCollaborator = (collaboratorId) => async () => {
  try {
    const response = await configAxios.get(`${URL.main}/${collaboratorId}`);
    return response.data.collaborator;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
