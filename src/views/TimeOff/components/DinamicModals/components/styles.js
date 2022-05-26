import Grid from "@material-ui/core/Grid";
import Button from "components/Button";
import styled from "styled-components";

export const StyledSubmitGrid = styled(Grid)`
  justify-content: flex-end;
  margin-top: 20px;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    font-weight: bold;
  }
`;

export const StyledButton = styled(Button)`
  margin-right: 18px;
`;
