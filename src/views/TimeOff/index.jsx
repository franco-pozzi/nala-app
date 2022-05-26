import React, {
  useState, useEffect, useContext, useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { SessionContext } from "modules/session/context";
import { useProcessToast } from "hooks/timeOff/useProcessToast";
import Tab from "components/Tab";
import TabPanel from "components/TabPanel";
import DateFilter from "components/DateFilter";
import ViewHeaderTitle from "components/ViewHeaderTitle";
import Filter from "components/Filter";
import DownloadExcelButton from "components/DownloadExcelButton";
import { FILTER_ACTIONS_TYPES } from "common/constants/filters";
import {
  PAGINATION, MIN_VALUE, DIRECTION, ALIGN_ITEMS, VARIANT, ROLES,
} from "common/constants";
import {
  isAdminOrManager as isAdminOrManagerFunction,
  isAdmin as isAdminFunction,
  isValidRole,
  isAdminNala,
  isMainCompany,
} from "common/utils";
import {
  getList,
  getTimeOffList,
  getExcelList,
  resetTimeOffList,
  resetState,
} from "redux/actions/timeOffActions";
import InputTextSearch from "./components/InputTextSearch";
import PopUpForm from "./components/PopUpForm";
import CollaboratorsCard from "./components/TabGantTable/components/CollaboratorsCard";
import TabGantTable from "./components/TabGantTable";
import PersonalTab from "./components/PersonalTab";
import { getExcelData, getTabs } from "./functions";
import {
  StyledTimeOffGrid,
  StyledCustomPaper,
  StyledCardPaper,
  StyledSpacedGrid,
  StyledTimeOffPopUp,
  StyledTabStyle,
  StyledDateContainer,
} from "./styles";

const TimeOff = () => {
  const { t } = useTranslation(["common", "timeOff"]);
  const dataTestId = "time-off-component-view";
  const {
    state: { user },
  } = useContext(SessionContext);
  const isNalaAdmin = isAdminNala(user?.userCookies);
  const isAdminOrManager = isAdminOrManagerFunction(user?.userCookies) && !isValidRole(user?.userCookies, ROLES.TALENT_MANAGER);
  const isAdmin = isAdminFunction(user?.userCookies) && !isValidRole(user?.userCookies, ROLES.TALENT_MANAGER);
  const activeTab = isAdminOrManager ? 1 : 0;

  const [tabHandler, setTabHandler] = useState(activeTab);
  const [countriesFilter, setCountriesFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [unitiesFilter, setUnitiesFilter] = useState([]);
  const [statesFilter, setStatesFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [pageFilter, setPageFilter] = useState({
    number: MIN_VALUE,
    size: PAGINATION.maxPerPage,
  });
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [processState, setProcessState] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCount = usePrevious(pageFilter);

  const handleValueChanged = (value) => {
    setTabHandler(value);
  };

  const {
    list,
    isLoadingList,
    timeOffList,
    timeOffListTotal,
    timeOffLoadingList,
    excelList,
    isLoadingExcelList,
  } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const onDownloadExcel = (filename) => () => {
    const data = excelList ? getExcelData(excelList, t) : [];
    return [data, filename];
  };

  const FILTERS = {
    countries: {
      state: countriesFilter,
      set: setCountriesFilter,
    },
    cities: {
      state: citiesFilter,
      set: setCitiesFilter,
    },
    unities: {
      state: unitiesFilter,
      set: setUnitiesFilter,
    },
    states: {
      state: statesFilter,
      set: setStatesFilter,
    },
  };

  const handleExternalFilter = (selectedfilter, values) => {
    const filterSet = FILTERS[selectedfilter].set;
    const filteredValues = values[selectedfilter].map((item) => item.id);
    filterSet(filteredValues || []);
  };

  const dispatch = useDispatch();

  const pageHandler = async (event, newPage) => {
    window.scroll(0, 0);
    await setPageFilter({ size: PAGINATION.maxPerPage, number: newPage });
  };

  const inputHandler = (name = "") => {
    setSearchFilter(name);
  };

  const endingDateHandler = (date) => {
    setEndingDate(date);
  };

  const startingDateHandler = (date) => {
    setStartingDate(date);
  };

  useProcessToast("", setProcessState, processState);
  useEffect(() => {
    const query = {
      q: {
        country_id_in: countriesFilter,
        city_id_in: citiesFilter,
        organization_unit_id_in: unitiesFilter,
      },
    };

    const queryCollaborator = JSON.parse(JSON.stringify(query));
    const queryTimeOff = JSON.parse(JSON.stringify(query));
    queryCollaborator.q.time_offs_state_in = statesFilter;
    queryTimeOff.q.state_in = statesFilter;

    const formatedPage = {
      size: pageFilter.size,
      number: pageFilter.number + 1,
    };

    if (processState !== "") {
      setProcessState("");
    } else if (prevCount !== pageFilter) {
      dispatch(resetTimeOffList());
      dispatch(resetState());
      dispatch(
        getList(searchFilter, startingDate, endingDate, queryCollaborator),
      );
      dispatch(
        getExcelList(searchFilter, startingDate, endingDate, queryTimeOff),
      );
      dispatch(
        getTimeOffList(
          searchFilter,
          startingDate,
          endingDate,
          formatedPage,
          queryTimeOff,
        ),
      );
    } else {
      setPageFilter({ number: MIN_VALUE, size: PAGINATION.maxPerPage });
    }
    // note: the way how they aproach this needs this, we MUST change this
    // eslint-disable-next-line
  }, [
    searchFilter,
    citiesFilter,
    countriesFilter,
    dispatch,
    statesFilter,
    unitiesFilter,
    pageFilter,
    startingDate,
    endingDate,
    processState,
  ]);

  const handleEdit = (data) => {
    setSelectedData(data);
  };

  const showPersonal = !isNalaAdmin && isMainCompany(user);

  return (
    <div data-testid={ dataTestId }>
      <Box p={ 4 }>
        <Hidden smDown>
          <StyledSpacedGrid container direction={ DIRECTION.row }>
            <Grid item>
              <ViewHeaderTitle title={ t("timeOff:viewTitle") } />
            </Grid>
            <Grid item>
              {showPersonal && <PopUpForm data={ selectedData } setData={ setSelectedData } />}
            </Grid>
          </StyledSpacedGrid>

          <Grid container spacing={ 4 }>
            <Grid item xs={ 12 }>
              {isAdminOrManager && showPersonal && (
                <Tab
                  tabs={ getTabs(t) }
                  onChange={ handleValueChanged }
                  tabValue={ tabHandler }
                />
              )}
              <StyledCustomPaper>
                <TabPanel value={ tabHandler } index={ 0 }>
                  <PersonalTab handleEdit={ handleEdit } />
                </TabPanel>

                {isAdminOrManager && (
                  <TabPanel value={ tabHandler } index={ 1 } isLoading={ false }>
                    <Grid container>
                      <StyledTimeOffGrid item xs={ 12 }>
                        <Filter
                          type={ FILTER_ACTIONS_TYPES.timeOff }
                          isLabel
                          isMultiple
                          externalParams={ [
                            searchFilter,
                            startingDate,
                            endingDate,
                            pageFilter,
                          ] }
                          externalHandler={ handleExternalFilter }
                        />
                      </StyledTimeOffGrid>
                    </Grid>

                    <Grid container spacing={ -1 } alignItems={ ALIGN_ITEMS.center }>
                      <Grid item xs={ 5 }>
                        <DateFilter
                          startingDateHandler={ startingDateHandler }
                          endingDateHandler={ endingDateHandler }
                        />
                      </Grid>
                      <Grid item xs={ 2 }>
                        <DownloadExcelButton
                          onClick={ onDownloadExcel(t("timeOff:viewTitle")) }
                          isDisabled={ isLoadingExcelList }
                        />
                      </Grid>
                      <Grid item xs={ 3 }>
                        <InputTextSearch inputHandler={ inputHandler } />
                      </Grid>
                      <Grid item xs={ 1 } />
                    </Grid>
                    <TabGantTable
                      gantData={ list }
                      tableData={ timeOffList }
                      total={ timeOffListTotal }
                      tableIsLoading={ timeOffLoadingList }
                      gantIsLoading={ isLoadingList }
                      pageHandler={ pageHandler }
                      pageFilter={ pageFilter }
                      statesFilter={ statesFilter }
                    />
                  </TabPanel>
                )}
              </StyledCustomPaper>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <ViewHeaderTitle title={ t("timeOff:viewTitle") } />
          <StyledTabStyle>
            {isAdminOrManager && showPersonal && (
              <Tab
                tabs={ getTabs(t) }
                onChange={ handleValueChanged }
                tabValue={ tabHandler }
                variant={ VARIANT.fullWidth }
              />
            )}
          </StyledTabStyle>

          <TabPanel value={ tabHandler } index={ 0 }>
            <StyledCardPaper variant={ VARIANT.outlined }>
              <PersonalTab
                handleEdit={ handleEdit }
                isMobile
              />
            </StyledCardPaper>
          </TabPanel>
          {isAdminOrManager && (
            <TabPanel value={ tabHandler } index={ 1 } isLoading={ false }>
              <StyledCustomPaper variant={ VARIANT.outlined }>
                <Grid item lg={ 12 }>
                  <StyledTimeOffGrid>
                    <Filter
                      isLabel
                      isMultiple
                      type={ FILTER_ACTIONS_TYPES.timeOff }
                      isButton
                      externalParams={ [
                        searchFilter,
                        startingDate,
                        endingDate,
                        pageFilter,
                      ] }
                      externalHandler={ handleExternalFilter }
                    />
                  </StyledTimeOffGrid>
                  <StyledDateContainer>
                    <DateFilter
                      fullWidth
                      startingDateHandler={ startingDateHandler }
                      endingDateHandler={ endingDateHandler }
                    />
                  </StyledDateContainer>
                  <StyledTimeOffGrid>
                    <InputTextSearch inputHandler={ inputHandler } />
                  </StyledTimeOffGrid>
                  <DownloadExcelButton
                    onClick={ onDownloadExcel(t("timeOff:viewTitle")) }
                    isDisabled={ isLoadingExcelList }
                  />
                  <CollaboratorsCard
                    data={ timeOffList }
                    pagination={ {
                      number: pageFilter.number,
                      size: pageFilter.size,
                      handlePage: pageHandler,
                    } }
                    isLoading={ timeOffLoadingList }
                    isAdmin={ isAdmin }
                  />
                </Grid>
              </StyledCustomPaper>
            </TabPanel>
          )}
        </Hidden>
      </Box>
      <Hidden mdUp>
        <StyledTimeOffPopUp>
          <PopUpForm data={ selectedData } setData={ setSelectedData } isMobile />
        </StyledTimeOffPopUp>
      </Hidden>
    </div>
  );
};

export default TimeOff;
