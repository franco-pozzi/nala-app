import { LOCAL_STORAGE_NAMES } from "common/constants";
import { isEmpty } from "common/helpers";
import { getItemFromLocalStorage, setInLocalStorageAsync } from "common/utils";
import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { SessionContext } from "../../modules/session/context";

const PrivateRoute = function ({ component: Component, ...props }) {
  const {
    state: { user },
    isLogout,
  } = useContext(SessionContext);
  const { pathname, search } = useLocation();
  const referrer = `${pathname}${search}`;
  if (!isLogout && isEmpty(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.referrer))) {
    setInLocalStorageAsync(LOCAL_STORAGE_NAMES.referrer, referrer);
  }

  const renderRedirect = (renderProps) => (user
    ? <Component { ...renderProps } />
    : <Redirect to={ { pathname: "/sign-in", referrer: !isLogout && getItemFromLocalStorage(LOCAL_STORAGE_NAMES.referrer) } } />);

  if (!Component) {
    throw new Error(
      `A component needs to be specified for private route for path ${props.path}`,
    );
  }

  return <Route { ...props } render={ renderRedirect } />;
};

export default PrivateRoute;
