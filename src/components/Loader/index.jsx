import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useStyles } from "./styles";

const Loader = ({ size = 40 }) => {
  const classes = useStyles();
  return (
    <Grid
      data-testid="loader-container"
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.loader}
    >
      <CircularProgress size={size} />
    </Grid>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
};

export default Loader;
