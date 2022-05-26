import React from "react";
import PropTypes from "prop-types";
import { ALIGN_ITEMS, ERROR, VARIANT } from "common/constants";
import getInitials from "helpers/getInitials";
import { StyledAvatarCell, StyledBadge, StyledAvatar, StyledLabels, StyledBold } from "./styles";

const CustomAvatar = (props) => {
  const {
    isVisibleBadge,
    avatarImg,
    name,
    position,
  } = props;

  return (
    <StyledAvatarCell data-testid={ "custom-avatar-view-component" } >
      <StyledBadge
        anchorOrigin={ {
          vertical: ALIGN_ITEMS.bottom,
          horizontal: ALIGN_ITEMS.right,
        } }
        color={ ERROR }
        overlap={ VARIANT.circle }
        variant={ VARIANT.dot }
        invisible={ isVisibleBadge }
      >
        <StyledAvatar
          src={ avatarImg }
          name={ name }
        >
          { avatarImg ? "" : getInitials(name)}
        </StyledAvatar>
      </StyledBadge>
      <StyledLabels>
        <StyledBold>{name}</StyledBold>
        <p>{position}</p>
      </StyledLabels>
    </StyledAvatarCell>
  );
};

CustomAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  isVisibleBadge: PropTypes.bool.isRequired,
  avatarImg: PropTypes.string,
  position: PropTypes.string,
};

CustomAvatar.defaultProps = {
  avatarImg: "",
  position: "",
};

export default CustomAvatar;
