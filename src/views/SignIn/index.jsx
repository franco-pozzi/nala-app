import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PasswordInput from "components/PasswordInputController";
import InputTextController from "components/InputTextController";
import {
  AUTH_METHODS,
  BUTTON_STYLE_TYPES,
  BUTTON_TYPE,
  INPUT_RULES,
  VARIANT,
  signInTitle,
} from "common/constants";
import QueryString from "query-string";
import useCreatePasswordService from "hooks/auth/useCreatePasswordService";
import ViewHeaderTitle from "components/ViewHeaderTitle";
import useSignInService from "hooks/auth/useSignInService";
import CreatePassword from "./components/CreatePassword";
import { ButtonSignIn } from "./styledComponents";
import { showToast } from "./functions";
import useStyles from "./styles";

const SignIn = (props) => {
  const classes = useStyles();
  const { t } = useTranslation(["common", "authentication", "formValidations"]);
  const [buttonTypeStyle, setButtonTypeStyle] = useState(BUTTON_STYLE_TYPES.DISABLED);
  const [resetTokenPasswordCreation, setResetTokenPasswordCreation] = useState(
    null,
  );
  const [emailCreationPassword, setEmailCreationPassword] = useState(null);
  const [title, setTitle] = useState(signInTitle);
  const [authMethod, setAuthMethod] = useState(signInTitle);
  const { location } = props;
  const stateSearch = location?.search;

  const { isLoading, signInPost } = useSignInService({ location, authMethod });

  const {
    validateTokenPost,
    isLoadingTokenValidation,
    createPasswordPost,
    isLoadingPasswordCreation,
  } = useCreatePasswordService(setResetTokenPasswordCreation, setTitle);

  const {
    handleSubmit, control, formState, errors, watch,
  } = useForm({
    mode: "onChange",
  });

  // Manage url params (Password creation & token sign in)
  useEffect(() => {
    if (stateSearch) {
      const {
        email,
        auth_token: token,
        token: passwordToken,
        client_id: clientId,
        expiry,
        uid,
        error,
      } = QueryString.parse(stateSearch);

      if (error === "") {
        showToast(error, authMethod, null, t);
      }

      // We need to check if email was set
      if (passwordToken && email && title === signInTitle) {
        validateTokenPost({
          passwordToken,
          email,
        });
        setEmailCreationPassword(email);
        setResetTokenPasswordCreation(passwordToken);
        setTitle("create_password");
      }

      // We need to check if token was set
      if (token && authMethod !== AUTH_METHODS.token) {
        setAuthMethod(AUTH_METHODS.token);
        signInPost({
          token,
          clientId,
          expiry,
          uid,
          auth_method: AUTH_METHODS.token,
        });
      }
    }
  }, [stateSearch, validateTokenPost, authMethod, signInPost, title, t]);

  // Password creation & SignIn
  const onSubmit = (formData) => {
    if (resetTokenPasswordCreation) {
      formData.email = emailCreationPassword;
      formData.reset_password_token = resetTokenPasswordCreation;
      createPasswordPost(formData);
      return;
    }
    // We need to add auth_method to the object of auth
    formData.auth_method = AUTH_METHODS.password;
    signInPost(formData);
  };

  useEffect(() => {
    setButtonTypeStyle(
      formState.isValid
        ? BUTTON_STYLE_TYPES.SUBMIT
        : BUTTON_STYLE_TYPES.DISABLED,
    );
  }, [formState.isValid]);

  return (
    <div data-testid={ "signIn" }>
      <Box>
        <ViewHeaderTitle
          title={ t(`authentication:${title}`) }
          subtitle={ t("authentication:welcome") }
        />
      </Box>
      <form onSubmit={ handleSubmit(onSubmit) }>
        {resetTokenPasswordCreation ? (
          <CreatePassword
            control={ control }
            watch={ watch }
            errors={ errors }
            isLoadingTokenValidation={ isLoadingTokenValidation }
          />
        ) : (
          <>
            <InputTextController
              control={ control }
              margin={ VARIANT.normal }
              label={ t("authentication:email") }
              name={ "email" }
              customStyles={ classes.inputMb20 }
              rules={ INPUT_RULES.isValidEmail }
            />
            <PasswordInput
              control={ control }
              name={ "password" }
              rules={ INPUT_RULES.required }
            />
            <Link to={ "/recover-password" }>
              <Typography
                className={ classes.recoverPasswordLink }
                variant={ VARIANT.h6 }
              >
                {t("authentication:forgotten_password_question")}
              </Typography>
            </Link>
          </>
        )}
        <ButtonSignIn
          typeStyle={ buttonTypeStyle }
          isFullWidth
          type={ BUTTON_TYPE.submit }
          isLoading={ isLoading || isLoadingPasswordCreation }
          isDisabled={ !formState.isValid }
        >
          {t(`authentication:${title}`)}
        </ButtonSignIn>
      </form>
      {/* FIXME: uncomment me when you are working in register */}
      {/* <RegisterNowBox/> */}
    </div>
  );
};

export default SignIn;
