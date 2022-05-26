import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import PrivateRoute from "../../shared/auth/PrivateRoute";

const PrivateRouteWithLayout = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <PrivateRoute
      { ...rest }
      component={ (matchProps) => (
        <Layout>
          <Component { ...matchProps } t={ t } dispatch={ dispatch } />
        </Layout>
      ) }
    />
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default PrivateRouteWithLayout;
