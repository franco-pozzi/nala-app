import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { BUTTON_STYLE_TYPES, VARIANT, SIZE } from "common/constants";
import Button from "components/Button";
import { StyledTitle } from "styledComponents/View";

const ModalDialogContent = (props) => {
  const { t } = useTranslation("common");
  const {
    title, text, textDisagree, textAgree, onClick, handleClose,
  } = props;
  return (
    <div>
      <StyledTitle size={ 20 } textAlign={ "center" }>
        {title}
      </StyledTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ handleClose }
          variant={ VARIANT.contained }
          typeStyle={ BUTTON_STYLE_TYPES.CANCEL }
          size={ SIZE.small }
          className={ "dialogActions" }
        >
          {textDisagree || t("common.modal_messages.no_cancel")}
        </Button>
        <Button
          onClick={ onClick }
          variant={ VARIANT.contained }
          typeStyle={ BUTTON_STYLE_TYPES.SUBMIT }
          size={ SIZE.small }
          className={ "dialogActions" }
        >
          {textAgree || t("common.modal_messages.yes_confirm")}
        </Button>
      </DialogActions>
    </div>
  );
};

ModalDialogContent.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textDisagree: PropTypes.string,
  textAgree: PropTypes.string,
};

ModalDialogContent.defaultProps = {
  textDisagree: "",
  textAgree: "",
};

export default ModalDialogContent;
