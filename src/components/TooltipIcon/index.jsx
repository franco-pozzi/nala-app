import React from "react";
import PropTypes from "prop-types";
import { SIZE } from "common/constants";
import { HelpIconStyled, TooltipStyled, useStyles } from "./styles";

const TooltipIcon = (props) => {
  const { title, element, children, open, placement, isHelpIcon } = props;
  const classes = useStyles();
  return (
    <TooltipStyled
      title={title ? title : children}
      arrow
      open={open}
      placement={placement}
    >
      {element ? (
        element
      ) : isHelpIcon ? (
        <HelpIconStyled fontSize={SIZE.small} />
      ) : (
        <span className={classes.emptySpan}>""</span>
      )}
    </TooltipStyled>
  );
};
TooltipIcon.propTypes = {
  title: PropTypes.string,
  element: PropTypes.node,
  children: PropTypes.node,
};
export default TooltipIcon;
