import React from "react";
import PropTypes from "prop-types";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import CancelIcon from "@material-ui/icons/Cancel";
import { MESSAGE_TYPES } from "../../functions";

const ToastMessage = (props) => {
  const { type, title, message } = props;

  const getIcon = () => {
    let icon;
    switch (type) {
    case MESSAGE_TYPES.info:
      icon = <InfoIcon />;
      break;
    case MESSAGE_TYPES.success:
      icon = <CheckCircleIcon />;
      break;
    case MESSAGE_TYPES.warning:
      icon = <WarningIcon />;
      break;
    case MESSAGE_TYPES.error:
      icon = <CancelIcon />;
      break;
    default:
      break;
    }
    return icon;
  };

  return (
    <div data-testid={ "toast-message-component" } className={ "toast-message-container" }>
      {getIcon()}
      <div>
        {title && <h4>{title}</h4>}
        <span>{message}</span>
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ToastMessage.defaultProps = {
  title: "",
};

export default ToastMessage;
