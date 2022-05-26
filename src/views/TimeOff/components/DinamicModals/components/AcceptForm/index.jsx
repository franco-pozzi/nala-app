import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "components/Button";
import { SessionContext } from "modules/session/context";
import { update } from "redux/actions/timeOffActions";
import { STATE_CHANGE } from "common/constants/timeOff";
import { isAdmin as isAdminFunction } from "common/utils";
import {
  BUTTON_TYPE,
  SIZE,
  ALIGN_ITEMS,
  VARIANT,
  DIRECTION,
  BUTTON_STYLE_TYPES,
} from "common/constants";
import { StyledSubmitGrid, StyledGrid, StyledButton } from "../styles";

const AcceptForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "timeOff"]);
  const { timeOffId, onClose, isMobile } = props;

  const {
    state: { user },
  } = useContext(SessionContext);

  const isAdmin = isAdminFunction(user?.userCookies);
  const { isLoadingProcess } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const onSubmit = async () => {
    const state = isAdmin ? STATE_CHANGE.approve : STATE_CHANGE.leader_approve;
    await dispatch(update(timeOffId, { state }));
    onClose();
  };

  return (
    <Grid container direction={ DIRECTION.column } spacing={ 5 }>
      <Grid item container spacing={ 3 }>
        <StyledGrid item xs={ 12 }>
          <h2>{t("timeOff:Manage_request.Title")}</h2>
        </StyledGrid>
        <StyledGrid item xs={ 12 }>
          <p>{t("timeOff:Manage_request.SubtitleAccept")}</p>
        </StyledGrid>
        <StyledSubmitGrid
          isMobile={ isMobile }
          item
          sm={ 12 }
          container
          direction={ DIRECTION.row }
          alignItems={ ALIGN_ITEMS.center }
        >
          <StyledButton
            variant={ VARIANT.contained }
            typeStyle={ BUTTON_STYLE_TYPES.DISABLED }
            size={ SIZE.medium }
            onClick={ () => onClose() }
          >
            {t("timeOff:Manage_request.Reject")}
          </StyledButton>
          <Button
            variant={ VARIANT.contained }
            type={ BUTTON_TYPE.submit }
            typeStyle={ BUTTON_TYPE.submit }
            size={ SIZE.medium }
            onClick={ onSubmit }
            isLoading={ isLoadingProcess }
          >
            {t("timeOff:Manage_request.Accept")}
          </Button>
        </StyledSubmitGrid>
      </Grid>
    </Grid>
  );
};

AcceptForm.propTypes = {
  timeOffId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

AcceptForm.defaultProps = {
  isMobile: false,
};

export default AcceptForm;
