import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { SIGN_IN_COLORS } from "../../../../theme/palette";
import Typography from '@material-ui/core/Typography';

export const RegisterContainer = styled(Box)`
  margin-top: 25px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const CommercialText = styled(Typography)`
  margin-right: 20px;
`;

export const RegisterLink = styled(Typography)`
  color: ${SIGN_IN_COLORS.blue};
  margin-left: 5px;
`;
