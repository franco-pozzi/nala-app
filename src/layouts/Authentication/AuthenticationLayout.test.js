import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "modules/session/context";
import { Provider as ProviderContext } from "Context";
import store from "store";
import Authentication from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <BrowserRouter>
            <Authentication />
 </BrowserRouter>
 </SessionProvider>
 </ProviderContext>
 </Provider>,
  );
  expect(queryByTestId("authentication-layout")).toBeTruthy();
});
