import configAxios from "../configAxios";
import errorHandler from "../errorHandler";
import {
  RESET_STATE,
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE_FEEDBACK,
  PROCESS_FEEDBACK,
  PROCESS_FEEDBACK_LOADING,
  PROCESS_FEEDBACK_ERROR,
} from "../actionTypes/acknowledgementTypes";

// NOTE: we need manteing the URL's close to the actions
const URL = {
  main: "/acknowledgement_types",
  feedbback: "/feedback_acknowledgements",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().acknowledgementTypesReducer;

  if (!list.length) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.acknowledgement_types,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};

export const resetStateFeedback = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_FEEDBACK,
  });
};

export const create = (data) => async (dispatch) => {
  dispatch({
    type: PROCESS_FEEDBACK_LOADING,
  });
  try {
    const response = await configAxios.post(URL.feedbback, data);
    dispatch({
      type: PROCESS_FEEDBACK,
      payload: response.data.feedback_acknowledgement,
    });
  } catch (error) {
    errorHandler(error, dispatch, PROCESS_FEEDBACK_ERROR);
  }
};
