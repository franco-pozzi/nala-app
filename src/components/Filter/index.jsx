import React, {
  useState, useEffect, useCallback, useContext,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { usePrevious } from "react-tidy";
import PropTypes from "prop-types";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import Grid from "@material-ui/core/Grid";
import InputTag from "components/InputTag";
import SkeletonLoader from "components/SkeletonLoader";
import { SessionContext } from "modules/session/context";
import {
  SIZE,
  SKELETONS_NUMBER,
  FILTERS_KEYS,
  OBJECT_KEYS,
  VARIANT,
  BUTTON_STYLE_TYPES,
  INDEX,
  ALIGN_ITEMS,
  LOCAL_STORAGE_NAMES,
  ROLES,
} from "common/constants";
import {
  getOptionListId,
  getFormattedTags,
  getCompanyCountriesList,
  isAdmin,
  getActiveList,
  getItemFromLocalStorage,
} from "common/utils";
import { ENABLE_STATES_COLLABORATOR_FILTER, FILTER_ACTIONS_TYPES } from "common/constants/filters";
import { ReactComponent as FilterIcon } from "assets/images/general/filter.svg";
import { buildNewOptionArray } from "views/GeneralAdministrator/functions/units";
import { getList as getCountriesList } from "redux/actions/common/countryActions";
import { getList as getCitiesList } from "redux/actions/common/cityActions";
import { getList as getOrgUnitsList } from "redux/actions/common/orgUnitActions";
import { getMainList as getCollaboratorsMainList } from "redux/actions/collaboratorActions";
import { getList as getStatesList } from "redux/actions/common/stateActions";
import { getList as getTimeOffTypes } from "redux/actions/timeOffTypesActions";
import { enableFilter, getFilterAction, handleUpdatedValues } from "./functions";
import { useStyles, FilterIconContainer, StyledFilterButton } from "./styles";

const Filter = (props) => {
  const {
    type,
    externalParams,
    isButton,
    isMultiple,
    isLabel,
    externalHandler,
    defaultValues,
    dispatched: externalDispatched,
    limitTag,
    pagination,
    handleExternalQuery,
    isLoading,
  } = props;
  const [showFilters, setShowFilters] = useState(!isButton);
  const classes = useStyles();
  const { t } = useTranslation(["common"]);
  const { register } = useForm();
  const [dispatched, setDispatched] = useState(false);
  const [filterToUse, setFilterToUse] = useState([]);
  const [values, setValues] = useState({
    // Add here all filters
    managers: null,
    countries: null,
    cities: null,
    unities: null,
    periods: null,
    states: null,
    collaboratorsStates: enableFilter(type)
      ? [true]
      : [],
  });
  const [tags, setTags] = useState({
    // Add here all filters
    managers: [],
    countries: [],
    cities: [],
    unities: [],
    periods: [],
    states: [],
    collaboratorsStates: enableFilter(type)
      ? [
        {
          label: t("tables:filters.collaborator_states.active"),
          id: true,
        },
      ]
      : [],
  });
  const lastExternalParamsValue = usePrevious(externalParams, 1);
  const lastPageSelected = usePrevious(pagination, 1);

  const {
    list: countriesList,
    loadingList: isCountryLoadingList,
  } = useSelector(({ countryReducer }) => countryReducer);

  const {
    list: citiesList,
    isLoadingList: isCityLoadingList,
  } = useSelector(({ cityReducer }) => cityReducer);

  const {
    list: orgUnitList,
    loadingList: isOrgUnitLoadingList,
  } = useSelector(({ orgUnitReducer }) => orgUnitReducer);

  const {
    mainList: collaboratorsMainList,
    isLoadingList: isCollaboratorsLoadingList,
  } = useSelector(({ collaboratorReducer }) => collaboratorReducer);

  const {
    list: statesList,
    // commented till states service is ready
    // isLoadingList: isStateLoadingList,
  } = useSelector(({ stateReducer }) => stateReducer);

  const {
    list: timeOffTypesList,
  } = useSelector(({ timeOffTypeReducer }) => timeOffTypeReducer);

  const isLoadingFilters = isCountryLoadingList
    || isCityLoadingList
    || isOrgUnitLoadingList
    || (isCollaboratorsLoadingList && !collaboratorsMainList)
    || isLoading;

  const dispatch = useDispatch();

  const {
    state: { user },
  } = useContext(SessionContext);

  const activeManagerList = getActiveList(
    getItemFromLocalStorage(LOCAL_STORAGE_NAMES.managers),
  );

  useEffect(() => {
    dispatch(getCountriesList());
    dispatch(getCitiesList());
    dispatch(getOrgUnitsList());
    dispatch(getStatesList());
    dispatch(getTimeOffTypes());
    const managerQuery = { user_roles_name_eq: ROLES.MANAGER };
    if (!isAdmin(user?.userCookies)) {
      managerQuery.manager_id_eq = user?.employee?.id;
    }
    dispatch(getCollaboratorsMainList({ q: managerQuery }));

    // eslint-disable-next-line
  }, []);

  const getListToUse = useCallback(
    (filterType, collaboratorsMainList) => {
      const FILTER_LIST = {
        // show countries with collaborators
        countries: getCompanyCountriesList(
          countriesList,
          collaboratorsMainList,
        ),
        cities: citiesList,
        states: statesList,
        timeOffTypes: timeOffTypesList,
      };
      return FILTER_LIST[filterType];
    },
    [countriesList, citiesList, statesList, timeOffTypesList],
  );

  const getFilterOptions = useCallback(
    (filterType, key, isOrgUnit, collaboratorsMainList, managersList) => {
      if (isOrgUnit) {
        return getFormattedTags(buildNewOptionArray(orgUnitList), key);
      }
      if (filterType === FILTERS_KEYS.managers) {
        return getFormattedTags(managersList, key);
      }
      return getFormattedTags(
        getListToUse(filterType, collaboratorsMainList),
        key,
      );
    },
    [getListToUse, orgUnitList],
  );

  const getAllFilters = useCallback(
    (collaboratorsMainList, managersList) => [
      {
        id: FILTERS_KEYS.collaborators,
        label: FILTERS_KEYS.collaborators,
        options: [],
        type: [],
      },
      {
        id: FILTERS_KEYS.managers,
        label: FILTERS_KEYS.manager,
        options: getFilterOptions(
          FILTERS_KEYS.managers,
          OBJECT_KEYS.fullname,
          false,
          collaboratorsMainList,
          managersList,
        ),
        type: [
          FILTER_ACTIONS_TYPES.collaborators,
          FILTER_ACTIONS_TYPES.potentialCollaborators,
          FILTER_ACTIONS_TYPES.talentDrain,
          FILTER_ACTIONS_TYPES.performance,
          FILTER_ACTIONS_TYPES.orgChart,
          FILTER_ACTIONS_TYPES.goodLeader,
        ],
      },
      {
        id: FILTERS_KEYS.countries,
        label: FILTERS_KEYS.country,
        options: getFilterOptions(
          FILTERS_KEYS.countries,
          OBJECT_KEYS.name,
          false,
          collaboratorsMainList,
        ),
        type: [
          FILTER_ACTIONS_TYPES.collaborators,
          FILTER_ACTIONS_TYPES.potentialCollaborators,
          FILTER_ACTIONS_TYPES.talentDrain,
          FILTER_ACTIONS_TYPES.performance,
          FILTER_ACTIONS_TYPES.orgChart,
          FILTER_ACTIONS_TYPES.timeOff,
          FILTER_ACTIONS_TYPES.goodLeader,
        ],
      },
      {
        id: FILTERS_KEYS.cities,
        label: FILTERS_KEYS.city,
        options: getFilterOptions(
          FILTERS_KEYS.cities,
          OBJECT_KEYS.name,
          false,
          collaboratorsMainList,
        ),
        type: [
          FILTER_ACTIONS_TYPES.collaborators,
          FILTER_ACTIONS_TYPES.potentialCollaborators,
          FILTER_ACTIONS_TYPES.talentDrain,
          FILTER_ACTIONS_TYPES.performance,
          FILTER_ACTIONS_TYPES.orgChart,
          FILTER_ACTIONS_TYPES.timeOff,
          FILTER_ACTIONS_TYPES.goodLeader,
        ],
      },
      {
        id: FILTERS_KEYS.unities,
        label: FILTERS_KEYS.unit,
        options: getFilterOptions(
          FILTERS_KEYS.unities,
          OBJECT_KEYS.name,
          true,
          collaboratorsMainList,
        ),
        type: [
          FILTER_ACTIONS_TYPES.collaborators,
          FILTER_ACTIONS_TYPES.potentialCollaborators,
          FILTER_ACTIONS_TYPES.talentDrain,
          FILTER_ACTIONS_TYPES.performance,
          FILTER_ACTIONS_TYPES.orgChart,
          FILTER_ACTIONS_TYPES.timeOff,
          FILTER_ACTIONS_TYPES.goodLeader,
        ],
      },
      {
        id: FILTERS_KEYS.periods,
        label: FILTERS_KEYS.periods,
        options: [],
        type: [FILTER_ACTIONS_TYPES.attritionCollaborator],
      },
      {
        id: FILTERS_KEYS.states,
        label: FILTERS_KEYS.states,
        options: statesList.map((element) => ({
          ...element,
          label: t(`timeOff:states.${element.id}`),
        })),
        type: [FILTER_ACTIONS_TYPES.timeOff],
      },
      {
        id: FILTERS_KEYS.timeOffTypes,
        label: FILTERS_KEYS.timeOffTypes,
        options: timeOffTypesList?.map((element) => ({
          label: element.name,
        })),
        type: [FILTER_ACTIONS_TYPES.personalTimeOff],
      },
      {
        id: FILTERS_KEYS.collaboratorsStates,
        label: FILTERS_KEYS.collaboratorsStates,
        options: [
          {
            label: t("tables:filters.collaborator_states.active"),
            id: true,
          },
          {
            label: t("tables:filters.collaborator_states.inactive"),
            id: false,
          },
        ],
        type: ENABLE_STATES_COLLABORATOR_FILTER,
      },
    ],
    [getFilterOptions, statesList, timeOffTypesList, t],
  );

  const action = getFilterAction(type);

  const handleTags = (selectedTags, prop) => {
    setTags({
      ...tags,
      [prop]: selectedTags,
    });
    setValues({
      ...values,
      [prop]: getOptionListId(selectedTags),
    });

    if (externalHandler) {
      externalHandler(prop, { [prop]: selectedTags });
    }
    setDispatched(false);
    externalDispatched && externalDispatched.reset(false);
  };

  // this CALLBACK build the structure for all posible filters
  // handle two kind of filters: single one API call and multiple API calls
  // for multiple API calls, action constant return a object with multiple functions(API calls) and an array of indexs
  // each index represents a specific param for each API call.
  const handleAction = useCallback(() => {
    const queryValues = {
      managers: values.managers,
      countries: values.countries,
      cities: values.cities,
      unities: values.unities,
      periods: values.periods,
      collaboratorsStates: values.collaboratorsStates,
    };

    if (defaultValues) {
      queryValues.managers = handleUpdatedValues(
        defaultValues,
        FILTERS_KEYS.managers,
        values,
      );
      queryValues.countries = handleUpdatedValues(
        defaultValues,
        FILTERS_KEYS.countries,
        values,
      );
      queryValues.cities = handleUpdatedValues(
        defaultValues,
        FILTERS_KEYS.cities,
        values,
      );
      queryValues.unities = handleUpdatedValues(
        defaultValues,
        FILTERS_KEYS.unities,
        values,
      );
      queryValues.collaboratorsStates = handleUpdatedValues(
        defaultValues,
        FILTERS_KEYS.collaboratorsStates,
        values,
      );
    }
    const query = {
      q: {
        // add here all queries
        [type === FILTER_ACTIONS_TYPES.orgChart
          ? "managers_ids_special_in"
          : "manager_id_special_in"]: values.managers,
        country_id_in: queryValues.countries,
        city_id_in: queryValues.cities,
        organization_unit_id_in: queryValues.unities,
        // period_id_in: queryValues.periods,
      },
    };

    if (enableFilter(type)) {
      query.q.person_full_name_cont = "";
      query.q.active_in = queryValues.collaboratorsStates;
      query.q.employee_active_in = queryValues.collaboratorsStates;
    }

    if (handleExternalQuery) {
      handleExternalQuery(query);
    }

    if (!isFunction(action)) {
      action.forEach((item) => {
        const paramsToUse = item.indexParams.map(
          (index) => externalParams[index],
        );
        dispatch(item.func(...paramsToUse, query));
      });
    } else {
      dispatch(action(...externalParams, query));
    }
  }, [
    action,
    values,
    externalParams,
    dispatch,
    defaultValues,
    type,
    handleExternalQuery,
  ]);

  useEffect(() => {
    if (type === FILTER_ACTIONS_TYPES.potentialCollaborators) {
      const spreadLastExternalParam = [...lastExternalParamsValue];
      spreadLastExternalParam.forEach((item) => {
        if (externalParams[INDEX.zero] !== item[INDEX.zero]) {
          setDispatched(false);
        }
      });
    }

    if (!dispatched || (externalDispatched && !externalDispatched.value)) {
      handleAction();
      setDispatched(true);
      externalDispatched && externalDispatched.reset(true);
    }
  }, [
    dispatch,
    dispatched,
    handleAction,
    values,
    externalParams,
    lastExternalParamsValue,
    type,
    isMultiple,
    externalDispatched,
    pagination,
    lastPageSelected,
  ]);

  useEffect(() => {
    if (
      !isEmpty(collaboratorsMainList)
      && activeManagerList !== null
      && !isEmpty(countriesList)
      && !isEmpty(orgUnitList)
      && isEmpty(filterToUse)
    ) {
      const getFilterGivenType = (filterType) => getAllFilters(collaboratorsMainList, activeManagerList).filter(
        (filterOption) => includes(filterOption.type, filterType) && filterOption,
      );
      setFilterToUse(getFilterGivenType(type));
    }
  }, [
    type,
    countriesList,
    orgUnitList,
    filterToUse,
    getAllFilters,
    collaboratorsMainList,
    activeManagerList,
  ]);

  return (
    <Grid container data-testid={ "filter-component" }>
      <Grid item xs={ 12 } sm={ 6 } md={ 1 }>
        {isButton ? (
          <StyledFilterButton
            onClick={ () => setShowFilters(!showFilters) }
            variant={ VARIANT.outlined }
            typeStyle={ BUTTON_STYLE_TYPES.OUTLINED }
            showFilters={ showFilters }
          >
            <FilterIconContainer>
              <FilterIcon />
              <span>{`${t("common.filters")}`}</span>
            </FilterIconContainer>
          </StyledFilterButton>
        ) : (
          isLabel && (
            <FilterIconContainer
              display={ ALIGN_ITEMS.flex }
              alignItems={ ALIGN_ITEMS.center }
            >
              <FilterIcon />
              <span>{`${t("common.filters")}:`}</span>
            </FilterIconContainer>
          )
        )}
      </Grid>
      {/* NOTE: mostly inline conditions are temporal until all services for this are ready */}
      {isLoadingFilters
        && !isButton
        && [
          ...Array(
            type === FILTER_ACTIONS_TYPES.attritionCollaborator ? 1 : 4,
          ).keys(),
        ].map((item) => (
          <Grid
            key={ `skeleton-${item}` }
            item
            xs={ 12 }
            sm={ 6 }
            md={ type === FILTER_ACTIONS_TYPES.talentDrain
              ? 2
              : type === FILTER_ACTIONS_TYPES.attritionCollaborator
                ? 12
                : 2 }
          >
            <SkeletonLoader numberOfSkeletons={ SKELETONS_NUMBER.ONE } />
          </Grid>
        ))}
      {!isLoadingFilters && showFilters
        && filterToUse.map((filter) => (
          <Grid
            item
            xs={ 12 }
            sm={ 6 }
            md={ type === FILTER_ACTIONS_TYPES.attritionCollaborator
              || type === FILTER_ACTIONS_TYPES.personalTimeOff ? 12 : 2 }
            key={ filter.id + filter.label }
          >
            <InputTag
              id={ filter.id }
              limitTags={ limitTag }
              label={ t(`tables:filters.${filter.label}`) }
              size={ SIZE.small }
              customStyle={ classes.filter }
              name={ filter.id }
              register={ register }
              onChange={ (selectedTags) => handleTags(selectedTags, filter.id) }
              data={ filter.options }
              hasCheckbox
              isDisabled={ isLoadingFilters
                || type === FILTER_ACTIONS_TYPES.attritionCollaborator } // note: type condition is temporal until service implementation will ready
              groupBy={ {
                filterBy: filter.id,
                compareWith: FILTERS_KEYS.cities,
              } }
              defaultValues={ defaultValues ? defaultValues[filter.id] : tags[filter.id] }
            />
          </Grid>
        ))}
    </Grid>
  );
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  externalParams: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isButton: PropTypes.bool,
  isMultiple: PropTypes.bool,
  isLabel: PropTypes.bool,
  externalHandler: PropTypes.func,
  defaultValues: PropTypes.object,
  dispatched: PropTypes.bool,
  limitTag: PropTypes.number,
  pagination: PropTypes.number,
  handleExternalQuery: PropTypes.func,
  isLoading: PropTypes.bool,
};

Filter.defaultProps = {
  externalParams: "",
  isButton: false,
  isMultiple: false,
  isLabel: false,
  externalHandler: null,
  defaultValues: null,
  dispatched: false,
  limitTag: 10,
  pagination: 1,
  handleExternalQuery: () => {},
  isLoading: false,
};

export default Filter;
