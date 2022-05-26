import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ChangeLanguageSelect from "components/ChangeLanguageSelect";
import NalaLogoWhite from "assets/images/top-bar-minimal/logo-white.svg";
import useStyles from "./styles";

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      { ...rest }
      className={ clsx(classes.root, className) }
      position={ "fixed" }
    >
      <Toolbar>
        <RouterLink to={ "/" }>
          <img
            alt={ "Logo Nala" }
            src={ NalaLogoWhite }
            className={ classes.logoNala }
          />
        </RouterLink>
        <div className={ classes.flexGrow } />
        <ChangeLanguageSelect />
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
