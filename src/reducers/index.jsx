import { combineReducers } from "redux";
import acknowledgementTypesReducer from "../redux/reducers/acknowledgementTypesReducer";
import managerReducer from "../redux/reducers/common/managerReducer";
import signInReducer from "../redux/reducers/userAuthReducer";
import createPasswordReducer from "../redux/reducers/userRecoveryReducer";
import countryReducer from "../redux/reducers/common/countryReducer";
import orgUnitReducer from "../redux/reducers/common/orgUnitReducer";
import collaboratorReducer from "../redux/reducers/collaboratorReducer";
import surveysReducer from "../redux/reducers/surveyProcessesReducer";
import cityReducer from "../redux/reducers/common/cityReducer";
import surveyResultReducer from "../redux/reducers/surveyResultReducer";
import documentTypesReducer from "../redux/reducers/documentTypesReducer";
import infoTypesReducer from "../redux/reducers/infoTypesReducer";
import collaboratorDocumentReducer from "../redux/reducers/collaborator/documentReducer";
import performanceReducer from "../redux/reducers/performance/performanceReducer";
import performanceSurveyResultsReducer from "../redux/reducers/performance/surveyResultsReducer";
import performanceRankingReducer from "../redux/reducers/performance/rankingReducer";
import performanceHeatMapReducer from "../redux/reducers/performance/heatMapReducer";
import performanceGoodLeaderReducer from "../redux/reducers/performance/goodLeaderReducer";
import collaboratorAttritionReducer from "../redux/reducers/collaborator/attritionReducer";
import attritionReducer from "../redux/reducers/attritionReducer";
import typeOfContractReducer from "../redux/reducers/typeOfContractReducer";
import stateReducer from "../redux/reducers/common/stateReducer";
import timeOffReducer from "../redux/reducers/timeOffReducer";
import positionReducer from "../redux/reducers/position/positionReducer";
import orgUnitsTypesReducer from "../redux/reducers/organizationUnits/orgUnitsTypesReducer";
import orgUnitsReducer from "../redux/reducers/organizationUnits/orgUnitsReducer";
import bulkUploadReducer from "../redux/reducers/bulkUploadReducer";
import potentialReducer from "../redux/reducers/potential/potentialReducer";
import followUpReducer from "../redux/reducers/followUpReducer";
import benefitsReducer from "../redux/reducers/benefitsReducer";
import timeOffCategoryReducer from "../redux/reducers/timeOffCategoryReducer";
import timeOffTypeReducer from "../redux/reducers/timeOffTypeReducer";
import employmentRelationshipReducer from "../redux/reducers/common/employmentRelationshipReducer";
import rolesReducer from "../redux/reducers/common/rolesReducer";
import currencyReducer from "../redux/reducers/common/currencyReducer";
import notificationReducer from "../redux/reducers/notification/notificationReducer";
import legalEntityReducer from "../redux/reducers/common/legalEntityReducer";
import hierarchyLevelReducer from "../redux/reducers/common/hierarchyLevelReducer";
import genderReducer from "../redux/reducers/common/genderReducer";
import dynamicAttributeReducer from "../redux/reducers/common/dynamicAttributeReducer";

const rootReducer = combineReducers({
  acknowledgementTypesReducer,
  managerReducer,
  signInReducer,
  createPasswordReducer,
  countryReducer,
  orgUnitReducer,
  collaboratorReducer,
  surveysReducer,
  cityReducer,
  surveyResultReducer,
  documentTypesReducer,
  infoTypesReducer,
  collaboratorDocumentReducer,
  performanceReducer,
  performanceSurveyResultsReducer,
  performanceRankingReducer,
  performanceHeatMapReducer,
  performanceGoodLeaderReducer,
  collaboratorAttritionReducer,
  attritionReducer,
  stateReducer,
  timeOffReducer,
  orgUnitsTypesReducer,
  orgUnitsReducer,
  typeOfContractReducer,
  positionReducer,
  bulkUploadReducer,
  potentialReducer,
  followUpReducer,
  benefitsReducer,
  timeOffCategoryReducer,
  timeOffTypeReducer,
  employmentRelationshipReducer,
  rolesReducer,
  currencyReducer,
  notificationReducer,
  legalEntityReducer,
  hierarchyLevelReducer,
  genderReducer,
  dynamicAttributeReducer,
});

export default rootReducer;
