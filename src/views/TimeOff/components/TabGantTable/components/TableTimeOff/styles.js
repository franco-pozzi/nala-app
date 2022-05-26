import styled from "styled-components";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import theme from "theme/palette";

export const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.even ? theme.table.evenRow : theme.table.oddRow)};
  height: 68px;
`;

export const StyledCloudDownloadIcon = styled(CloudDownloadIcon)`
  color: ${theme.table.blue};
  width:  30px;
  height:  30px;
`;

export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  color: ${theme.table.green};
  width:  30px;
  height:  30px;
`;

export const StyledCancelIcon = styled(CancelIcon)`
  color: ${theme.table.red};
  width:  30px;
  height:  30px;
`;

export const StyledTrashAvatar = styled(Avatar)`
  background-color: ${theme.table.white};
  border: 1px solid ${theme.table.red};
  color: ${theme.table.red};
  width: 30px;
  height: 30px;
`;

export const StyledDateItem = styled.div`
  display: flex; 
  column-gap: 5px;
  margin-bottom: 5px;
  width: fit-content;
`;

export const StyledDatesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledBold = styled.p`
  font-weight: 700;
`;

export const StyledLabels = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAvatarCell = styled.div`
  display: flex;
`;

export const StyledIconDiv = styled.div`
  display: flex;
  column-gap: ${(props) => (props.isMobile ? "19px" : "5px")};
  margin-right: ${(props) => (props.flexEnd ? "-15px" : "0")};
  justify-content: center;
`;
