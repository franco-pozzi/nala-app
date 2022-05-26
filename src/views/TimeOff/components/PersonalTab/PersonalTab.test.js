import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import { Provider as ProviderContext } from "Context";
import "mutationobserver-shim";
import { SessionProvider } from "modules/session/context";
import PersonalTab from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const handleEdit = () => {};
  global.MutationObserver = window.MutationObserver;
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <PersonalTab handleEdit={ handleEdit } />
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("tab-personal-view-component")).toBeTruthy();
});
