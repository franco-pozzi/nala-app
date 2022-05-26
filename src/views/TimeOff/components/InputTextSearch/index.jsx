import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { INPUT_TYPE, TIMEOUT_DISPATCH } from "common/constants";

import { StyledInputForm } from "./styles";

const InputTextSearch = (props) => {
  const { inputHandler } = props;
  const { t } = useTranslation(["timeOff"]);
  const { control, watch } = useForm();
  const hasSearchIcon = true;
  const searchWatch = watch("search");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      inputHandler(searchWatch);
    }, TIMEOUT_DISPATCH);

    return () => clearTimeout(delayDebounceFn);
  }, [searchWatch, inputHandler]);

  return (
    <StyledInputForm
      type={ INPUT_TYPE.text }
      control={ control }
      name={ "search" }
      placeholder={ t("search_collaborators") }
      hasSearchIcon={ hasSearchIcon }
    />
  );
};

InputTextSearch.propTypes = {
  inputHandler: PropTypes.func.isRequired,
};

export default InputTextSearch;
