import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import { Provider as ProviderContext } from "Context";
import { SessionProvider } from "modules/session/context";
import TabGantTable from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const pageFilter = {};
  const pageHandler = () => {};
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <TabGantTable pageFilter={ pageFilter } pageHandler={ pageHandler } />
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("tab-gant-table-view-component")).toBeTruthy();
});
