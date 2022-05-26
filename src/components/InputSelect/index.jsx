import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { CustomValueContainer, getCustomStyles } from "./functions";

const InputSelect = (props) => {
  const {
    label, name, control, options, isDisabled, isLoading, isRequired,
  } = props;

  return (
    <Controller
      data-testid={ "input-select-component" }
      as={ (
        <Select
          options={ options }
          isDisabled={ isDisabled }
          isLoading={ isLoading }
          isClearable
          components={ {
            ValueContainer: CustomValueContainer,
            DropdownIndicator: "", // note: remove this if we want to show arrow indicator
          } }
          placeholder={ label }
          styles={ getCustomStyles }
        />
      ) }
      control={ control }
      name={ name }
      rules={ { required: isRequired } }
    />

  );
};

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.element.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRequired: PropTypes.bool,
};

InputSelect.defaultProps = {
  label: "",
  isDisabled: false,
  isLoading: false,
  isRequired: false,
};

export default InputSelect;
