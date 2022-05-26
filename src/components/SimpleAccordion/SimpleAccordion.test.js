import React from "react";
import { render } from "@testing-library/react";
import SimpleAccordion from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const title = "";
  const { queryByTestId } = render(<SimpleAccordion title={ title } />);
  expect(queryByTestId("simple-accordion-component")).toBeTruthy();
});
