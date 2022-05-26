import React from "react";
import { render } from "@testing-library/react";
import InputForm from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<InputForm />);
  expect(queryByTestId("input-form-component")).toBeTruthy();
});
