import React from "react";
import { render } from "@testing-library/react";
import Loader from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<Loader />);
  expect(queryByTestId("loader-container")).toBeTruthy();
});
