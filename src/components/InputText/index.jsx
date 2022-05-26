import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { VARIANT } from "common/constants";

const InputText = (props) => {
  let {
    id,
    type,
    label,
    disabled,
    value,
    inputLabelProps,
    onChange = () => {},
    inputRef,
    name,
    required,
    multiline,
    params,
    inputProps,
    InputProps,
    isMarginNormal,
    customStyles,
    onKeyUp = () => {},
  } = props;

  const handleChange = (prop) => (event) => {
    onChange(prop, event);
  };

  return (
    <TextField
      data-testid="inputText"
      id={id}
      type={type}
      label={label}
      disabled={disabled}
      value={value}
      InputLabelProps={inputLabelProps}
      variant={VARIANT.outlined}
      margin={isMarginNormal ? "normal" : "dense"}
      inputRef={inputRef}
      name={name}
      fullWidth
      required={required}
      onChange={handleChange(id)}
      multiline={Boolean(multiline)}
      rows={multiline}
      {...params}
      InputProps={{ ...InputProps }}
      inputProps={{ ...inputProps }}
      className={customStyles}
      onKeyUp={onKeyUp}
    />
  );
};

InputText.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputLabelProps: PropTypes.object,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  multiline: PropTypes.number,
  params: PropTypes.object,
  inputProps: PropTypes.object,
  isMarginNormal: PropTypes.bool,
  customStyles: PropTypes.string,
};

export default InputText;
