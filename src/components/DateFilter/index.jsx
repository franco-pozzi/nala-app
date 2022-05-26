import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import moment from "moment";
import { FULLDATE_FORMATS } from "common/constants";
import { StyledContainer, StyledDateInputController } from "./styles";

const DateFilter = (props) => {
  const { startingDateHandler, endingDateHandler, isFullWidth } = props;
  const { control, watch } = useForm();
  const { t } = useTranslation(["common"]);

  const fromDay = watch("from", "");

  const toDay = watch("to", "");

  useEffect(() => {
    if (fromDay !== "") {
      startingDateHandler(moment(fromDay).format(FULLDATE_FORMATS.dash_calendar));
    }
    if (toDay !== "") {
      endingDateHandler(moment(toDay).format(FULLDATE_FORMATS.dash_calendar));
    }
  }, [fromDay, toDay, control, startingDateHandler, endingDateHandler]);

  return (
    <StyledContainer>
      <StyledDateInputController
        customStyles={ isFullWidth ? null : "enhancedInputController" }
        control={ control }
        label={ t("common.from") }
        name={ "from" }
        fullWidth={ isFullWidth }
        required={ false }
      />

      <StyledDateInputController
        customStyles={ isFullWidth ? null : "enhancedInputController" }
        control={ control }
        label={ t("common.to") }
        name={ "to" }
        fullWidth={ isFullWidth }
        required={ false }
      />
    </StyledContainer>
  );
};

export default DateFilter;
