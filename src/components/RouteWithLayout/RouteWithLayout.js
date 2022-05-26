import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = function (props) {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
	<Route
	{ ...rest }
	render={ (matchProps) => (
	<>
	{Layout ? (
	<Layout>
	<Component { ...matchProps } />
            </Layout>
          ) : (
	<Component { ...matchProps } />
          )}
        </>
      ) }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any,
  path: PropTypes.string,
};

export default RouteWithLayout;
