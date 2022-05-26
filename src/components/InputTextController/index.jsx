import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "components/FormHelperText";
import LoaderInput from "components/LoaderInput";

const InputText = (props) => {
  let {
    type,
    label,
    required,
    disabled,
    control,
    name,
    multiline,
    rules,
    margin = "dense",
    customStyles,
    helperText,
    isError,
    defaultValue = "",
    showHelperText = true,
    isControlledRequired,
    placeholder,
    isLoading,
  } = props;

  return (
    <div>
      <Controller
        data-testid="input-text-controller"
        as={
          <TextField
            type={type}
            label={label}
            InputLabelProps={{ required: false }}
            required={required}
            disabled={disabled}
            helperText={helperText}
            error={isError}
            variant="outlined"
            margin={margin}
            placeholder={placeholder}
            fullWidth
            multiline={Boolean(multiline)}
            rows={multiline}
            InputProps={{
              autoComplete: "new-input",
              endAdornment: isLoading && <LoaderInput />,
            }}
            className={customStyles}
          />
        }
        rules={rules}
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
      {((!disabled && required && showHelperText) ||
        (isControlledRequired && !disabled)) && <FormHelperText />}
    </div>
  );
};

InputText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  control: PropTypes.object,
  name: PropTypes.string,
  multiline: PropTypes.number,
  rules: PropTypes.object,
  customStyles: PropTypes.string,
  helperText: PropTypes.string,
  isError: PropTypes.bool,
  showHelperText: PropTypes.bool,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputText;
