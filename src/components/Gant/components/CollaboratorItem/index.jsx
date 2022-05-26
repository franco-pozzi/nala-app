import React from "react";
import PropTypes from "prop-types";
import { ALIGN_ITEMS, ERROR, VARIANT } from "common/constants";
import {
  StyledContainer, StyledContent, StyledCustomAvatar, StyledBadge,
} from "./styles";

const CollaboratorItem = (props) => {
  const {
    fullName, image, jobPosition, isVisibleBadge,
  } = props;
  return (
    <StyledContainer>
      <StyledBadge
        anchorOrigin={ {
          vertical: ALIGN_ITEMS.bottom,
          horizontal: ALIGN_ITEMS.right,
        } }
        color={ ERROR }
        overlap={ VARIANT.circle }
        variant={ VARIANT.dot }
        invisible={ !isVisibleBadge }
      >
        <StyledCustomAvatar alt={ fullName } src={ image } />
      </StyledBadge>
      <StyledContent>
        <strong>{fullName}</strong>
        <p>{jobPosition}</p>
      </StyledContent>
    </StyledContainer>
  );
};

CollaboratorItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  image: PropTypes.element.isRequired,
  jobPosition: PropTypes.string,
  isVisibleBadge: PropTypes.bool,
};

CollaboratorItem.defaultProps = {
  jobPosition: null,
  isVisibleBadge: null,
};

export default CollaboratorItem;
