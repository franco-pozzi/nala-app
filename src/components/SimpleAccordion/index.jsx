import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NoDataMessage from "components/NoDataMessage";
import StarRating from "components/StarRating";
import TooltipIcon from "components/TooltipIcon";
import { VARIANT } from "common/constants";
import useStyles from "./styles";

const SimpleAccordion = (props) => {
  const {
    title,
    subtitle,
    children,
    isEmpty,
    messageNoData,
    src,
    isDisabled,
    customImage,
    variant,
    customStyles,
    rating,
    hasTitleTooltip,
    isTitleImage,
    customSubtitle,
    expandedPanel,
    isMain,
  } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(expandedPanel);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      data-testid={ "simple-accordion-component" }
      expanded={ isEmpty || expanded === expandedPanel }
      disabled={ isDisabled }
      className={ customStyles?.accordion || "" }
      onChange={ handleChange(expandedPanel) }
    >
      <AccordionSummary
        className={ customStyles?.headerContainer || "" }
        expandIcon={ isEmpty || isDisabled || isMain ? null : <ExpandMoreIcon color={ "primary" } /> }
      >
        {src && (
          <img
            src={ src }
            alt={ "Accordion description" }
            className={ customImage || classes.image }
          />
        )}

        <div className={ isTitleImage ? classes.titleContainer : "" }>
          <Typography className={ customStyles?.title || "" } variant={ variant }>
            {title}
            {hasTitleTooltip && (
              <TooltipIcon
                title={ hasTitleTooltip }
                isHelpIcon
              />
            )}
          </Typography>

          {subtitle && <Typography variant={ VARIANT.bodyTwo }>{subtitle}</Typography>}
          {customSubtitle}
          {rating && (
            <StarRating
              name={ rating.name }
              value={ rating.value }
              isReadOnly
              maxRating={ rating.maxRating }
            />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails className={ clsx(classes.detailsRoot, customStyles ? customStyles?.container : "") }>
        {isEmpty ? (
          <NoDataMessage
            message={ messageNoData }
            customStyless={ classes.customStylesNoDataMessage }
          />
        ) : (
          children
        )}
      </AccordionDetails>
    </Accordion>
  );
};

SimpleAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.any,
  isEmpty: PropTypes.bool,
  messageNoData: PropTypes.string,
  isDisabled: PropTypes.bool,
  customImage: PropTypes.string,
  variant: PropTypes.string,
  customStyles: PropTypes.object,
  rating: PropTypes.object,
  hasTitleTooltip: PropTypes.string,
  isTitleImage: PropTypes.bool,
  customSubtitle: PropTypes.object,
  expandedPanel: PropTypes.string,
  isMain: PropTypes.bool,
};

SimpleAccordion.defaultProps = {
  variant: VARIANT.h5,
};

export default SimpleAccordion;
