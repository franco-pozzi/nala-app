import React from "react";
import { render } from "@testing-library/react";
import TabGantTable from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<TabGantTable />);
  expect(queryByTestId("custom-avatar-view-component")).toBeTruthy();
});
