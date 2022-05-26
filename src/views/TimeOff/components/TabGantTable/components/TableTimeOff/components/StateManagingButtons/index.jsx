import React from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { STATES, STATE_CHANGE } from "common/constants/timeOff";
import TooltipIcon from "components/TooltipIcon";
import {
  StyledIconDiv, StyledCancelIcon, StyledCheckCircleIcon, StyledTrashAvatar,
} from "../../styles";

const StateManagingButtons = (props) => {
  const {
    state, isAdmin, id, handleModal, isMobile, flexEnd,
  } = props;
  const { t } = useTranslation();
  switch (state) {
  case STATES.pending:
    return (
      <StyledIconDiv isMobile={ isMobile } flexEnd={ flexEnd }>
        <IconButton
          onClick={ () => handleModal(STATE_CHANGE.reject, id) }
        >
          <TooltipIcon
            title={ t("tables:actions.cancel") }
            element={ <StyledCancelIcon isMobile={ isMobile } /> }
          />

        </IconButton>
        <IconButton
          onClick={ () => handleModal(STATE_CHANGE.approve, id) }
        >
          <TooltipIcon
            title={ t("tables:actions.accept") }
            element={ <StyledCheckCircleIcon isMobile={ isMobile } /> }
          />

        </IconButton>
      </StyledIconDiv>
    );
  case STATES.approved_by_leader:
    return isAdmin ? (
      <StyledIconDiv isMobile={ isMobile } flexEnd={ flexEnd }>
        <IconButton
          onClick={ () => handleModal(STATE_CHANGE.reject, id) }
        >
          <TooltipIcon
            title={ t("tables:actions.cancel") }
            element={ <StyledCancelIcon isMobile={ isMobile } /> }
          />
        </IconButton>
        <IconButton
          onClick={ () => handleModal(STATE_CHANGE.approve, id) }
        >
          <TooltipIcon
            title={ t("tables:actions.accept") }
            element={ <StyledCheckCircleIcon isMobile={ isMobile } /> }
          />
        </IconButton>
      </StyledIconDiv>
    ) : "";
  case STATES.approved:
    return isMobile ? "" : (
      <IconButton onClick={ () => handleModal(STATE_CHANGE.delete, id) } >
        <TooltipIcon
          title={ t("tables:actions.delete") }
          element={ <StyledTrashAvatar><DeleteIcon /></StyledTrashAvatar> }
        />
      </IconButton>
    );

  case STATES.rejected:
  default:
    return "";
  }
};

export default StateManagingButtons;
