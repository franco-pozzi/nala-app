import React from "react";
import { render } from "@testing-library/react";
import CollaboratorsCard from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Renders correctly", () => {
  const { queryByTestId } = render(<CollaboratorsCard />);
  expect(queryByTestId("collaborators-card-view-component")).toBeTruthy();
});
