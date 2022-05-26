import styled from "styled-components";
import Button from "@material-ui/core/Button";
import theme from "theme/palette";

export const StyledButton = styled(Button)`
  &.submit {
    background: ${theme.text.link};
    color: ${theme.white};
    .MuiSvgIcon-root {
      color: ${theme.white};
    }
    &:hover {
      background: ${theme.text.linkHover};
    }
    &:disabled {
      background: ${theme.background.lightGrey};
    }
  }
  &.cancel {
    background: ${theme.background.lightGrey};
    margin-right: 25px;
  }
  &.back {
    background-color: ${theme.background.lightGrey};
    color: ${theme.background.darkGrey};
  }
  &.outlined {
    border: 1px solid ${theme.text.link};
    color: ${theme.text.link};
    text-transform: none;
    & input {
      display: none;
    }
    .MuiSvgIcon-root {
      color: ${theme.text.link};
    }
  }
  &.disabled{
    background-color: rgba(0, 0, 0, 0.12);
  }
  &.general {
    text-transform: none;
  }
  &.dialogActions{
    padding: 6px 16px;
    font-size: 11px;
  }
  .buttonIconContainer {
    display: flex;
    align-items: center;
    .left {
    margin-right: 10px;
    margin-top: 5px;
    }
    .right {
      margin-left: 10px;
      margin-top: 5px;
    }
  }

`;
