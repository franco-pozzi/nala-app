import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import Breadcrumbs from "./index";

it("Renders correctly", () => {
  const data = [];
  const { queryByTestId } = render(
    <ThemeProvider theme={ theme }>
      <Breadcrumbs data={ data } />
 </ThemeProvider>,
  );
  expect(queryByTestId("breadcrumbs")).toBeTruthy();
});
