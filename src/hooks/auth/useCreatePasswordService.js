import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { createPassword, resetState } from "redux/actions/createPasswordActions";
import { MESSAGE_TYPES, toast } from "components/Toast/functions";
import { isMulticompanyUser } from "common/utils";
import { useRedirect } from "../useRedirect";
import {
  signInPath, signInTitle, API_URL_BASE_RAILS, CURRENT_DOMAIN,
} from "../../common/constants";

/**
 * extends the functionality of password creation process
 * @param setResetTokenPasswordCreation
 * @param setTitle
 * @returns {{validateTokenPost: React.Dispatch<React.SetStateAction<unknown>>, isLoadingPasswordCreation: *, createPasswordPost: React.Dispatch<React.SetStateAction<unknown>>, isLoadingTokenValidation: *, resultCreatePassword: *}}
 */
const useCreatePasswordService = (setResetTokenPasswordCreation = null, setTitle = null) => {
  const {
    errorList,
    isLoadingTokenValidation,
    isLoadingPasswordCreation,
    processPasswordCreation,
  } = useSelector(({ createPasswordReducer }) => createPasswordReducer);
  const { t } = useTranslation("authentication");
  const [formData, setFormData] = useState(null);
  const [passwordFormData, setPasswordFormData] = useState(null);
  const dispatch = useDispatch();
  const { redirectTo } = useRedirect();

  const toastAndRedirectTo = useCallback((data, isError, setResetTokenCreation, setTitleData) => {
    if (!data) {
      return;
    }

    let state = null;
    // if: When we are in the sign_in view we can only show the toast
    // else: When we are out of the sign_in view we can send the toast through of the state location
    // setTitle is only used in sign in view
    const message = isError ? t("invalid_token_password_created") : t("password_created_successfully");
    const type = isError ? MESSAGE_TYPES.error : MESSAGE_TYPES.success;
    if (setTitle) {
      toast(type, { message });
    } else {
      // Only create the object and redirect will make the magic
      state = {
        toast: {
          type,
          content: { message },
        },
      };
    }

    dispatch(resetState());

    // Only we're going to execute this when we aren't in the signIn Component
    // (ONLY FOR SIGN IN COMPONENT)
    if (setResetTokenCreation && setTitleData) {
      setResetTokenCreation(null);
      setTitle(signInTitle);
    }

    redirectTo(signInPath, {
      onlyReplace: setResetTokenCreation,
      state,
      cleanStack: setTitleData,
    });
  }, [setTitle, dispatch, t, redirectTo]);

  // Call validation token API
  useEffect(() => {
    if (formData) {
      window.location.replace(
        `${API_URL_BASE_RAILS}/api/v1${isMulticompanyUser() ? "/holdings" : ""}/auth/password/edit?reset_password_token=${formData.reset_password_token}&redirect_url=${CURRENT_DOMAIN}/recover-password`,
      );
    }
  }, [formData, dispatch]);

  // Call Password creation API
  useEffect(() => {
    if (passwordFormData) {
      dispatch(createPassword(passwordFormData));
      setPasswordFormData(null);
    }
  }, [passwordFormData, dispatch]);

  // If we got errors, we need to redirect to the sign-in
  useEffect(() => {
    toastAndRedirectTo(errorList, true, setResetTokenPasswordCreation, setTitle);
  }, [errorList, setTitle, setResetTokenPasswordCreation, toastAndRedirectTo]);

  // PASSWORD CREATED: When we created the password we will show this alert
  useEffect(() => {
    toastAndRedirectTo(processPasswordCreation, false, setResetTokenPasswordCreation, setTitle);
  }, [processPasswordCreation, setResetTokenPasswordCreation, setTitle, toastAndRedirectTo]);

  return {
    validateToken: setFormData,
    isLoadingTokenValidation,
    isLoadingPasswordCreation,
    createPasswordPost: setPasswordFormData,
    resultCreatePassword: processPasswordCreation,
  };
};

export default useCreatePasswordService;
