import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {
  BUTTON_STYLE_TYPES, SIZE, KEY_PRESS, ADORMENT_POSITION,
} from "common/constants";
import { isEqual, isUndefined } from "common/helpers";
import FormHelperText from "components/FormHelperText";
import { CustomAutocomplete, useStyles, StyledChip } from "./styles";

const InputTag = (props) => {
  const {
    id,
    label,
    placeholder,
    size,
    itemsSelected,
    onChange,
    data,
    isDisabled,
    hasCheckbox,
    textAddDinamicTag,
    onAddDinamicTag,
    onInputTextChange = () => {},
    name,
    register,
    isRequired,
    customStyle,
    groupBy,
    limitTags,
    defaultValues,
    withoutTags,
    onAddButtonField,
    onClickTag,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation("common");

  const icon = <CheckBoxOutlineBlankIcon fontSize={ SIZE.small } />;
  const checkedIcon = <CheckBoxIcon fontSize={ SIZE.small } />;

  const [value, setValue] = useState(itemsSelected || defaultValues);
  const [inputValue, setInputValue] = useState("");
  const [tagSelected, setTagSelected] = useState("");

  const handleChange = (items) => {
    onChange(items);
    if (!withoutTags) {
      setValue(items);
      setTagSelected("");
    }
  };

  const handleInputTextChange = (text) => {
    onInputTextChange(text);
    setInputValue(text);
  };

  useEffect(() => {
    setValue(itemsSelected || defaultValues);
  }, [itemsSelected, defaultValues]);

  const handleDinamicTag = () => {
    onAddDinamicTag();
  };

  const addButton = ({ children, ...other }) => (
    <Paper { ...other }>
      {children}
      {!isEmpty(inputValue) && onAddDinamicTag && (
        <p onMouseDown={ handleDinamicTag } className={ classes.addNew }>
          {textAddDinamicTag}
        </p>
      )}

      {isEmpty(inputValue) && isEmpty(data) && (
        <p className={ classes.empty }>
          {" "}
          {t("common.no_records")}
        </p>
      )}
    </Paper>
  );

  const handleOnKeyUp = () => {
    setInputValue("");
    onAddDinamicTag();
  };

  const getInputEnterValidation = (e) => (e.key === KEY_PRESS.enter && !isEmpty(inputValue) && onAddDinamicTag
    ? handleOnKeyUp()
    : {});

  const getOptions = () => ((groupBy?.filterBy === groupBy?.compareWith) ? data : data?.sort((a, b) => -b.label.localeCompare(a.label)));

  const getGroupBy = () => ((groupBy?.filterBy === groupBy?.compareWith) ? (option) => option?.country : null);

  const clickTag = (option) => {
    if (!isUndefined(onClickTag)) {
      setTagSelected(option.value);
      onClickTag(option);
    }
  };

  return (
    <CustomAutocomplete
      { ...props }
      data-testid={ "input-tags" }
      limitTags={ limitTags }
      multiple
      id={ id }
      options={ data ? getOptions() : [] }
      value={ value }
      onChange={ (e, newval) => {
        handleChange(newval);
      } }
      inputValue={ inputValue }
      onInputChange={ (event, newInputValue) => {
        handleInputTextChange(newInputValue);
      } }
      disableCloseOnSelect
      size={ size }
      noOptionsText={ "" }
      className={ customStyle }
      disabled={ isDisabled }
      getOptionLabel={ (option) => option.label }
      getOptionSelected={ (option, value) => option.label === value.label }
      groupBy={ getGroupBy() }
      renderOption={ (option, { selected }) => (hasCheckbox ? (
        <>
          <Checkbox
            icon={ icon }
            checkedIcon={ checkedIcon }
            className={ classes.checkbox }
            checked={ selected }
          />
          {option.label}
        </>
      ) : (
        option.label
      )) }
      renderInput={ (params) => (
        <>
          <TextField
            { ...params }
            variant={ BUTTON_STYLE_TYPES.OUTLINED }
            label={ label }
            placeholder={ placeholder }
            inputRef={ register }
            name={ name }
            onKeyUp={ (e) => getInputEnterValidation(e) }
            InputProps={ {
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {onAddButtonField && !isDisabled && (
                    <InputAdornment position={ ADORMENT_POSITION.end }>
                      <IconButton
                        onClick={ () => onAddButtonField() }
                        edge={ ADORMENT_POSITION.end }
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                </>
              ),
            } }
          />
          {!isDisabled && isRequired && <FormHelperText />}
        </>
      ) }
      PaperComponent={ addButton }
      renderTags={ (values, getTagProps) => values?.map((option, index) => (
        <StyledChip
          { ...getTagProps({ index }) }
          key={ option.label }
          label={ option.label }
          isClickable={ !isUndefined(onClickTag) }
          isActive={ isEqual(option.value, tagSelected) }
          onClick={ () => clickTag(option) }
        />
      )) }
    />
  );
};

InputTag.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  itemsSelected: PropTypes.array,
  onChange: PropTypes.func,
  data: PropTypes.array,
  isDisabled: PropTypes.bool,
  hasCheckbox: PropTypes.bool,
  isRequired: PropTypes.bool,
  customStyle: PropTypes.string,
  limitTags: PropTypes.number,
  defaultValues: PropTypes.array,
  withoutTags: PropTypes.bool,
  onAddButtonField: PropTypes.func,
  onClickTag: PropTypes.func,
};

export default InputTag;
