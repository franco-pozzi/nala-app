import { API_URL_RAILS_V1, COMPANY_ID_PARAM } from "common/constants";

export const TYPE_OF_CONTRACT = {
  root: "/type_of_contracts",
};

export const GET_CONTRACT_TYPES_URL = (companyId, tree) =>
  `${TYPE_OF_CONTRACT.root}${COMPANY_ID_PARAM(companyId)}`;

export const CREATE_CONTRACT_TYPE_URL = (companyId) =>
  `${API_URL_RAILS_V1}${TYPE_OF_CONTRACT.root}${COMPANY_ID_PARAM(companyId)}`;

export const UPDATE_CONTRACT_TYPE_URL = (id, companyId) =>
  `${API_URL_RAILS_V1}${TYPE_OF_CONTRACT.root}/${id}${COMPANY_ID_PARAM(
    companyId
  )}`;

export const DELETE_CONTRACT_TYPE_URL = (id, companyId) =>
  `${API_URL_RAILS_V1}${TYPE_OF_CONTRACT.root}/${id}${COMPANY_ID_PARAM(
    companyId
  )}`;
