import React from "react";
import { render } from "@testing-library/react";
import TimeOffForm from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<TimeOffForm />);
  expect(queryByTestId("file-input-time-off-view-component")).toBeTruthy();
});
