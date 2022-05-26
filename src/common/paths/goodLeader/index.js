import {
  COMPANY_ID_PARAM,
  USER_ID_PARAM,
  SURVEY_PROCESS_PATH,
  SURVEY_RESULTS_PATH,
  GOOD_LEADER_PROCESSES_PATH,
} from "../../constants";

export const GET_GOOD_LEADER_PROCESSES_URL = (companyId) => `${GOOD_LEADER_PROCESSES_PATH}${COMPANY_ID_PARAM(companyId)}`;

export const GET_GOOD_LEADER_RANKING_URL = (id, companyId, type, userId) => `${SURVEY_PROCESS_PATH}/${id}/${type}${COMPANY_ID_PARAM(
  companyId,
)}&${USER_ID_PARAM(userId)}`;

export const GET_GOOD_LEADER_SURVEY_RESULTS_URL = (id, companyId, userId) => `${SURVEY_PROCESS_PATH}/${id}/${SURVEY_RESULTS_PATH}${COMPANY_ID_PARAM(
  companyId,
)}&${USER_ID_PARAM(userId)}`;
