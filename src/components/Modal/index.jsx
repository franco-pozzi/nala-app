import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "components/Button";
import { SIZE, VARIANT, BUTTON_STYLE_TYPES } from "common/constants";
import ViewHeaderTitle from "../ViewHeaderTitle";
import { useStyles, ModalView, Avatar } from "./styles";

const Modal = (props) => {
  const {
    children,
    isOpen,
    onClose = () => {},
    iconTitle,
    customStyle,
    title,
    buttons,
    onSubmit = () => {},
  } = props;
  const classes = useStyles();
  const { t } = useTranslation("common");
  const iconGridSize = 2;
  const titleGridSize = iconTitle ? 10 : 12;

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalView open={ isOpen } onClose={ handleClose } data-testid={ "modal-view" }>
      <div className={ clsx(classes.root, customStyle) } >
        <Grid container className={ classes.titleContainer }>
          {iconTitle && (
            <Grid item xs={ iconGridSize }>
              <Avatar src={ iconTitle } />
            </Grid>
          )}
          {title && (
            <Grid item xs={ titleGridSize }>
              <ViewHeaderTitle
                title={ title }
                customTitleStyle={ classes.titleStyle }
              />
            </Grid>
          )}
          <IconButton
            aria-label={ "close" }
            className={ classes.closeButton }
            onClick={ handleClose }
          >
            <CloseIcon fontSize={ SIZE.small } className={ classes.closeIcon } />
          </IconButton>
        </Grid>
        <div className={ classes.content }>{children}</div>
        {onSubmit && (
          <div className={ classes.buttonActionsContainer }>
            <Button
              onClick={ handleClose }
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
        )}
      </div>
    </ModalView>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  iconTitle: PropTypes.string,
  customStyle: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.element,
  buttons: PropTypes.object,
  onSubmit: PropTypes.func,
};

Modal.defaultProps = {
  iconTitle: null,
  customStyle: null,
  title: null,
  subtitle: null,
  children: null,
  buttons: null,
  onSubmit: null,
};

export default Modal;
