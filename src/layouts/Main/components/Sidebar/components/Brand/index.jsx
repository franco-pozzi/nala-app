import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import NalaLogoBlue from "assets/images/top-bar-layout/logo-nala@2x.png";
import { StyledClose, StyledNalaContainer } from "./styles";

const Brand = (props) => {
  const { onClose } = props;

  return (
    <Box
      display={ {
        xs: "none",
        sm: "none",
        md: "block",
        lg: "none",
        xl: "none",
      } }
    >
      <Box>
        <StyledClose onClick={ onClose } />
      </Box>
      <StyledNalaContainer display={ "flex" } justifyContent={ "center" }>
        <Box>
          <img alt={ "Logo Nala" } src={ NalaLogoBlue } width={ 72 } height={ 34 } />
        </Box>
      </StyledNalaContainer>
    </Box>
  );
};

Brand.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Brand;
