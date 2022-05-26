
import React from "react";
import { components } from "react-select";
import palette from "theme/palette";

const { ValueContainer, Placeholder } = components;

export const CustomValueContainer = (props) => {
  const { children, isFocused, selectProps } = props;
  const { placeholder } = selectProps;
  return (
    <ValueContainer { ...props }>
      <Placeholder { ...props } isFocused={ isFocused }>{ placeholder }</Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
}

const getControlBorder = (state) => {
  const { isFocused, isDisabled } = state;
  if (isFocused) {
    return `2px solid ${palette.input.focused}`;
  }

  if (isDisabled) {
    return `1px solid ${palette.input.disabled}`;
  }

  return "1px solid rgba(0, 0, 0, 0.23)";
};

export const getCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: getControlBorder(state),
    fontFamily: "Roboto",
    fontSize: 14,
    background: state.isDisabled && palette.white,
    "&:hover": {
      border: `1px solid ${palette.input.borderControl}`,
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: "9",
    border: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused && palette.input.options,
    color: palette.text.secondaryTitle,
    fontSize: 14,
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "visible",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -5 : "50%",
    transition: "top 0.3s, font-size 0.3s",
    fontSize: (state.hasValue || state.selectProps.inputValue) && 12,
    background: palette.white,
    padding: "0 5px",
  }),
};
