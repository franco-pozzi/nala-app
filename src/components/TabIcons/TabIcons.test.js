import React from "react";
import { render } from "@testing-library/react";
import TabIcons from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<TabIcons />);
  expect(queryByTestId("tab-icons-component")).toBeTruthy();
});
