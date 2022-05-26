import qs from "qs";
import { PARAMS_SERIALIZER_OPTIONS } from "common/constants";
import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,
} from "../../actionTypes/common/manager";

// NOTE: we need manteing the URL's close to the actions
const URL = {
  main: "/collaborators",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch) => {
  const query = {
    q: {
      active_in: [true],
    },
  };
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const response = await configAxios.get(URL.main, {
      params: { ...query },
      paramsSerializer: (params) => qs.stringify(params, PARAMS_SERIALIZER_OPTIONS),
    });
    dispatch({
      type: GET_LIST,
      payload: response.data.collaborators,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_LIST_ERROR);
  }
};
