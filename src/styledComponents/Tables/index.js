import styled from "styled-components";
import theme from "theme/palette";
import constants from "../constants";

export const StyledTheadTitle = styled.p`
  font-size: ${constants.fontSize.standar};
  font-weight: ${constants.fontWeight.medium};
  color: ${theme.text.secondaryTitle};
`;

export const StyledThedSubtitle = styled.p`
  font-size: ${ (props) => props.fontSize || constants.fontSize.small};
  font-weight: ${(props) => props.fontWeight || constants.fontWeight.normal};
  color: ${(props) => props.color || theme.text.theadSubtitleText};
`;
