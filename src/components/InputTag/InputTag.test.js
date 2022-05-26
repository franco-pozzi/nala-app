import React from "react";
import { render } from "@testing-library/react";
import InputTag from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const options = [];
  const { queryByTestId } = render(<InputTag data={ options } />);
  expect(queryByTestId("input-tags")).toBeTruthy();
});
