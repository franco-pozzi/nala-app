import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { default as FormHelper } from "@material-ui/core/FormHelperText";
import { StyledError } from "./styles";

const FormHelperText = (props) => {
  const { isError, children } = props;
  const { t } = useTranslation("common");

  return (
    <FormHelper data-testid={ "form-helper-text-component" }>
      {isError ? <StyledError>{ children }</StyledError> : children || t("common.fieldRequired")}
    </FormHelper>
  );
};

FormHelperText.propTypes = {
  children: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};

FormHelperText.defaultProps = {
  isError: false,
};

export default FormHelperText;
