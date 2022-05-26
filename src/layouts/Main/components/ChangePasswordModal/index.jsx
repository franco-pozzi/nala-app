import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PasswordInput from "components/PasswordInputController";
import Button from "components/Button";
import {
  toast, handleMessages, MESSAGE_TYPES, HTTP_STATUS_RESPONSE,
} from "components/Toast/functions";
import { updatePassword, resetState } from "redux/actions/createPasswordActions";
import {
  BUTTON_STYLE_TYPES, PASSWORD_INPUT_LABEL_WIDTH, PASSWORD_VALIDATION_UTILS, FORM_MODE,
} from "common/constants";
import { validatePassword } from "common/utils";
import { isEqual } from "common/helpers";
import { StyledInput, StyledDialog } from "./styles";

const ChangePasswordModal = (props) => {
  const { open, onClose } = props;
  const { t } = useTranslation(["authentication", "common"]);
  const dispatch = useDispatch();
  const { handleSubmit, control, formState } = useForm({
    mode: FORM_MODE.onChange,
  });

  const rules = { required: true };

  const {
    processPasswordCreation,
    isLoadingPasswordCreation,
  } = useSelector(({ createPasswordReducer }) => createPasswordReducer);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  useEffect(() => {
    if (processPasswordCreation) {
      dispatch(resetState());
      toast(
        MESSAGE_TYPES.success,
        handleMessages(MESSAGE_TYPES.success, HTTP_STATUS_RESPONSE.ok, t),
      );
      setIsOpen(false);
    }
  }, [processPasswordCreation, t, dispatch]);

  const onSubmit = (formData) => {
    const { currentPassword, password, confirmationPassword } = formData;
    const passwordValidation = validatePassword(password, confirmationPassword);
    if (passwordValidation.isValid) {
      dispatch(updatePassword({
        current_password: currentPassword,
        password,
        password_confirmation: confirmationPassword,
      }));
    } else {
      const toastMessage = {
        message: t(`authentication:recover_password.${
        isEqual(
          passwordValidation.typeOfError,
          PASSWORD_VALIDATION_UTILS.length,
        )
          ? "validate_password_lenght"
          : "same_passwords_validation"
      }`),
      };
      toast(MESSAGE_TYPES.error, toastMessage);
    }
  };

  const buttonTypeStyle = formState.isValid && !isLoadingPasswordCreation
    ? BUTTON_STYLE_TYPES.SUBMIT
    : BUTTON_STYLE_TYPES.DISABLED;

  return (
    <Dialog open={ isOpen } data-testid={ "form-dialog-modal" }>
      <DialogTitle>
        {t("authentication:change_password.change_your_password")}
      </DialogTitle>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <DialogContent>
          <DialogContentText>
            {t("authentication:recover_password.validate_password_lenght")}
          </DialogContentText>
          {/* commented till BE check this */}
          {/* <StyledInput>
            <PasswordInput
              control={ control }
              label={ t("authentication:change_password.actual_password") }
              name={ "currentPassword" }
              rules={ rules }
              labelWidth={ PASSWORD_INPUT_LABEL_WIDTH.medium }
            />
          </StyledInput> */}
          <StyledInput>
            <PasswordInput
              control={ control }
              label={ t("authentication:change_password.new_password") }
              name={ "password" }
              rules={ rules }
              labelWidth={ PASSWORD_INPUT_LABEL_WIDTH.medium }
            />
          </StyledInput>
          <StyledInput>
            <PasswordInput
              control={ control }
              label={ t(
                "authentication:change_password.new_password_confirmation",
              ) }
              name={ "confirmationPassword" }
              rules={ rules }
              labelWidth={ PASSWORD_INPUT_LABEL_WIDTH.large }
            />
          </StyledInput>
        </DialogContent>
        <StyledDialog>
          <Button
            onClick={ onClose }
            typeStyle={ BUTTON_STYLE_TYPES.CANCEL }
            isDisabled={ isLoadingPasswordCreation }
          >
            {t("authentication:change_password.cancel")}
          </Button>
          <Button
            typeStyle={ buttonTypeStyle }
            isDisabled={ !formState.isValid || isLoadingPasswordCreation }
            type={ "submit" }
          >
            {t("authentication:change_password.change_password")}
          </Button>
        </StyledDialog>
      </form>
    </Dialog>
  );
};

ChangePasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
