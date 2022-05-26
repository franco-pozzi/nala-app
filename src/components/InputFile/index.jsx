import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import {
  INPUT_TYPE,
  VARIANT,
  BUTTON_STYLE_TYPES,
  COMPONENT,
} from "common/constants";

const InputFile = (props) => {
  const {
    name, onChange, text, isDisabled,
  } = props;

  const buttonStyle = isDisabled ? BUTTON_STYLE_TYPES.DISABLED : BUTTON_STYLE_TYPES.SUBMIT;

  return (
    <label htmlFor={ name }>
      <input
        id={ name }
        name={ name }
        type={ INPUT_TYPE.file }
        hidden
        onChange={ (e) => onChange(e) }
        disabled={ isDisabled }
      />
      <Button
        variant={ VARIANT.contained }
        typeStyle={ buttonStyle }
        component={ COMPONENT.span }
        isDisabled={ isDisabled }
      >
        { text }
      </Button>
    </label>
  );
};

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
};

InputFile.defaultProps = {
  text: "",
  isDisabled: false,
};


export default InputFile;
