import React from "react";
import { render } from "@testing-library/react";
import CheckboxInput from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<CheckboxInput />);
  expect(queryByTestId("checkboxValidator")).toBeTruthy();
});
