import React from "react";
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";
import InputCheckbox from "./index";

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const name = "";
  const { queryByTestId } = render(<InputCheckbox control={ control } name={ name } />);
  expect(queryByTestId("input-checkbox-component")).toBeTruthy();
});
