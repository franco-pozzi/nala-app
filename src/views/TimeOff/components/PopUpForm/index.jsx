import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  VARIANT,
  BUTTON_STYLE_TYPES,
  SIZE,
} from "common/constants";
import TimeOffForm from "./components/TimeOffForm";
import { getTimeOffTypes } from "../../functions";
import { StyledModal, StyledButton } from "./styles";

const PopUpForm = (props) => {
  const { isMobile, data, setData } = props;
  const { t } = useTranslation(["common", "timeOff"]);
  const [isActive, setIsActive] = useState(false);
  const handleClose = () => {
    setIsActive(false);
    setData(null);
  };

  const dataTestId = "popup-view-component";

  return (
    <div data-testid={ dataTestId }>
      <StyledButton
        variant={ VARIANT.contained }
        typeStyle={ BUTTON_STYLE_TYPES.SUBMIT }
        size={ SIZE.medium }
        onClick={ () => setIsActive(true) }
        isFullWidth
        isMobile={ isMobile }
      >
        {t("common:common.request_time_off")}
      </StyledButton>

      <StyledModal
        isOpen={ isActive || data }
        onClose={ () => handleClose() }
        title={ data ? t("timeOff:editTimeOffTitle") : t("common:common.request_time_off") }
      >
        <TimeOffForm
          data={ data }
          isMobile={ isMobile }
          onClose={ () => handleClose() }
          onChangeFile={ () => { } }
          // TODO: this should be updated when service are ready
          selectOptions={ getTimeOffTypes(t) }
        />
      </StyledModal>
    </div>
  );
};

PopUpForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  isMobile: PropTypes.bool,
};

PopUpForm.defaultProps = {
  data: null,
  setData: () => {},
  isMobile: false,
};

export default PopUpForm;
