import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { mainDownloadExcel, mainDownloadExcelCustom } from "common/utils";
import {
  BUTTON_STYLE_TYPES, TYPES, SIZE, ALIGN_ITEMS,
} from "common/constants";
import Button from "components/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import useStyles from "./styles";

const DownloadExcelButton = (props) => {
  const {
    isDisabled, onClick, customStyle, isDownloadApart, children, isLoading, className,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation("potential");

  const handleClick = () => {
    if (isDownloadApart) {
      onClick();
    } else {
      const [data, filename, isCustom, isMultiple] = onClick();
      if (isCustom) {
        mainDownloadExcelCustom(data, filename, t);
      } else {
        mainDownloadExcel(data, filename, isMultiple);
      }
    }
  };

  const getName = () => (children || t("potential:download-excel"));

  const buttonProps = customStyle ? { customStyle } : {
    variant: BUTTON_STYLE_TYPES.OUTLINED,
    type: TYPES.text,
    size: SIZE.small,
    icon: <CloudDownloadIcon />,
    iconSide: ALIGN_ITEMS.left,
    customStyle: classes.downloadButton,
  };

  return (
    <div data-testid={ "downloadExcelButton" } className={ className }>
      <div className={ customStyle ? "" : classes.root }>
        <Button
          isDisabled={ isDisabled }
          isLoading={ isLoading }
          onClick={ handleClick }
          { ...buttonProps }
        >
          {getName()}
        </Button>

      </div>
    </div>
  );
};

DownloadExcelButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.string,
  isDownloadApart: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

DownloadExcelButton.defaultProps = {
  isDisabled: false,
  onClick: () => {},
  customStyle: null,
  isDownloadApart: false,
  children: null,
  isLoading: false,
  className: "",
};
export default DownloadExcelButton;
