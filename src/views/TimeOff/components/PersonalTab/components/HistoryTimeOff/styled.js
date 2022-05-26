import Box from "@material-ui/core/Box";
import styled from "styled-components";

export const StyledHistory = styled.div`
  .icons-top{
    margin-top: -125px;
  }
  .custom-content{
    margin-top: 105px;
  }
  @media (max-width: 960px) {
    .icons-top{
      margin-top: -115px;
    }
  }
`;

export const StyledUnderConstruction = styled(Box)`
  text-align: center;
  p{
    margin: 5px 0;
  }
`;
