const companyId = "?company_id=";
const employeeIdQuery = "&q[employee_id_eq]=";
const userIdQuery = "&user_id=";

export const SURVEY_PROCESSES = {
  root: "/survey_processes", // should validate this (ROOT) per role :)
  mainSearch: companyId,
  topResults: "top_results",
  bottomResults: "bottom_results",
  heatMap: "heat_map",
  filterBy: "&by=",
  survey_results: "survey_results",
  userIdQuery,
  employeeIdQuery,
};

export const PERFORMANCE_PROCESSES = {
  root: "/performance_processes",
  companyId,
};

export const SURVEY_RESULTS = {
  root: "/survey_results",
  companyId,
};
