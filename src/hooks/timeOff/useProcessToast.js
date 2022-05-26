import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast, MESSAGE_TYPES } from "components/Toast/functions";
import { resetProcess } from "redux/actions/timeOffActions";

export const useProcessToast = (typeMessage, setTest, test) => {
  const { t } = useTranslation(["common"]);
  const messageSend = t("common.api_responses.success.send");
  const dispatch = useDispatch();
  const { errorProcess, sucessProcess } = useSelector(
    ({ timeOffReducer }) => timeOffReducer,
  );

  useEffect(() => {
    if (errorProcess) {
      setTest("TOAST DISPATCH");
      toast(MESSAGE_TYPES.error, { title: errorProcess });
      dispatch(resetProcess());
    }
    // eslint-disable-next-line
  }, [dispatch, messageSend, errorProcess]);

  useEffect(() => {
    if (sucessProcess) {
      setTest("TOAST DISPATCH");
      toast(MESSAGE_TYPES.success, {
        title: t("common.api_responses.success.title"),
        message: t("common.api_responses.success.send"),
      });
      dispatch(resetProcess());
    }
    // eslint-disable-next-line
  }, [dispatch, messageSend, typeMessage, sucessProcess]);
};
