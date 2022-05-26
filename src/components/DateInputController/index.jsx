import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import moment from "moment";
import "moment/locale/es";
import "moment/locale/pt";
import PropTypes from "prop-types";
import MomentUtils from "@date-io/moment";
import { default as momentTimezone } from "moment-timezone";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormHelperText from "components/FormHelperText";
import { FULLDATE_FORMATS } from "common/constants";
import { useStyles } from "./styles";

function DateInputController(props) {
  const classes = useStyles();
  const { t } = useTranslation("common");
  const {
    disabled,
    id,
    label,
    value,
    name,
    maxDate,
    minDate,
    control,
    openTo,
    views,
    required,
    customStyles,
  } = props;
  const handleLanguage = () => {
    const regexLangCode = /\s\([a-z]{2}\)'/;
    let matchLangCode = regexLangCode.exec(t("common"));
    if (matchLangCode !== null) {
      const codeLang = matchLangCode[0][2] + matchLangCode[0][3];
      if (codeLang === "pr") return "pt";
      return codeLang;
    }
    return "en";
  };
  moment.locale(handleLanguage());
  momentTimezone.tz.setDefault("Etc/UTC");
  return (
    <>
      <MuiPickersUtilsProvider
        libInstance={momentTimezone}
        locale={handleLanguage()}
        utils={MomentUtils}
      >
        <Controller
          data-testid="date-input-controller"
          as={
            <KeyboardDatePicker
              autoOk
              data-testid="dateInput"
              variant="inline"
              inputVariant="outlined"
              className={clsx(classes.inputDate, customStyles)}
              KeyboardButtonProps={{ "aria-label": "change date" }}
              format={FULLDATE_FORMATS.dash}
              emptyLabel={FULLDATE_FORMATS.dash}
              margin="dense"
              maxDate={maxDate}
              minDate={minDate}
              id={id}
              disabled={disabled}
              label={label}
              openTo={openTo}
              views={views}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          }
          control={control}
          name={name}
          defaultValue={value}
        />
      </MuiPickersUtilsProvider>
      {!disabled && required && <FormHelperText />}
    </>
  );
}
DateInputController.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  openTo: PropTypes.oneOf(["date", "year", "month"]),
  views: PropTypes.array,
  control: PropTypes.object,
  required: PropTypes.bool,
  customStyles: PropTypes.string,
};
export default DateInputController;
