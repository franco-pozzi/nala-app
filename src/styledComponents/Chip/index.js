import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

export const StyledChip = styled(Chip)`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  margin-bottom: 5px;
  .MuiChip-deleteIcon {
    color: ${(props) => props.color};
  }
`;
