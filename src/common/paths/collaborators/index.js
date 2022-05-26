import { COMPANY_ID_PARAM, API_URL_RAILS_V1 } from "common/constants";

const companyId = "?company_id=";
const managerQuery = "&q[user_roles_name_cont]=manager";
const employeeId = "employee_id=";
const managerId = "manager_id=";
const organizationUnitsQuery = "&q[job_position_organization_units_id_eq]=";
const positionsQuery = "&q[job_position_position_id_eq]=";

const organizationUnits = "job_position_organization_units_id_eq";
const positions = "job_position_position_id_eq";

export const COLLABORATORS = {
  root: "/collaborators",
  tree: "&tree=",
  download: "&download=",
  managerQuery,
  companyId,
  employeeId,
  managerId,
  organizationUnitsQuery,
  positionsQuery,
  organizationUnits,
  positions,
};

export const EMPLOYEES = {
  root: "/employees",
  turnovers: "turnovers",
  movementsHistory: "historical_movements",
  companyId,
};

const language = "locale";

export const GET_CREATE_COLLABORATOR_URL = (companyId, locale) => `${COLLABORATORS.root}/${COMPANY_ID_PARAM(companyId)}&${language}=${locale}`;

export const GET_COLLABORATORS_BY_MANAGER_JOB_POSITION = (companyId, findById, type) => {
  const query = type === COLLABORATORS.managerId ? "q[manager_id_special_in][]=" : type;
  return `${API_URL_RAILS_V1}${COLLABORATORS.root}${COMPANY_ID_PARAM(companyId)}&${query}${findById}`;
};
