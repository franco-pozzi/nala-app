import styled from "styled-components";
import theme from "theme";
import Tabs from "@material-ui/core/Tabs";

export const StyledTabs = styled(Tabs)`
  .indicator {
    background-color: ${theme.palette.input.focused};
    height: 5px;
    top: 45px;
  }
  &.tabs {
    margin-left: -40px;
    margin-bottom: -3px;
  }
`;
