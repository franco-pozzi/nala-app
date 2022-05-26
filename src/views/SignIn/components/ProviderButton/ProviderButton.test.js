import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { SessionProvider } from "modules/session/context";
import { Provider as ProviderContext } from "Context";
import store from "store";
import ProviderButton from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <ProviderButton isLoading={ false } src={ "/" } auth={ "" }>
            { "Google" }
          </ProviderButton>
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("providerButton")).toBeTruthy();
});
