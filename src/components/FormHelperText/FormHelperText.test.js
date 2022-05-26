import React from "react";
import { render } from "@testing-library/react";
import FormHelperText from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<FormHelperText />);
  expect(queryByTestId("form-helper-text-component")).toBeTruthy();
});
