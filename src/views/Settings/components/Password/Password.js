import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";

import InputText from "../../../../components/InputText";
import Button from "../../../../components/Button";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Password = function (props) {
  const { className, ...rest } = props;
  const { t } = useTranslation("common");
  const classes = useStyles();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (prop, event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
	<Card { ...rest } className={ clsx(classes.root, className) }>
	<form>
	<CardHeader subheader={ t("common.update_password") } title={ t("common.password") } />
	<Divider />
	<CardContent>
	<InputText
	id={ "password" }
	type={ "password" }
	label={ t("common.password") }
	disabled={ false }
	onChange={ handleChange }
	value={ values.password }
          />
	<InputText
	id={ "confirmPassword" }
	type={ "password" }
	label={ t("common.confirm_password") }
	disabled={ false }
	onChange={ handleChange }
	value={ values.confirmPassword }
          />
        </CardContent>
	<Divider />
	<CardActions>
	<Button variant={ "outlined" }>
	{t("common.update")}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
