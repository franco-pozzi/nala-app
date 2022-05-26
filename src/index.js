import React from "react";
import ReactDOM from "react-dom";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initSentry } from "lib/sentry";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import store from "./store";

// Lang
import commonEn from "./translations/en/common.json";
import commonEs from "./translations/es/common.json";
import commonPr from "./translations/pr/common.json";
import collaboratorsEn from "./translations/en/collaborators/collaborators.json";
import collaboratorsEs from "./translations/es/collaborators/collaborators.json";
import collaboratorsPr from "./translations/pr/collaborators/collaborators.json";
import HRAnalyticsEn from "./translations/en/HRAnalytics/hrAnalytics.json";
import HRAnalyticsEs from "./translations/es/HRAnalytics/hrAnalytics.json";
import HRAnalyticsPr from "./translations/pr/HRAnalytics/hrAnalytics.json";
import OnboardingEn from "./translations/en/Onboarding/onboarding.json";
import OnboardingEs from "./translations/es/Onboarding/onboarding.json";
import OnboardingPr from "./translations/pr/Onboarding/onboarding.json";
import templatesEn from "./translations/en/templates/templates.json";
import templatesEs from "./translations/es/templates/templates.json";
import templatesPr from "./translations/pr/templates/templates.json";
import accountEn from "./translations/en/account/account.json";
import accountEs from "./translations/es/account/account.json";
import accountPr from "./translations/pr/account/account.json";
import candidatesEn from "./translations/en/candidates/candidates.json";
import candidatesEs from "./translations/es/candidates/candidates.json";
import candidatesPr from "./translations/pr/candidates/candidates.json";
import performanceEn from "./translations/en/performance/performance.json";
import performanceEs from "./translations/es/performance/performance.json";
import performancePr from "./translations/pr/performance/performance.json";
import potentialEn from "./translations/en/Potential/potential.json";
import potentialEs from "./translations/es/Potential/potential.json";
import potentialPr from "./translations/pr/Potential/potential.json";
import bulkUploadEn from "./translations/en/bulkUpload/bulkUpload.json";
import bulkUploadEs from "./translations/es/bulkUpload/bulkUpload.json";
import bulkUploadPr from "./translations/pr/bulkUpload/bulkUpload.json";
import authenticationEn from "./translations/en/authentication/authentication.json";
import authenticationEs from "./translations/es/authentication/authentication.json";
import authenticationPr from "./translations/pr/authentication/authentication.json";
import engagementEn from "./translations/en/engagement/engagement.json";
import engagementEs from "./translations/es/engagement/engagement.json";
import engagementPr from "./translations/pr/engagement/engagement.json";
import goalsEn from "./translations/en/goals/goals.json";
import goalsEs from "./translations/es/goals/goals.json";
import goalsPr from "./translations/pr/goals/goals.json";
import developmentPlanEn from "./translations/en/developmentPlan/developmentPlan.json";
import developmentPlanEs from "./translations/es/developmentPlan/developmentPlan.json";
import developmentPlanPr from "./translations/pr/developmentPlan/developmentPlan.json";
import generalAdministratorEn from "./translations/en/generalAdministrator/generalAdministrator.json";
import generalAdministratorEs from "./translations/es/generalAdministrator/generalAdministrator.json";
import generalAdministratorPr from "./translations/pr/generalAdministrator/generalAdministrator.json";
import feedbackEn from "./translations/en/account/feedback.json";
import feedbackEs from "./translations/es/account/feedback.json";
import feedbackPr from "./translations/pr/account/feedback.json";
import surveyProcessEn from "./translations/en/surveyProcess/surveyProcess.json";
import surveyProcessEs from "./translations/es/surveyProcess/surveyProcess.json";
import surveyProcessPr from "./translations/pr/surveyProcess/surveyProcess.json";
import planningEn from "./translations/en/planning/planning.json";
import planningEs from "./translations/es/planning/planning.json";
import planningPr from "./translations/pr/planning/planning.json";
import formValidationEn from "./translations/en/formValidations/formValidations.json";
import formValidationEs from "./translations/es/formValidations/formValidations.json";
import formValidationPr from "./translations/pr/formValidations/formValidations.json";
import talentDrainEn from "./translations/en/talentDrain/talentDrain.json";
import talentDrainEs from "./translations/es/talentDrain/talentDrain.json";
import talentDrainPr from "./translations/pr/talentDrain/talentDrain.json";
import timeOffEn from "./translations/en/timeOff/timeOff.json";
import timeOffEs from "./translations/es/timeOff/timeOff.json";
import timeOffPr from "./translations/pr/timeOff/timeOff.json";
import tablesEn from "./translations/en/tables/tables.json";
import tablesEs from "./translations/es/tables/tables.json";
import tablesPr from "./translations/pr/tables/tables.json";
import OnboardingFollowUpEn from "./translations/en/onboardingFollowUp/onboardingFollowUp.json";
import OnboardingFollowUpEs from "./translations/es/onboardingFollowUp/onboardingFollowUp.json";
import OnboardingFollowUpPr from "./translations/pr/onboardingFollowUp/onboardingFollowUp.json";
import AudiencesEn from "./translations/en/audiences/audiences.json";
import AudiencesEs from "./translations/es/audiences/audiences.json";
import AudiencesPr from "./translations/pr/audiences/audiences.json";
import PreboardingEn from "./translations/en/Preboarding/preboarding.json";
import PreboardingEs from "./translations/es/Preboarding/preboarding.json";
import PreboardingPr from "./translations/pr/Preboarding/preboarding.json";

