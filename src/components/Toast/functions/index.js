import React from "react";
import { toast as toastify } from "react-toastify";
import ToastMessage from "components/Toast/components/ToastMessage";

export const MESSAGE_TYPES = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export const HTTP_STATUS_RESPONSE = {
  ok: 200,
};

export const toast = (type, messageObject) => {
  toastify[type](<ToastMessage type={ type } title={ messageObject.title } message={ messageObject.message } />);
};

export const handleMessages = (type, status, t, message = null) => {
  switch (type) {
  case MESSAGE_TYPES.success:
    return {
      title: t("common:common.api_responses.success.title"),
      message: message || t("common:common.api_responses.success.save"),
    };
  case MESSAGE_TYPES.error:
    return {
      title: t("common:common.api_responses.error.title"),
      message: message || t(`common:common.api_responses.error.${status}`),
    };
  case MESSAGE_TYPES.info:
    return {
      title: t("common:common.api_responses.info.title"),
      message,
    };
  case MESSAGE_TYPES.warning:
    return {
      title: t("common:common.api_responses.warning.title"),
      message,
    };
  default:
    break;
  }
};
