import { setInLocalStorageAsync, getFormatMulticompany, isMulticompanyUser } from "common/utils";
import { LOCAL_STORAGE_NAMES } from "common/constants";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_ONE,
  GET_ONE_LOADING,
  GET_ONE_ERROR,
} from "../actionTypes/signIn";

const URL = {
  main: "/auth/sign_in",
  holdings: "/holdings",
  validateToken: "/auth/validate_token",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getOne = (formData) => async (dispatch, getState) => {
  const { one } = getState().signInReducer;
  const isMulticompany = isMulticompanyUser();

  if (!one) {
    dispatch({
      type: GET_ONE_LOADING,
    });
    try {
      const URL_SIGN_IN = `${isMulticompany ? URL.holdings : ""}${URL.main}`;
      const response = await configAxios.post(URL_SIGN_IN, formData);
      setInLocalStorageAsync(LOCAL_STORAGE_NAMES.client, response.headers.client);
      setInLocalStorageAsync(LOCAL_STORAGE_NAMES.uid, response.headers.uid);
      const { data } = response;
      const formatData = isMulticompany ? getFormatMulticompany(data?.multi_company_user) : data;

      dispatch({
        type: GET_ONE,
        payload: formatData,
        headers: { client: response.headers.client, uid: response.headers.uid, "access-token": response.headers["access-token"] },
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_ONE_ERROR);
    }
  }
};

export const getUserByToken = (headers) => async (dispatch, getState) => {
  dispatch({
    type: GET_ONE_LOADING,
  });
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.client, headers.clientId);
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.uid, headers.uid);
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.accessToken, headers.token);
  const isMulticompany = isMulticompanyUser();

  try {
    const URL_VALITADE_TOKEN = `${isMulticompany ? URL.holdings : ""}${URL.validateToken}`;
    const response = await configAxios.get(URL_VALITADE_TOKEN, {
      headers: {
        expiry: headers.expiry,
        "token-type": "Bearer",
      },
    });
    const { data } = response;
    const formatData = isMulticompany ? getFormatMulticompany(data?.multi_company_user) : data;

    dispatch({
      type: GET_ONE,
      payload: formatData,
    });
  } catch (error) {
    errorHandler(error, dispatch, GET_ONE_ERROR);
  }
};
