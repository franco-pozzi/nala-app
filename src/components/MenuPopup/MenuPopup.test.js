import React from "react";
import { render } from "@testing-library/react";
import MenuPopup from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<MenuPopup menuItems={ [] } />);
  expect(queryByTestId("menu-container")).toBeTruthy();
});
