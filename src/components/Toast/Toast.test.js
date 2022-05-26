import React from "react";
import { render } from "@testing-library/react";
import Toast from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<Toast />);
  expect(queryByTestId("toast-component")).toBeTruthy();
});
