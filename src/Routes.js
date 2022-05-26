import React from "react";
import { Redirect, Switch } from "react-router-dom";
import AuthenticationLayout from "layouts/Authentication";
import { getMainRoute } from "common/utils";
import { PrivateRouteWithLayout, RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Icons as IconsView,
  NotFound as NotFoundView,
  Settings as SettingsView,
  SignIn as SignInView,
  SignUp as SignUpView,
  TimeOff as TimeOffView,
} from "./views";

const Routes = () => {
  const mainRoute = getMainRoute();
  return (
    <Switch>
      <Redirect exact from={ "/" } to={ mainRoute } />
      <PrivateRouteWithLayout
        component={ TimeOffView }
        exact
        layout={ MainLayout }
        path={ "/time-off" }
      />
      <RouteWithLayout
        component={ IconsView }
        exact
        layout={ MainLayout }
        path={ "/icons" }
      />
      <RouteWithLayout
        component={ SettingsView }
        exact
        layout={ MainLayout }
        path={ "/settings" }
      />
      <RouteWithLayout
        component={ SignUpView }
        exact
        path={ "/sign-up" }
        layout={ AuthenticationLayout }
      />
      <RouteWithLayout
        component={ SignInView }
        exact
        path={ "/sign-in" }
        layout={ AuthenticationLayout }
      />
      <RouteWithLayout
        component={ NotFoundView }
        exact
        layout={ MinimalLayout }
        path={ "/not-found" }
      />
      <Redirect to={ "/not-found" } />
    </Switch>
  );
};

export default Routes;
