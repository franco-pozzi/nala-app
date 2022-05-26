import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { SessionProvider } from "modules/session/context";
import { Provider as ProviderContext } from "Context";
import store from "store";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterNowBox from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(
    <Router>
      <Provider store={ store }>
        <ProviderContext>
          <SessionProvider>
            <RegisterNowBox />
          </SessionProvider>
        </ProviderContext>
      </Provider>
    </Router>,
  );
  expect(queryByTestId("register-now")).toBeTruthy();
});
