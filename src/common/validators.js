import forEach from "lodash/forEach";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import find from "lodash/find";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";
import {
  TYPES,
  FORMAT_TEXT,
  ROLES,
  DASHBOARD_REDUCER,
  NUMBER_OF_EVALUATIONS,
  OBJECT_KEYS,
  ORG_UNITS,
  INDEX,
} from "common/constants";
import {
  EVALUATION_TYPE,
} from "common/constants/surveyProcess";
import {
  getUserRoles,
  getPercent,
} from "./utils";

export const checked = (value, options) => {
  if (value !== true) {
    return options.message || "must be checked";
  }
};

export const removeDataEmpty = (data) => {
  forEach(Object.keys(data), (value) => {
    isEqual(typeof data[value], TYPES.string)
      ? (isEmpty(data[value]) || isEmptyDate(data[value], value))
        && delete data[value]
      : isEqual(typeof data[value], TYPES.object)
        && removeDataEmpty(data[value]);
  });
};

export const isEmptyDate = (selectedDate, value) => (
  (!includes(selectedDate, "-") && isEqual(value, OBJECT_KEYS.birthDate))
    || isNull(selectedDate)
);

// Separate CamelCase texts
export const getFormatText = (text) => text.replace(FORMAT_TEXT, "$1 $2");

// PeersEvaluation text
export const getPeersEvaluationText = (t) => {
  const evaluationName = OBJECT_KEYS.pairs;
  return t(`surveys:evaluation_types.${evaluationName }`);
};

export const getEvaluationType = (type, t) => {
  let evaluationType = "";
  switch (type) {
  case EVALUATION_TYPE.AUTOEVALUATION:
    evaluationType = t("surveys:evaluation_types.self_evaluation");
    break;
  case EVALUATION_TYPE.MANAGER:
    evaluationType = t("surveys:evaluation_types.manager");
    break;
  case EVALUATION_TYPE.PAIRS:
    evaluationType = getPeersEvaluationText(t);
    break;
  case EVALUATION_TYPE.COLLABORATORS:
    evaluationType = t("surveys:evaluation_types.collaborators");
    break;
  case EVALUATION_TYPE.OVERALL:
    evaluationType = t("surveys:evaluation_types.overall");
    break;
  default:
    break;
  }
  return evaluationType;
};
/**
 * @deprecated Please don't use this method this method was deprecated
 */
export const getValidUser = (user) => (user);

export const isRolAdmin = (roles) => includes(getUserRoles(roles), ROLES.ADMIN) || includes(getUserRoles(roles), ROLES.ADMIN_NALA);

export const validateNoDataMessage = (
  reducerToUse,
  dashboardReducer,
  surveyResultList,
) => (
  (isEmpty(
    isEqual(reducerToUse, DASHBOARD_REDUCER.performance)
      ? dashboardReducer.performance_process
      : dashboardReducer.potentialProcess,
  )
      && !dashboardReducer.isLoading)
    || isEmpty(surveyResultList)
);

export const allEvaluations = (surveyResultList) => {
  const evsAns = [];
  if (surveyResultList) {
    for (let i = 0; i < surveyResultList.length; i += 1) {
      forEach(surveyResultList[i].results_by_evaluation_type, (evalu) => {
        if (!includes(evsAns, evalu.evaluation_type)) {
          evsAns.push(evalu.evaluation_type);
        }
      });
      if (isEqual(evsAns.length, NUMBER_OF_EVALUATIONS)) break;
    }
  }
  return evsAns;
};

export const getEvaluations = (surveyResultList, t) => {
  const aux = [];
  const evaluations = allEvaluations(surveyResultList);
  if (!isEmpty(evaluations)) {
    forEach(evaluations, (evaluationType) => aux.push({
      id: evaluationType,
      label: getEvaluationType(evaluationType, t),
      customRender: (rowData) => {
        const object = find(
          rowData.results_by_evaluation_type,
          ({ evaluation_type }) => isEqual(evaluation_type, evaluationType),
        );
        return object && object.result;
      },
    }));
  }
  return aux;
};

const getMaxScale = (scale) => scale.sort((a, b) => b.top - a.top)[0]?.top;

export const getDataToDownload = (surveyResultList, enablePercent, scale, t) => {
  const data = [];
  // search evaluations by survey results
  const evaluations = getEvaluations(surveyResultList, t);
  const maxScale = getMaxScale(scale);

  surveyResultList.forEach((userData, index) => {
    if (userData?.employee) {
      data.push(
        {
          [t("collaborators:table.table-head.personal_id")]: userData.employee?.personal_id,
          [t("collaborators:table.table-head.name")]: userData.employee?.full_name,
          [t("collaborators:table.table-head.position")]: userData.employee?.job_position?.position_name,
          [t("collaborators:table.excel.manager_name")]: userData.employee?.manager_name,
          [t("collaborators:table.excel.city")]: userData.employee?.job_position?.city?.name,
        },
      );
    }
    if (evaluations) {
      // Create column by evaluation type
      evaluations.forEach((evaluation) => {
        const totalResult = userData.results_by_evaluation_type?.find((item) => item.evaluation_type === evaluation.id);
        data[index][evaluation.label] = totalResult?.result || "";
      });
    }
    // Total result
    data[index][t("collaborators:table.table-head.total_evaluation")] = userData.result;
    if (enablePercent) {
      data[index]["%"] = `${getPercent(userData.score)}/${getPercent(maxScale)}`;
    }
  });

  return data;
};
export const isNullOrUndefined = (toValidate) => isNull(toValidate) || isUndefined(toValidate);

export const isNullOrEmpty = (toValidate) => isNull(toValidate) || isEmpty(toValidate);
export const isRolManager = (userCookies, roles = null) => includes(roles || getUserRoles(userCookies), ROLES.MANAGER);

