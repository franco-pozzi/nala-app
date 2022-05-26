import React from "react";
import PropTypes from "prop-types";
import DinamicModals from "views/TimeOff/components/DinamicModals";
import { StyledModal, useStyles } from "./styles";

const ModalCollaboratorsCard = (props) => {
  const {
    selectedModal, selectedId, onClose, isOpen,
  } = props;
  const classes = useStyles();

  return (
    <StyledModal
      data-testid={ "modal-collaborators-card-view-component" }
      isOpen={ isOpen }
      onClose={ () => onClose() }
      customStyle={ classes.mobileModal }
    >
      <DinamicModals
        state={ selectedModal }
        itemId={ selectedId }
        onClose={ onClose }
        isMobile
      />
    </StyledModal>
  );
};

ModalCollaboratorsCard.propTypes = {
  selectedModal: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

ModalCollaboratorsCard.defaultProps = {
  selectedId: "",
  onClose: null,
  isOpen: false,
};

export default ModalCollaboratorsCard;
