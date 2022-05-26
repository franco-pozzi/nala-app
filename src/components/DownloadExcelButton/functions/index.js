import React from "react";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "components/Button";
import { ICON } from "common/constants";

export const getName = (children, t) => (children || t("potential:download-excel"));

export const getDownloadButton = (
  customStyle,
  classes,
  t,
  isDisabled,
  handleClick,
  children,
) => (customStyle ? (
  <Button
    customStyle={ customStyle }
    isDisabled={ isDisabled }
    onClick={ handleClick }
  >
    {getName(children, t)}
  </Button>
) : (
  <div className={ classes.root }>
    <Button
      variant={ "outlined" }
      type={ "text" }
      size={ "small" }
      icon={ <CloudDownloadIcon /> }
      iconSide={ ICON.left }
      customStyle={ classes.downloadButton }
      isDisabled={ isDisabled }
      onClick={ handleClick }
    >
      {getName(children, t)}
    </Button>
  </div>
));
