import { isUnauthorized } from "common/utils";
import firebase from "firebase/app";
import { MESSAGE_TYPES, toast } from "components/Toast/functions";
import { googleProvider } from "lib/firebase";
import {
  AUTH_METHODS,
  AUTH_NETWORK_FAILED_FIREBASE,
  CLOSED_POPUP_FAILED_FIREBASE,
  CLOSED_POPUP_USER_FIREBASE, signInTitle,
} from "common/constants";

export const showToast = (errors, typeSignIn, emailToRecoverPassword, t) => {
  let messageAlert = "";
  // Check and select the current case to set the message content of the toast error
  if (isUnauthorized(errors) || errors === t("common:common.api_responses.error.title")) {
    const typeSignInLang = typeSignIn === signInTitle ? "wrong_signin_data" : "unauthenticated";
    messageAlert = t(`common:common.api_responses.error.${typeSignInLang}`);
  } else if (emailToRecoverPassword && !errors) {
    messageAlert = `${t("authentication:recover_password.instructions_message")}${emailToRecoverPassword}`;
  } else if (errors.recoverPassword && !errors.error) {
    messageAlert = t("authentication:recover_password.successfully_recover");
  } else if (errors === "") {
    messageAlert = t("common:common.api_responses.error.unauthenticated");
  }

  // We don't have a default case then we need to check if messageAlert was set
  if (messageAlert) {
    toast(MESSAGE_TYPES.error, { message: messageAlert });
  }
};

const FIREBASE_ERRORS = [
  AUTH_NETWORK_FAILED_FIREBASE,
  CLOSED_POPUP_FAILED_FIREBASE,
  CLOSED_POPUP_USER_FIREBASE,
];

export const SignInWithFirebase = (t, signInPost) => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((response) => {
      const formData = {
        email: response.user.email,
        auth_method: AUTH_METHODS.google,
        id_token: response.credential.idToken,
      };
      signInPost(formData);
    })
    .catch((error) => {
      if (FIREBASE_ERRORS.indexOf(error.code) === -1) {
        toast(MESSAGE_TYPES.error, {
          message: t("common.api_responses.error.title"),
        });
      }
    });
};