export const isAdminOrManager = (userCookies, from) => isRolAdmin(userCookies) || (from && isRolManager(userCookies));

export const hasEvaluationType = (evaluationsListByTypes, type) => {
  const evaluationsTypes = evaluationsListByTypes?.map((evaluation) => evaluation.evaluation_type);
  const hasEvaluation = evaluationsTypes?.includes(type);
  return hasEvaluation;
};

const getOrganizationUnits = (orgUnits) => {
  let department = "";
  let area = "";
  let subarea = "";

  if (orgUnits) {
    department = orgUnits.find((orgUnit) => isEqual(orgUnit.organization_unit_type_name, ORG_UNITS.division))?.name;
    area = orgUnits.find((orgUnit) => isEqual(orgUnit.organization_unit_type_name, ORG_UNITS.area))?.name;
    subarea = orgUnits.find((orgUnit) => isEqual(orgUnit.organization_unit_type_name, ORG_UNITS.subarea))?.name;
  }

  return { department, area, subarea };
};

export const evaluationTypeNames = (t) => ({
  [EVALUATION_TYPE.AUTOEVALUATION]: {
    submittedName: t("surveys:evaluation_types.self_evaluation"),
    receivedName: t("surveys:evaluation_types.self_evaluation"),
  },
  [EVALUATION_TYPE.MANAGER]: {
    submittedName: t("surveys:evaluations.manager.submitted"),
    receivedName: t("surveys:evaluations.manager.received"),
  },
  [EVALUATION_TYPE.PAIRS]: {
    submittedName: t("surveys:evaluations.pairs.submitted"),
    receivedName: t("surveys:evaluations.pairs.received"),
  },
  [EVALUATION_TYPE.COLLABORATORS]: {
    submittedName: t("surveys:evaluations.collaborators.submitted"),
    receivedName: t("surveys:evaluations.collaborators.received"),
  },
  [EVALUATION_TYPE.OVERALL]: {
    submittedName: t("surveys:evaluation_types.overall"),
    receivedName: t("surveys:evaluation_types.overall"),
  },
});

const hasReceivedEvaluation = (evalType) => !isEqual(evalType.evaluation_type, EVALUATION_TYPE.AUTOEVALUATION)
&& !isEqual(evalType.evaluation_type, EVALUATION_TYPE.OVERALL);

// Results by employee
export const getResultByEmployeeToDownload = (surveyResultList, t) => {
  const participationData = [];
  const evaluationDetails = [];
  // search evaluations by survey results
  const evaluations = surveyResultList?.employees[INDEX.zero]?.results;

  surveyResultList.employees.forEach((employee, index) => {
    const organizationUnits = getOrganizationUnits(employee?.organization_units);

    participationData.push(
      {
        [t("collaborators:table.table-head.personal_id")]: employee?.personal_id,
        [t("collaborators:table.table-head.name")]: employee?.full_name,
        [t("collaborators:table.table-head.email")]: employee?.email,
        [t("collaborators:table.excel.manager_name")]: employee?.manager_name,
        [t("collaborators:table.table-head.position")]: employee?.position_name,
        [t("collaborators:table.excel.department")]: organizationUnits?.department,
        [t("collaborators:table.excel.area")]: organizationUnits?.areaarea,
        [t("collaborators:table.excel.subarea")]: organizationUnits?.subarea,
        [t("surveys:report")]: employee?.total_team,
        [t("surveys:evaluations_to_answers")]: employee?.total_to_evaluate,
      },
    );

    if (evaluations) {
      // Evaluations submitted
      evaluations.forEach((evaluation) => {
        const evaluationLabel = evaluationTypeNames(t)[evaluation.evaluation_type]?.submittedName;
        const totalResult = employee.results?.find((item) => isEqual(item.evaluation_type, evaluation.evaluation_type));
        participationData[index][evaluationLabel] = totalResult.forms_filled_submitted;
      });
      // Status
      participationData[index][t("tables:headers.state")] = t(`planning:processDetail.status.${employee?.status}`);
      // Evaluations received
      evaluations.filter((evalType) => hasReceivedEvaluation(evalType)).forEach((evaluation) => {
        const evaluationLabelReceived = evaluationTypeNames(t)[evaluation.evaluation_type]?.receivedName;
        const totalResult = employee.results?.find((item) => isEqual(item.evaluation_type, evaluation.evaluation_type));
        participationData[index][evaluationLabelReceived] = totalResult.forms_filled_received;
      });
    }
  });

  surveyResultList.results.forEach((result) => {
    const organizationUnitsByEvaluator = getOrganizationUnits(result?.evaluation_details?.evaluator?.organization_units);
    evaluationDetails.push(
      {
        [t("surveys:evaluator_name")]: result?.evaluation_details?.evaluator?.name,
        [t("surveys:evaluator_email")]: result?.evaluation_details?.evaluator?.email,
        [t("collaborators:table.excel.department")]: organizationUnitsByEvaluator?.department,
        [t("collaborators:table.excel.area")]: organizationUnitsByEvaluator?.areaarea,
        [t("collaborators:table.excel.subarea")]: organizationUnitsByEvaluator?.subarea,
        [t("surveys:evaluation_type")]: getEvaluationType(result.evaluation_type, t),
        [t("surveys:evaluated_name")]: result?.evaluation_details?.evaluated?.name,
        [t("surveys:evaluated_email")]: result?.evaluation_details?.evaluated?.email,
        [t("surveys:comments")]: result?.comment,
      },
    );
  });

  const allData = [
    {
      name: t("planning:modal.title"),
      data: participationData,
    },
    {
      name: t("surveys:details"),
      data: evaluationDetails,
    },
  ];

  return allData;
};
