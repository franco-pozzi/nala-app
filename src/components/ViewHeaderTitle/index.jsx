import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "components/Breadcrumbs";
import { BUTTON_STYLE_TYPES, VARIANT } from "common/constants";
import MenuPopup from "../MenuPopup";
import { useStyles } from "./styles";

const ViewHeaderTitle = (props) => {
  const classes = useStyles();
  const {
    title,
    subtitle,
    breadcrumb,
    isWithMenuButton,
    menuItems,
    menuButtonLabel,
    customTitleStyle,
  } = props;
  const gridTitle = isWithMenuButton ? 6 : 12;
  return (
    <div data-testid={ "view-header-title" }>
      <Grid container>
        {breadcrumb && (
          <Grid item xs={ 12 }>
            <Breadcrumbs data={ breadcrumb } />
          </Grid>
        )}
        <Grid item xs={ gridTitle }>
          <Typography className={ clsx(classes.titleText, customTitleStyle) }>
            {title}
          </Typography>
          <Typography variant={ VARIANT.bodyOne } className={ classes.subtitle }>
            {subtitle}
          </Typography>
        </Grid>
        {isWithMenuButton && (
          <Grid item xs={ 6 } sm={ 6 } className={ classes.btnRight }>
            <MenuPopup
              button={ menuButtonLabel }
              menuItems={ menuItems }
              typeStyle={ BUTTON_STYLE_TYPES.SUBMIT }
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
ViewHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumb: PropTypes.array,
  isWithMenuButton: PropTypes.bool,
  menuItems: PropTypes.array,
  menuButtonLabel: PropTypes.string,
  customTitleStyle: PropTypes.object,
};

ViewHeaderTitle.defaultProps = {
  subtitle: null,
  breadcrumb: null,
  isWithMenuButton: false,
  menuItems: [],
  menuButtonLabel: null,
  customTitleStyle: null,
};

export default ViewHeaderTitle;
