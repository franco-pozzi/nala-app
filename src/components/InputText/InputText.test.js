import React from "react";
import { render } from "@testing-library/react";
import InputText from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<InputText />);
  expect(queryByTestId("inputText")).toBeTruthy();
});
