import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Button from "./index";

// BIG NOTE

// unit tests
describe("<Button /> UNIT", () => {
  let component;
  const children = "Save";
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(<Button onClick={ mockHandler }>{children}</Button>);
  });

  // test styles
  test("it should display button", () => {
    const el = component.getByText(children);
    expect(el.parentNode).toHaveStyle("display: inline-flex");
    // ALSO can use the NOT statement like this -> expect(el.parentNode).not.toHaveStyle("display: none");
  });

  // test handle click
  test("click on the button and handle ONCE", () => {
    const button = component.getByText(children);
    // handle click event
    fireEvent.click(button);

    // verify if the functions is calling ONE time
    // expect(mockHandler.mock.calls).toHaveLength(1)
    // or
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});

// Another way to do those test on ONE
describe("<Button /> --", () => {
  test("Integration button test", () => {
    const children = "Save";
    const mockHandler = jest.fn();
    const component = render(<Button onClick={ mockHandler }>{children}</Button>);
    const button = component.getByText(children);
    const el = component.getByText("Save");
  
    expect(el.parentNode).toHaveStyle("display: inline-flex");
    expect(component.container.querySelector("Save"));
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  })
  
})