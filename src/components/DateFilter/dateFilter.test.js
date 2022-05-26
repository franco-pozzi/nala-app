import React from "react";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import DateFilter from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const { queryByTestId } = render(<DateFilter control={ control } />);
  expect(queryByTestId("date-filter-component")).toBeTruthy();
});
