import { getListSearch as getCollaboratorList, getListPaginated as getCollaboratorListPaginated, getOrchartList as getOrgchartCollaboratorList } from "redux/actions/collaboratorActions";
import { getSurveyResults, getPerformanceEvolution } from "redux/actions/surveyProcessesActions";
import { getTopList, getBottomList } from "redux/actions/performance/rankingActions";
import { getList as getHeatMapList } from "redux/actions/performance/heatMapActions";
import { getGoodLeaderTopRanking, getGoodLeaderBottomRanking, getGoodLeaderResults } from "redux/actions/performance/goodLeaderActions";
import { getList as getAttritionCollaboratorChart } from "redux/actions/collaborators/attritionActions";
import { getList as getAttritionChart } from "redux/actions/attritionActions";
import { ENABLE_STATES_COLLABORATOR_FILTER, FILTER_ACTIONS_TYPES } from "common/constants/filters";
import { INDEX } from "common/constants";

export const getFilterAction = (type) => {
  let action;
  switch (type) {
  case FILTER_ACTIONS_TYPES.collaborators:
    action = getCollaboratorListPaginated;
    break;
  case FILTER_ACTIONS_TYPES.potentialCollaborators:
    action = getSurveyResults;
    break;
  case FILTER_ACTIONS_TYPES.performance:
    action = [
      { func: getTopList, indexParams: [INDEX.zero] },
      { func: getBottomList, indexParams: [INDEX.zero] },
      { func: getHeatMapList, indexParams: [INDEX.zero, INDEX.one] },
      { func: getSurveyResults, indexParams: [INDEX.zero, INDEX.two] },
      { func: getPerformanceEvolution, indexParams: [] },
    ];
    break;
  case FILTER_ACTIONS_TYPES.attritionCollaborator:
    action = getAttritionCollaboratorChart;
    break;
  case FILTER_ACTIONS_TYPES.talentDrain:
    action = [
      { func: getSurveyResults, indexParams: [INDEX.zero, INDEX.one] },
      { func: getAttritionChart, indexParams: [] },
      { func: getCollaboratorList, indexParams: [INDEX.one] },
    ];
    break;
  case FILTER_ACTIONS_TYPES.orgChart:
    action = getOrgchartCollaboratorList;
    break;
  case FILTER_ACTIONS_TYPES.timeOff:
    /*  Note: filter actions for timeoff whould dispatch at the view,
        there is a few elements that we need to handle there like input
        date search and pagination
    */
    action = [];
    break;
  case FILTER_ACTIONS_TYPES.personalTimeOff:
    action = [];
    break;
  case FILTER_ACTIONS_TYPES.goodLeader:
    action = [
      { func: getGoodLeaderTopRanking, indexParams: [INDEX.zero] },
      { func: getGoodLeaderBottomRanking, indexParams: [INDEX.zero] },
      { func: getHeatMapList, indexParams: [INDEX.zero, INDEX.one] },
      { func: getGoodLeaderResults, indexParams: [INDEX.zero, INDEX.two] },
    ];
    break;
  default:
    break;
  }
  return action;
};

export const handleUpdatedValues = (defaultValues, filterType, values) => defaultValues[filterType]?.map((item) => values[filterType].find((element) => element === item.id));

export const enableFilter = (type) => ENABLE_STATES_COLLABORATOR_FILTER.includes(type);
