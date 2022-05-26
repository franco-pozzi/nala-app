import {
  COMPANY_ID_PARAM,
} from "../../constants";

const PERSONALITY_TEST = {
  root: "/personalities", // should validate this (ROOT) per role :)
  searchQuery: "q[person_id_eq]",
  language: "locale",
};

const getParams = (personId, locale) => `${PERSONALITY_TEST.searchQuery}=${personId}&${PERSONALITY_TEST.language}=${locale}`;
export const GET_PERSONALITY_TEST_URL = (companyId, personId, locale) => `${PERSONALITY_TEST.root}/${COMPANY_ID_PARAM(companyId)}&${getParams(personId, locale)}`;
