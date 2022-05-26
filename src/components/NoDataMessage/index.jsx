import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import noInfoFace from "assets/images/tables/noInfoFace.svg";
import noInfoHappyFace from "assets/images/tables/noInfoHappyFace.svg";
import { ALIGN_ITEMS } from "common/constants";
import { StyledContainer, StyledMessage, StyledContent } from "./styles";

const NoDataMessage = (props) => {
  const {
    message, customStyles, isHappyFace, icon,
  } = props;
  const { t } = useTranslation("common");

  return (
    <StyledContainer
      className={ customStyles }
      data-testid={ "noDataMessage" }
    >
      <StyledContent>
        <Box
          display={ ALIGN_ITEMS.flex }
          justifyContent={ ALIGN_ITEMS.center }
        >
          {icon || (
            <img
              src={ isHappyFace ? noInfoHappyFace : noInfoFace }
              alt={ "No info to load" }
            />
          )}
        </Box>
        <StyledMessage>
          {message || t("common.no_records")}
        </StyledMessage>
      </StyledContent>
    </StyledContainer>
  );
};

NoDataMessage.propTypes = {
  message: PropTypes.string,
  customStyles: PropTypes.string,
  isHappyFace: PropTypes.string,
  icon: PropTypes.object,
};

export default NoDataMessage;
