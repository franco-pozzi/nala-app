import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { TablePagination } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DeckIcon from "@material-ui/icons/Deck";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import NoDataMessage from "components/NoDataMessage";
import {
  ALIGN_ITEMS, PAGINATION, SIZE, COMPONENT,
} from "common/constants";
import { isEmpty } from "common/helpers";
import {
  StyledRootContainer,
  StyledCardContentContainer,
  StyledCardFont, StyledLeader, StyledCalendarGrid,
  StyledTimeOffType,
  StyledMotive,
  StyledHr,
  StyledReason,
  StyledCardButton,
} from "./styles";

const TimeOffCard = (props) => {
  const {
    data, pagination, isLoading, getOptions,
  } = props;
  const { t } = useTranslation(["common", "timeOff"]);
  const start = pagination.page * pagination.pageSize;

  return (
    <div data-testid={ "card-time-off-view-component" }>
      {data?.slice(start, start + pagination.pageSize)?.map((item) => (
        <StyledRootContainer key={ item.starting_date }>
          <StyledCardContentContainer>
            <StyledCardFont>
              <StyledCalendarGrid>
                <CalendarTodayIcon fontSize={ SIZE.small } />
                <p>{item.starting_date}</p>
                <CalendarTodayIcon fontSize={ SIZE.small } />
                <p>{item.ending_date}</p>
              </StyledCalendarGrid>
              <StyledTimeOffType>
                <DeckIcon fontSize={ SIZE.small } />
                {item.time_off_type?.name}
              </StyledTimeOffType>
              <StyledMotive>
                <QuestionAnswerIcon fontSize={ SIZE.small } />
                {` ${t("common.motive")}:`}
              </StyledMotive>
              <StyledReason>
                {item.reason}
              </StyledReason>
              <StyledLeader>
                <DragHandleIcon fontSize={ SIZE.small } />
                {t(`timeOff:states.${item.state}`)}
              </StyledLeader>
            </StyledCardFont>
            <StyledHr />
            <StyledCardButton justify={ ALIGN_ITEMS.flexEnd } >
            { item.state === 'pending' && getOptions(item) }
            </StyledCardButton>
          </StyledCardContentContainer>
        </StyledRootContainer>
      ))}
      {!isLoading && (isEmpty(data) ? <NoDataMessage />
        : (pagination && data?.length >= PAGINATION.maxPerPage) && (
          <TablePagination
            component={ COMPONENT.div }
            count={ data?.length }
            rowsPerPage={ pagination.pageSize }
            page={ pagination.page }
            onChangePage={ pagination.handlePageChange }
            rowsPerPageOptions={ [] }
          />
        ))}
    </div>
  );
};

TimeOffCard.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  isLoading: PropTypes.bool,
  getOptions: PropTypes.func,
};

TimeOffCard.defaultProps = {
  data: [],
  pagination: {},
  isLoading: false,
  getOptions: () => {},
};

export default TimeOffCard;
