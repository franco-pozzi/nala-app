import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TooltipIcon from "components/TooltipIcon";
import { COMPONENT, RATING, VARIANT } from "common/constants";
import { getRating, getTooltipDescription } from "./functions";
import { StyledRating, StyledTypography, useStyles } from "./styles";

const StarRating = (props) => {
  const {
    name,
    value,
    isReadOnly,
    size,
    label,
    maxRating = RATING.total_min,
  } = props;
  const { t } = useTranslation(["performance"]);
  const [rating, setRating] = useState(RATING.initial);
  const classes = useStyles();

  const setFormatRating = useCallback(
    (value) => {
      const rate = getRating(value, maxRating);
      return rate;
    },
    [maxRating],
  );

  useEffect(() => {
    setRating(setFormatRating(value));
  }, [value, setFormatRating]);

  const getToolTip = (label) => {
    const data = getTooltipDescription(label, t);
    if (data) {
      return (
        <TooltipIcon
          title={ data.value }
          isHelpIcon
        />
      );
    }
    return "";
  };

  return (
    <Box>
      {label && (
        <StyledTypography
          component={ COMPONENT.legend }
          variant={ VARIANT.caption }
          className={ classes.labelCaption }
        >
          {label}
          {getToolTip(label)}
        </StyledTypography>
      )}
      <StyledRating
        id={ name }
        data-testid={ "rating" }
        name={ name }
        value={ rating }
        precision={ RATING.precision }
        // TODO: add in case it can be used for editing
        // onChange={(event, newValue) => {
        //   setRating(newValue);
        // }}
        readOnly={ isReadOnly }
        size={ size }
      />
    </Box>
  );
};

StarRating.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isReadOnly: PropTypes.bool,
  size: PropTypes.string,
  label: PropTypes.string,
  maxRating: PropTypes.number,
};

export default StarRating;
