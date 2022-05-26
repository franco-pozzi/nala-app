import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Provider as ProviderContext } from "Context";
import { SessionProvider } from "modules/session/context";
import store from "store";
import Filter from "./index";
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
          <Filter type={ "collaborators" } />
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );

  expect(queryByTestId("filter-component")).toBeTruthy();
});
