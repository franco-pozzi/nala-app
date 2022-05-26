import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import theme, { GANT_LETTER_COLOR } from "theme/palette";
import styled from "styled-components";

export const StyledGrid = styled(Grid)`
  display: flex;
  margin-bottom: 5px;
  margin-left: -10px;
`;

export const StyledIcons = styled(Grid)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledPaper = styled(Paper)`
  width: 220px;
  min-height: 220px;
  height: min-content;
  padding: 22px 22px 0px 22px;
  z-index: ${(props) => props.index};
`;

export const StyledDate = styled.p`
  font-size: 11px;
  align-self: center;
`;

const StyledContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
`;

export const StyledFromDateContainer = styled(StyledContainer)`
  margin: 0px 15px 5px 9px;
`;

export const StyledToDateContainer = styled(StyledContainer)`
  margin-bottom: 5px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  margin: 2px;
  height: 48px;
  border-radius: 4px;
  border: ${`1px solid ${theme.table.placeholder}`};
  border-top: ${`7px solid ${GANT_LETTER_COLOR.medicalLicense}`};
  align-self: center;
  z-index: 999;
`;

export const StyledReasonRejection = styled.p`
  text-align: initial;
`;
