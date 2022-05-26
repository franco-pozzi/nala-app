import configAxios from "../../configAxios";
import errorHandler from "../../errorHandler";
import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  RESET_STATE,
} from "../../actionTypes/common/employmentRelationship";

const URL = {
  main: "/employment_relationships",
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};

export const getList = () => async (dispatch, getState) => {
  const { list } = getState().employmentRelationshipReducer;
  if (!list) {
    dispatch({
      type: GET_LIST_LOADING,
    });
    try {
      const response = await configAxios.get(URL.main);
      dispatch({
        type: GET_LIST,
        payload: response.data.employment_relationships,
      });
    } catch (error) {
      errorHandler(error, dispatch, GET_LIST_ERROR);
    }
  }
};
