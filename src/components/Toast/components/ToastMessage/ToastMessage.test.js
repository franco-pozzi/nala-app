import React from "react";
import { render } from "@testing-library/react";
import Toast from "./index";
import { MESSAGE_TYPES } from "../../functions";

it("Renders correctly", () => {
  const type = MESSAGE_TYPES.success;
  const message = "";
  const { queryByTestId } = render(<Toast type={ type } message={ message } />);
  expect(queryByTestId("toast-message-component")).toBeTruthy();
});
