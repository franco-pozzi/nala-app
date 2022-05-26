import { useEffect } from "react";
import { toast, MESSAGE_TYPES } from "components/Toast/functions";

const useHandleProcess = (t, errorProcess, successProcess, message) => {
  useEffect(() => {
    const toastMessage = {
      title: t(`common:common.api_responses.${errorProcess ? "error.title" : "success.title"}`),
      message: errorProcess || message,
    };
    if (successProcess || errorProcess) {
      toast(successProcess ? MESSAGE_TYPES.success : MESSAGE_TYPES.error, toastMessage);
    }
  }, [successProcess, errorProcess, t, message]);
};

export default useHandleProcess;
