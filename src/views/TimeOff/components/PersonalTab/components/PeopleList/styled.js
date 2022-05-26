import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import palette from "theme/palette";

export const StyledTitle = styled(Typography)`
  margin-bottom: 24px;
`;

export const StyledGrid = styled(Grid)`
  text-align: center;
`;

export const StyledItem = styled.div`
  margin-top: 8px;
  border-bottom: 1px solid ${palette.text.inactive};
  padding-bottom: 8px;
  .MuiAvatar-root {
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
  }
  .MuiTypography-root{
    margin-top: 4px;
  }
  .subtitle{
    font-weight: 500;
  }
`;
