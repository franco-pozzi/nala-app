import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { TablePagination } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DeckIcon from "@material-ui/icons/Deck";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import {
  ALIGN_ITEMS, PAGINATION, SIZE, SORT_COMPARATOR, COMPONENT,
} from "common/constants";
import NoDataMessage from "components/NoDataMessage";
import handleDownload from "views/TimeOff/functions/downloadFiles";
import StateManagingButtons from "../TableTimeOff/components/StateManagingButtons";
import ModalCollaboratorsCard from "./components/ModalCollaboratorsCard";
import {
  StyledRootContainer,
  StyledAvGrid, StyledAvatarCard,
  StyledCardContentContainer, StyledCardTitle,
  StyledCardFont, StyledLeader, StyledCalendarGrid,
  StyledTimeOffType,
  StyledMotive,
  StyledHr,
  StyledReason,
  StyledCardButton,
  StyledCloudDownloadIcon,
} from "./styles";

const CollaboratorsCard = (props) => {
  const {
    data, pagination, isLoading, isAdmin,
  } = props;
  const { t } = useTranslation(["common", "timeOff"]);
  const [selectedId, setSelectedId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState();

  const handleModal = (state, id) => {
    setIsOpen(true);
    setSelectedId(id);
    setSelectedModal(state);
  };

  const handleOpen = () => setIsOpen(false);

  return (
    <div data-testid={ "collaborators-card-view-component" }>
      {data?.map((item) => (
        <StyledRootContainer key={ item.starting_date }>
          <StyledAvGrid>
            <StyledAvatarCard src={ item.employee.profile_img_url } />
          </StyledAvGrid>
          <StyledCardContentContainer>
            <StyledCardTitle>
              {item.employee.full_name}
            </StyledCardTitle>
            <StyledCardFont>
              <StyledLeader>
                <AccountCircleOutlinedIcon fontSize={ SIZE.small } />
                {item.employee.manager_name}
              </StyledLeader>
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
            <StyledCardButton justify={ item.files_url.length > 0 ? ALIGN_ITEMS.center : ALIGN_ITEMS.flexEnd } >
              {item.files_url.length > 0 ? (
                <IconButton onClick={ () => { handleDownload(item.files_url); } }>
                  <StyledCloudDownloadIcon />
                </IconButton >
              ) : ""}
              <StateManagingButtons
                state={ item.state }
                id={ item.id }
                isAdmin={ isAdmin }
                handleModal={ handleModal }
                flexEnd={ !(item.files_url.length > 0) }
                isMobile
              />
            </StyledCardButton>
          </StyledCardContentContainer>
        </StyledRootContainer>
      ))}
      {!isLoading && (isEmpty(data) ? <NoDataMessage />
        : (pagination && data.length > PAGINATION.maxPerPage) && (
          <TablePagination
            component={ COMPONENT.div }
            count={ SORT_COMPARATOR.minusOne }
            rowsPerPage={ pagination.size }
            page={ pagination.number }
            onChangePage={ pagination.handlePage }
            rowsPerPageOptions={ [] }
          />
        ))}
      <ModalCollaboratorsCard
        selectedId={ selectedId }
        selectedModal={ selectedModal }
        isOpen={ isOpen }
        onClose={ handleOpen }
      />
    </div>
  );
};

CollaboratorsCard.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

CollaboratorsCard.defaultProps = {
  data: [],
  pagination: {},
  isLoading: false,
  isAdmin: false,
};

export default CollaboratorsCard;
