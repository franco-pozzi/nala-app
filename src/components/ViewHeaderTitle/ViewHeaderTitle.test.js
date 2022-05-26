import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import ViewHeaderTitle from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(
    <ThemeProvider theme={ theme }>
      <ViewHeaderTitle title={ "test" } />
 </ThemeProvider>,
  );
  expect(queryByTestId("view-header-title")).toBeTruthy();
});
