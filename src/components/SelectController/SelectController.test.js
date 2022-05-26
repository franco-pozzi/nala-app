import React from "react";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import SelectController from "./index";

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const { queryByTestId } = render(<SelectController control={ control } />);
  expect(queryByTestId("select-controller-container")).toBeTruthy();
});
