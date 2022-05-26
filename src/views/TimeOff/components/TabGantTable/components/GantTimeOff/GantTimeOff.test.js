import React from "react";
import { render } from "@testing-library/react";
import GantTimeOff from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<GantTimeOff />);
  expect(queryByTestId("gant-time-off-view-component")).toBeTruthy();
});
