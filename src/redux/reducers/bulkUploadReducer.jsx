import {
  RESET_STATE_PROCESS_BULK_UPLOAD,
  PROCESS_BULK_UPLOAD,
  PROCESS_BULK_UPLOAD_LOADING,
  PROCESS_BULK_UPLOAD_ERROR,
} from "../actionTypes/bulkUpload";

const INITIAL_STATE = {
  successProcess: null,
  isLoadingProcess: false,
  errorProcess: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE_PROCESS_BULK_UPLOAD:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: null,
      successProcess: null,
    };
  case PROCESS_BULK_UPLOAD:
    return {
      ...state,
      successProcess: action.payload,
      isLoadingProcess: false,
      errorProcess: "",
    };
  case PROCESS_BULK_UPLOAD_LOADING:
    return {
      ...state,
      successProcess: null,
      isLoadingProcess: true,
      errorProcess: "",
    };
  case PROCESS_BULK_UPLOAD_ERROR:
    return {
      ...state,
      isLoadingProcess: false,
      errorProcess: action.payload,
    };
  default:
    return state;
  }
};
