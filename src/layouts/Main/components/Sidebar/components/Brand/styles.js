import styled from "styled-components";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

export const StyledClose = styled(CloseIcon)`
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover{
    cursor: pointer;
  }
`;

export const StyledNalaContainer = styled(Box)`
  margin: 15px 0 0 0;
`;
