import {
  RESET_STATE_VALIDATE_PASSWORD,
  PROCESS_VALIDATE_PASSWORD,
  PROCESS_VALIDATE_PASSWORD_LOADING,
  PROCESS_VALIDATE_PASSWORD_ERROR,
  PROCESS_CREATE_PASSWORD_ERROR,
  PROCESS_CREATE_PASSWORD_LOADING,
  PROCESS_CREATE_PASSWORD,
  RESET_STATE_PASSWORD_RECOVERY,
  PROCESS_PASSWORD_RECOVERY,
  PROCESS_PASSWORD_RECOVERY_ERROR,
  PROCESS_PASSWORD_RECOVERY_LOADING, RESET_STATE_CREATE_PASSWORD,
} from "../actionTypes/createPassword";

const INITIAL_STATE = {
  processValidation: null,
  processPasswordCreation: null,
  processPasswordRecovery: null,
  isLoadingTokenValidation: false,
  isLoadingPasswordCreation: false,
  isLoadingPasswordRecovery: false,
  errorlist: null,
  errorlistPasswordRecovery: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_STATE_VALIDATE_PASSWORD:
    return {
      ...state,
      isLoadingTokenValidation: false,
      errorList: null,
      processPasswordCreation: null,
      isLoadingPasswordCreation: false,
      processValidation: null,
    };
  case RESET_STATE_PASSWORD_RECOVERY:
    return {
      ...state,
      errorlistPasswordRecovery: null,
      isLoadingPasswordRecovery: false,
      processPasswordRecovery: null,
    };
  case RESET_STATE_CREATE_PASSWORD:
    return {
      ...state,
      errorlist: null,
      isLoadingPasswordCreation: false,
      processPasswordCreation: null,
    };
  case PROCESS_VALIDATE_PASSWORD:
    return {
      ...state,
      processValidation: action.payload,
      isLoadingTokenValidation: false,
      errorList: null,
    };
  case PROCESS_VALIDATE_PASSWORD_LOADING:
    return {
      ...state,
      processValidation: null,
      isLoadingTokenValidation: true,
      errorList: null,
    };
  case PROCESS_VALIDATE_PASSWORD_ERROR:
    return {
      ...state,
      isLoadingTokenValidation: false,
      errorList: action.payload,
    };
  case PROCESS_CREATE_PASSWORD:
    return {
      ...state,
      processPasswordCreation: action.payload,
      isLoadingPasswordCreation: false,
      errorList: null,
    };
  case PROCESS_CREATE_PASSWORD_LOADING:
    return {
      ...state,
      processPasswordCreation: null,
      isLoadingPasswordCreation: true,
      errorList: null,
    };
  case PROCESS_CREATE_PASSWORD_ERROR:
    return {
      ...state,
      isLoadingPasswordCreation: false,
      errorList: action.payload,
    };
  case PROCESS_PASSWORD_RECOVERY:
    return {
      ...state,
      processPasswordRecovery: action.payload,
      isLoadingPasswordRecovery: false,
      errorlistPasswordRecovery: null,
    };
  case PROCESS_PASSWORD_RECOVERY_LOADING:
    return {
      ...state,
      processPasswordRecovery: null,
      isLoadingPasswordRecovery: true,
      errorlistPasswordRecovery: null,
    };
  case PROCESS_PASSWORD_RECOVERY_ERROR:
    return {
      ...state,
      isLoadingPasswordRecovery: false,
      errorlistPasswordRecovery: action.payload,
    };
  default:
    return state;
  }
};
