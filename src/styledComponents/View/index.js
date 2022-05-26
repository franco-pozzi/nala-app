import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import theme from "theme";
import palette from "theme/palette";
import constants from "../constants";

export const StyledContainer = styled(Card)`
  padding: ${(props) => props.padding};
  height: ${(props) => props.height || "100%"};
`;

export const StyledTitle = styled(Typography)`
  font-size: ${(prop) => `${prop.size}px` || constants.fontSize.medium};
  font-weight: ${constants.fontWeight.medium};
  margin-bottom: ${`${theme.spacing(2)}px`};
  text-align: ${(prop) => prop.textAlign || "left"};
`;

export const StyledSubtitle = styled(Typography)`
  font-weight: ${ (props) => props.fontWeight || 500 };
  font-size: ${ (props) => props.fontSize || "18px" };
  line-height: ${ (props) => props.lineHeigth || "21px" };
  color: ${ (props) => props.color || palette.subtitle };
`;

export const StyledGridFlex = styled(Grid)`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

export const StyledTooltipTitle = styled(Typography)`
  font-size: ${constants.fontSize.small};
  font-weight: ${constants.fontWeight.medium};
  margin-left: ${`${theme.spacing(1)}px`};
  margin-top: ${`${theme.spacing(1)}px`};
`;

export const StyledTooltipText = styled.p`
  font-size: ${constants.fontSize.small};
  font-weight: ${constants.fontWeight.normal};
`;

export const StyledSectionTitle = styled(Typography)`
  font-size: ${constants.fontSize.standar};
  font-weight: ${constants.fontWeight.medium};
  margin-bottom: ${`${theme.spacing(1)}px`};
`;

export const StyledDashboardContainer = styled(Box)`
  padding: 32px;
  margin-top: 16px;
  margin-bottom: 25px;
  .custom-select {
    background-color: ${theme.palette.white};
    padding: 10px 0 10px 0;
    label + & {
      margin-top: 8;
    }
  }
`;

export const StyledPaperContainer = styled(Paper)`
  padding: ${(props) => (props.padding || "32px")};
  margin-top: ${(props) => (props.marginTop || "16px")};
  margin-bottom: 25px;
  min-height: ${(props) => (props.minheight || "")};
  max-height: ${(props) => (props.maxheight || "")};
  overflow: scroll;
`;

export const StyledGridContainer = styled(Grid)`
  margin-bottom: 25px;
`;

export const StyledLink = styled.div`
  color: ${(props) => props.color || palette.text.link};
  text-decoration: underline;
  cursor: pointer;
`;

export const StyledGridEnd = styled(Grid)`
  text-align: right;
`;

export const StyledSimpleDashboardContainer = styled(Box)`
  padding: 32px;
`;
