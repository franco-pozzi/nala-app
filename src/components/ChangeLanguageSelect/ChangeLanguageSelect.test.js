import React from "react";
import { render } from "@testing-library/react";
import ChangeLanguageSelect from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<ChangeLanguageSelect />);
  expect(queryByTestId("change-language-select")).toBeTruthy();
});
