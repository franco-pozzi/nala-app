import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { VARIANT } from "common/constants";
import Button from "components/Button";
import {
  StyledMenuButtonContainer,
  StyledListItemIcon,
  StyledMenuItemContainer,
  StyledDivider,
  StyledMenu,
} from "./styles";

const MenuPopup = (props) => {
  const {
    menuItems, button, typeStyle, isMobile,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledMenuButtonContainer className={ `${isMobile ? "mobile" : ""}` } data-testid={ "menu-container" }>
      {isMobile && (
        <Button
          onClick={ () => {
            if (menuItems[0]?.onClick) {
              menuItems[0].onClick();
            }
            handleClose();
          } }
          data-testid={ "menu-button" }
          typeStyle={ typeStyle }
          className={ "onlyOption" }
          { ...props }
        >
          {menuItems[0]?.icon}
        </Button>
      )}
      <Button
        onClick={ handleClick }
        data-testid={ "menu-button" }
        typeStyle={ typeStyle }
        { ...props }
      >
        {button ? (
          <>
            {button}
            <ArrowDropDownOutlinedIcon />
          </>
        ) : (
          <MoreVertIcon />
        )}
      </Button>
      <StyledMenu
        anchorEl={ anchorEl }
        keepMounted
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
      >
        {menuItems?.map((menuItem) => (
          <Grid container key={ menuItem?.title }>
            {menuItem?.divider && <StyledDivider />}
            <Grid item xs={ menuItem?.tooltip ? 10 : 12 }>
              <MenuItem
                onClick={ () => {
                  if (menuItem?.onClick) {
                    menuItem.onClick();
                  }
                  handleClose();
                } }
                disabled={ menuItem?.isDisabled }
              >
                {menuItem?.icon && (
                  <StyledListItemIcon className={ `${isMobile ? `mobile ${menuItem?.divider ? "error" : "" }` : ""}` }>
                    <div>
                      {menuItem?.icon}
                    </div>
                  </StyledListItemIcon>
                )}
                <Typography variant={ VARIANT.inherit } noWrap>
                  {menuItem?.title}
                </Typography>
              </MenuItem>
            </Grid>
            <StyledMenuItemContainer item xs={ 2 }>
              {menuItem?.tooltip}
            </StyledMenuItemContainer>
          </Grid>

        ))}
      </StyledMenu>
    </StyledMenuButtonContainer>
  );
};

MenuPopup.propTypes = {
  icon: PropTypes.object,
  menuItems: PropTypes.array.isRequired,
  typeStyle: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default MenuPopup;
