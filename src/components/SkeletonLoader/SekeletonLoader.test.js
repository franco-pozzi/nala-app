import React from "react";
import { render } from "@testing-library/react";
import SkeletonLoader from "./index";

it("Renders correctly", () => {
  const { queryByTestId } = render(<SkeletonLoader />);
  expect(queryByTestId("skeletonLoader")).toBeTruthy();
});
