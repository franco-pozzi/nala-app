import React from "react";
import { render } from "@testing-library/react";
import { Provider as ProviderContext } from "Context";
import store from "store";
import { SessionProvider } from "modules/session/context";
import { Provider } from "react-redux";
import TimeOffCard from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {

  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <TimeOffCard/>
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("card-time-off-view-component")).toBeTruthy();
});
