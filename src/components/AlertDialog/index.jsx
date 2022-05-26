import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/Button";
import { VARIANT, BUTTON_STYLE_TYPES } from "common/constants";
import useStyles from "./styles";

const AlertDialog = (props) => {
  const {
    isOpen, onClose, title, message, onSubmit, buttons,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation("common");
  return (
    <div data-testid={ "alert-dialog-component" }>
      <Dialog
        open={ isOpen }
        onClose={ onClose }
        className={ classes.root }
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={ classes.buttonActionsContainer }>
            <Button
              onClick={ onClose }
              variant={ VARIANT.contained }
              typeStyle={ BUTTON_STYLE_TYPES.CANCEL }
              isDisabled={ buttons?.isLoading }
              customStyle={ classes.buttonActions }
            >
              {buttons?.disagree ?? t("common.modal_messages.no_cancel")}
            </Button>
            <Button
              onClick={ onSubmit }
              variant={ VARIANT.contained }
              typeStyle={ BUTTON_STYLE_TYPES.SUBMIT }
              isDisabled={ buttons?.isLoading }
              customStyle={ classes.buttonActions }
              autoFocus
            >
              {buttons?.agree ?? t("common.modal_messages.yes_confirm")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onSubmit: PropTypes.func,
  buttons: PropTypes.object,
};

AlertDialog.defaultProps = {
  message: null,
  buttons: null,
  onSubmit: null,
};

export default AlertDialog;
