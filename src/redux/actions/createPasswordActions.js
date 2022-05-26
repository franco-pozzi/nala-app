import { CURRENT_DOMAIN, LOCAL_STORAGE_NAMES } from "common/constants";
import { getItemFromLocalStorage, isMulticompanyUser, setInLocalStorageAsync } from "common/utils";
import { resetAccessToken } from "config";
import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE_VALIDATE_PASSWORD,
  PROCESS_CREATE_PASSWORD_ERROR,
  PROCESS_CREATE_PASSWORD,
  PROCESS_CREATE_PASSWORD_LOADING,
  PROCESS_PASSWORD_RECOVERY_LOADING,
  PROCESS_PASSWORD_RECOVERY,
  RESET_STATE_CREATE_PASSWORD,
  RESET_STATE_PASSWORD_RECOVERY,
  PROCESS_PASSWORD_RECOVERY_ERROR,
} from "../actionTypes/createPassword";

const URL = {
  main: "/user",
  holdings: "/holdings",
  validateTokenURL: "/auth/password/edit",
  passwordCreationURL: "/auth/password/",
  requestPasswordReset: "/auth/password",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_VALIDATE_PASSWORD,
  });
};

export const resetStateCreatePassword = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_CREATE_PASSWORD,
  });
};

export const resetPasswordRecovery = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_PASSWORD_RECOVERY,
  });
};

export const sendPasswordRecoveryEmail = (formData) => async (dispatch, getState) => {
  dispatch({
    type: PROCESS_PASSWORD_RECOVERY_LOADING,
  });

  try {
    const URL_PASSWORD_RESET = `${isMulticompanyUser() ? URL.holdings : ""}${URL.requestPasswordReset}`;
    const response = await configAxios.post(`${URL_PASSWORD_RESET}?redirect_url=${CURRENT_DOMAIN}/recover-password`, formData, {
      // The email is a query param because works like as tenant
      params: { email: formData.email },
    });
    dispatch({
      type: PROCESS_PASSWORD_RECOVERY,
      payload: response.data,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_PASSWORD_RECOVERY_ERROR);
  }
};

export const createPassword = (formData) => async (dispatch, getState) => {
  dispatch({
    type: PROCESS_CREATE_PASSWORD_LOADING,
  });
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.client, formData.client);
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.uid, formData.uid);
  setInLocalStorageAsync(LOCAL_STORAGE_NAMES.accessToken, formData.accessToken);
  const headers = {
    expiry: formData.expiry,
    "token-type": "Bearer",
  };

  try {
    const URL_PASSWORD_CREATION = `${isMulticompanyUser() ? URL.holdings : ""}${URL.passwordCreationURL}`;
    const response = await configAxios.put(URL_PASSWORD_CREATION, formData, {
      // The email is a query param because works like tenant
      params: { email: formData.email },
      headers,
    });
    dispatch({
      type: PROCESS_CREATE_PASSWORD,
      // we need to add a default message to the response if the backend doesn't provide it
      payload: response.data || { message: "OK" },
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_CREATE_PASSWORD_ERROR);
  }
};
export const updatePassword = (data) => async (dispatch) => {
  const headers = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user).sessionCookies;

  dispatch({
    type: PROCESS_CREATE_PASSWORD_LOADING,
  });

  try {
    const URL_PASSWORD_RESET = `${isMulticompanyUser() ? URL.holdings : ""}${URL.requestPasswordReset}`;
    const response = await configAxios.put(URL_PASSWORD_RESET, data, {
      headers,
    });

    dispatch({
      type: PROCESS_CREATE_PASSWORD,
      payload: response.data,
    });
    resetAccessToken(headers, response.headers["access-token"]);
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_CREATE_PASSWORD_ERROR);
  }
};
