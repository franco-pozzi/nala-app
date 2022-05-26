import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { ADORMENT_POSITION } from "common/constants";
import useStyles from "./styles";

const SearchInput = (props) => {
  const classes = useStyles();
  const { placeholder, value, onChange, disabled } = props;

  const handleChange = (event) => {
    onChange(event.target.value.toLowerCase());
  };

  return (
    <TextField
      data-testid="searchText"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => handleChange(event)}
      className={classes.input}
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              className={
                disabled
                  ? clsx(classes.icon, classes.iconDisabled)
                  : classes.icon
              }
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position={ ADORMENT_POSITION.end }
            onClick={ () => onChange("") }
            className={ classes.iconHover }
          >
            <CloseIcon
              className={
                disabled
                  ? clsx(classes.icon, classes.iconDisabled)
                  : classes.icon
              }
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SearchInput;
