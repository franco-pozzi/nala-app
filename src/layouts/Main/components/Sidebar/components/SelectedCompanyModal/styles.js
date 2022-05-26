import styled from "styled-components";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const StyledDialogContent = styled(DialogContent)`
  overflow-y: hidden;
  text-align: center;
  padding: 0 30px 75px;
  h3 {
    margin: 40px 0 15px;
    font-weight: bold;
    font-size: 36px;
  }
  h5 {
    font-size: 18px;
  }
  button {
    margin-top: 55px;
  }
`;
