import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "components/Button";
import {
  VARIANT,
  API_URL_BASE_RAILS,
  CURRENT_DOMAIN,
  ALIGN_ITEMS,
} from "common/constants";
import { isMulticompanyUser } from "common/utils";
import useStyles from "./styles";

const ProviderButton = (props) => {
  const {
    isLoading, src, auth, children,
  } = props;
  const classes = useStyles();

  const onClickHandler = () => {
    window.location.replace(
      `${API_URL_BASE_RAILS}/api/v1${isMulticompanyUser() ? "/holdings" : ""}/auth/${auth}/?auth_origin_url=${CURRENT_DOMAIN}/sign-in`,
    );
  };

  return (
    <div data-testid={ "providerButton" }>
      <Button
        onClick={ onClickHandler }
        isDisabled={ isLoading }
        size={ "large" }
        variant={ VARIANT.outlined }
        customStyle={ classes.buttonContainer }
      >
        <Box display={ ALIGN_ITEMS.flex }>
          <div className={ classes.gridIcon }>
            <img src={ src } alt={ `${children} Logo` } />
          </div>
          <div className={ classes.gridIcon }>
            {children}
          </div>
        </Box>
      </Button>
    </div>
  );
};

ProviderButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default ProviderButton;