import ProfileEn from "./translations/en/profile/profile.json";
import ProfileEs from "./translations/es/profile/profile.json";
import ProfilePr from "./translations/pr/profile/profile.json";

i18next
  .init({
    interpolation: { escapeValue: false },
    lng: "es",
    fallbackLng: "es",
    resources: {
      en: {
        common: commonEn,
        account: accountEn,
        feedback: feedbackEn,
        collaborators: collaboratorsEn,
        Onboarding: OnboardingEn,
        templates: templatesEn,
        candidates: candidatesEn,
        HRAnalytics: HRAnalyticsEn,
        performance: performanceEn,
        potential: potentialEn,
        bulkUpload: bulkUploadEn,
        authentication: authenticationEn,
        engagement: engagementEn,
        goals: goalsEn,
        developmentPlan: developmentPlanEn,
        administrator: generalAdministratorEn,
        surveys: surveyProcessEn,
        planning: planningEn,
        formValidations: formValidationEn,
        talentDrain: talentDrainEn,
        timeOff: timeOffEn,
        tables: tablesEn,
        onboardingFollowUp: OnboardingFollowUpEn,
        audiences: AudiencesEn,
        preboarding: PreboardingEn,
        profile: ProfileEn,
      },
      es: {
        common: commonEs,
        account: accountEs,
        feedback: feedbackEs,
        collaborators: collaboratorsEs,
        candidates: candidatesEs,
        HRAnalytics: HRAnalyticsEs,
        Onboarding: OnboardingEs,
        templates: templatesEs,
        performance: performanceEs,
        potential: potentialEs,
        bulkUpload: bulkUploadEs,
        authentication: authenticationEs,
        engagement: engagementEs,
        goals: goalsEs,
        developmentPlan: developmentPlanEs,
        administrator: generalAdministratorEs,
        surveys: surveyProcessEs,
        planning: planningEs,
        formValidations: formValidationEs,
        talentDrain: talentDrainEs,
        timeOff: timeOffEs,
        tables: tablesEs,
        onboardingFollowUp: OnboardingFollowUpEs,
        audiences: AudiencesEs,
        preboarding: PreboardingEs,
        profile: ProfileEs,
      },
      pr: {
        common: commonPr,
        account: accountPr,
        feedback: feedbackPr,
        collaborators: collaboratorsPr,
        Onboarding: OnboardingPr,
        templates: templatesPr,
        candidates: candidatesPr,
        HRAnalytics: HRAnalyticsPr,
        performance: performancePr,
        potential: potentialPr,
        bulkUpload: bulkUploadPr,
        authentication: authenticationPr,
        engagement: engagementPr,
        goals: goalsPr,
        developmentPlan: developmentPlanPr,
        administrator: generalAdministratorPr,
        surveys: surveyProcessPr,
        planning: planningPr,
        formValidations: formValidationPr,
        talentDrain: talentDrainPr,
        timeOff: timeOffPr,
        tables: tablesPr,
        onboardingFollowUp: OnboardingFollowUpPr,
        audiences: AudiencesPr,
        preboarding: PreboardingPr,
        profile: ProfilePr,
      },
    },
  })
  .then(() => {});

initSentry();

ReactDOM.render(
  <I18nextProvider i18n={ i18next }>
    <CookiesProvider>
      <Provider store={ store }>
        <App />
      </Provider>
    </CookiesProvider>
  </I18nextProvider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
