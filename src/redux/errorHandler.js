import i18n from "i18next";
import { addErrors } from "lib/sentry";
import { MESSAGE_TYPES, toast } from "components/Toast/functions";
import { addNotification } from "redux/actions/notifications/notificationsActions";
import {
  ERROR,
  TOAST_ERROR_DURATION,
  LOCAL_STORAGE_NAMES,
  SIGN_IN_URLS,
  INDEX,
} from "common/constants";
import { setInLocalStorage } from "common/utils";

const getMessage = () => i18n.t("common:common.api_responses.error.title");

const errorHandler = (error, dispatch, typeAction) => {
  if (error.response) {
    // sentry error
    addErrors(error, error.config);

    if (error.response.status === 401 && (!SIGN_IN_URLS.includes(window.location.href))) {
      setInLocalStorage(
        LOCAL_STORAGE_NAMES.logOutError,
        true,
      );
      window.location.replace("/");
    } else if (error.response.status !== 401 || (error.response.status === 401 && SIGN_IN_URLS.includes(window.location.href))) {
      let messageError = getMessage();
      const propError = error.response.data?.errors && Object.keys(error.response.data?.errors)[INDEX.zero];
      if (error.response.data?.message || error.response.data?.error
          || error.response.data?.errors) {
        messageError = error.response.data.detail
          || error.response.data?.error
          || error.response.data?.message || error.response.data?.errors[INDEX.zero]
          || (propError && error.response.data?.errors[propError][INDEX.zero]);
      }

      // TODO: apply similar logic to display successes
      const title = getMessage();
      dispatch(
        addNotification({
          type: ERROR,
          duration: TOAST_ERROR_DURATION,
          title,
          description: messageError,
        }),
      );
      // TODO: backend format messages
      toast(MESSAGE_TYPES.error, { title, message: messageError });

      setTimeout((
        dispatch({
          type: typeAction,
          payload: null,
        })
      ), 2000);
    }
  }
};

export default errorHandler;
