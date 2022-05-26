import React from "react";
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";
import InputSelect from "./index";

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const name = "";
  const options = [];
  const { queryByTestId } = render(<InputSelect control={ control } name={ name } options={ options } />);
  expect(queryByTestId("input-select-component")).toBeTruthy();
});
