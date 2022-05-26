import React from "react";
import { render } from "@testing-library/react";
import NoDataMessage from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<NoDataMessage />);
  expect(queryByTestId("noDataMessage")).toBeTruthy();
});
