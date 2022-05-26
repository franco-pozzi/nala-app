import React from "react";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "components/FormHelperText";
import InputSelect from "components/InputSelect";
import InputCheckbox from "components/InputCheckbox";
import InputFile from "components/InputFile";
import { getOptionsFormat } from "common/utils";
import { INPUT_TYPE } from "common/constants";
import { FormControlStyled } from "./styles";
import PasswordInput from "../PasswordInputController";
import InputTextController from "../InputTextController";

const InputForm = (props) => {
  const {
    isDisabled, error, type, displayType, isRequired, options, className, hasFormat,
  } = props;

  const createInput = () => {
    const formattedOptions = getOptionsFormat(options);
    switch (type) {
    case INPUT_TYPE.select:
      return (
        <InputSelect { ...props } options={ hasFormat ? options : formattedOptions } isDisabled={ isDisabled } />
      );
    case INPUT_TYPE.password:
      return (
        <PasswordInput { ...props } />
      );
    case INPUT_TYPE.text:
      return (
        <InputTextController { ...props } />
      );
    case INPUT_TYPE.checkbox:
      return (
        <InputCheckbox { ...props } />
      );
    case INPUT_TYPE.file:
      return (
        <InputFile { ...props } />
      );

    default:
      return "";
      // TODO: implement this later
      // return (
      //   <InputSimpleText {...props} />
      // );
    }
  };

  if (displayType) {
    return createInput();
  }

  return (
    <FormGroup data-testid={ "input-form-component" } className={ className }>
      <FormControlStyled>{createInput()}</FormControlStyled>
      { !isDisabled && isRequired && !error && <FormHelperText /> }
      { error && <FormHelperText isError>{ error }</FormHelperText> }
    </FormGroup>
  );
};

InputForm.propTypes = {
  isDisabled: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string,
  displayType: PropTypes.string,
  isRequired: PropTypes.bool,
  options: PropTypes.element,
  className: PropTypes.string,
  hasFormat: PropTypes.bool,
};

InputForm.defaultProps = {
  isDisabled: false,
  error: "",
  type: null,
  displayType: null,
  isRequired: false,
  className: null,
  options: null,
  hasFormat: false
};

export default InputForm;
