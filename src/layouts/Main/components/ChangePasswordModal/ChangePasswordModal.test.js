import React from "react";
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import "mutationobserver-shim";
import { SessionProvider } from "modules/session/context";
import { Provider as ProviderContext } from "Context";
import store from "store";
import theme from "theme";
import ChangePasswordModal from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", async () => async () => {
  const { control, register } = useForm();

  global.MutationObserver = window.MutationObserver;
  const { queryByTestId } = render(
    <Provider store={ store }>
      <ProviderContext>
        <SessionProvider>
          <ThemeProvider theme={ theme }>
            <BrowserRouter>
              <ChangePasswordModal control={ control } register={ register } />
 </BrowserRouter>
 </ThemeProvider>
 </SessionProvider>
 </ProviderContext>
 </Provider>,
  );
  expect(queryByTestId("change-password-modal")).toBeTruthy();
});
