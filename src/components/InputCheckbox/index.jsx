import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxInput from "components/CheckboxInput";

const InputCheckbox = (props) => {
  const {
    label, name, control, isRequired, inputRef, isDefaultChecked,
  } = props;

  return (
    <div
      data-testid={ "input-checkbox-component" }
    >
      { inputRef ? (
        <FormControlLabel
          control={ (
            <CheckboxInput
              name={ name }
              inputRef={ inputRef }
              defaultChecked={ isDefaultChecked }
            />
          ) }
          label={ label }
        />
      ) : (
        <Controller
          as={ (
            <FormControlLabel
              control={ (
                <Checkbox
                  { ...props }
                  defaultChecked={ isDefaultChecked }
                />
              ) }
              label={ label }
            />
          ) }
          control={ control }
          name={ name }
          rules={ { required: isRequired } }
        />
      )}
    </div>
  );
};

InputCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.element.isRequired,
  inputRef: PropTypes.element,
  isRequired: PropTypes.bool,
  isDefaultChecked: PropTypes.bool,

};

InputCheckbox.defaultProps = {
  label: "",
  isRequired: false,
  inputRef: null,
  isDefaultChecked: false,
};
export default InputCheckbox;
