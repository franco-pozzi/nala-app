import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import charts from "theme/charts";
import { iconColor } from "theme/palette";
import constants from "../constants";

export const StyledChartContainer = styled.div`
  padding: 25px 0;
`;

export const StyledSpiderChartContainer = styled.div`
  width: 100%;
  height: 450px;
`;

export const StyledSpiderChartTooltip = styled.div`
  background: rgba(51, 51, 51, 0.76);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 16px;
  width: 200px;
  color: ${charts.colors.white};
`;

export const StyledTooltipText = styled(Typography)`
  font-size: ${(props) => constants.fontSize[props.fontSize] || constants.fontSize.small};
  font-weight: ${(props) => constants.fontWeight[props.fontWeight] || constants.fontWeight.medium};
  color: ${charts.colors.white};
`;

export const StyledTooltipIcon = styled.div`
  background: ${(props) => props.hasBackground ? charts.colors.white : "transparent" };
  border-radius: 2px;
  padding: 0 2px;
  margin-right: 5px;
  line-height: 16px;
  svg {
    font-size: 16px;
    &.info{
      color: ${iconColor.infoHexa};
    }
    &.warning{
      color: ${iconColor.warningHexa};
    }
    &.error{
      color: ${iconColor.errorHexa};;
    }
    &.success{
      color: ${iconColor.successHexa};
    }
  }
`;
