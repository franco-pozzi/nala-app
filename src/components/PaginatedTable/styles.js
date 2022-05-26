import styled from "styled-components";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import theme from "theme/palette";

export const StyledRoundTableContainer = styled(TableContainer)`
  border-radius: 8px;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.even ? theme.table.evenRow : theme.table.oddRow)};
`;

export const StyledRoundPaper = styled(Paper)`
  border-radius: 8px;
`;
