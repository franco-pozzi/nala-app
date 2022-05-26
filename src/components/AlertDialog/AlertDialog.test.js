import React from "react";
import { render } from "@testing-library/react";
import AlertDialog from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<AlertDialog isOpen onClose={ () => {} } title={ "" } />);
  expect(queryByTestId("alert-dialog-component")).toBeTruthy();
});
