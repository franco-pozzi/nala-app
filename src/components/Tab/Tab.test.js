import React from "react";
import { render } from "@testing-library/react";
import Tab from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<Tab />);
  expect(queryByTestId("tabs-component")).toBeTruthy();
});
