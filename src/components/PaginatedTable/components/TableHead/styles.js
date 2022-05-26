import styled from "styled-components";
import TableHead from "@material-ui/core/TableHead";
import theme from "theme/palette";

export const StyledTableHead = styled(TableHead)`
  background-color: ${theme.table.header}
`;
