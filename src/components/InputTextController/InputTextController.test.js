import React from "react";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import InputTextController from "./index";

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const { queryByTestId } = render(<InputTextController control={ control } />);

  expect(queryByTestId("input-text-controller")).toBeTruthy();
});
