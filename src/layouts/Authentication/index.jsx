import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChangeLanguageSelect from "components/ChangeLanguageSelect";
import { LOCAL_STORAGE_NAMES, VARIANT } from "common/constants";
import { getItemFromLocalStorage, getMainRoute, isCandidate } from "common/utils";
import { isEmpty } from "common/helpers";
import { SessionContext } from "modules/session/context";
import useToastShared from "hooks/utils/useToastShared";
import nalaLogoImage from "assets/images/sign-in/nala-logo.svg";
import useStyles from "./styles";

const AuthenticationLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const { t } = useTranslation(["authentication", "common"]);

  // Activate the toast shared between views
  useToastShared();

  const {
    state: { user },
  } = useContext(SessionContext);

  const isCustomStyleView = window.location.pathname === "/recover-password"
    && !window.location.search;

  if (user) {
    const referrer = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.referrer);
    const mainRoute = isEmpty(referrer) || isCandidate(user?.userCookies) ? getMainRoute() : referrer;
    return <Redirect to={ mainRoute } />;
  }

  return (
    <Grid
      container
      className={ classes.mainContainer }
      data-testid={ "authentication-layout" }
    >
      <Grid item xs={ 12 } className={ classes.languageGrid }>
        <ChangeLanguageSelect isCustomIcon />
      </Grid>
      <Grid item sm={ 6 } md={ 5 } className={ classes.leftContent }>
        <Typography variant={ VARIANT.h1 } className={ classes.title }>
          {t("authentication:title")}
        </Typography>
        <Typography variant={ VARIANT.subtitleOne } className={ classes.subtitle }>
          {t("authentication:subtitle")}
        </Typography>
      </Grid>
      <Grid item xs={ 12 } sm={ 6 } md={ 7 } className={ classes.rightContent }>
        <Grid
          item
          xs={ 12 }
          sm={ 9 }
          md={ 6 }
          lg={ 5 }
          className={ clsx(isCustomStyleView && classes.rightContentCustomStyle) }
        >
          <Link to={ "/sign-in" }>
            <img src={ nalaLogoImage } alt={ "Nala Logo" } />
          </Link>
          {children}
        </Grid>
      </Grid>
    </Grid>
  // )
  );
};

AuthenticationLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthenticationLayout;
