import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import "mutationobserver-shim";
import { SessionProvider } from "modules/session/context";
import { Provider as ProviderContext } from "Context";
import store from "store";
import theme from "theme";
import CreatePassword from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", async () => async () => {
  const {
    control, watch, errors, setError, formState, clearErrors,
  } = useForm();

  global.MutationObserver = window.MutationObserver;
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <ThemeProvider theme={ theme }>
            <BrowserRouter>
              <CreatePassword
                control={ control }
                watch={ watch }
                errors={ errors }
                setError={ setError }
                formState={ formState }
                clearErrors={ clearErrors }
              />
            </BrowserRouter>
          </ThemeProvider>
        </SessionProvider>
      </ProviderContext>
    </Provider>,
  );
  expect(queryByTestId("create-password-component")).toBeTruthy();
});
