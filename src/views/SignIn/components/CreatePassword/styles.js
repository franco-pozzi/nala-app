import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { SIGN_IN_COLORS } from "theme/palette";
import InputForm from "components/InputForm";
import Loader from "components/Loader";

export const RecoverPasswordLink = styled(Typography)`
  margin-top: 15px;
  margin-bottom: 25px;
  color: ${SIGN_IN_COLORS.blue},
`;

// FIXME: We need generics styles for margins :(
export const InputFormComponent = styled(InputForm)`
  margin-bottom: 20px;
`;

export const LoaderComponent = styled(Loader)`
  margin-bottom: 20px;
`;
