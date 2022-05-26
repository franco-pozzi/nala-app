import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import StarRating from "./index";
import theme from "../../theme";

it("Renders correctly", () => {
  const name = "starTest";
  const value = 0;
  const { queryByTestId } = render(
    <ThemeProvider theme={ theme }>
      <StarRating name={ name } value={ value } />
 </ThemeProvider>,
  );
  expect(queryByTestId("rating")).toBeTruthy();
});
