import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import PropTypes from "prop-types";

const SkeletonLoader = (props) => {
  const classes = useStyles();
  const { isInline = true, numberOfSkeletons } = props;

  return (
    <Grid container data-testid="skeletonLoader">
      {Array(numberOfSkeletons)
        .fill()
        .map((e, index) => (
          <Grid
            item
            key={`skeleton-${index}`}
            xs={isInline ? 6 : 12}
            className={classes.gridSkeletonContainer}
          >
            <Skeleton />
          </Grid>
        ))}
    </Grid>
  );
};

SkeletonLoader.propTypes = {
  isInline: PropTypes.bool,
  numberOfSkeletons: PropTypes.number,
};

export default SkeletonLoader;
