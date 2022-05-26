import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const StyledMessage = styled(Typography)`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400px;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
`;

export const StyledContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

export const StyledContent = styled.div`
  padding: 20px;
  & img {
    margin-bottom: 20px;
  }
`;
