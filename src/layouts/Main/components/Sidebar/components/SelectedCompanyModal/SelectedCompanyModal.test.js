import React from "react";
import { render } from "@testing-library/react";
import { Provider as ProviderContext } from "Context";
import store from "store";
import { SessionProvider } from "modules/session/context";
import { Provider } from "react-redux";
import SelectedCompanyModal from "./index";
import "mutationobserver-shim";

describe("<SelectedCompanyModal /> --", () => {
  let component;
  const isOpen = true;
  const onClose = () => {};
  beforeEach(() => {
    component = render(
      <Provider store={ store }>
        <ProviderContext>
          <SessionProvider>
            <SelectedCompanyModal
              isOpen={ isOpen }
              onClose={ onClose }
            />
          </SessionProvider>
        </ProviderContext>
      </Provider>,
    );
  });

  test("it should render content", async () => {
    expect(await component?.getByText("selectedCompany.title"));
    expect(await component?.getByText("selectedCompany.subtitle"));
    expect(await component?.getByText("selectedCompany.understood"));
  });
});
