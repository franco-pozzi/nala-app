import styled from "styled-components";
import theme from "theme/palette";

export const StyledImageContainer = styled.div`
  position: relative;
`;

export const StyledStatus = styled.div`
  position: absolute;
  bottom: 0;
  right: 30%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isActive ? theme.table.green : theme.table.red)};
  svg {
    align-items:center;
    font-size: 14px;
    color: ${theme.white};
  }
`;

export const StyledEmployeeData = styled.div`
  h1 {
    padding: 5px 0 0px;
    font-size: 13px;
    line-height: 16px;
  }
  p {
    font-size: 10px;
    line-height: 12px;
    font-weight: 500;
  }
`;
