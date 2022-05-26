import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { SessionContext } from "modules/session/context";
import { MIN_VALUE } from "common/constants";
import { STATES, STATE_CHANGE } from "common/constants/timeOff";
import { ReactComponent as AcceptIcon } from "assets/images/time-off/acceptIcon.svg";
import { ReactComponent as CancelIcon } from "assets/images/time-off/cancelIcon.svg";
import { ReactComponent as DownloadIcon } from "assets/images/time-off/downloadIcon.svg";
import handleDownload from "views/TimeOff/functions/downloadFiles";
import { isAdmin as isAdminFunction } from "common/utils";
import {
  StyledPaper,
  StyledGrid,
  StyledDiv,
  StyledIcons,
  StyledFromDateContainer,
  StyledToDateContainer,
  StyledDate,
  StyledReasonRejection,
} from "./styles";

const ManageRequest = (props) => {
  const { t } = useTranslation(["common", "timeOff"]);
  const {
    fromMonth,
    toMonth,
    fromDay,
    toDay,
    type,
    state,
    files,
    id,
    rejectionReason,
    handleModal = () => {},
  } = props;

  const {
    state: { user },
  } = useContext(SessionContext);

  const isAdmin = isAdminFunction(user?.userCookies);

  return (
    <StyledPaper levation={ 3 } index={ id }>
      <StyledGrid item xs={ 12 } >
        <StyledFromDateContainer item xs={ 5 }>
          <StyledDate>{t("timeOff:from")}</StyledDate>
          <StyledDiv>
            <p>{fromMonth}</p>
            <strong>{fromDay}</strong>
          </StyledDiv>
        </StyledFromDateContainer>
        <StyledToDateContainer item xs={ 5 }>
          <StyledDate>{t("timeOff:to")}</StyledDate>
          <StyledDiv>
            <p>{toMonth}</p>
            <strong>{toDay}</strong>
          </StyledDiv>
        </StyledToDateContainer>
      </StyledGrid>
      <StyledToDateContainer>
        <p>
          {`${t("timeOff:excel.Type")}: `}
          <strong>{type}</strong>
        </p>
        <p>
          {`${t("timeOff:excel.State")}: `}
          <strong>{t(`timeOff:states.${state}`)}</strong>
        </p>
        {rejectionReason
          && (
            <>
              <StyledReasonRejection>
                {`${t("timeOff:Manage_request.RejectionReason")}: `}
              </StyledReasonRejection>
              <StyledReasonRejection><strong>{rejectionReason}</strong></StyledReasonRejection>
            </>
          )}
      </StyledToDateContainer>
      <StyledIcons>
        { ((isAdmin && state === STATES.approved_by_leader) || (state === STATES.pending))
          && (
            <>
              <IconButton onClick={ () => { handleModal(STATE_CHANGE.reject); } }>
                <CancelIcon />
              </IconButton>
              <IconButton onClick={ () => { handleModal(STATE_CHANGE.approve); } }>
                <AcceptIcon />
              </IconButton >
            </>
          )}
        {files?.length > MIN_VALUE
          && (
            <IconButton onClick={ () => { handleDownload(files); } } >
              <DownloadIcon />
            </IconButton>
          )}
      </StyledIcons>
    </StyledPaper>
  );
};

ManageRequest.propTypes = {
  id: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
  fromMonth: PropTypes.string.isRequired,
  toMonth: PropTypes.string.isRequired,
  fromDay: PropTypes.string.isRequired,
  toDay: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  files: PropTypes.array,
  rejectionReason: PropTypes.string,
};

ManageRequest.defaultProps = {
  files: [],
  rejectionReason: "",
};

export default ManageRequest;
