import { API_URL_RAILS_V1, COMPANY_ID_PARAM, USER_ID_PARAM } from "common/constants";

export const POSITIONS = {
  root: "/positions",
};

export const GET_POSITIONS_URL = (companyId, isAsync) => {
  const asyncValidation = isAsync ? API_URL_RAILS_V1 : "";
  return `${asyncValidation}${POSITIONS.root}${COMPANY_ID_PARAM(companyId)}`;
};

export const CREATE_POSITION_URL = (companyId) => `${API_URL_RAILS_V1}${POSITIONS.root}${COMPANY_ID_PARAM(companyId)}`;

export const UPDATE_POSITION_URL = (id, companyId) => `${API_URL_RAILS_V1}${POSITIONS.root}/${id}${COMPANY_ID_PARAM(companyId)}`;

export const DELETE_POSITION_URL = (id, companyId, userId) => `${API_URL_RAILS_V1}${POSITIONS.root}/${id}${COMPANY_ID_PARAM(companyId)}&${USER_ID_PARAM(userId)}`;
