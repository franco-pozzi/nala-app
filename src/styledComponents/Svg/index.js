import styled from "styled-components";

export const StyledSvg = styled.svg`
  width: ${ (props) => props.width };
  height: ${ (props) => props.height };
  fill: "none";
`;

export const StyledText = styled.text`
  font-size: 12px;
`;
