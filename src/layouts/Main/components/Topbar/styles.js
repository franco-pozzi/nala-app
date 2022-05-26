import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { TOP_BAR } from "theme/palette";

export const StyledAppBar = styled.div`
  .MuiAppBar-colorPrimary{
    background-color: ${ TOP_BAR.background };
    height: 60px;
    box-shadow: 0px 2px 6px ${ TOP_BAR.shadow };
    padding-left: 230px;
  }
  @media (max-width: 1279px) {
    .MuiAppBar-colorPrimary{
      padding-left: 0px;
    }
  }
  .flexGrow {
    flex-grow: 1;
  }
  .MuiSvgIcon-root {
    color: ${ TOP_BAR.white };
  }
  .gTranslateIcon .MuiSvgIcon-root {
    color: ${ TOP_BAR.lightBlue };
  }
  .MuiSvgIcon-root:hover, .MuiSvgIcon-root:active {
    color: ${ TOP_BAR.white };
  }
  .MuiAvatar-root {
    margin-left: 15px;
  }
  .MuiInput-root, .MuiButton-text {
    color: ${ TOP_BAR.white };
  }
`;

export const StyledLinkButton = styled(Link)`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const StyledSelect = styled(Select)`
  color: ${ TOP_BAR.lightBlue };
  min-width: 80px;
  line-height: inherit !important;
  :before, :after {
    border-color: inherit!important;
    border-bottom: inherit!important;
  }
  :hover {
    color: ${ TOP_BAR.white };
  }
  .MuiSelect-icon {
    color: ${ TOP_BAR.lightBlue };
  }
`;

export const StyledProfileButton = styled(Button)`
  color: ${ TOP_BAR.white };
  padding: 5px;
  font-size: 17px;
  text-transform: inherit;
`;

export const StyledContainerMenuItem = styled.div`
  padding: 10px 20px;
  .menuItemName {
    color: ${ TOP_BAR.background };
    font-size: 14px;
    font-weight: 500;
  }
  .menuItemCPF {
    font-size: 13px;
  }
  hr {
    color: ${ TOP_BAR.lightBlue };
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .MuiMenuItem-root {
    padding: 0;
    padding-bottom: 3px;
  }
  .MuiSvgIcon-root {
    padding-right: 5px;
  }
`;
