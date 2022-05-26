import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";

const CheckboxInput = (props) => {
  const {
    onChange,
    isDisabled,
    isChecked,
    id,
    label,
    name,
    indeterminate,
    inputRef,
    value,
    defaultChecked,
  } = props;

  const checkboxReturn = () => (
    <Checkbox
      data-testid="checkboxValidator"
      checked={isChecked}
      id={id}
      disabled={isDisabled}
      color="secondary"
      onChange={handleChange(id)}
      inputProps={{ "aria-label": "secondary checkbox" }}
      name={name}
      value={value}
      indeterminate={indeterminate}
      inputRef={inputRef}
      defaultChecked={defaultChecked}
    />
  );

  const handleChange = (prop) => (event) => {
    onChange && onChange(prop, event);
  };

  return label ? (
    <FormControlLabel control={checkboxReturn()} label={label} value={value} />
  ) : (
    checkboxReturn()
  );
};

CheckboxInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  inputLabelProps: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
  indeterminate: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputRef: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default CheckboxInput;
