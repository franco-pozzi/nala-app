import styled from "styled-components";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { ALIGN_ITEMS } from "common/constants";
import constants from "../constants";

export const StyledAccordeonContainer = styled(Accordion)`
  margin: ${(props) => props.margin};
  border-left: ${(props) => (props.isBorderLeft ? props.borderLeft : "none")} ;
  border-radius: ${(props) => (props.isBorderRadius ? props.borderRadius : "0px")} ;
`;

export const StyledAccordeonTitleContainer = styled(AccordionSummary)`
  background-color: ${(props) => props.background};
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    margin: 15px 0;
  }
`;

export const StyledAccordeonTitle = styled(Typography)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || constants.fontSize.standar};
  font-weight: ${(props) => props.fontWeight || constants.fontWeight.medium};
  width: ${(props) => (props.percentage ? "auto" : "100%")};
  float: ${(props) => (props.percentage ? ALIGN_ITEMS.right : ALIGN_ITEMS.left)};
`;

export const StyledAccordeonIcon = styled.div`
  svg {
    width: ${(props) => props.size || constants.icons.standar};
    margin-right: 10px;
  }
`;

export const StyledAccordeonDetailContainer = styled.div`
  background-color: ${(props) => props.background};
  .MuiAccordionDetails-root {
    display: block;
    padding: 10px 16px 12px;
  }
`;
