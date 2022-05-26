import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import NoDataMessage from "components/NoDataMessage";
import SkeletonLoader from "components/SkeletonLoader";
import {
  ALIGN_ITEMS,
  DIRECTION,
  FULLDATE_FORMATS,
  VARIANT,
} from "common/constants";
import { formatDate } from "common/utils";
import { isEmpty } from "common/helpers";
import {
  getTeamList,
} from "redux/actions/timeOffActions";
import { StyledTitle, StyledGrid, StyledItem } from "./styled";

const PeopleList = (props) => {
  const { isMobile, totals } = props;
  const { t } = useTranslation(["timeOff", "common"]);
  const {
    teamList,
    isLoadingTeamList,
  } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamList());
  }, [dispatch]);

  const contentListInMobile = isMobile && (
    <>
      <Typography variant={ VARIANT.h6 }>{ t("history") }</Typography>
      <StyledGrid container>
        <Grid item xs={ 12 } md={ 8 }>
          { totals() }
        </Grid>
      </StyledGrid>
    </>
  );

  const contentTeamList = isLoadingTeamList ? <SkeletonLoader /> : (
    teamList?.map((item, index) => (
      <StyledItem key={ index }>
        <Grid container direction={ DIRECTION.row } alignItems={ ALIGN_ITEMS.center } spacing={ 1 }>
          <Grid item>
            <Avatar
              alt={ item.employee.full_name }
              src={ item.employee.profile_img_url }
            />
          </Grid>
          <Grid item>
            <Typography
              variant={ VARIANT.bodyOne }
            >
              { item.employee.full_name }
            </Typography>
          </Grid>
        </Grid>
        <Typography variant={ VARIANT.bodyTwo }>
          { t("typeOfAbsence") }: <span className={ "subtitle" }>{ item.time_off_type ? item.time_off_type.name : "" }</span>
        </Typography>
        <Typography variant={ VARIANT.bodyTwo }>
          { t("from") }: <span className={"subtitle"}>{ formatDate(item.starting_date, FULLDATE_FORMATS.slashShort) }</span>
        </Typography>
        <Typography variant={ VARIANT.bodyTwo }>
          { t("to") }: <span className={"subtitle"}>{ formatDate(item.ending_date, FULLDATE_FORMATS.slashShort) }</span>
        </Typography>
      </StyledItem>
    ))
  );

  const contentNoData = !isLoadingTeamList && isEmpty(teamList) && <NoDataMessage />;

  return (
    <div data-testid={ "team-list-time-off-view-component" }>
      { contentListInMobile }
      <StyledTitle variant={ VARIANT.h6 }>{ t("whoIsFree") }</StyledTitle>
      { contentTeamList }
      { contentNoData }
    </div>
  );
};

PeopleList.propTypes = {
  totals: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

PeopleList.defaultProps = {
  isMobile: false,
};

export default PeopleList;
