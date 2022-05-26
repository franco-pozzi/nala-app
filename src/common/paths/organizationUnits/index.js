import { API_URL_RAILS_V1, COMPANY_ID_PARAM, USER_ID_PARAM } from "common/constants";

const tree = "tree=true";

export const ORGANIZATION_UNITS = {
  root: "/organization_units",
  tree,
};
export const ORGANIZATION_UNITS_TYPES = {
  root: "/organization_unit_types",
};

export const GET_ORGANIZATION_UNITS_URL = (companyId, tree, isAsync) => {
  const asyncValidation = isAsync ? API_URL_RAILS_V1 : "";
  const treeValidation = tree ? `&${ORGANIZATION_UNITS.tree}` : "";

  return `${asyncValidation}${ORGANIZATION_UNITS.root}${COMPANY_ID_PARAM(
    companyId,
  )}${treeValidation}`;
};

export const GET_ORGANIZATION_UNITS_TYPES_URL = (companyId) => `${ORGANIZATION_UNITS_TYPES.root}${COMPANY_ID_PARAM(companyId)}`;

export const CREATE_ORGANIZATION_UNIT_URL = (companyId) => `${API_URL_RAILS_V1}${ORGANIZATION_UNITS.root}${COMPANY_ID_PARAM(companyId)}`;

export const UPDATE_ORGANIZATION_UNIT_URL = (id, companyId, userId) => `${API_URL_RAILS_V1}${ORGANIZATION_UNITS.root}/${id}${COMPANY_ID_PARAM(companyId)}&${USER_ID_PARAM(userId)}`;

export const DELETE_ORGANIZATION_UNIT_URL = (id, companyId, userId) => `${API_URL_RAILS_V1}${ORGANIZATION_UNITS.root}/${id}${COMPANY_ID_PARAM(companyId)}&${USER_ID_PARAM(userId)}`;
