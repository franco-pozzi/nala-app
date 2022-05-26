import React from "react";
import { render } from "@testing-library/react";
import { Provider as ProviderContext } from "Context";
import store from "store";
import { SessionProvider } from "modules/session/context";
import { Provider } from "react-redux";
import TimeOffForm from "./index";
import "mutationobserver-shim";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  global.MutationObserver = window.MutationObserver;
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <TimeOffForm />
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("time-off-form-view-component")).toBeTruthy();
});
