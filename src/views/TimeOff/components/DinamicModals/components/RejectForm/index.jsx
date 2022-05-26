import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "components/Button";
import InputForm from "components/InputForm";
import { update } from "redux/actions/timeOffActions";
import { STATE_CHANGE } from "common/constants/timeOff";
import {
  INPUT_TYPE,
  BUTTON_TYPE,
  SIZE,
  ALIGN_ITEMS,
  VARIANT,
  DIRECTION,
  BUTTON_STYLE_TYPES,
} from "common/constants";
import { StyledSubmitGrid, StyledGrid, StyledButton } from "../styles";

const RejectForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "timeOff"]);
  const { timeOffId, onClose, isMobile } = props;
  const { handleSubmit, control, watch } = useForm();
  const watchMotive = watch("rejection_reason", "");
  const { isLoadingProcess } = useSelector(({ timeOffReducer }) => timeOffReducer);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("rejection_reason", watchMotive);
    const obj = {
      state: STATE_CHANGE.reject,
      rejection_reason: formData.get("rejection_reason"),
    };
    await dispatch(update(timeOffId, obj));
    onClose();
  };

  return (

    <form onSubmit={ handleSubmit(onSubmit) } >
      <Grid container direction={ DIRECTION.column } spacing={ 5 }>
        <Grid item container spacing={ 3 }>
          <StyledGrid item xs={ 12 }>
            <h2>{t("timeOff:Manage_request.Title")}</h2>
          </StyledGrid>
          <StyledGrid item xs={ 12 }>
            <p>{t("timeOff:Manage_request.SubtitleReject")}</p>
          </StyledGrid>
          <Grid item xs={ 12 } lg={ 12 }>
            <InputForm
              type={ INPUT_TYPE.text }
              control={ control }
              placeholder={ t("common.write_description") }
              name={ "rejection_reason" }
              label={ `${t("common.reason")} (optional)` }
              multiline={ 4 }
            />
          </Grid>
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
              isLoading={ isLoadingProcess }
            >
              {t("timeOff:Manage_request.Accept")}
            </Button>
          </StyledSubmitGrid>
        </Grid>
      </Grid>
    </form>
  );
};

RejectForm.propTypes = {
  timeOffId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

RejectForm.defaultProps = {
  isMobile: false,
};

export default RejectForm;
