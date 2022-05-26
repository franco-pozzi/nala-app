import orderBy from "lodash/orderBy";
import { ASC, OBJECT_KEYS } from "common/constants";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,

  RESET_PROCESS_CITY,
  // PROCESS_CITY,
  // PROCESS_CITY_LOADING,
  // PROCESS_CITY_ERROR,
} from "../../actionTypes/common/city";

const URL = {
  main: "/cities",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = (returnData = false) => async (dispatch) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(URL.main);
    const cities = orderBy(response.data.cities, [OBJECT_KEYS.country_id], [ASC]);
    dispatch({
      type: GET_LIST,
      payload: cities,
    });
    if (returnData) {
      return cities;
    }
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};

export const resetStateProcess = () => (dispatch) => {
  dispatch({
    type: RESET_PROCESS_CITY,
  });
};

export const deleteItem = (id, moveId) => async () => {
  try {
    const response = await configAxios.delete(
      `${URL.main}/${id}`,
      {
        params: { move_collaborators_to: moveId },
      },
    );
    return response.data.city;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.detail || error?.response?.data?.message,
    };
  }
};

export const create = (data) => async () => {
  try {
    const response = await configAxios.post(URL.main, data);
    return response.data.city;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const update = (id, data) => async () => {
  try {
    const response = await configAxios.put(`${URL.main}/${id}`, data);
    return response.data.city;
  } catch (error) {
    return {
      error: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
