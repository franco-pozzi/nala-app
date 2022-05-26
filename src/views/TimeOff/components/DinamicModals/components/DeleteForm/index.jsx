import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "components/Button";
import { deleteTimeOff } from "redux/actions/timeOffActions";
import {
  BUTTON_TYPE,
  SIZE,
  ALIGN_ITEMS,
  VARIANT,
  DIRECTION,
  BUTTON_STYLE_TYPES,
} from "common/constants";
import { StyledSubmitGrid, StyledGrid, StyledButton } from "../styles";

const DeleteForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "timeOff"]);
  const { timeOffId, onClose } = props;

  const { isLoadingProcess } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const onSubmit = async () => {
    await dispatch(deleteTimeOff(timeOffId));
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
          item
          lg={ 12 }
          sm={ 12 }
          container
          direction={ DIRECTION.row }
          alignItems={ ALIGN_ITEMS.center }
        >
          <StyledButton
            variant={ VARIANT.contained }
            typeStyle={ BUTTON_STYLE_TYPES.DISABLED }
            size={ SIZE.medium }
            onClick={() => onClose()}
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

DeleteForm.propTypes = {
  timeOffId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteForm;
