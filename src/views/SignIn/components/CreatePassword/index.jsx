import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { INPUT_RULES, INPUT_TYPE } from "common/constants";
import { getErrorMessage } from "common/formValidators";
import { InputFormComponent } from "./styles";
import Loader from "components/Loader";

const CreatePassword = (props) => {
  const {
    control, watch, errors, isLoadingTokenValidation,
  } = props;
  const { t } = useTranslation(["common", "authentication", "formValidations"]);
  const password = useRef({});
  const newPassword = useRef({});
  password.current = watch("password", "");
  newPassword.current = watch("password_confirmation", "");

  return (
    <div data-testid={ "create-password-component" }>
      {isLoadingTokenValidation ? (<Loader />)
        : (
          <>
            <InputFormComponent
              type={ INPUT_TYPE.password }
              control={ control }
              name={ "password" }
              rules={ INPUT_RULES.maxAndMinLength(20, true, 8) }
              error={ getErrorMessage(errors, "password") }
            />
            <InputFormComponent
              label={ t("formValidations:fields.password_confirmation") }
              type={ INPUT_TYPE.password }
              control={ control }
              name={ "password_confirmation" }
              rules={ INPUT_RULES.passwordMatch(password, t) }
              error={ getErrorMessage(errors, "password_confirmation") }
            />
          </>
        )}
    </div>
  );
};

CreatePassword.propTypes = {
  control: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isLoadingTokenValidation: PropTypes.bool,
};

CreatePassword.defaultProps = {
  isLoadingTokenValidation: false,
};

export default CreatePassword;
