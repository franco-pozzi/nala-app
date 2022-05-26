import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "components/Button";
import useStyles from "./styles";

const UpgradePlan = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.media}>
        <img
          alt="Upgrade to PRO"
          src="/images/undraw_resume_folder_2_arse.svg"
        />
      </div>
      <div className={classes.content}>
        <Typography align="center" gutterBottom variant="h6">
          Upgrade to PRO
        </Typography>
        <Typography align="center" variant="body2">
          Upgrade to Devias Kit PRO and get even more components
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          component="a"
          href="https://devias.io/products/devias-kit-pro"
          variant="contained"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string,
};

export default UpgradePlan;
