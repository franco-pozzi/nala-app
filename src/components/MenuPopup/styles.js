import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import theme, { TABLE, iconColor } from "theme/palette";

export const StyledMenuButtonContainer = styled.div`
  button {
    > .MuiButton-label {
      svg {
        color: ${iconColor.defaultMenu};
      }
      .primary{
        color: ${theme.white};
      }

    }
    &.onlyOption{
      margin-right: 15px;
    }
  }
  &.mobile {
    display: flex;
    justify-content: flex-end;
    button {
      border: 1px solid ${theme.table.blue};
      min-width: 40px;
      min-height: 40px;
      border-radius: 100%;
      padding: 5px 10px;
      &::selection {
        background-color: red;
      }
      > .MuiButton-label {
        svg {
          color: ${theme.table.blue};
        }
      }
    }
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 30px;
`;

export const StyledMenuItemContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

export const StyledDivider = styled(Divider)`
  flex: 1;
  border: 1px solid ${TABLE.DIVIDER};
`;

export const StyledMenu = styled(Menu)`
  color: ${iconColor.defaultMenu};
  .mobile {
    > div {
      color: ${theme.table.blue};
      border: 1px solid ${theme.table.blue};
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
    &.error {
      > div {
        align-items: center;
        display: flex;
        border-color: ${theme.table.red};
        svg {
          margin-top: 5px;
          color: ${theme.table.red};
        }
      }
      + span > div{
        color: ${theme.table.red};
      }
    }
  }
`;
