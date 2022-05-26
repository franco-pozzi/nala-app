import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CIRCULAR_PROGRESS } from "common/constants";

//NOTE: simple loader for inputs.
const LoaderInput = () => {
  return (
    <div data-testid={"loader-input"}>
      <CircularProgress size={CIRCULAR_PROGRESS.small} />
    </div>
  );
};

export default LoaderInput;
