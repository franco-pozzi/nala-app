import {
  RESET_STATE_TOP,
  GET_TOP_RANKING,
  GET_TOP_RANKING_LOADING,
  GET_TOP_RANKING_ERROR,
  RESET_STATE_BOTTOM,
  GET_BOTTOM_RANKING,
  GET_BOTTOM_RANKING_LOADING,
  GET_BOTTOM_RANKING_ERROR,
} from "../../actionTypes/performance/ranking";

const INITIAL_STATE = {
  topList: null,
  loadingToplist: false,
  errorToplist: "",
  bottomList: null,
  loadingBottomlist: false,
  errorBottomlist: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE_TOP:
    return {
      ...state,
      loadingTopList: false,
      errorTopList: null,
      topList: null,
    };
  case RESET_STATE_BOTTOM:
    return {
      ...state,
      loadingTopList: false,
      errorTopList: null,
      bottomList: null,
    };
  case GET_TOP_RANKING:
    return {
      ...state,
      topList: action.payload,
      loadingTopList: false,
      errorTopList: "",
    };
  case GET_TOP_RANKING_LOADING:
    return {
      ...state,
      topList: null,
      loadingTopList: true,
      errorTopList: "",
    };
  case GET_TOP_RANKING_ERROR:
    return {
      ...state,
      loadingTopList: false,
      errorTopList: action.payload,
    };
  case GET_BOTTOM_RANKING:
    return {
      ...state,
      bottomList: action.payload,
      loadingBottomList: false,
      errorBottomList: "",
    };
  case GET_BOTTOM_RANKING_LOADING:
    return {
      ...state,
      bottomList: null,
      loadingBottomList: true,
      errorBottomList: "",
    };
  case GET_BOTTOM_RANKING_ERROR:
    return {
      ...state,
      loadingBottomList: false,
      errorBottomList: action.payload,
    };
  default:
    return state;
  }
};
