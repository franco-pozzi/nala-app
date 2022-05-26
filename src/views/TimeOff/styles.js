import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

export const StyledCustomPaper = styled(Paper)`
  padding: 25px;
  border-top:3px solid rgba(128, 128, 128, 0.5);
`;

export const StyledCardPaper = styled(Paper)`
  padding: 25px;
  border-top:3px solid rgba(128, 128, 128, 0.5);
  @media (max-width: 960px) {
    padding: 0px;
    &.MuiPaper-root{
      background-color: transparent;
    }
  }
`;

export const StyledSpacedGrid = styled(Grid)`
  justify-content: space-between;
  align-items: center;
`;

export const StyledTimeOffGrid = styled(Grid)`
  margin-bottom: 12px;
`;

export const StyledTimeOffPopUp = styled(Grid)`
  display: block;
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

export const StyledTabStyle = styled(Grid)`
  margin-left: 40px;
  display: grid;
`;

export const StyledDateContainer = styled(Grid)`
  justify-content: space-around;
  display: grid;
`;
