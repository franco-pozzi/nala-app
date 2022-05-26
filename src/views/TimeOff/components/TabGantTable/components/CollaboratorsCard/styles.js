import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ReactComponent as DownloadIcon } from "assets/images/time-off/downloadIcon.svg";
import theme from "theme/palette";
import styled from "styled-components";

export const StyledCloudDownloadIcon = styled(DownloadIcon)`
  color: ${theme.table.blue};
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const StyledTimeOffType = styled(Grid)`
  display: flex;
  align-items: flex-end;
`;

export const StyledLeader = styled(Grid)`
  margin-bottom: 7px;
  display: flex;
  align-items: center;
`;

export const StyledMotive = styled(Grid)`
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 17px;
`;

export const StyledReason = styled(Grid)`
  font-weight: 500;
  margin-bottom: 20px;
`;

export const StyledCardTitle = styled(Grid)`
  text-align: center;
  color: ${theme.text.secondaryTitle};
  font-size: 15;
  font-weight: 500;
`;

export const StyledCardFont = styled(Grid)`
  color: ${theme.text.secondaryTitle};
  font-size: 14px;
  margin-top: 25px;
  line-height: 16px;
`;

export const StyledAvatarCard = styled(Avatar)`
  justify-content: center;
`;

export const StyledCardButton = styled(Grid)`
  display: flex;
  justify-content: ${(props) => props.justify};
  margin-top: 20px;
  margin-bottom: 0;
  height: 44px;
`;

export const StyledRootContainer = styled(Card)`
  min-height: 389px;
  padding: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  margin-top: 15px;
  margin-bottom: 20px;
`;

export const StyledHr = styled.hr`
  color: ${theme.table.oddRow};
  border: 1px solid ${theme.table.oddRow};
  margin-top: 33px;
`;

export const StyledCardContentContainer = styled(CardContent)`
  padding: 26px 14px 0 14px;
`;

export const StyledAvGrid = styled(Grid)`
  padding-top: 5px;
  display: table;
  margin: auto;
`;

export const StyledCalendarGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 56px;
  margin-right: 5px;
  margin-bottom: 7px;
  p {
    min-width: 19vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }
`;
