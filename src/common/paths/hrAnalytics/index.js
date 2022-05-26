import { COMPANY_ID_PARAM } from "common/constants";

const HR_ANALYTICS = {
  root: "/charts",
  hcMonth: "hc_month",
  ctcMonth: "ctc_month",
};
export const GET_HC_MONTHLY_URL = (companyId) => `${HR_ANALYTICS.root}/${HR_ANALYTICS.hcMonth}${COMPANY_ID_PARAM(companyId)}`;
export const GET_CTC_MONTHLY_URL = (companyId) => `${HR_ANALYTICS.root}/${HR_ANALYTICS.ctcMonth}${COMPANY_ID_PARAM(companyId)}`;
