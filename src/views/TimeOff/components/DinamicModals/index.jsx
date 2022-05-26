import React from "react";
import PropTypes from "prop-types";
import { STATE_CHANGE } from "common/constants/timeOff";
import AcceptForm from "./components/AcceptForm";
import RejectForm from "./components/RejectForm";
import DeleteForm from "./components/DeleteForm";

const DinamicModals = (props) => {
  const {
    state, itemId, onClose, isMobile,
  } = props;

  switch (state) {
  case STATE_CHANGE.approve:
    return <AcceptForm onClose={ onClose } timeOffId={ itemId } isMobile={ isMobile } />;
  case STATE_CHANGE.reject:
    return <RejectForm onClose={ onClose } timeOffId={ itemId } isMobile={ isMobile } />;
  case STATE_CHANGE.delete:
    return <DeleteForm onClose={ onClose } timeOffId={ itemId } isMobile={ isMobile } />;
  default:
    return "";
  }
};

DinamicModals.propTypes = {
  state: PropTypes.string,
  itemId: PropTypes.number,
  onClose: PropTypes.func,
};

DinamicModals.defaultProps = {
  state: "",
  itemId: "",
  onClose: () => {},
  isMobile: false,
};

export default DinamicModals;
