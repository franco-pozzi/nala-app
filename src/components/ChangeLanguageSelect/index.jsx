import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import clsx from "clsx";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/Button";
import { LANGUAGES, LANGUAGES_NAMES } from "common/constants";
import useStyles from "./styles";

const ChangeLanguageSelect = (props) => {
  const { isCustomIcon } = props;
  const classes = useStyles();
  const [openSelect, setOpenSelect] = useState(false);
  const [cookies, setCookie] = useCookies(["language"]);
  const [language, setLanguage] = useState(null);
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    setCookie("language", event.target.value);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleOpenClose = () => {
    setOpenSelect(!openSelect);
  };

  const isBlueTheme = isCustomIcon && classes.blueTheme;

  useEffect(() => {
    if (cookies.language) {
      setLanguage(cookies.language);
    } else {
      setLanguage(LANGUAGES.es);
    }
  }, [cookies]);

  return (
    <div data-testid={ "change-language-select" }>
      <Button onClick={ handleOpenClose }>
        <GTranslateIcon className={ clsx(classes.icon, isBlueTheme) } />
      </Button>
      <FormControl className={ classes.formControl }>
        <Select
          className={ clsx(classes.select, isBlueTheme) }
          open={ openSelect }
          onClose={ handleOpenClose }
          onOpen={ handleOpenClose }
          value={ language }
          onChange={ handleChange }
          inputProps={ {
            classes: {
              icon: clsx(classes.icon, isBlueTheme),
            },
          } }
        >
          <MenuItem value={ LANGUAGES.es }>{LANGUAGES_NAMES.spanish}</MenuItem>
          <MenuItem value={ LANGUAGES.en }>{LANGUAGES_NAMES.english}</MenuItem>
          <MenuItem value={ LANGUAGES.pr }>{LANGUAGES_NAMES.portuguese}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

ChangeLanguageSelect.propTypes = {
  isCustomIcon: PropTypes.bool,
};

export default ChangeLanguageSelect;
