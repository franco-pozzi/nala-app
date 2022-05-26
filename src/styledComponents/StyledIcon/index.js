import styled from "styled-components";

export const StyledIcon = styled.div`
  & svg{
    color: ${(props) => props.color};
  }
`;
