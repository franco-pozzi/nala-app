import React from "react";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import PasswordInput from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", async () => async () => {
  const { control } = useForm();
  const { queryByTestId } = render(<PasswordInput control={ control } />);
  expect(queryByTestId("password-input")).toBeTruthy();
});
