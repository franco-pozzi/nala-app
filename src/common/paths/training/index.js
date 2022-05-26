import {
  COMPANY_ID_PARAM,
} from "../../constants";

export const TRAINING = {
  root: "/training_evaluation_processes",
};

export const GET_TRAINING_PROCESSES_URL = (companyId) => `${TRAINING.root}${COMPANY_ID_PARAM(companyId)}`;
