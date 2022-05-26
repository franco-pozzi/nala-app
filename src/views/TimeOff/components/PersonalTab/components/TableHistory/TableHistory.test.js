import React from "react";
import { render } from "@testing-library/react";
import { Provider as ProviderContext } from "Context";
import store from "store";
import { SessionProvider } from "modules/session/context";
import { Provider } from "react-redux";
import TableHistory from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const data = [];
  const isLoading = false;
  const pageFilter = {};
  const setTableSort = () => {};
  const pageHandler = () => {};
  const handleEdit = () => {};
  const deleteHandler = () => {};

  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <TableHistory
            data={ data }
            isLoading={ isLoading }
            pageFilter={ pageFilter }
            setTableSort={ setTableSort }
            pageHandler={ pageHandler }
            handleEdit={ handleEdit }
            deleteHandler={ deleteHandler }
          />
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("table-history-time-off-view-component")).toBeTruthy();
});
