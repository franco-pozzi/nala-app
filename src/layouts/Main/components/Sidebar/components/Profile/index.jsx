import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { getItemFromLocalStorage } from "common/utils";
import { LOCAL_STORAGE_NAMES, ALIGN_ITEMS } from "common/constants";
import { StyledAvatar, StyledClose } from "./styles";

const Profile = (props) => {
  const { onClose } = props;

  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);

  return (
    <Box
      display={ {
        xs: "block",
        sm: "block",
        md: "none",
        lg: "none",
        xl: "none",
      } }
    >
      <Box>
        <StyledClose onClick={ onClose } />
      </Box>
      <Box display={ ALIGN_ITEMS.flex } justifyContent={ ALIGN_ITEMS.center }>
        <Box>
          <StyledAvatar
            alt={ user?.full_name }
            src={ user?.profile_img_url }
          />
        </Box>
        {/* uncomment when design for this is defined */}
        {/* <Box>
          <Typography className={ classes.profileName }>
            {user?.full_name}
          </Typography>
          <Typography className={ classes.profilePosition }>
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

Profile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Profile;
