import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import InputForm from "components/InputForm";
import { INPUT_TYPE, VARIANT, BUTTON_STYLE_TYPES } from "common/constants";
import theme from "theme/palette";
import uploadImg from "assets/images/forms/subir-archivo.svg";
import { StyledIcon } from "styledComponents/StyledIcon";
import { StyledBoxLabel, StyledParagraph, StyledBoldLabel } from "./styles";

const FileInputTimeOff = (props) => {
  const {
    control, updateFiles, files, removeFile, lastFiles,
  } = props;
  const { t } = useTranslation(["common"]);

  return (
    <div data-testid={ "file-input-time-off-view-component" }>
      <StyledBoxLabel>
        <img alt={ "upload file" } src={ uploadImg } />
        <StyledBoldLabel>{t("common.upload_file")}</StyledBoldLabel>
      </StyledBoxLabel>
      { lastFiles }
      <InputForm
        type={ INPUT_TYPE.file }
        control={ control }
        name={ "attatchment" }
        text={ files?.length ? `${files?.length} ${t("common.files_selected")}` : t("common.select_file") }
        onChange={ (event) => updateFiles(event.target) }
        variant={ VARIANT.outlined }
        typeStyle={ BUTTON_STYLE_TYPES.outlined }
      />
      <div>
        {files?.map((file) => (
          <StyledParagraph key={ file.lastModified } onClick={ () => removeFile(file.name) }>
            <StyledParagraph>{file.name}</StyledParagraph>
            <StyledIcon color={ theme.error.main }>
              <DeleteOutlinedIcon />
            </StyledIcon>
          </StyledParagraph>
        ))}
      </div>
    </div>
  );
};

FileInputTimeOff.propTypes = {
  updateFiles: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  files: PropTypes.any.isRequired,
  lastFiles: PropTypes.any,
};

FileInputTimeOff.defaultProps = {
  lastFiles: "",
};

export default FileInputTimeOff;
