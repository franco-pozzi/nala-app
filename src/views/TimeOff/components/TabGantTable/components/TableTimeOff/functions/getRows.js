import React from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import handleDownload from "views/TimeOff/functions/downloadFiles";
import TooltipIcon from "components/TooltipIcon";
import { SIZE, FULLDATE_FORMATS } from "common/constants";
import { STATES } from "common/constants/timeOff";
import { formatDate } from "common/utils";
import StateManagingButtons from "../components/StateManagingButtons";
import CustomAvatar from "../../CustomAvatar";
import {
  StyledBold,
  StyledDatesContainer,
  StyledDateItem,
  StyledCloudDownloadIcon,
} from "../styles";

const getRows = (data, isAdmin, t, handleModal) => {
  const rows = data?.map((timeOff) => [
    {
      isVisible: true,
      content: (
        <CustomAvatar
          name={ timeOff.employee.full_name }
          avatarImg={ timeOff.employee?.profile_img_url }
          isVisibleBadge={ timeOff.state !== STATES.pending }
          position={ timeOff.employee.job_position?.deprecated_position_name }
        />
      ),
    },
    {
      isVisible: isAdmin,
      content: <StyledBold>{timeOff.employee?.manager_name}</StyledBold>,
    },
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
      content: <StyledBold>{ timeOff.time_off_type?.name || ""}</StyledBold>,
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
      content:
        timeOff.files_url.length > 0 ? (
          <IconButton
            onClick={ () => {
              handleDownload(timeOff.files_url);
            } }
          >
            <TooltipIcon
              title={ t("tables:actions.download") }
              element={ <StyledCloudDownloadIcon /> }
            />
          </IconButton>
        ) : (
          ""
        ),
    },

    {
      isVisible: true,
      content: (
        <StateManagingButtons
          handleModal={ handleModal }
          state={ timeOff.state }
          isAdmin={ isAdmin }
          id={ timeOff.id }
        />
      ),
    },
  ]);
  return rows;
};

export default getRows;
