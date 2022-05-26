import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Filter from "components/Filter";
import { MIN_VALUE, PAGINATION, VARIANT } from "common/constants";
import { FILTER_ACTIONS_TYPES } from "common/constants/filters";
import {
  getOne,
  deleteTimeOff,
  resetProcess,
} from "redux/actions/timeOffActions";
import PeopleList from "./components/PeopleList";
import HistoryTimeOff from "./components/HistoryTimeOff";
import { getConfirmed, getEnjoyed, getPending } from "./components/TableHistory/functions";
import {
  StyledPaper,
  StyledItem,
  StyledNumber,
  StyledGrid,
} from "./styled";

const PersonalTab = (props) => {
  const { handleEdit, isMobile } = props;
  const { t } = useTranslation(["timeOff", "common"]);
  const [timeOffTypesFilter, setTimeOffTypesFilter] = useState([]);
  const [pageFilter, setPageFilter] = useState({
    number: MIN_VALUE,
    size: PAGINATION.maxPerPage,
  });

  const {
    sucessProcess,
    oneList,
    oneListTotal,
    isLoadingOneList,
  } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const dispatch = useDispatch();

  const FILTERS = {
    timeOffTypes: {
      state: timeOffTypesFilter,
      set: setTimeOffTypesFilter,
    },
  };

  const handleExternalFilter = (selectedfilter, values) => {
    const filterSet = FILTERS[selectedfilter].set;
    const filteredValues = values[selectedfilter].map((item) => item.label);
    filterSet(filteredValues || []);
  };

  const pageHandler = async (event, newPage) => {
    window.scroll(0, 0);
    await setPageFilter({ size: PAGINATION.maxPerPage, number: newPage });
  };

  useEffect(() => {
    dispatch(getOne());
  }, [dispatch]);

  useEffect(() => {
    const query = {
      q: {
        time_off_type_name_in: timeOffTypesFilter,
      },
    };
    dispatch(getOne(query));
  }, [dispatch, timeOffTypesFilter]);

  const deleteHandler = (id) => {
    dispatch(deleteTimeOff(id));
  };

  useEffect(() => {
    if (sucessProcess) {
      dispatch(resetProcess());
      dispatch(getOne());
    }
  }, [dispatch, sucessProcess]);

  const totals = [
    {
      title: t("overallStatus.confirmed"),
      total: getConfirmed(oneList || []),
    },
    {
      title: t("overallStatus.toBeConfirmed"),
      total: getPending(oneList || []),
    },
    {
      title: t("overallStatus.enjoyed"),
      total: getEnjoyed(oneList || []),
    },
  ];

  const getTotals = () => (
    <>
      {totals.map((item) => (
        <StyledItem key={ item.title }>
          <Typography variant={ VARIANT.bodyTwo }>{ item.title }</Typography>
          <StyledNumber>{ item.total }</StyledNumber>
        </StyledItem>
      ))}
    </>
  );

  return (
    <Grid container spacing={ 3 } data-testid={ "tab-personal-view-component" }>
      <Grid item xs={ 12 } md={ 3 }>
        <StyledPaper>
          <PeopleList isMobile={ isMobile } totals={ getTotals } />
        </StyledPaper>
      </Grid>
      <Grid item xs={ 12 } md={ 9 }>
        <StyledPaper>
          { !isMobile && <Typography variant={ VARIANT.h6 }>{ t("history") }</Typography>}
          <StyledGrid container spacing={ 1 } className={ "detail-box" }>
            <Grid item xs={ 12 } md={ 8 }>
              { !isMobile && getTotals() }
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
              <Filter
                type={ FILTER_ACTIONS_TYPES.personalTimeOff }
                isMultiple
                externalHandler={ handleExternalFilter }
              />
            </Grid>
          </StyledGrid>
          {oneList && (
            <HistoryTimeOff
              data={ oneList }
              isLoading={ isLoadingOneList }
              total={ oneListTotal }
              handleEdit={ handleEdit }
              deleteHandler={ deleteHandler }
              pageHandler={ pageHandler }
              pageFilter={ pageFilter }
              isMobile={ isMobile }
            />
          )}
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

PersonalTab.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

PersonalTab.defaultProps = {
  isMobile: false,
};

export default PersonalTab;
