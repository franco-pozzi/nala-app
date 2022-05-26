import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import { default as DefaultBreadcrumbs } from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const Breadcrumbs = (props) => {
  const { data } = props;
  return (
    <div data-testid="breadcrumbs">
      {data && (
        <DefaultBreadcrumbs aria-label="breadcrumb">
          {data.map((link) => {
            return _.isEmpty(link.path) ? (
              <Typography color="textPrimary" key={link.label}>
                {link.label}
              </Typography>
            ) : (
              <Link color="inherit" href={link.path} key={link.label}>
                {link.label}
              </Link>
            );
          })}
        </DefaultBreadcrumbs>
      )}
    </div>
  );
};

Breadcrumbs.propTypes = {
  data: PropTypes.array,
};

export default Breadcrumbs;
