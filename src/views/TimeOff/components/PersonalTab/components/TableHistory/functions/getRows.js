import React from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { SIZE, FULLDATE_FORMATS } from "common/constants";
import { STATES } from "common/constants/timeOff";
import { formatDate } from "common/utils";
import {
  StyledDateItem,
  StyledDatesContainer,
  StyledBold,
} from "views/TimeOff/components/TabGantTable/components/TableTimeOff/styles";

const getRows = (data, t, getOptions) => {
  const rows = data?.map((timeOff) => [
    {
      isVisible: true,
      content: (
        <StyledDatesContainer>
          <StyledDateItem>
            <CalendarTodayIcon fontSize={ SIZE.small } />
            <p>{formatDate(timeOff.starting_date, FULLDATE_FORMATS.slashShort)}</p>
          </StyledDateItem>
          <StyledDateItem>
            <CalendarTodayIcon fontSize={ SIZE.small } />
            <p>{formatDate(timeOff.ending_date, FULLDATE_FORMATS.slashShort)}</p>
          </StyledDateItem>
        </StyledDatesContainer>
      ),
    },
    {
      isVisible: true,
      content: <StyledBold>{timeOff.time_off_type ? timeOff.time_off_type.name : ""}</StyledBold>,
    },

    {
      isVisible: true,
      content: <div>{timeOff.reason}</div>,
    },

    {
      isVisible: true,
      content: <StyledBold>{t(`timeOff:states.${timeOff.state}`)}</StyledBold>,
    },
    {
      isVisible: true,
      content: (timeOff.state === STATES.pending ? getOptions(timeOff) : ""),
    },
  ]);
  return rows;
};

export default getRows;
