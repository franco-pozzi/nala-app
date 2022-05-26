import React from "react";
import { render } from "@testing-library/react";
import TabPanel from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<TabPanel />);
  expect(queryByTestId("tabPanelContainer")).toBeTruthy();
});
