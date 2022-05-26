const companyId = "?company_id=";
const employeeIdQuery = "&q[employee_id_eq]=";
const userIdQuery = "&user_id=";

export const SURVEY_RESULTS = {
  root: "/survey_results", // should validate this (ROOT) per role :)
  mainSearch: companyId,
  survey_results: "survey_results",
};

export const SURVEY_PROCESSES = {
  root: "/survey_processes",
  mainSearch: companyId,
  searchQuery: employeeIdQuery,
  survey_results: "survey_results",
  userIdQuery,
};

export const INDIVIDUAL_RESULT = {
  root: "/collaborators",
  mainSearch: companyId,
  survey_results: "survey_results",
};
