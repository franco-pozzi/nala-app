import React from "react";
import { render } from "@testing-library/react";
import SearchInput from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<SearchInput />);
  expect(queryByTestId("searchText")).toBeTruthy();
});
