import {
  COMPANY_ID_PARAM,
  SURVEY_PROCESS_PATH,
  SEND_PROCESS_PATH,
  SEND_PROCESS_REMINDER_PATH,
  API_URL_RAILS_V1,
} from "../../constants";

export const GET_SURVEY_PROCESSES_URL = (companyId) => `${SURVEY_PROCESS_PATH}${COMPANY_ID_PARAM(companyId)}`;

export const GET_SURVEY_PROCESS_URL = (process, companyId, processId) => `${process}/${processId}/${COMPANY_ID_PARAM(companyId)}`;

export const CREATE_SURVEY_PROCESS_URL = (process, companyId) => `${process}/${COMPANY_ID_PARAM(companyId)}`;

const getSendPath = (isReminder) => (isReminder ? SEND_PROCESS_REMINDER_PATH : SEND_PROCESS_PATH);

export const GET_SENDING_SURVEY_PROCESS_URL = (processId, companyId, isReminder) => `${API_URL_RAILS_V1}/${SURVEY_PROCESS_PATH}/${processId}/${getSendPath(isReminder)}${COMPANY_ID_PARAM(
  companyId,
)}`;
