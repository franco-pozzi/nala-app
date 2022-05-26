import React from "react";
import { render } from "@testing-library/react";
import PopUpForm from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<PopUpForm />);
  expect(queryByTestId("popup-view-component")).toBeTruthy();
});
