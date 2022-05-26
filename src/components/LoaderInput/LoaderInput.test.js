import React from "react";
import { render } from "@testing-library/react";
import LoaderInput from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<LoaderInput />);
  expect(queryByTestId("loader-input")).toBeTruthy();
});
