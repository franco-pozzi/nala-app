import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "components/FormHelperText";

import { useStyles, InputLabelStyled } from "./styles";
import { Controller } from "react-hook-form";

const SelectController = (props) => {
  let {
    id,
    label,
    menuItems,
    defaultValue,
    disabled,
    name,
    customStyles,
    control,
    required,
  } = props;
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      data-testid="select-controller-container"
      required={required}
    >
      <InputLabelStyled id={`select-label${id}`}>{label}</InputLabelStyled>
      <>
        <Controller
          data-testid="select-controller"
          name={name}
          as={
            <Select
              labelId={`select-label${id}`}
              id={id}
              label={label}
              className={clsx(classes.select, customStyles)}
              disabled={disabled}
            >
              {menuItems &&
                menuItems.map((menuItem, index) => {
                  return (
                    <MenuItem key={index} value={menuItem.value}>
                      <Typography variant="body1">{menuItem.label}</Typography>
                    </MenuItem>
                  );
                })}
            </Select>
          }
          defaultValue={defaultValue}
          control={control}
        />
        {!disabled && required && <FormHelperText />}
      </>
    </FormControl>
  );
};

SelectController.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  menuItems: PropTypes.array,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  customStyles: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
};

export default SelectController;
