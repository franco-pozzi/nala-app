import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "components/FormHelperText";
import {
  ADORMENT_POSITION,
  INPUT_TYPE_TOGGLE_PASSWORD,
  PASSWORD_INPUT_LABEL_WIDTH,
} from "common/constants";

const PasswordInput = (props) => {
  const {
    id,
    name,
    isRequired,
    control,
    rules,
    customStyles,
    label,
    helperText,
    defaultValue = "",
    labelWidth = PASSWORD_INPUT_LABEL_WIDTH.default,
    error,
  } = props;
  const { t } = useTranslation("authentication");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const typeOfInput = showPassword
    ? INPUT_TYPE_TOGGLE_PASSWORD.text
    : INPUT_TYPE_TOGGLE_PASSWORD.password;

  return (
    <FormControl
      variant="outlined"
      required={isRequired}
      fullWidth
      error={Boolean(error)}
      className={customStyles}
    >
      <InputLabel htmlFor={id}>{label ? label : t("password")}</InputLabel>
      <Controller
        data-testid="password-input-controller"
        name={name}
        as={
          <OutlinedInput
            id={id}
            type={typeOfInput}
            fullWidth
            endAdornment={
              <InputAdornment position={ ADORMENT_POSITION.end }>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge={ ADORMENT_POSITION.end }
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={labelWidth}
          />
        }
        control={control}
        rules={rules}
        defaultValue={defaultValue}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  control: PropTypes.object,
  rules: PropTypes.object,
  isRequired: PropTypes.bool,
  customStyles: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  labelWidth: PropTypes.number,
  error: PropTypes.string,
};

export default PasswordInput;
