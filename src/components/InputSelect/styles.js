import styled from "styled-components";
import { Controller } from "react-hook-form";

export const ControllerStyled = styled(Controller)`
  animation: ${(props) => props.isPulse ? "pulse 2s infinite" : ""};
`;
