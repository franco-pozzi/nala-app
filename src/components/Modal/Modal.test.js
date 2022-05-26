import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import Modal from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(
    <ThemeProvider theme={ theme }>
      <Modal isOpen onClose={ () => {} } />
    </ThemeProvider>,
  );
  expect(queryByTestId("modal-view")).toBeTruthy();
});
