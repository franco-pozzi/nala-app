import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "components/Button";
import { BUTTON_STYLE_TYPES, VARIANT } from "common/constants";
import NalaBot from "assets/images/general/nala_bot.svg";
import useSignInService from "hooks/auth/useSignInService";
import {
  StyledDialogContent, StyledDialogTitle,
} from "./styles";

const SelectedCompanyModal = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation("common");
  const { resetStates, clearStorage } = useSignInService();

  const handleClick = () => {
    onClose();
    resetStates();
    clearStorage();
    window.location.href = "/";
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ onClose }
      fullWidth
    >
      <StyledDialogTitle disableTypography>
        <IconButton onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <img src={ NalaBot } alt={ "NalaBot" } />
            <Typography variant={ VARIANT.h3 }>{ t("selectedCompany.title") }</Typography>
            <Typography variant={ VARIANT.h5 }>{ t("selectedCompany.subtitle") }</Typography>
            <Button
              onClick={ handleClick }
              variant={ VARIANT.contained }
              typeStyle={ BUTTON_STYLE_TYPES.SUBMIT }
            >
              { t("selectedCompany.understood") }
            </Button>
          </Grid>
        </Grid>
      </StyledDialogContent>
    </Dialog>
  );
};

SelectedCompanyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SelectedCompanyModal;
