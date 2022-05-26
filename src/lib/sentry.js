import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { SENTRY_DSN, LOCAL_STORAGE_NAMES } from "common/constants";
import { getItemFromLocalStorage } from "common/utils";

const isLocal = process.env.NODE_ENV === "development";

export const initSentry = () => {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};

export const addErrors = (error, errorInfo = null) => {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    if (errorInfo) {
      scope.setExtras(errorInfo);
    }
    const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
    scope.setUser({
      id: user?.employee?.id,
      email: user?.email,
      company: user?.company?.name,
    });
    Sentry.captureException(error);
  });
};
