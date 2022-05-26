import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendPasswordRecoveryEmail, resetPasswordRecovery } from "redux/actions/createPasswordActions";
import { MESSAGE_TYPES } from "components/Toast/functions";
import { useTranslation } from "react-i18next";
import { useRedirect } from "../useRedirect";
import { signInPath } from "../../common/constants";

/**
 * service that extends recover password functionality
 * @param setResetTokenPasswordCreation
 * @param setTitle
 * @returns {{sendEmailRecoverPasswordPost: React.Dispatch<React.SetStateAction<unknown>>, isLoadingPasswordRecovery: *}}
 */
const useRecoverPasswordService = () => {
  const {
    isLoadingPasswordRecovery,
    processPasswordRecovery,
  } = useSelector(({ createPasswordReducer }) => createPasswordReducer);
  const { t } = useTranslation("authentication");
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const { redirectTo } = useRedirect();

  const toastAndRedirectTo = useCallback(() => {
    const state = {
      toast: {
        type: MESSAGE_TYPES.success,
        content: {
          message: `${t("recover_password.instructions_message")} ${email}`,
        },
      },
    };
      // Only we're going to execute this when we aren't in the signIn Component
    redirectTo(signInPath, { state, cleanStack: false });
    dispatch(resetPasswordRecovery());
  }, [redirectTo, email, dispatch, t]);
  // Call reset password
  useEffect(() => {
    if (formData) {
      dispatch(sendPasswordRecoveryEmail(formData));
      setEmail(formData.email);
      setFormData(null);
    }
  }, [formData, dispatch]);

  // PASSWORD FORGET EMAIL SENT: When we created the password we will show this alert
  useEffect(() => {
    if (processPasswordRecovery) {
      toastAndRedirectTo();
    }
  }, [processPasswordRecovery, toastAndRedirectTo]);

  return {
    sendEmailRecoverPasswordPost: setFormData,
    isLoadingPasswordRecovery,
  };
};

export default useRecoverPasswordService;
